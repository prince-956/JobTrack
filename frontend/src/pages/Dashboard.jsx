import { useEffect, useState } from "react";
import axios from "axios";

import StatsCard from "../components/StatsCard";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationForm from "../components/ApplicationForm";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [applicationToEdit, setApplicationToEdit] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
  });

  const token = localStorage.getItem("token");

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("APPLICATION RESPONSE:", response.data);
      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applications/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchApplications();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">
        <h1>JobTrack Dashboard</h1>

        <div className="stats-grid">
          <StatsCard title="Total" value={stats.total} />

          <StatsCard title="Applied" value={stats.applied} />

          <StatsCard title="Interview" value={stats.interview} />

          <StatsCard title="Offers" value={stats.offer} />
        </div>

        <ApplicationForm
          applicationToEdit={applicationToEdit}
          onApplicationSaved={() => {
            fetchApplications();
            fetchStats();
            setApplicationToEdit(null);
          }}
        />

        <h2>My Applications</h2>

        <div className="applications-list">
          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            applications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                onDelete={deleteApplication}
                onEdit={(application) => {
                  setApplicationToEdit(application);
                }}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
