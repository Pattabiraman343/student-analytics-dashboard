import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./StudentDashboard.css";

Chart.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function StudentDashboard() {
  const [highlights, setHighlights] = useState([]);
  const [stats, setStats] = useState({
    readingTimePerCategory: [],
    totalArticlesRead: 0,
    articlesPerCategory: [],
    dailyEngagement: [],
  });

  useEffect(() => {
    // Fetch highlights
    API.get("/highlights")
      .then((res) => setHighlights(res.data))
      .catch((err) => console.error(err));

    // Fetch student analytics
    API.get("/tracking/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Pie Chart → Reading Time per Category
  const pieData = {
    labels: stats.readingTimePerCategory?.map((c) => c._id) || [],
    datasets: [
      {
        data: stats.readingTimePerCategory?.map((c) => c.totalDuration) || [],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40",
        ],
      },
    ],
  };

  // Bar Chart → Articles Read per Category
  const barData = {
    labels: stats.articlesPerCategory?.map((c) => c._id) || [],
    datasets: [
      {
        label: "Articles Read",
        data: stats.articlesPerCategory?.map((c) => c.count) || [],
        backgroundColor: "#36a2eb",
      },
    ],
  };

  // Line Chart → Daily Engagement Trend
  const lineData = {
    labels:
      stats.dailyEngagement?.map((d) =>
        new Date(d.date).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Time Spent (minutes)",
        data: stats.dailyEngagement?.map((d) => d.totalDuration) || [],
        fill: false,
        borderColor: "#ff6384",
        tension: 0.3,
        pointBackgroundColor: "#ff6384",
      },
    ],
  };

  return (
    <div className="student-dashboard-container">
      <Navbar />
      <div className="student-dashboard-content">
        <h1>📚 My Learning Dashboard</h1>

        {/* Summary Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Articles Read</h3>
            <p>{stats.totalArticlesRead || 0}</p>
          </div>
          <div className="card">
            <h3>Total Highlights</h3>
            <p>{highlights.length}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h2>⏱ Reading Time per Category</h2>
            <Pie data={pieData} />
          </div>

          <div className="chart-container">
            <h2>📊 Articles Read per Category</h2>
            <Bar data={barData} />
          </div>

          <div className="chart-container">
            <h2>📈 Daily Engagement Trend</h2>
            <Line data={lineData} />
          </div>
        </div>

        {/* Highlights Table */}
        <div className="highlights-container">
          <h2>📝 My Highlights</h2>
          {highlights.length === 0 ? (
            <p>No highlights yet.</p>
          ) : (
            <table className="highlights-table">
              <thead>
                <tr>
                  <th>Article Name</th>
                  <th>Highlighted Text</th>
                  <th>Note</th>
                  <th>Saved At</th>
                </tr>
              </thead>
              <tbody>
                {highlights.map((h) => (
                  <tr key={h._id}>
                    <td>{h.articleTitle || "Unknown Article"}</td>
                    <td>{h.text}</td>
                    <td>{h.note}</td>
                    <td>{new Date(h.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;