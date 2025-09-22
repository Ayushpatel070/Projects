import { useEffect, useState } from "react";
import Container from "../components/Container";
import { FaPhoneAlt } from "react-icons/fa";
import home from "../assets/Home.jpg";

const HERO_IMAGE = "/hero-placeholder.jpg"; // Replace with your image path
const PHONE = "+919898146433";

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then(data => setServices(data.slice(0, 3)))
      .catch(() => setServices([]));
  }, []);

  const handleQuoteScroll = () => {
    const el = document.getElementById("request-quote");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <Container className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Text */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-black font-poppins mb-4">
              Manish Industries — <span className="text-primary">Milling &amp; Planomiller Job Work</span>
            </h1>
            <p className="text-gray-700 mb-6">
              Precision machining, planomilling, and industrial job work with quality and reliability.
            </p>
            <div className="flex gap-4">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center px-5 py-2 bg-primary text-white rounded font-semibold hover:bg-red-700 transition"
              >
                <FaPhoneAlt className="mr-2" /> Call Now
              </a>
              <button
                onClick={handleQuoteScroll}
                className="inline-flex items-center px-5 py-2 border-2 border-primary text-primary rounded font-semibold hover:bg-primary hover:text-white transition"
              >
                Request Quote
              </button>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center">
            <div className="w-72 h-65 flex items-center justify-center">
              <img src={home} alt="Manish Industries Gate" className="ms-15 mt-5 rounded" />
            </div>
          </div>
        </Container>
      </section>

      {/* Top Services */}
      <section className="py-12 bg-white">
        <Container>
          <h2 className="text-2xl font-bold mb-8 text-black font-poppins text-center">Our Top Services</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
            {services.map(service => (
              <div key={service._id || service.slug} className="bg-gray-50 rounded-lg shadow p-6 flex flex-col w-full">
                <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-700 mb-3 line-clamp-3">{service.description}</p>
                {service.specs && service.specs.length > 0 && (
                  <ul className="text-sm text-gray-500 mb-3 list-disc list-inside">
                    {service.specs.slice(0, 3).map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                )}
                {service.price && (
                  <div className="mt-auto text-black font-bold">From ₹{service.price}</div>
                )}
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 text-gray-400 text-center">No services available.</div>
            )}
          </div>
        </Container>
      </section>

      {/* Request Quote Anchor */}
      <div id="request-quote"></div>
    </>
  );
}