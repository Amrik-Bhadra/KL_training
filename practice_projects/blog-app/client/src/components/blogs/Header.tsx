import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#464646] p-3 shrink-0">
      <nav className="w-[90%] mx-auto flex">
        <NavLink to="/">
          <p className="text-lg text-gray-200 font-semibold">BlogStation</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
