import {
  getServices,
  getGallery,
} from "../services/api";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "/api";

function LoginForm({ onLogin, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      await onLogin(username, password);
    } catch (error) {
      setErr("Invalid credentials");
    }
  };

  return (
    <Container className="py-12">
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-16 bg-white p-6 rounded shadow flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2 text-primary">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border rounded px-3 py-2"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        autoFocus
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded px-3 py-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {err && <div className="text-red-600 text-sm">{err}</div>}
    </form>
    </Container>
  );
}

function ServiceModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || { title: "", slug: "", description: "", specs: [""], price: "", images: [] }
  );

  useEffect(() => {
    setForm(initial || { title: "", slug: "", description: "", specs: [""], price: "", images: [] });
  }, [initial, open]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSpecChange = (i, val) => {
    setForm(f => {
      const specs = [...f.specs];
      specs[i] = val;
      return { ...f, specs };
    });
  };

  const addSpec = () => setForm(f => ({ ...f, specs: [...f.specs, ""] }));
  const removeSpec = (i) => setForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4 text-primary">{initial ? "Edit" : "Add"} Service</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-3 py-2" required />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="border rounded px-3 py-2" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-3 py-2" required />
          <div>
            <div className="font-semibold mb-1">Specs</div>
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2 mb-1">
                <input
                  value={spec}
                  onChange={e => handleSpecChange(i, e.target.value)}
                  className="border rounded px-3 py-1 flex-1"
                  placeholder={`Spec ${i + 1}`}
                />
                <button type="button" onClick={() => removeSpec(i)} className="text-red-600 font-bold">&times;</button>
              </div>
            ))}
            <button type="button" onClick={addSpec} className="text-primary text-sm mt-1">+ Add Spec</button>
          </div>
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded px-3 py-2" type="number" />
          <input name="images" value={form.images.join(",")} onChange={e => setForm(f => ({ ...f, images: e.target.value.split(",") }))} placeholder="Image URLs (comma separated)" className="border rounded px-3 py-2" />
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

function GalleryModal({ open, onClose, onSave, initial }) {
  const [url, setUrl] = useState(initial?.url || "");
  const [caption, setCaption] = useState(initial?.caption || "");
  const [tags, setTags] = useState(initial?.tags?.join(",") || "");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setUrl(initial?.url || "");
    setCaption(initial?.caption || "");
    setTags(initial?.tags?.join(",") || "");
    setFile(null);
  }, [initial, open]);

  // Dummy upload handler (replace with real cloud upload if needed)
  const handleFileUpload = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      // In real app, upload to S3/Cloudinary and get URL
      setUrl(URL.createObjectURL(f));
      setUploading(false);
    }, 1000);
    setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ url, caption, tags: tags.split(",").map(t => t.trim()).filter(Boolean) });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-4 text-primary">{initial ? "Edit" : "Add"} Gallery Image</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Image URL" className="border rounded px-3 py-2" required />
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={handleFileUpload} className="border rounded px-3 py-2" />
            {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
          </div>
          <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption" className="border rounded px-3 py-2" />
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="border rounded px-3 py-2" />
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition" type="submit">
            Save
          </button>
        </form>
        {url && (
          <img src={url} alt="Preview" className="mt-4 max-h-40 rounded shadow" />
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("admin_jwt"));
  const [loading, setLoading] = useState(false);

  // Services
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState({ open: false, initial: null });

  // Gallery
  const [gallery, setGallery] = useState([]);
  const [galleryModal, setGalleryModal] = useState({ open: false, initial: null });

  // Fetch data
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
      return;
    }
    getServices().then(setServices);
    getGallery(1, 100).then(res => setGallery(res.images || []));
  }, [loggedIn, navigate]);

  // Auth
  const handleLogin = async (username, password) => {
    setLoading(true);
    await adminAuth(username, password);
    setLoggedIn(true);
    setLoading(false);
  };

  // Service CRUD
  const handleServiceSave = async (data) => {
    if (data._id) {
      await axios.put(`${API_URL}/admin/services/${data._id}`, data);
    } else {
      await axios.post(`${API_URL}/admin/services`, data);
    }
    setServiceModal({ open: false, initial: null });
    getServices().then(setServices);
  };
  const handleServiceDelete = async (id) => {
    if (window.confirm("Delete this service?")) {
      await axios.delete(`${API_URL}/admin/services/${id}`);
      getServices().then(setServices);
    }
  };

  // Gallery CRUD
  const handleGallerySave = async (data) => {
    if (data._id) {
      await axios.put(`${API_URL}/admin/gallery/${data._id}`, data);
    } else {
      await axios.post(`${API_URL}/admin/gallery`, data);
    }
    setGalleryModal({ open: false, initial: null });
    getGallery(1, 100).then(res => setGallery(res.images || []));
  };
  const handleGalleryDelete = async (id) => {
    if (window.confirm("Delete this image?")) {
      await axios.delete(`${API_URL}/admin/gallery/${id}`);
      getGallery(1, 100).then(res => setGallery(res.images || []));
    }
  };

  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} loading={loading} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      {/* Services Table */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Services</h2>
          <button
            className="bg-primary text-white px-3 py-1 rounded font-semibold"
            onClick={() => setServiceModal({ open: true, initial: null })}
          >
            + Add Service
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Slug</th>
                <th className="p-2 border-b">Specs</th>
                <th className="p-2 border-b">Price</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s._id || s.slug}>
                  <td className="p-2 border-b">{s.title}</td>
                  <td className="p-2 border-b">{s.slug}</td>
                  <td className="p-2 border-b">{s.specs?.join(", ")}</td>
                  <td className="p-2 border-b">{s.price ? `₹${s.price}` : "-"}</td>
                  <td className="p-2 border-b">
                    <button className="text-blue-600 mr-2" onClick={() => setServiceModal({ open: true, initial: s })}>Edit</button>
                    <button className="text-red-600" onClick={() => handleServiceDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-4">No services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Gallery Table */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Gallery</h2>
          <button
            className="bg-primary text-white px-3 py-1 rounded font-semibold"
            onClick={() => setGalleryModal({ open: true, initial: null })}
          >
            + Add Image
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border-b">Image</th>
                <th className="p-2 border-b">Caption</th>
                <th className="p-2 border-b">Tags</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {gallery.map(img => (
                <tr key={img._id || img.url}>
                  <td className="p-2 border-b">
                    <img src={img.url} alt={img.caption} className="h-12 w-16 object-cover rounded" />
                  </td>
                  <td className="p-2 border-b">{img.caption}</td>
                  <td className="p-2 border-b">{img.tags?.join(", ")}</td>
                  <td className="p-2 border-b">
                    <button className="text-blue-600 mr-2" onClick={() => setGalleryModal({ open: true, initial: img })}>Edit</button>
                    <button className="text-red-600" onClick={() => handleGalleryDelete(img._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {gallery.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">No images found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modals */}
      <ServiceModal
        open={serviceModal.open}
        onClose={() => setServiceModal({ open: false, initial: null })}
        onSave={handleServiceSave}
        initial={serviceModal.initial}
      />
      <GalleryModal
        open={galleryModal.open}
        onClose={() => setGalleryModal({ open: false, initial: null })}
        onSave={handleGallerySave}
        initial={galleryModal.initial}
      />
    </div>
  );
}