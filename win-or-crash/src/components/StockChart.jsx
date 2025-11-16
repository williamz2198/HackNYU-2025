import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart(props){
    const generateLabels = () =>{
        let res = [];
        for(let i = 1; i < 25; i++){
            res.push("Day " + i);
        }
        return res;
    };
    const labels = generateLabels();

    const getColorForData = (arr) => {
        if (!Array.isArray(arr) || arr.length < 2) {
            return {
                borderColor: 'rgba(94, 255, 0, 1)',
                backgroundColor: 'rgba(94, 255, 0, 0.15)'
            };
        }
        const first = Number(arr[0]);
        const last = Number(arr[arr.length - 1]);
        if (isNaN(first) || isNaN(last)) {
            return {
                borderColor: 'rgba(94, 255, 0, 1)',
                backgroundColor: 'rgba(94, 255, 0, 0.15)'
            };
        }
        if (last < first) {
            return {
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(255, 0, 0, 0.15)'
            };
        }
        return {
            borderColor: 'rgba(94, 255, 0, 1)',
            backgroundColor: 'rgba(94, 255, 0, 0.15)'
        };
    };

    const segmentColorFn = (datasetColor) => (ctx) => {
        const p0 = ctx.p0;
        const p1 = ctx.p1;
        
        if (!p0 || !p1 || !p0.parsed || !p1.parsed) {
            return datasetColor?.borderColor ?? 'rgba(94, 255, 0, 1)';
        }
        const y0 = Number(p0.parsed.y);
        const y1 = Number(p1.parsed.y);
        if (isNaN(y0) || isNaN(y1)) {
            return datasetColor?.borderColor ?? 'rgba(94, 255, 0, 1)';
        }
        return y1 < y0 ? 'rgba(255, 0, 0, 1)' : 'rgba(94, 255, 0, 1)';
    };

    const pointColorFn = (defaultColor) => (ctx) => {
        const idx = ctx.dataIndex;
        const parsedY = ctx.parsed?.y;
        const dataArr = ctx.dataset?.data ?? [];
        const y = Number(parsedY ?? dataArr[idx]);
        if (!isFinite(y)) return defaultColor.borderColor ?? 'rgba(94,255,0,1)';

        const prev = idx > 0 ? Number(dataArr[idx - 1]) : NaN;
        const next = idx < dataArr.length - 1 ? Number(dataArr[idx + 1]) : NaN;

        if (!isFinite(prev) && isFinite(next)) {
            return y > next ? 'rgba(255,0,0,1)' : 'rgba(94,255,0,1)';
        }
        if (!isFinite(prev)) return defaultColor.borderColor ?? 'rgba(94,255,0,1)';

        if (y < prev) return 'rgba(255,0,0,1)';
        if (y > prev) return 'rgba(94,255,0,1)';
        return defaultColor.borderColor ?? 'rgba(94,255,0,1)';
    };

    const pointRadiusFn = (ctx) => {
        const idx = ctx.dataIndex;
        const parsedY = ctx.parsed?.y;
        const dataArr = ctx.dataset?.data ?? [];
        const y = Number(parsedY ?? dataArr[idx]);
        if (!isFinite(y)) return 3;
        const prev = idx > 0 ? Number(dataArr[idx - 1]) : NaN;
        const next = idx < dataArr.length - 1 ? Number(dataArr[idx + 1]) : NaN;

        let base = 3;
        if (idx === dataArr.length - 1) base = 5;
        if (!isFinite(prev)) {
            if (isFinite(next)) {
                const rel = Math.abs(y - next) / Math.max(1, Math.abs(next));
                if (rel > 0.1) return base + 3;
                if (rel > 0.03) return base + 2;
                if (rel > 0.01) return base + 1;
                return base;
            }
            return base;
        }

        const rel = Math.abs(y - prev) / Math.max(1, Math.abs(prev));
        if (rel > 0.1) return base + 3;
        if (rel > 0.03) return base + 2;
        if (rel > 0.01) return base + 1;
        return base;
    };

    let datasets;
    if (Array.isArray(props.override) && props.override.length > 0) {
        datasets = props.override.map(ds => {
            const dsData = Array.isArray(ds.data) ? ds.data : [];
            const defaultColor = getColorForData(dsData);
            return {
                ...ds,
                data: dsData,
                borderColor: ds.borderColor ?? defaultColor.borderColor,
                backgroundColor: ds.backgroundColor ?? defaultColor.backgroundColor,
                pointBackgroundColor: pointColorFn({ borderColor: ds.borderColor ?? defaultColor.borderColor }),
                pointBorderColor: pointColorFn({ borderColor: ds.borderColor ?? defaultColor.borderColor }),
                pointRadius: pointRadiusFn,
                segment: {
                    borderColor: segmentColorFn({ borderColor: ds.borderColor ?? defaultColor.borderColor }),
                    backgroundColor: (ctx) => {
                        const c = segmentColorFn({ borderColor: ds.borderColor ?? defaultColor.borderColor })(ctx);
                        return c === 'rgba(255, 0, 0, 1)' ? 'rgba(255, 0, 0, 0.15)' : 'rgba(94, 255, 0, 0.15)';
                    }
                },
                borderWidth: ds.borderWidth ?? 2,
                tension: ds.tension ?? 0.2,
                fill: ds.fill ?? false
            };
        });
    } else {
        const singleData = Array.isArray(props.data) ? props.data : [];
        const defaultColor = getColorForData(singleData);
        datasets = [
            {
                label: props.name ?? 'Series',
                data: singleData,
                borderColor: defaultColor.borderColor,
                backgroundColor: defaultColor.backgroundColor,
                pointBackgroundColor: pointColorFn(defaultColor),
                pointBorderColor: pointColorFn(defaultColor),
                pointRadius: pointRadiusFn,
                segment: {
                    borderColor: segmentColorFn(defaultColor),
                    backgroundColor: (ctx) => {
                        const c = segmentColorFn(defaultColor)(ctx);
                        return c === 'rgba(255, 0, 0, 1)' ? 'rgba(255, 0, 0, 0.15)' : 'rgba(94, 255, 0, 0.15)';
                    }
                },
                borderWidth: 2,
                tension: 0.2,
                fill: false
            }
        ];
    }

    const data = {
        labels,
        datasets
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: { display: true },
            y: { display: true }
        },
        elements: {
            point: {
                radius: 3
            },
            line: {
                borderJoinStyle: 'round'
            }
        }
    };

    return(
        <>
            <div className="Chart">
                <Line data={data}/>
            </div>
        </>
    )
}
