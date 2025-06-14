import { useEffect, useState } from "react";

const images = [
  "src/assets/images/login1.webp",
  "src/assets/images/login2.jpg",
  "src/assets/images/login3.jpeg",
  "src/assets/images/footer.jpg",
  "src/assets/images/login4.JPG",
];
export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // mỗi 5 giây đổi ảnh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
    </div>
  );
}
