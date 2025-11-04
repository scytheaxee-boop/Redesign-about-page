import { NavLink } from "react-router-dom";
import { HiOutlineAcademicCap } from 'react-icons/hi2';

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-300 transform 
    ${
      isActive
        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
        
        : "text-amber-400/80 hover:text-amber-400 hover:bg-amber-500/10" 
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg 
                    shadow-lg border-b border-white/10 
                    p-4 flex justify-between items-center"
    >
      
      <h1 className="text-xl font-bold text-white flex items-center">
        <HiOutlineAcademicCap className="h-6 w-6 text-amber-400 mr-2" />
        Student Dashboard
      </h1>
      
      <div className="space-x-3">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          Students
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;