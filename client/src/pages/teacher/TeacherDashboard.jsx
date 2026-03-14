import { useEffect, useState } from "react";
import API from "../../api/api";
import Navbar from "../../components/Navbar";

function TeacherDashboardSummary() {
  const [analytics, setAnalytics] = useState({
    articlesCreated: 0,
    totalStudentsRead: 0,
    mostViewedCategories: [],
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

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>📊 Dashboard Summary</h1>

      <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        <div style={{ padding: "1rem 2rem", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
          <h3>Total Articles</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{analytics.articlesCreated}</p>
        </div>

        <div style={{ padding: "1rem 2rem", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
          <h3>Total Students Read</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{analytics.totalStudentsRead}</p>
        </div>

        <div style={{ padding: "1rem 2rem", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
          <h3>Top 3 Categories</h3>
          <ul>
            {analytics.mostViewedCategories.map((c, i) => (
              <li key={i}>{c._id} ({c.totalViews} views)</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboardSummary;