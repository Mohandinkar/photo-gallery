import { useState, useEffect, useMemo, useCallback, useReducer } from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";
import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";
import favouriteReducer from "../reducers/favouriteReducer";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(favouriteReducer, [], () => {
    try {
      const saved = localStorage.getItem("favourites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save favourites whenever they change
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Search handler
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos
      .filter((photo) =>
        photo.author.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        return favourites.includes(b.id) - favourites.includes(a.id);
      });
  }, [photos, search, favourites]);

  const handleFavourite = (photoId) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photoId,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222326] flex flex-col items-center justify-center">
   
        <div className="w-14 h-14 rounded-full border-4 border-[#C7B092]/20 border-t-[#C7B092] animate-spin"></div>

        <h2 className="text-[#C7B092] text-lg font-semibold mt-6">
          Loading Gallery
        </h2>

        <p className="text-gray-500 text-sm mt-2 animate-pulse">
          Bringing beautiful moments together...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#222326] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-white text-xl font-semibold mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-400 text-sm">{error}</p>

        <p className="text-gray-500 text-xs mt-4">
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#222326] px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[4px] text-gray-400 mb-3">
            Discover • Explore • Save
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Photo Gallery
          </h1>

          <p className="text-gray-400 mt-3">
            A collection of beautiful moments.
          </p>
        </header>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-10">
          <SearchBar search={search} onSearchChange={handleSearchChange} />
        </div>

        {/* Gallery information */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Explore Photos</h2>

          <span className="text-sm text-gray-300">
            ♥ {favourites.length} Favourites
          </span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleFavourite}
            />
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-300 text-lg">No photos found.</p>

            <p className="text-gray-500 text-sm mt-2">
              Try searching with another author's name.
            </p>
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-gray-500 text-xs">
        Created with ❤️ by Mohan
      </footer>
    </div>
  );
};

export default Gallery;
