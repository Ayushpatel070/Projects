import Container from "../components/Container";

const ADDRESS = "Vihim Steel Compound, Nr. Sureliya Estate, Nr. Gita Park, Vastral Road, Amraiwadi, Ahmedabad-380026";
const PHONE1 = "+91-9898146433";
const PHONE2 = "+91-9427156433";
const EMAIL = "manishindustries2312@gmail.com";

export default function About() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-6 text-black font-poppins">About Manish Industries</h1>
      <p className="mb-6 text-gray-700 max-w-2xl">
        <strong>Manish Industries</strong> is a trusted name in Milling and Planomiller job work, serving the Ahmedabad region and beyond with precision machining and industrial solutions. We pride ourselves on quality, reliability, and customer satisfaction, delivering excellence in every project.
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary">Management</h2>
        <div className="flex items-center gap-4">
          <div>
            <div className="font-bold text-black">Nitin Patel</div>
            <div className="text-gray-600">Managing Director</div>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary">Contact Information</h2>
        <div className="text-gray-700">
          <div><strong>Address:</strong> {ADDRESS}</div>
          <div><strong>Phone 1:</strong> <a href={`tel:${PHONE1}`} className="text-primary hover:underline">{PHONE1}</a></div>
          <div><strong>Phone 2:</strong> <a href={`tel:${PHONE2}`} className="text-primary hover:underline">{PHONE2}</a></div>
          <div><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">{EMAIL}</a></div>
        </div>
      </div>
    </Container>
  );
}