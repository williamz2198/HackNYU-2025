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
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
    labels,
    datasets: [
        {
        label: 'Stock 1',
        data: props.data,
        borderColor: 'rgba(94, 255, 0, 1)',
        backgroundColor: 'rgba(94, 255, 0, 1)',
        },
    ],
    };
    return(
        <>
            <div className="ContentBlock">
                <Line className = "Chart" data={data}/>
            </div>
        </>
    )
}