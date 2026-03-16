import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

function TeacherStudentAnalytics() {
  const [analytics, setAnalytics] = useState({
    articleViews: [],
    mostViewedCategories: [],
    studentProgress: [],
    dailyEngagement: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  const barData = {
    labels: analytics.articleViews.map(a => a.title),
    datasets: [{
      label: "Views per Article",
      data: analytics.articleViews.map(a => a.totalViews),
      backgroundColor: ["#ff6384","#36a2eb","#ffcd56","#4bc0c0","#9966ff","#ff9f40"]
    }]
  };

  const pieData = {
    labels: analytics.mostViewedCategories.map(c => c._id),
    datasets: [{
      label: "Top Categories",
      data: analytics.mostViewedCategories.map(c => c.totalViews),
      backgroundColor: ["#ff6384","#36a2eb","#ffcd56"]
    }]
  };

  const lineData = {
    labels: analytics.dailyEngagement.map(d => d._id),
    datasets: [{
      label: "Daily Views",
      data: analytics.dailyEngagement.map(d => d.totalViews),
      fill: false,
      borderColor: "#36a2eb",
      tension: 0.3
    }]
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>📊 Student Engagement Analytics</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={{ backgroundColor:"#fff", padding:"1rem", borderRadius:"10px" }}>
          <h3 style={{ textAlign:"center" }}>Views per Article</h3>
          <Bar data={barData} />
        </div>

        <div style={{ backgroundColor:"#fff", padding:"1rem", borderRadius:"10px" }}>
          <h3 style={{ textAlign:"center" }}>Top 3 Categories</h3>
          <Pie data={pieData} />
        </div>

        <div style={{ gridColumn: "1 / span 2", backgroundColor:"#fff", padding:"1rem", borderRadius:"10px" }}>
          <h3 style={{ textAlign:"center" }}>Daily Engagement</h3>
          <Line data={lineData} />
        </div>
      </div>

      {/* Optional: Student-wise reading progress table */}
      <div style={{ marginTop:"2rem", backgroundColor:"#fff", padding:"1rem", borderRadius:"10px" }}>
        <h3 style={{ textAlign:"center" }}>Student-wise Reading Progress</h3>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Student ID</th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Articles Read</th>
              <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Total Duration (s)</th>
            </tr>
          </thead>
          <tbody>
            {analytics.studentProgress.map((s, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s._id}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.articlesRead}</td>
                <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{s.totalDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherStudentAnalytics;