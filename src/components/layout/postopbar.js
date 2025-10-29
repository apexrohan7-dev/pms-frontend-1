import { useEffect, useState } from "react";
import { listMyProperties, getCurrentPropertyCode, setCurrentPropertyCode } from "../../lib/propertyStore";
import { apiFetch } from "../../lib/api";
import "./Topbar.css";

export default function Topbar() {
  const [now, setNow] = useState(new Date());
  const [propsList, setPropsList] = useState([]);
  const [currentCode, setCurrentCode] = useState(getCurrentPropertyCode());
  const [topbarData, setTopbarData] = useState({
    financialYear: "Apr 1 2025 – Mar 31 2026",
    user: "Buser",
    branchId: "51341"
  });
  const [loading, setLoading] = useState(true);

  // clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // load topbar data from API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await apiFetch("/topbar/info");
        setTopbarData({
          financialYear: data.financialYear || "Apr 1 2025 – Mar 31 2026",
          user: data.user || "Buser",
          branchId: data.branchId || "51341"
        });
      } catch (error) {
        console.error("Failed to fetch topbar data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // load properties once
  useEffect(() => {
    (async () => {
      try {
        const list = await listMyProperties();
        setPropsList(list);
        if (!currentCode && list[0]?.code) {
          setCurrentPropertyCode(list[0].code);
          setCurrentCode(list[0].code);
        }
      } catch {
        setPropsList([]);
      }
    })();
  }, []); // eslint-disable-line

  const onChangeProp = (e) => {
    const code = e.target.value || "";
    setCurrentPropertyCode(code);
    setCurrentCode(code);
  };

  const currentName = propsList.find(p => p.code === currentCode)?.name || currentCode || "—";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <img src="/logo.png" alt="Trustify" className="topbar-logo" />
      </div>

      <div className="topbar-center">
        <span>Switch Branch : </span>
        <select className="topbar-branch" value={currentCode} onChange={onChangeProp}>
          {propsList.map(p => (
            <option key={p.code} value={p.code}>{p.name}</option>
          ))}
        </select>
        <span className="topbar-period">{topbarData.financialYear}</span>
        <span className="topbar-branch-id">{topbarData.branchId}</span>
      </div>

      <div className="topbar-right">
        <span className="topbar-user">{topbarData.user}</span>
        <span className="topbar-datetime">
          Today: {now.toLocaleDateString('en-US', { 
            month: 'short', 
            day: '2-digit', 
            year: 'numeric' 
          })} {now.toLocaleTimeString('en-US', { 
            hour12: false 
          })}
        </span>
        <button className="btn-audit">Audit</button>
        <button className="icon-btn">⚙</button>
        <button className="icon-btn power">⏻</button>
      </div>
    </header>
  );
}
