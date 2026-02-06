"use client";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const carouselImages = ["/bg1.jpg", "/bg22.jpg", "/bg3.jpg"];
  const signatureWords = ["Aid", "Hope", "Future"];

  // Carousel auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for signature words
  useEffect(() => {
    const currentWord = signatureWords[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing effect
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting effect
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          // Move to next word
          setCurrentWordIndex((prev) => (prev + 1) % signatureWords.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  const handleDownload = () => {
    toast.success(" Download is starting...");
    window.location.href = "/api/download/brochure";
  };

  return (
    <>
      {/* Local Toaster — only affects this component */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "80px",
            zIndex: 999999,
          },
        }}
      />

      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">

        {/* Background Carousel */}
        <div
          className="absolute inset-0 flex transition-transform duration-[1200ms] ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>

        {/* Content */}
        <div className="container relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aid 4 Children Tanzania
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Building a Tanzania where every child can learn, heal, and dream without limits
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              variant="outline"
              size="lg"
              className="
                text-white 
                border-white
                hover:text-white
                transition-all
                duration-300
                hover:bg-orange-600 
                hover:border-orange-600
                hover:scale-105
                cursor-pointer
              "
            >
              Download Our Brochure
            </Button>
          </div>

          {/* Signature Orange Text with Typewriter Effect */}
          <div className="mt-12">
            <div className="text-2xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {currentText}
                <span className="ml-1 animate-pulse">|</span>
              </span>
            </div>
            
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}