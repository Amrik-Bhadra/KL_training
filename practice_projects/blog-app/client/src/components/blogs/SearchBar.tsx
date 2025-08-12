import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div
      id="search-box"
      className="bg-[#464646]/50 rounded-md px-3 py-2 flex items-center gap-x-3"
    >
      <IoSearch className="text-gray-200 text-xl" />
      <input
        type="text"
        className="bg-transparent border-none outline-none text-gray-200"
        placeholder="Search here by title"
      />
    </div>
  );
};

export default SearchBar;
