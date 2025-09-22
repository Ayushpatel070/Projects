import { FaCogs, FaIndustry, FaTools, FaCubes, FaDraftingCompass, FaTruck } from "react-icons/fa";

const service = [
  {
    title: "CNC Machining & Job Work",
    description: "Precision cutting, shaping, and finishing for custom industrial components.",
    icon: <FaCogs className="text-primary text-4xl" />
  },
  {
    title: "Fabrication & Assembly",
    description: "Sheet metal work, welding, and structural fabrication tailored to your needs.",
    icon: <FaIndustry className="text-primary text-4xl" />
  },
  {
    title: "Custom Component Manufacturing",
    description: "Manufacturing specialized parts as per client specifications.",
    icon: <FaCubes className="text-primary text-4xl" />
  },
  {
    title: "Prototype Development",
    description: "Small-batch production for design testing and validation.",
    icon: <FaDraftingCompass className="text-primary text-4xl" />
  },
  {
    title: "Repair & Maintenance",
    description: "Refurbishing and fixing industrial machinery components.",
    icon: <FaTools className="text-primary text-4xl" />
  },
  {
    title: "Logistics & Delivery",
    description: "Reliable supply chain support with on-time dispatch and delivery.",
    icon: <FaTruck className="text-primary text-4xl" />
  }
];

export default function Service() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12">
          Our <span className="text-primary">Services</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
