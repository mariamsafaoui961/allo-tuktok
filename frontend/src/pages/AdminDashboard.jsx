import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setError("");
      const { data } = await api.get("/admin/stats");
      setData(data);
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load dashboard");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}/status`, { status });
      load();
    } catch (e) { setError(e.response?.data?.message || "Unable to update booking"); }
  };

  if (loading) return <div className="page-loader">Loading dashboard...</div>;
  if (error) return <main className="admin-page"><div className="admin-error">{error}</div><Link className="admin-back" to="/">Back to home</Link></main>;

  const stats = [
    ["bx-group", "Users", data.users, "Total registered users"],
    ["bx-calendar-check", "Bookings", data.bookings, "All bookings"],
    ["bx-time-five", "Pending", data.pending, "Waiting for confirmation"],
    ["bx-check-circle", "Confirmed", data.confirmed, "Confirmed bookings"]
  ];

  return (
    <main className="admin-page">
      <div className="admin-bg admin-bg-one" /><div className="admin-bg admin-bg-two" />
      <section className="admin-container">
        <div className="admin-top">
          <div><Link to="/" className="admin-back">← Back to home</Link><p className="admin-kicker">ALLO TUKTUK</p><h1>Admin <span className="gradient-text">Dashboard</span></h1><p>Welcome back, {user?.firstName}. Manage your bookings and users.</p></div>
          <div className="admin-pill"><i className="bx bx-shield-quarter" /> Administrator</div>
        </div>

        <div className="admin-stats">{stats.map(([icon,title,value,sub],i)=><motion.div key={title} className="admin-stat" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.08}}><div className="admin-stat-icon"><i className={`bx ${icon}`} /></div><div><span>{title}</span><strong>{value}</strong><small>{sub}</small></div></motion.div>)}</div>

        <div className="admin-grid">
          <section className="admin-panel"><div className="admin-panel-head"><div><h2>Recent Bookings</h2><p>Latest customer reservations</p></div><button className="admin-refresh" onClick={load}><i className="bx bx-refresh" /> Refresh</button></div>
            {data.recentBookings.length === 0 ? <div className="admin-empty">No bookings yet.</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Date</th><th>Time</th><th>People</th><th>Status</th><th>Action</th></tr></thead><tbody>{data.recentBookings.map(b=><tr key={b._id}><td><strong>{b.name}</strong><small>{b.email}</small></td><td>{b.date}</td><td>{b.time}</td><td>{b.people}</td><td><span className={`status ${b.status}`}>{b.status}</span></td><td><select value={b.status} onChange={e=>updateStatus(b._id,e.target.value)}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select></td></tr>)}</tbody></table></div>}
          </section>
          <section className="admin-panel admin-summary"><h2>Booking Overview</h2><div className="overview-row"><span>Pending</span><b>{data.pending}</b></div><div className="overview-row"><span>Confirmed</span><b>{data.confirmed}</b></div><div className="overview-row"><span>Cancelled</span><b>{data.cancelled}</b></div><div className="overview-total"><span>Total</span><b>{data.bookings}</b></div></section>
        </div>
      </section>
    </main>
  );
};
export default AdminDashboard;
