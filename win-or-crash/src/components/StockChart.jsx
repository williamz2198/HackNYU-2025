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
    const data = {
    labels,
    datasets: [
        {
        label: props.name,
        data: props.data,
        borderColor: 'rgba(94, 255, 0, 1)',
        backgroundColor: 'rgba(94, 255, 0, 1)',
        },
    ],
    };
    return(
        <>
            <div className="Chart">
                <Line data={data}/>
            </div>
        </>
    )
}
