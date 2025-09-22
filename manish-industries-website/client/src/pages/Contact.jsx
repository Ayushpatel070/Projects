import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";

const PHONE = "+919898146433";
const ADDRESS = "Vihim Steel Compound, Nr. Sureliya Estate, Nr. Gita Park, Vastral Road, Amraiwadi, Ahmedabad-380026";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceRequested: "",
    message: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services") // point to backend
      .then(res => {
        setServices(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setServices([]));
  }, []);

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim() || !/^[0-9+\-\s]{8,}$/.test(form.phone)) return "Valid phone is required";
    if (!form.email.trim() || !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(form.email)) return "Valid email is required";
    if (!form.message.trim()) return "Message is required";
    return null;
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setToast({ type: "error", msg: error });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contact", form); // backend endpoint
      setToast({ type: "success", msg: "Thank you! Your message has been sent." });
      setForm({ name: "", phone: "", email: "", serviceRequested: "", message: "" });
    } catch {
      setToast({ type: "error", msg: "Failed to send. Please try again." });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-black font-poppins">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          className="bg-white rounded-lg shadow p-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          <label htmlFor="name" className="font-semibold">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone" className="font-semibold">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="border rounded px-3 py-2"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="email" className="font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="border rounded px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="serviceRequested" className="font-semibold">Service</label>
          <select
            id="serviceRequested"
            name="serviceRequested"
            className="border rounded px-3 py-2"
            value={form.serviceRequested}
            onChange={handleChange}
          >
            <option value="">Select a service (optional)</option>
            {services.map((s, i) => (
              <option key={i} value={s.title}>{s.title}</option>
            ))}
          </select>

          <label htmlFor="message" className="font-semibold">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="border rounded px-3 py-2"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {toast && (
            <div
              className={`mt-2 text-sm rounded px-3 py-2 ${
                toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
              role="alert"
            >
              {toast.msg}
            </div>
          )}
        </form>

        {/* Google Maps */}
        <div className="w-full h-80 rounded-lg overflow-hidden shadow">
          <iframe
            title="Manish Industries Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.5535404634543!2d72.63854787509115!3d23.003439379187284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87bfc5ef47cd%3A0x5820aead030747e9!2sMANISH%20Industries!5e0!3m2!1sen!2sin!4v1757711650194!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Container>
  );
}
// Note: Replace "http://localhost:5000/api/..." with your actual backend API endpoints.