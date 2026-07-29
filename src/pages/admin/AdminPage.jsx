import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Edit2, X, Check,
  Loader, ChevronDown, Users, Hammer,
  BookOpen, AlertCircle
} from "lucide-react";
import api, { getApiError } from "../../services/api";
import { useAuth } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "workshops", label: "Workshops",  Icon: Hammer },
  { id: "artisans",  label: "Artisans",   Icon: Users },
  { id: "journals",  label: "Journals",   Icon: BookOpen },
];

//  Generic confirm delete modal 
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel}/>
      <div className="relative bg-white border border-[#E0D8C8] p-6 max-w-sm w-full space-y-4" style={{ borderRadius: 6 }}>
        <p className="font-body text-sm text-ink">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 border border-[#D7CCB3] font-body text-sm text-ink-muted hover:border-primary transition-colors"
            style={{ borderRadius: 4 }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 text-white font-body text-sm font-bold hover:bg-red-700 transition-colors"
            style={{ borderRadius: 4 }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

//  Workshop form modal 
function WorkshopModal({ workshop, onClose, onSave }) {
  const [form, setForm] = useState(
    workshop || {
      title: "", craft: "", location: "", district: "",
      duration: 2, capacity: 8, price: 2500,
      description: "", isActive: true,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title || !form.craft || !form.location) {
      setError("Title, craft, and location are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (workshop?._id) {
        const res = await api.patch(`/workshops/${workshop._id}`, form);
        onSave(res.data.data, "update");
      } else {
        const res = await api.post("/workshops", form);
        onSave(res.data.data, "create");
      }
      onClose();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-[#E0D8C8] w-full max-w-lg my-8 overflow-hidden"
        style={{ borderRadius: 6 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0D8C8]" style={{ background: "#F5F0E8" }}>
          <h3 className="font-display font-bold text-lg text-ink">
            {workshop?._id ? "Edit Workshop" : "New Workshop"}
          </h3>
          <button onClick={onClose} className="text-ink-muted hover:text-ink transition-colors">
            <X size={18}/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Title",       key: "title",       type: "text" },
            { label: "Craft Type",  key: "craft",       type: "text" },
            { label: "Location",    key: "location",    type: "text" },
            { label: "District",    key: "district",    type: "text" },
          ].map(({ label, key, type }) => (
            <div key={key} className="space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                {label}
              </label>
              <input
                type={type}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper"
                style={{ borderRadius: 4 }}
              />
            </div>
          ))}

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Duration (hrs)", key: "duration",  type: "number" },
              { label: "Capacity",       key: "capacity",  type: "number" },
              { label: "Price (NPR)",    key: "price",     type: "number" },
            ].map(({ label, key, type }) => (
              <div key={key} className="space-y-1">
                <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => set(key, Number(e.target.value))}
                  className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper"
                  style={{ borderRadius: 4 }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={e => set("description", e.target.value)}
              className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper resize-none"
              style={{ borderRadius: 4 }}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e => set("isActive", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="font-body text-sm text-ink">Active (visible to users)</span>
          </label>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200" style={{ borderRadius: 4 }}>
              <AlertCircle size={13} className="text-red-500 flex-shrink-0"/>
              <p className="font-body text-xs text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#E0D8C8] flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-[#D7CCB3] font-body text-sm text-ink-muted hover:border-primary transition-colors"
            style={{ borderRadius: 4 }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 py-2.5 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ borderRadius: 4 }}>
            {loading ? <Loader size={14} className="animate-spin"/> : <Check size={14}/>}
            {workshop?._id ? "Save Changes" : "Create Workshop"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Artisan form modal 
function ArtisanModal({ artisan, onClose, onSave }) {
  const [form, setForm] = useState(
    artisan || {
      craft: "", location: "", district: "",
      bio: "", experience: 10, isAvailable: true,
      specialties: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.craft || !form.location) {
      setError("Craft and location are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        specialties: typeof form.specialties === "string"
          ? form.specialties.split(",").map(s => s.trim()).filter(Boolean)
          : form.specialties,
      };
      if (artisan?._id) {
        const res = await api.patch(`/artisans/${artisan._id}`, payload);
        onSave(res.data.data, "update");
      } else {
        const res = await api.post("/artisans", payload);
        onSave(res.data.data, "create");
      }
      onClose();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white border border-[#E0D8C8] w-full max-w-lg my-8"
        style={{ borderRadius: 6 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0D8C8]" style={{ background: "#F5F0E8" }}>
          <h3 className="font-display font-bold text-lg text-ink">
            {artisan?._id ? "Edit Artisan" : "New Artisan"}
          </h3>
          <button onClick={onClose} className="text-ink-muted hover:text-ink transition-colors">
            <X size={18}/>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Craft",    key: "craft",    type: "text" },
            { label: "Location", key: "location", type: "text" },
            { label: "District", key: "district", type: "text" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
                {label}
              </label>
              <input
                type="text"
                value={form[key]}
                onChange={e => set(key, e.target.value)}
                className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper"
                style={{ borderRadius: 4 }}
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
              Experience (years)
            </label>
            <input
              type="number"
              value={form.experience}
              onChange={e => set("experience", Number(e.target.value))}
              className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper"
              style={{ borderRadius: 4 }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
              Specialties (comma separated)
            </label>
            <input
              type="text"
              value={Array.isArray(form.specialties) ? form.specialties.join(", ") : form.specialties}
              onChange={e => set("specialties", e.target.value)}
              placeholder="e.g. Woodcarving, Gilding, Restoration"
              className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper"
              style={{ borderRadius: 4 }}
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink-light block">
              Bio
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={e => set("bio", e.target.value)}
              className="w-full border border-[#D7CCB3] px-3 py-2.5 font-body text-sm text-ink focus:outline-none focus:border-copper resize-none"
              style={{ borderRadius: 4 }}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={e => set("isAvailable", e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="font-body text-sm text-ink">Available for bookings</span>
          </label>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200" style={{ borderRadius: 4 }}>
              <AlertCircle size={13} className="text-red-500 flex-shrink-0"/>
              <p className="font-body text-xs text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#E0D8C8] flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-[#D7CCB3] font-body text-sm text-ink-muted hover:border-primary transition-colors"
            style={{ borderRadius: 4 }}>
            Cancel
          </button>
          <button onClick={handleSave} disabled={loading}
            className="flex-1 py-2.5 bg-primary text-white font-display font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ borderRadius: 4 }}>
            {loading ? <Loader size={14} className="animate-spin"/> : <Check size={14}/>}
            {artisan?._id ? "Save Changes" : "Create Artisan"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Workshops tab ──
function WorkshopsTab() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(null); // null | "create" | workshop object
  const [confirm, setConfirm] = useState(null); // id to delete

  useEffect(() => {
    api.get("/workshops")
      .then(r => setItems(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (item, type) => {
    if (type === "create") setItems(p => [item, ...p]);
    else setItems(p => p.map(i => i._id === item._id ? item : i));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/workshops/${id}`);
      setItems(p => p.filter(i => i._id !== id));
    } catch {}
    setConfirm(null);
  };

  return (
    <>
      {modal !== null && (
        <WorkshopModal
          workshop={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {confirm && (
        <ConfirmModal
          message="Delete this workshop? This cannot be undone."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex items-center justify-between mb-5">
        <p className="font-body text-sm text-ink-muted">
          {items.length} workshop{items.length !== 1 ? "s" : ""} total
        </p>
        <button
          onClick={() => setModal("create")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
          style={{ borderRadius: 4 }}
        >
          <Plus size={14}/> New Workshop
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size={20} className="animate-spin text-copper"/>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(w => (
            <div
              key={w._id}
              className="flex items-center gap-4 bg-white border border-[#E0D8C8] px-5 py-4"
              style={{ borderRadius: 4 }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold text-sm text-ink truncate">{w.title}</p>
                  <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider ${
                    w.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`} style={{ borderRadius: 3 }}>
                    {w.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-muted mt-0.5">
                  {w.craft} · {w.location}, {w.district} · NPR {w.price?.toLocaleString()} · {w.duration}h · Cap: {w.capacity}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setModal(w)}
                  className="w-8 h-8 border border-[#D7CCB3] flex items-center justify-center text-ink-muted hover:border-primary hover:text-primary transition-colors"
                  style={{ borderRadius: 4 }}
                >
                  <Edit2 size={13}/>
                </button>
                <button
                  onClick={() => setConfirm(w._id)}
                  className="w-8 h-8 border border-[#D7CCB3] flex items-center justify-center text-ink-muted hover:border-red-400 hover:text-red-500 transition-colors"
                  style={{ borderRadius: 4 }}
                >
                  <Trash2 size={13}/>
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-sm text-ink-muted">No workshops yet.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── Artisans tab ──
function ArtisansTab() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal,   setModal]   = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    api.get("/artisans")
      .then(r => setItems(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (item, type) => {
    if (type === "create") setItems(p => [item, ...p]);
    else setItems(p => p.map(i => i._id === item._id ? item : i));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/artisans/${id}`);
      setItems(p => p.filter(i => i._id !== id));
    } catch {}
    setConfirm(null);
  };

  return (
    <>
      {modal !== null && (
        <ArtisanModal
          artisan={modal === "create" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {confirm && (
        <ConfirmModal
          message="Delete this artisan? This cannot be undone."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex items-center justify-between mb-5">
        <p className="font-body text-sm text-ink-muted">
          {items.length} artisan{items.length !== 1 ? "s" : ""} total
        </p>
        <button
          onClick={() => setModal("create")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-mono text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
          style={{ borderRadius: 4 }}
        >
          <Plus size={14}/> New Artisan
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size={20} className="animate-spin text-copper"/>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(a => (
            <div
              key={a._id}
              className="flex items-center gap-4 bg-white border border-[#E0D8C8] px-5 py-4"
              style={{ borderRadius: 4 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center flex-shrink-0 text-white font-display font-bold text-sm"
                style={{ borderRadius: 4 }}>
                {(a.craft || "A")[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display font-bold text-sm text-ink truncate">
                    {a.userId?.name || a.craft}
                  </p>
                  <span className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider ${
                    a.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`} style={{ borderRadius: 3 }}>
                    {a.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <p className="font-body text-xs text-ink-muted mt-0.5">
                  {a.craft} · {a.location}, {a.district} · {a.experience}yr exp
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setModal(a)}
                  className="w-8 h-8 border border-[#D7CCB3] flex items-center justify-center text-ink-muted hover:border-primary hover:text-primary transition-colors"
                  style={{ borderRadius: 4 }}>
                  <Edit2 size={13}/>
                </button>
                <button onClick={() => setConfirm(a._id)}
                  className="w-8 h-8 border border-[#D7CCB3] flex items-center justify-center text-ink-muted hover:border-red-400 hover:text-red-500 transition-colors"
                  style={{ borderRadius: 4 }}>
                  <Trash2 size={13}/>
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-sm text-ink-muted">No artisans yet.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── Journals tab (read + delete only) ──
function JournalsTab() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    api.get("/journal")
      .then(r => setItems(r.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      setItems(p => p.filter(i => i._id !== id));
    } catch {}
    setConfirm(null);
  };

  return (
    <>
      {confirm && (
        <ConfirmModal
          message="Delete this journal entry? This cannot be undone."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="mb-5">
        <p className="font-body text-sm text-ink-muted">
          {items.length} journal {items.length !== 1 ? "entries" : "entry"} total
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size={20} className="animate-spin text-copper"/>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(j => (
            <div
              key={j._id}
              className="flex items-center gap-4 bg-white border border-[#E0D8C8] px-5 py-4"
              style={{ borderRadius: 4 }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-ink truncate">{j.title}</p>
                <p className="font-body text-xs text-ink-muted mt-0.5">
                  {j.mood && <span className="capitalize">{j.mood} · </span>}
                  {j.location && <span>{j.location} · </span>}
                  {new Date(j.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
              <button onClick={() => setConfirm(j._id)}
                className="w-8 h-8 border border-[#D7CCB3] flex items-center justify-center text-ink-muted hover:border-red-400 hover:text-red-500 transition-colors flex-shrink-0"
                style={{ borderRadius: 4 }}>
                <Trash2 size={13}/>
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-sm text-ink-muted">No journal entries yet.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── Main admin page ──
export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("workshops");

  // Redirect non-admins
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header */}
      <div className="border-b border-[#E8E2D8]" style={{ background: "#F5F0E8" }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
                Admin Panel
              </p>
              <h1 className="font-display font-bold text-3xl text-ink">KHOJ Admin</h1>
            </div>
            <p className="font-body text-sm text-ink-muted">
              Logged in as <span className="font-bold text-ink">{user?.name}</span>
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all border
                  ${tab === id
                    ? "bg-primary border-primary text-white"
                    : "border-[#D7CCB3] bg-white text-ink-muted hover:border-primary hover:text-primary"
                  }`}
                style={{ borderRadius: 4 }}
              >
                <Icon size={13} strokeWidth={1.5}/>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "workshops" && <WorkshopsTab />}
            {tab === "artisans"  && <ArtisansTab />}
            {tab === "journals"  && <JournalsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}