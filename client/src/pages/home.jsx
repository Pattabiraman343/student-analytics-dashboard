import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <section className="hero">

        {/* LEFT IMAGE */}
        <div className="hero-left">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="learning"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="hero-right">

          <h1>Student Article Analytics Platform</h1>

          <p>
            Read articles, highlight key ideas, track engagement,
            and analyze student learning patterns with our
            intelligent reading platform.
          </p>

          <div className="hero-buttons">

            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button
              className="hero-secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </div>

        </div>

      </section>
    </div>
  );
}

export default Home;