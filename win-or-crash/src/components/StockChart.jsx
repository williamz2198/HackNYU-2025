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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
  labels,
  datasets: [
    {
      label: 'Stock 1',
      data: labels.map(() => Math.random()),
      borderColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  ],
};

export default function StockChart(props){
    return(
        <>
            <div className="ContentBlock">
                <Line className = "Chart" data={data}/>
            </div>
        </>
    )
}