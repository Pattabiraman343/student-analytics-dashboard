import { Bar } from "react-chartjs-2";
import { Chart,BarElement,CategoryScale,LinearScale } from "chart.js";

Chart.register(BarElement,CategoryScale,LinearScale);

function ChartCard({ data }) {

const chartData = {

labels: data.map(d => d._id),

datasets:[
{
label:"Article Views",
data:data.map(d => d.totalViews)
}
]

};

return <Bar data={chartData}/>;

}

export default ChartCard;