// src/pages/Backoffice/masters/Pincode.js
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../../lib/api";
import { BackofficeSidebar } from "../../../components/sidebar/backofficesidebar";
import "../../../components/sidebar/Sidebar.css";
import "../../../assets/css/commanPage.css";

const PAGE_SIZE = 10;

// Comprehensive location data
const LOCATION_DATA = {
  "India": {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Panvel", "Navi Mumbai"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Dharwad", "Tumkur", "Bellary"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode"],
    "Delhi": ["New Delhi", "Delhi", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Kharagpur", "Bardhaman"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Kannur"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
    "Haryana": ["Gurgaon", "Faridabad", "Rohtak", "Hisar", "Panipat", "Karnal", "Sonipat", "Ambala"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif", "Arrah"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Nainital"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
    "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tezu"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    "Puducherry": ["Puducherry", "Karaikal", "Yanam", "Mahe"]
  },
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Oakland"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington"],
    "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Tallahassee"],
    "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield"],
    "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"],
    "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
    "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Macon"],
    "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing"],
    "Washington": ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Olympia"]
  },
  "United Kingdom": {
    "England": ["London", "Birmingham", "Manchester", "Leeds", "Liverpool", "Newcastle", "Sheffield", "Bristol", "Oxford", "Cambridge"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness", "Perth"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Bangor", "Wrexham"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Armagh"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham"],
    "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke"],
    "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Victoria"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
    "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson"],
    "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Maitland"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
    "Queensland": ["Brisbane", "Gold Coast", "Townsville", "Cairns", "Toowoomba"],
    "Western Australia": ["Perth", "Fremantle", "Bunbury", "Albany", "Geraldton"],
    "South Australia": ["Adelaide", "Mount Gambier", "Whyalla", "Murray Bridge"],
    "Tasmania": ["Hobart", "Launceston", "Devonport", "Burnie"]
  },
  "Germany": {
    "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Ingolstadt"],
    "North Rhine-Westphalia": ["Cologne", "Dusseldorf", "Dortmund", "Essen", "Duisburg"],
    "Baden-Württemberg": ["Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg"],
    "Berlin": ["Berlin"],
    "Hamburg": ["Hamburg"],
    "Hesse": ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"]
  },
  "France": {
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt", "Saint-Denis"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne", "Annecy"],
    "Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers", "La Rochelle"],
    "Occitanie": ["Toulouse", "Montpellier", "Nîmes", "Perpignan"],
    "Hauts-de-France": ["Lille", "Amiens", "Roubaix", "Tourcoing"]
  },
  "Japan": {
    "Tokyo": ["Tokyo", "Hachioji", "Machida", "Fuchu", "Chofu"],
    "Osaka": ["Osaka", "Sakai", "Higashiosaka", "Toyonaka"],
    "Kanagawa": ["Yokohama", "Kawasaki", "Sagamihara", "Fujisawa"],
    "Aichi": ["Nagoya", "Toyota", "Okazaki", "Ichinomiya"],
    "Hokkaido": ["Sapporo", "Asahikawa", "Hakodate", "Kushiro"],
    "Kyoto": ["Kyoto", "Uji", "Kameoka", "Joyo"]
  },
  "China": {
    "Beijing": ["Beijing"],
    "Shanghai": ["Shanghai"],
    "Guangdong": ["Guangzhou", "Shenzhen", "Dongguan", "Foshan", "Zhuhai"],
    "Zhejiang": ["Hangzhou", "Ningbo", "Wenzhou", "Shaoxing"],
    "Jiangsu": ["Nanjing", "Suzhou", "Wuxi", "Changzhou"],
    "Sichuan": ["Chengdu", "Mianyang", "Deyang", "Nanchong"]
  },
  "Singapore": {
    "Singapore": ["Singapore", "Jurong", "Woodlands", "Tampines", "Yishun"]
  },
  "United Arab Emirates": {
    "Dubai": ["Dubai"],
    "Abu Dhabi": ["Abu Dhabi"],
    "Sharjah": ["Sharjah"],
    "Ajman": ["Ajman"],
    "Ras Al Khaimah": ["Ras Al Khaimah"]
  }
};

