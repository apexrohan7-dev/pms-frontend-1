// src/pages/Backoffice/masters/ReservationSettings.js
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { BackofficeSidebar } from "../../../components/sidebar/backofficesidebar";
import "../../../components/sidebar/Sidebar.css";
import "../../../assets/css/commanPage.css";

const PAGE_SIZE = 10;

export default function ReservationSettings() {
  const [rows, setRows] = useState([]);
  const [propsList, setPropsList] = useState([]);
  const [filterProp, setFilterProp] = useState("");

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Load properties for dropdowns
  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/properties?limit=200", { auth: true });
        const arr = res?.data || res || [];
        setPropsList(arr.map(p => ({ code: p.code, name: p.name })));
      } catch {
        // ignore
      }
    })();
  }, []);

  // Load list
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const params = new URLSearchParams({
          q,
          page,
          limit,
          ...(filterProp ? { propertyCode: filterProp } : {}),
        });
        const res = await apiFetch(`/api/reservation-settings?${params.toString()}`, { auth: true });
        const data = res?.data || res?.items || res || [];
        const count = res?.total ?? data.length ?? 0;
        if (!ignore) {
          setRows(Array.isArray(data) ? data : []);
          setTotal(Number(count) || 0);
        }
      } catch (e) {
        if (!ignore) {
          setErr(e?.message || "Failed to load reservation settings.");
          setRows([]); setTotal(0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [q, page, limit, filterProp]);

  // Client fallback search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      [r.propertyCode, r.propertyName]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(term))
    );
  }, [rows, q]);

  const dataToRender = rows?.length && total > rows.length ? rows : filtered;

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (row) => { setEditing(row); setShowForm(true); };
  const askDelete = (row) => { setToDelete(row); setShowDelete(true); };

  const afterSave = (saved) => {
    setShowForm(false); setEditing(null);
    setRows(prev => {
      const id = saved._id || saved.id;
      const idx = prev.findIndex(p => (p._id || p.id) === id);
      if (idx === -1) return [saved, ...prev];
      const next = prev.slice(); next[idx] = saved; return next;
    });
  };
  const afterDelete = (id) => {
    setShowDelete(false); setToDelete(null);
    setRows(prev => prev.filter(r => (r._id || r.id) !== id));
    setTotal(t => Math.max(0, t - 1));
  };

  return (
    <div className="page" style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
      <BackofficeSidebar />

      <div className="res-wrap">
        {/* Topbar */}
        <div className="res-topbar">
          <h2 style={{ margin: 0 }}>Reservation Settings</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select
              className="res-select"
              value={filterProp}
              onChange={(e) => { setFilterProp(e.target.value); setPage(1); }}
              title="Property"
            >
              <option value="">All Properties</option>
              {propsList.map(p => (
                <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
              ))}
            </select>

            <input
              className="res-select"
              placeholder="Search settings"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              style={{ minWidth: 320 }}
            />
            <select
              className="res-select"
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            >
              {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
            </select>
            <button className="btn" onClick={openCreate}>+ Add</button>
          </div>
        </div>

        {/* Table */}
        <div className="panel">
          <div className="panel-h">
            <span>Reservation Settings</span>
            <span className="small" style={{ color: "var(--muted)" }}>
              {loading ? "Loading…" : `Total: ${total || dataToRender.length}`}
            </span>
          </div>

          <div className="panel-b">
            {err && <Banner type="err">{err}</Banner>}

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 90 }}>Action</th>
                    <th>Branch</th>
                    <th>Show Waiter List</th>
                    <th>Calculate Tax With Free Item</th>
                    <th>Show Message For Print KOT</th>
                    <th>Created</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {(!dataToRender || dataToRender.length === 0) && !loading && (
                    <tr className="no-rows"><td colSpan={7}>No settings found</td></tr>
                  )}

                  {dataToRender?.map(r => {
                    const id = r._id || r.id;
                    return (
                      <tr key={id}>
                        <td>
                          <button className="btn" style={btnSm} onClick={() => openEdit(r)}>?</button>
                          <button className="btn" style={btnSm} onClick={() => askDelete(r)}>??</button>
                        </td>
                        <td>{r.propertyCode || "—"}</td>
                        <td><OnOff value={r.showWaiterList} /></td>
                        <td><OnOff value={r.calculateTaxWithFreeItem} /></td>
                        <td><OnOff value={r.showMessageForPrintKOT} /></td>
                        <td>{fmtDate(r.createdAt)}</td>
                        <td>{fmtDate(r.updatedAt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, marginTop: 8 }}>
              <button className="btn" disabled={page <= 1 || loading} onClick={() => setPage(p => Math.max(1, p - 1))}>
                ‹ Prev
              </button>
              <span className="small" style={{ alignSelf: "center", color: "var(--muted)" }}>Page {page}</span>
              <button
                className="btn"
                disabled={loading || (!total ? dataToRender.length < limit : page * limit >= total)}
                onClick={() => setPage(p => p + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <ReservationSettingsForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={afterSave}
          propsList={propsList}
          defaultProp={filterProp}
        />
      )}

      {showDelete && (
        <ConfirmModal
          title="Delete Setting?"
          message={`Delete reservation setting for "${toDelete?.propertyCode}"? This cannot be undone.`}
          confirmText="Delete"
          onClose={() => { setShowDelete(false); setToDelete(null); }}
          onConfirm={async () => {
            const id = toDelete?._id || toDelete?.id;
            try {
              const result = await apiFetch(`/api/reservation-settings/${id}`, { 
                method: "DELETE", 
                auth: true 
              });
              
              // Check if deletion was successful
              if (result?.success === false) {
                throw new Error(result?.message || 'Failed to delete reservation setting');
              }
              
              afterDelete(id);
            } catch (error) {
              // Re-throw the error to be caught by ConfirmModal
              throw new Error(error?.message || 'Failed to delete reservation setting');
            }
          }}
        />
      )}
    </div>
  );
}

/* ---------- Form Modal ---------- */
function ReservationSettingsForm({ initial, onClose, onSaved, propsList, defaultProp }) {
  const isEdit = !!initial;
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const [propertyCode, setPropertyCode] = useState(initial?.propertyCode || defaultProp || "");
  const [showWaiterList, setShowWaiterList] = useState(initial?.showWaiterList ?? false);
  const [calculateTaxWithFreeItem, setCalculateTaxWithFreeItem] = useState(initial?.calculateTaxWithFreeItem ?? false);
  const [showMessageForPrintKOT, setShowMessageForPrintKOT] = useState(initial?.showMessageForPrintKOT ?? false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");

    if (!propertyCode.trim()) return setErr("Branch is required");

    const payload = {
      propertyCode: propertyCode.trim().toUpperCase(),
      showWaiterList,
      calculateTaxWithFreeItem,
      showMessageForPrintKOT,
    };

    setSaving(true);
    try {
      let saved;
      if (isEdit) {
        const id = initial._id || initial.id;
        saved = await apiFetch(`/api/reservation-settings/${id}`, { method: "PATCH", auth: true, body: JSON.stringify(payload) });
      } else {
        saved = await apiFetch("/api/reservation-settings", { method: "POST", auth: true, body: JSON.stringify(payload) });
      }
      setOk("Saved successfully!");
      setTimeout(() => onSaved(saved), 800);
    } catch (e2) {
      setErr(e2?.message || "Failed to save setting.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setPropertyCode("");
    setShowWaiterList(false);
    setCalculateTaxWithFreeItem(false);
    setShowMessageForPrintKOT(false);
    setErr("");
    setOk("");
  };

  return (
    <div style={backdropStyle}>
      <div style={modalContainerStyle}>
        {/* Modal Header */}
        <div style={modalHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>
            {isEdit ? "Edit" : "Add"} Reservation Setting
          </h3>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close">×</button>
        </div>

        {/* Modal Content */}
        <div style={modalContentStyle}>
          {err && <Banner type="err">{err}</Banner>}
          {ok && <Banner type="ok">{ok}</Banner>}

          {/* Green Label */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ color: "#059669", fontWeight: 700, fontSize: "14px" }}>
              All * filed Mandatory
            </span>
          </div>

          <form onSubmit={onSubmit}>
            {/* Branch Field */}
            <div style={{ marginBottom: 20 }}>
              <Field label="Branch" required>
                <select
                  value={propertyCode}
                  onChange={(e) => setPropertyCode(e.target.value)}
                  style={selectInputStyle}
                  disabled={isEdit}
                >
                  <option value="">--Select--</option>
                  {propsList.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                </select>
              </Field>
            </div>

            {/* Checkboxes */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={showWaiterList}
                  onChange={(e) => setShowWaiterList(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>Show Waiter List</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={calculateTaxWithFreeItem}
                  onChange={(e) => setCalculateTaxWithFreeItem(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>Calculate Tax With Free Item</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={showMessageForPrintKOT}
                  onChange={(e) => setShowMessageForPrintKOT(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>Show Message For Print KOT</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button 
                type="submit" 
                style={saveButtonStyle}
                disabled={saving}
              >
                {saving ? "SAVING…" : "SAVE"}
              </button>
              <button 
                type="button" 
                style={resetButtonStyle} 
                onClick={handleReset}
                disabled={saving}
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tiny UI helpers ---------- */
function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontSize: "14px", fontWeight: 600, color: "#64748b" }}>
        {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Banner({ type = "ok", children }) {
  const style = type === "err"
    ? { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }
    : { background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" };
  return <div style={{ ...style, padding: "10px 14px", borderRadius: 6, fontWeight: 600, marginBottom: 16, fontSize: "14px" }}>{children}</div>;
}

function ConfirmModal({ title, message, confirmText = "OK", onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(""); // Added error state
  
  return (
    <div style={backdropStyle}>
      <div style={modalContainerStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>{title}</h3>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close">×</button>
        </div>
        <div style={modalContentStyle}>
          {error && <Banner type="err">{error}</Banner>} {/* Show error */}
          <p style={{ marginTop: 0, color: "#475569" }}>{message}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ ...resetButtonStyle, background: "#6b7280" }}
              disabled={busy}
            >
              Cancel
            </button>
            <button 
              type="button" 
              disabled={busy} 
              onClick={async () => { 
                setBusy(true);
                setError(""); // Clear previous errors
                try { 
                  await onConfirm?.(); 
                  // Only close on success
                  onClose(); 
                } catch (err) {
                  // Display error to user
                  setError(err?.message || "Operation failed. Please try again.");
                  console.error('Delete error:', err);
                } finally { 
                  setBusy(false); 
                } 
              }}
              style={resetButtonStyle}
            >
              {busy ? "Working…" : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnOff({ value }) {
  const on = !!value;
  return (
    <span style={{
      display: "inline-block", padding: ".15rem .5rem",
      borderRadius: 999, background: on ? "#ecfdf5" : "#f3f4f6",
      border: `1px solid ${on ? "#a7f3d0" : "#e5e7eb"}`,
      color: on ? "#15803d" : "#334155", fontSize: ".75rem", fontWeight: 700
    }}>
      {on ? "?" : "?"}
    </span>
  );
}

// Modal Styles
const backdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "20px"
};

const modalContainerStyle = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  width: "min(600px, 100%)",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden"
};

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  borderBottom: "1px solid #e2e8f0",
  background: "#fff"
};

const closeButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "28px",
  color: "#64748b",
  cursor: "pointer",
  padding: "0",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1
};

const modalContentStyle = {
  padding: "24px",
  overflowY: "auto",
  flex: 1
};

const selectInputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  fontSize: "14px",
  background: "#fff",
  boxSizing: "border-box",
  color: "#334155"
};

const saveButtonStyle = {
  padding: "10px 24px",
  color: "#fff",
  background: "#7c3aed",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  minWidth: 100,
  textTransform: "uppercase"
};

const resetButtonStyle = {
  padding: "10px 24px",
  color: "#fff",
  background: "#dc2626",
  border: "none",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
  minWidth: 100,
  textTransform: "uppercase"
};

const btnSm = { padding: ".3rem .5rem", marginRight: 4, fontWeight: 700 };

function fmtDate(d) { if (!d) return "—"; const dt = new Date(d); return Number.isNaN(dt) ? "—" : dt.toLocaleDateString(); }