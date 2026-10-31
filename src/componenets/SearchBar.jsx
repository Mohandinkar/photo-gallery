const SearchBar = ({ search, onSearchChange }) => {
  return (
    <div className="relative w-full group">
      {/* Search Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white transition-colors"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by author name..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full bg-[#C7B092] text-[#222326] border border-transparent rounded-2xl pl-14 pr-5 py-4 text-sm placeholder:text-white/90 outline-none transition-all duration-300 hover:bg-[#D0B99C] focus:ring-4 focus:ring-[#C7B092]/20"
      />
    </div>
  );
};

export default SearchBar;