export default function Pincode() {
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
        const res = await apiFetch(`/api/pincodes?${params.toString()}`, { auth: true });
        const data = res?.data || res?.items || res || [];
        const count = res?.total ?? data.length ?? 0;
        if (!ignore) {
          setRows(Array.isArray(data) ? data : []);
          setTotal(Number(count) || 0);
        }
      } catch (e) {
        if (!ignore) {
          setErr(e?.message || "Failed to load pincodes.");
          setRows([]); setTotal(0);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [q, page, limit, filterProperty]);

  // Client fallback search
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      [r.branchCode, r.pinCode, r.city, r.state, r.country, r.area]
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
          <h2 style={{ margin: 0 }}>PinCode</h2>
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
              placeholder="Search (property / city / pincode / area / state / country)"
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
            <button className="btn" onClick={openCreate}>+ Add PinCode</button>
          </div>
        </div>

        {/* Table */}
        <div className="panel">
          <div className="panel-h">
            <span>PinCode List</span>
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
                    <th>Property</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Area</th>
                    <th>PinCode</th>
                    <th>CashOnDelivery</th>
                    <th>Delivery Charge</th>
                    <th>Delivery Min Amt</th>
                    <th>Order Min Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {(!dataToRender || dataToRender.length === 0) && !loading && (
                    <tr className="no-rows"><td colSpan={11}>No pincodes found</td></tr>
                  )}

                  {dataToRender?.map(r => {
                    const id = r._id || r.id;
                    return (
                      <tr key={id}>
                        <td>
                          <button className="btn" style={btnSm} onClick={() => openEdit(r)}>??</button>
                          <button className="btn" style={btnSm} onClick={() => askDelete(r)}>???</button>
                        </td>
                        <td>{r.branchCode || "—"}</td>
                        <td>{r.country}</td>
                        <td>{r.state}</td>
                        <td>{r.city}</td>
                        <td>{r.area || "—"}</td>
                        <td>{r.pinCode}</td>
                        <td>{r.codAvailable ? "Yes" : "No"}</td>
                        <td>{r.deliveryCharge}</td>
                        <td>{r.deliveryMinAmount}</td>
                        <td>{r.orderMinAmount}</td>
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
        <PincodeForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={afterSave}
          propertyList={propertyList}
          locationData={LOCATION_DATA}
        />
      )}
      {showDelete && toDelete && (
        <ConfirmModal
          title="Delete Pincode"
          message={`Delete pincode ${toDelete.pinCode} (${toDelete.city}, ${toDelete.state})?`}
          confirmText="DELETE"
          onConfirm={async () => {
            const id = toDelete._id || toDelete.id;
            await apiFetch(`/api/pincodes/${id}`, { method: "DELETE", auth: true });
            afterDelete(id);
          }}
          onClose={() => { setShowDelete(false); setToDelete(null); }}
        />
      )}
    </div>
  );
}

/* ---------- PincodeForm ---------- */
function PincodeForm({ initial, onClose, onSaved, propertyList, locationData }) {
  const isEdit = !!initial;
  const [propertyCode, setPropertyCode] = useState(initial?.branchCode || "");
  const [country, setCountry] = useState(initial?.country || "");
  const [state, setState] = useState(initial?.state || "");
  const [city, setCity] = useState(initial?.city || "");
  const [area, setArea] = useState(initial?.area || "");
  const [pinCode, setPinCode] = useState(initial?.pinCode || "");
  const [codAvailable, setCodAvailable] = useState(initial?.codAvailable ?? true);
  const [deliveryCharge, setDeliveryCharge] = useState(initial?.deliveryCharge || "0");
  const [deliveryMinAmount, setDeliveryMinAmount] = useState(initial?.deliveryMinAmount || "0");
  const [orderMinAmount, setOrderMinAmount] = useState(initial?.orderMinAmount || "0");

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // Get available countries
  const countries = Object.keys(locationData).sort();

  // Get available states based on selected country
  const states = useMemo(() => {
    if (!country || !locationData[country]) return [];
    return Object.keys(locationData[country]).sort();
  }, [country, locationData]);

  // Get available cities based on selected state
  const cities = useMemo(() => {
    if (!country || !state || !locationData[country] || !locationData[country][state]) return [];
    return locationData[country][state].sort();
  }, [country, state, locationData]);

  // Reset state and city when country changes
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setState("");
    setCity("");
  };

  // Reset city when state changes
  const handleStateChange = (newState) => {
    setState(newState);
    setCity("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!propertyCode.trim()) {
      setErr("Property is required.");
      return;
    }
    if (!country.trim()) {
      setErr("Country is required.");
      return;
    }
    if (!state.trim()) {
      setErr("State is required.");
      return;
    }
    if (!city.trim()) {
      setErr("City is required.");
      return;
    }
    if (!pinCode.trim()) {
      setErr("Pin Code is required.");
      return;
    }

    const payload = {
      branchCode: propertyCode.trim(),
      country: country.trim(),
      state: state.trim(),
      city: city.trim(),
      area: area.trim(),
      pinCode: pinCode.trim(),
      codAvailable,
      deliveryCharge: Number(deliveryCharge),
      deliveryMinAmount: Number(deliveryMinAmount),
      orderMinAmount: Number(orderMinAmount),
    };
    setSaving(true);
    try {
      let saved;
      if (isEdit) {
        const id = initial._id || initial.id;
        saved = await apiFetch(`/api/pincodes/${id}`, {
          method: "PATCH",
          auth: true,
          body: JSON.stringify(payload),
        });
      } else {
        saved = await apiFetch("/api/pincodes", {
          method: "POST",
          auth: true,
          body: JSON.stringify(payload),
        });
      }
      setOk("Saved.");
      onSaved(saved);
    } catch (e2) {
      setErr(e2?.message || "Failed to save pincode.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={isEdit ? "Edit Pincode" : "Create Pincode"} onClose={onClose}>
      {err && <Banner type="err">{err}</Banner>}
      {ok && <Banner type="ok">{ok}</Banner>}
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <Row cols={2}>
          <Field label="Property" required>
            <select
              className="res-select"
              value={propertyCode}
              onChange={e => setPropertyCode(e.target.value)}
              required
            >
              <option value="">Select Property</option>
              {propertyList.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
            </select>
          </Field>
          <Field label="Country" required>
            <select
              className="res-select"
              value={country}
              onChange={e => handleCountryChange(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </Row>
        <Row cols={2}>
          <Field label="State" required>
            <select
              className="res-select"
              value={state}
              onChange={e => handleStateChange(e.target.value)}
              required
              disabled={!country}
            >
              <option value="">
                {!country ? "Select Country First" : "Select State"}
              </option>
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="City" required>
            <select
              className="res-select"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              disabled={!state}
            >
              <option value="">
                {!state ? "Select State First" : "Select City"}
              </option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </Row>
        <Row cols={2}>
          <Field label="Area">
            <input
              className="input"
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder="Optional area/locality"
            />
          </Field>
          <Field label="Pin Code" required>
            <input
              className="input"
              value={pinCode}
              onChange={e => setPinCode(e.target.value)}
              required
              placeholder="Enter pincode/zipcode"
            />
          </Field>
        </Row>
        <Row cols={2}>
          <Field label="Cash On Delivery">
            <select
              className="res-select"
              value={codAvailable ? "Yes" : "No"}
              onChange={e => setCodAvailable(e.target.value === "Yes")}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Field>
          <Field label="Delivery Charge">
            <input
              type="number"
              className="input"
              value={deliveryCharge}
              onChange={e => setDeliveryCharge(e.target.value)}
              min="0"
              step="0.01"
            />
          </Field>
        </Row>
        <Row cols={2}>
          <Field label="Delivery Min Amount">
            <input
              type="number"
              className="input"
              value={deliveryMinAmount}
              onChange={e => setDeliveryMinAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </Field>
          <Field label="Order Min Amount">
            <input
              type="number"
              className="input"
              value={orderMinAmount}
              onChange={e => setOrderMinAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </Field>
        </Row>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
          <button type="submit" className="btn" disabled={saving} style={{ background: "#7c3aed", color: "#fff" }}>
            {saving ? "SAVING…" : "SAVE"}
          </button>
          <button type="button" className="btn" onClick={onClose} style={{ background: "#dc2626", color: "#fff" }}>
            RESET
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------- Helpers ---------- */
function Row({ children, cols = 3 }) {
  return <div style={{ display: "grid", gap: 12, gridTemplateColumns: `repeat(${cols}, minmax(160px, 1fr))` }}>{children}</div>;
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
function Modal({ title, onClose, children }) {
  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" style={xStyle}>×</button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
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
const xStyle = { border: "1px solid #e5e7eb", background: "#fff", color: "#111827", borderRadius: 10, width: 36, height: 36, cursor: "pointer" };