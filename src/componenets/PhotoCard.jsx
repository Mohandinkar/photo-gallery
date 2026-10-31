import { useEffect, useState } from "react";

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close popup using Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Photo Card */}
      <div className="group overflow-hidden rounded-2xl scroll-animate">

        {/* Image with hover tilt */}
        <div
          className="relative overflow-hidden rounded-2xl cursor-zoom-in
          transition-all duration-500 ease-out
          transform-gpu
          group-hover:rotate-2
          group-hover:scale-[0.97]
          group-hover:shadow-2xl"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={photo.download_url}
            alt={`Photo by ${photo.author}`}
            className="w-full h-72 object-cover rounded-2xl"
          />

          {/* Favourite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavourite(photo.id);
            }}
            aria-label={
              isFavourite
                ? "Remove from favourites"
                : "Add to favourites"
            }
            className="absolute top-4 right-4 hover:scale-125 transition-transform duration-300"
          >
            {isFavourite ? (
              <svg viewBox="0 0 24 24" fill="#ef4444"
                stroke="#ef4444" strokeWidth="2"
                className="w-7 h-7">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="w-7 h-7">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Photographer Name */}
        <div className="flex justify-between items-center px-2 py-3">
          <h3 className="font-medium truncate text-white transition-all duration-300 hover:text-[#C7B092] hover:translate-x-1">
            {photo.author}
          </h3>

          <span className="text-xs text-gray-400 ml-2">
            Author
          </span>
        </div>
      </div>

      {/* Image Popup */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center
          bg-black/40 backdrop-blur-xl p-5"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-8 text-white text-4xl
            hover:text-[#C7B092] transition-colors"
            aria-label="Close image"
          >
            &times;
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-[popIn_250ms_ease-out]
            max-w-4xl w-full flex flex-col items-center"
          >
            <img
              src={photo.download_url}
              alt={`Photo by ${photo.author}`}
              className="max-h-[80vh] max-w-full object-contain
              rounded-2xl shadow-2xl"
            />

            <p className="text-white mt-4 text-lg font-medium">
              {photo.author}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoCard;