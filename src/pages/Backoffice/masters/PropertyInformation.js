// src/pages/Backoffice/masters/PropertyInformation.js
import { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { BackofficeSidebar } from "../../../components/sidebar/backofficesidebar";
import "../../../components/sidebar/Sidebar.css";
import "../../../assets/css/commanPage.css";

const PAGE_SIZE = 10;

export default function PropertyInformation() {
  const [rows, setRows] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [filterProperty, setFilterProperty] = useState("");

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
        setPropertyList(arr.map(p => ({ code: p.code, name: p.name })));
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
          ...(filterProperty ? { branchCode: filterProperty } : {}),
        });
        const res = await apiFetch(`/api/property-information?${params.toString()}`, { auth: true });
        const data = res?.data || res?.items || res || [];
        const count = res?.total ?? data.length ?? 0;
        if (!ignore) {
          setRows(Array.isArray(data) ? data : []);
          setTotal(Number(count) || 0);
        }
      } catch (e) {
        if (!ignore) {
          setErr(e?.message || "Failed to load property information.");
          setRows([]); setTotal(0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [q, page, limit, filterProperty]);

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
          <h2 style={{ margin: 0 }}>Property Information</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select
              className="res-select"
              value={filterProperty}
              onChange={(e) => { setFilterProperty(e.target.value); setPage(1); }}
              title="Property"
            >
              <option value="">All Properties</option>
              {propertyList.map(p => (
                <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
              ))}
            </select>
            <input
              className="res-select"
              placeholder="Search property information..."
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
            <button className="btn" onClick={openCreate}>+ Add Property Information</button>
          </div>
        </div>

        {/* Table */}
        <div className="panel">
          <div className="panel-h">
            <span>Property Information List</span>
            <span className="small" style={{ color: "var(--muted)" }}>
              {loading ? "Loading…" : `Total: ${total || rows.length}`}
            </span>
          </div>
          <div className="panel-b">
            {err && <Banner type="err">{err}</Banner>}

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: 90 }}>Action</th>
                    <th>Property</th>
                    <th>Map</th>
                    <th>Facebook</th>
                    <th>LinkedIn</th>
                    <th>Twitter</th>
                    <th>YouTube</th>
                    <th>Instagram</th>
                  </tr>
                </thead>
                <tbody>
                  {(!rows || rows.length === 0) && !loading && (
                    <tr className="no-rows"><td colSpan={8}>No property information found</td></tr>
                  )}

                  {rows?.map(r => {
                    const id = r._id || r.id;
                    return (
                      <tr key={id}>
                        <td>
                          <button className="btn" style={btnSm} onClick={() => openEdit(r)}>??</button>
                          <button className="btn" style={btnSm} onClick={() => askDelete(r)}>???</button>
                        </td>
                        <td>{r.branchCode || "—"}</td>
                        <td>{r.map ? "?" : "—"}</td>
                        <td>{r.facebook || "—"}</td>
                        <td>{r.linkedin || "—"}</td>
                        <td>{r.twitter || "—"}</td>
                        <td>{r.youtube || "—"}</td>
                        <td>{r.instagram || "—"}</td>
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
                disabled={loading || (!total ? rows.length < limit : page * limit >= total)}
                onClick={() => setPage(p => p + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <PropertyInfoForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={afterSave}
          propertyList={propertyList}
        />
      )}

      {showDelete && toDelete && (
        <ConfirmModal
          title="Delete Property Information"
          message={`Delete property information for ${toDelete.branchCode}?`}
          confirmText="DELETE"
          onConfirm={async () => {
            const id = toDelete._id || toDelete.id;
            await apiFetch(`/api/property-information/${id}`, { method: "DELETE", auth: true });
            afterDelete(id);
          }}
          onClose={() => { setShowDelete(false); setToDelete(null); }}
        />
      )}
    </div>
  );
}

/* ---------- PropertyInfoForm ---------- */
function PropertyInfoForm({ initial, onClose, onSaved, propertyList }) {
  const isEdit = !!initial;

  // Basic fields
  const [branchCode, setBranchCode] = useState(initial?.branchCode || "");
  const [map, setMap] = useState(initial?.map || "");
  const [facebook, setFacebook] = useState(initial?.facebook || "");
  const [linkedin, setLinkedin] = useState(initial?.linkedin || "");
  const [twitter, setTwitter] = useState(initial?.twitter || "");
  const [youtube, setYoutube] = useState(initial?.youtube || "");
  const [instagram, setInstagram] = useState(initial?.instagram || "");
  const [appStoreLink, setAppStoreLink] = useState(initial?.appStoreLink || "");
  const [termsConditionLink, setTermsConditionLink] = useState(initial?.termsConditionLink || "");
  const [privacyPolicyLink, setPrivacyPolicyLink] = useState(initial?.privacyPolicyLink || "");
  const [headingTermsPayment, setHeadingTermsPayment] = useState(initial?.headingTermsPayment || "");
  const [headingDebitCredit, setHeadingDebitCredit] = useState(initial?.headingDebitCredit || "");

  // Rich text fields
  const [termsDebitCredit, setTermsDebitCredit] = useState(initial?.termsDebitCredit || "");
  const [information, setInformation] = useState(initial?.information || "");
  const [termsConditions, setTermsConditions] = useState(initial?.termsConditions || "");

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!branchCode.trim()) {
      setErr("Branch is required.");
      return;
    }

    const payload = {
      branchCode: branchCode.trim(),
      map: map.trim(),
      facebook: facebook.trim(),
      linkedin: linkedin.trim(),
      twitter: twitter.trim(),
      youtube: youtube.trim(),
      instagram: instagram.trim(),
      appStoreLink: appStoreLink.trim(),
      termsConditionLink: termsConditionLink.trim(),
      privacyPolicyLink: privacyPolicyLink.trim(),
      headingTermsPayment: headingTermsPayment.trim(),
      headingDebitCredit: headingDebitCredit.trim(),
      termsDebitCredit,
      information,
      termsConditions,
    };

    setSaving(true);
    try {
      let saved;
      if (isEdit) {
        const id = initial._id || initial.id;
        saved = await apiFetch(`/api/property-information/${id}`, {
          method: "PATCH",
          auth: true,
          body: JSON.stringify(payload),
        });
      } else {
        saved = await apiFetch("/api/property-information", {
          method: "POST",
          auth: true,
          body: JSON.stringify(payload),
        });
      }
      setOk("Saved.");
      onSaved(saved);
    } catch (e2) {
      setErr(e2?.message || "Failed to save property information.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit Property Information" : "Add Property Information"} onClose={onClose} large>
      {err && <Banner type="err">{err}</Banner>}
      {ok && <Banner type="ok">{ok}</Banner>}
      
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        {/* Row 1: Branch and Map */}
        <Row cols={2}>
          <Field label="Branch" required>
            <select
              className="res-select"
              value={branchCode}
              onChange={e => setBranchCode(e.target.value)}
              required
            >
              <option value="">Select Property</option>
              {propertyList.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Map">
            <input
              className="input"
              value={map}
              onChange={e => setMap(e.target.value)}
              placeholder="Google Maps embed URL"
            />
          </Field>
        </Row>

        {/* Row 2: Social Media Links */}
        <Row cols={2}>
          <Field label="Facebook">
            <input
              className="input"
              value={facebook}
              onChange={e => setFacebook(e.target.value)}
              placeholder="Facebook URL"
            />
          </Field>
          <Field label="LinkedIn">
            <input
              className="input"
              value={linkedin}
              onChange={e => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
            />
          </Field>
        </Row>

        <Row cols={2}>
          <Field label="Twitter">
            <input
              className="input"
              value={twitter}
              onChange={e => setTwitter(e.target.value)}
              placeholder="Twitter URL"
            />
          </Field>
          <Field label="YouTube">
            <input
              className="input"
              value={youtube}
              onChange={e => setYoutube(e.target.value)}
              placeholder="YouTube URL"
            />
          </Field>
        </Row>

        <Row cols={2}>
          <Field label="Instagram">
            <input
              className="input"
              value={instagram}
              onChange={e => setInstagram(e.target.value)}
              placeholder="Instagram URL"
            />
          </Field>
          <Field label="AppStore Link">
            <input
              className="input"
              value={appStoreLink}
              onChange={e => setAppStoreLink(e.target.value)}
              placeholder="App Store URL"
            />
          </Field>
        </Row>

        {/* Row 3: Policy Links */}
        <Row cols={2}>
          <Field label="Privacy Policy Link">
            <input
              className="input"
              value={privacyPolicyLink}
              onChange={e => setPrivacyPolicyLink(e.target.value)}
              placeholder="Privacy Policy URL"
            />
          </Field>
          <Field label="Terms & Condition Link">
            <input
              className="input"
              value={termsConditionLink}
              onChange={e => setTermsConditionLink(e.target.value)}
              placeholder="Terms & Conditions URL"
            />
          </Field>
        </Row>

        {/* Row 4: Headings */}
        <Row cols={2}>
          <Field label="Heading Terms & Cond.(payment)">
            <input
              className="input"
              value={headingTermsPayment}
              onChange={e => setHeadingTermsPayment(e.target.value)}
              placeholder="Payment Terms Heading"
            />
          </Field>
          <Field label="Heading Terms Of Debit and Credit">
            <input
              className="input"
              value={headingDebitCredit}
              onChange={e => setHeadingDebitCredit(e.target.value)}
              placeholder="Debit/Credit Terms Heading"
            />
          </Field>
        </Row>

        {/* Text Areas for Content */}
        <Field label="Terms Of Debit and Credit(payment gateway)">
          <textarea
            className="input"
            value={termsDebitCredit}
            onChange={e => setTermsDebitCredit(e.target.value)}
            rows={8}
            placeholder="Enter terms of debit and credit..."
            style={{ resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>

        <Field label="Information">
          <textarea
            className="input"
            value={information}
            onChange={e => setInformation(e.target.value)}
            rows={8}
            placeholder="Enter information..."
            style={{ resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>

        <Field label="Terms and Conditions(payment gateway)">
          <textarea
            className="input"
            value={termsConditions}
            onChange={e => setTermsConditions(e.target.value)}
            rows={8}
            placeholder="Enter terms and conditions..."
            style={{ resize: "vertical", fontFamily: "inherit" }}
          />
        </Field>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
          <button type="submit" className="btn" disabled={saving} style={{ background: "#7c3aed", color: "#fff" }}>
            {saving ? "SAVING…" : "SAVE"}
          </button>
          <button type="button" className="btn" onClick={onClose} style={{ background: "#dc2626", color: "#fff" }}>
            CANCEL
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------- Helpers ---------- */
function Row({ children, cols = 2 }) {
  return <div style={{ display: "grid", gap: 12, gridTemplateColumns: `repeat(${cols}, 1fr)` }}>{children}</div>;
}

function Field({ label, required, children }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span className="label" style={{ fontWeight: 700 }}>
        {label} {required && <span style={{ color: "#b91c1c" }}>*</span>}
      </span>
      {children}
    </label>
  );
}

function Banner({ type = "ok", children }) {
  const style = type === "err"
    ? { background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }
    : { background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" };
  return <div style={{ ...style, padding: "8px 10px", borderRadius: 10, fontWeight: 700, marginBottom: 10 }}>{children}</div>;
}

function Modal({ title, onClose, children, large = false }) {
  return (
    <div style={backdropStyle}>
      <div style={{ ...modalStyle, width: large ? "min(1200px, calc(100% - 24px))" : modalStyle.width }}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={xStyle}>×</button>
        </div>
        <div style={{ padding: 16, maxHeight: "80vh", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ title, message, confirmText = "OK", onConfirm, onClose }) {
  const [busy, setBusy] = useState(false);
  return (
    <Modal title={title} onClose={onClose}>
      <p style={{ marginTop: 0 }}>{message}</p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button className="btn" type="button" onClick={onClose} style={{ background: "#6b7280", color: "#fff" }}>
          Cancel
        </button>
        <button
          className="btn"
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await onConfirm?.();
              onClose();
            } finally {
              setBusy(false);
            }
          }}
          style={{ background: "#dc2626", color: "#fff" }}
        >
          {busy ? "Working…" : confirmText}
        </button>
      </div>
    </Modal>
  );
}

const btnSm = { padding: ".3rem .5rem", marginRight: 4, fontWeight: 700 };
const backdropStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "grid", placeItems: "center", zIndex: 1000 };
const modalStyle = { width: "min(900px, calc(100% - 24px))", background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.22)", overflow: "hidden" };
const headerStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid #e5e7eb", background: "#fff" };
const xStyle = { border: "1px solid #e5e-7eb", background: "#fff", color: "#111827", borderRadius: 10, width: 36, height: 36, cursor: "pointer" };