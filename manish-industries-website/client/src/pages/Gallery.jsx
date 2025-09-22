import { useState } from "react";
import Container from "../components/Container";
import { FaTimes, FaDownload } from "react-icons/fa";
import board from "../assets/board.jpg";
import bad from "../assets/bad-miling.jpg";
import miling from "../assets/miling.jpg";
import plano from "../assets/plano.jpg";
import plano2 from "../assets/plano2.jpg";
import plano3 from "../assets/plano3.jpg";
import gate from "../assets/gate.jpg";
import bad2 from "../assets/bad2.jpg";
import bad3 from "../assets/bad3.jpg";
export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const images = [
    { url: board, caption: "Board" },
    { url: gate, caption: "Manish Industries Gate" },
    { url: miling, caption: "Milling Machine" },
    { url: plano, caption: "Plano Miller Machine" },
    { url: plano2, caption: "Plano Miller Machine" },
    { url: plano3, caption: "Plano Miller Machine" },
    { url: bad, caption: "Bad Milling Machine" },
    { url: bad2, caption: "Bad Milling Machine" },
    { url: bad3, caption: "Bad Milling Machine" },
  ];

  const openLightbox = idx => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-8 text-black font-poppins">Gallery</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative group cursor-pointer">
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-70 object-cover rounded shadow"
              onClick={() => openLightbox(idx)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-b opacity-0 group-hover:opacity-100 transition">
              {img.caption}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeLightbox}
          >
            <FaTimes />
          </button>
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full flex flex-col items-center relative">
            <img
              src={images[lightboxIdx].url}
              alt={images[lightboxIdx].caption}
              className="max-h-[60vh] w-auto rounded mb-4"
              style={{ objectFit: "contain" }}
            />
            <div className="mb-2 text-center text-black font-semibold">{images[lightboxIdx].caption}</div>
            <a
              href={images[lightboxIdx].url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-red-700 transition"
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      )}
    </Container>
  );
}
