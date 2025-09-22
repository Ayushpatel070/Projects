import { useState } from "react";
import Container from "../components/Container";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

// Import machine images
import miling from "../assets/miling.jpg";
import plano from "../assets/plano.jpg";
import bad from "../assets/bad-miling.jpg";

function ServiceCard({ service, onQuote }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-7 flex flex-col transition-transform duration-200 hover:scale-[1.03] hover:shadow-2xl group">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold tracking-wide text-primary dark:text-primary mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
      {service.specs && service.specs.length > 0 && (
        <ul className="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
          {service.specs.map((spec, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaCheckCircle className="text-primary dark:text-primary text-xs" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-col gap-3">
        <button
          className="w-full py-2 rounded-lg font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-red-700 dark:from-primary dark:to-red-800 shadow transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => onQuote(service)}
        >
          Request Quote
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Static services
  const services = [
    {
      title: "Milling Machine Jobwork",
      description:
        "Precision milling services for small to medium-size components with accuracy and surface finishing.",
      image: miling,
      specs: [
        "Custom machining for industrial parts",
        "Slotting, contouring, and finishing",
        "Automotive and fabrication applications",
      ],
    },
    {
      title: "Plano Miller Machine Jobwork (4 × 2 m)",
      description:
        "Heavy-duty machining for large structures and castings with high accuracy and reliability.",
      image: plano,
      specs: [
        "Capacity up to 4m × 2m workpieces",
        "Accurate surface milling for heavy parts",
        "Ideal for fabrication and machine building",
      ],
    },
    {
      title: "Bad-Milling Machine Jobwork",
      description:
        "Specialized bad-milling services for complex machining needs, repair works, and custom components.",
      image: bad,
      specs: [
        "Complex shape machining",
        "Edge preparation and finishing",
        "Supports one-off and production jobs",
      ],
    },
    {
      title: "General Machining & Jobwork",
      description:
        "We handle all types of machining jobwork under one roof, ensuring accuracy and timely delivery.",
      image: plano, // You can replace with another image if needed
      specs: [
        "One-off parts and batch production",
        "Tailored solutions as per drawings",
        "Reliable and timely completion",
      ],
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setForm({
      name: "",
      phone: "",
      email: "",
      message: `I am interested in "${service.title}". Please provide a quote.`,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can POST to /api/contact here
    closeModal();
    alert("Quote request submitted!");
  };

  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-10 text-black dark:text-white font-poppins text-center">
        Our Services
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, idx) => (
          <ServiceCard key={idx} service={service} onQuote={openModal} />
        ))}
      </div>

      {/* Quote Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
          <div
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 w-full max-w-md animate-[scaleIn_0.2s_ease]"
            style={{
              animationName: "scaleIn",
              animationDuration: "0.2s",
              animationTimingFunction: "ease",
            }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors text-gray-500 dark:text-gray-300 shadow focus:outline-none"
              onClick={closeModal}
              aria-label="Close"
              type="button"
            >
              <FaTimes className="text-lg" />
            </button>
            <h2 className="text-2xl font-bold tracking-wide mb-4 text-primary text-center">
              Request Quote
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows={3}
                className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg font-semibold tracking-wide text-white bg-gradient-to-r from-primary to-red-700 dark:from-primary dark:to-red-800 shadow transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Submit
              </button>
            </form>
          </div>
          {/* Keyframes for scale-in animation */}
          <style>
            {`
              @keyframes scaleIn {
                0% { transform: scale(0.95); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}
    </Container>
  );
}
