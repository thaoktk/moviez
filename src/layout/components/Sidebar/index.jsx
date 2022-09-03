import { BiCameraMovie, BiCategory, BiSearch, BiTv } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="lg:block hidden w-[250px] mt-5">
      <div className="">
        <Link
          to="/"
          className={` ${
            (location.pathname === "/" && "text-red") || "text-white"
          }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
        >
          <BiCameraMovie className="mr-4" />
          <span>Movie</span>
        </Link>
      </div>
      <div className="mt-5">
        <Link
          to="/tv"
          className={` ${
            (location.pathname === "/tv" && "text-red") || "text-white"
          }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
        >
          <BiTv className="mr-4" />
          <span>TV Show</span>
        </Link>
      </div>
      <div className="mt-5">
        <Link
          to="/search"
          className={` ${
            (location.pathname === "/search" && "text-red") || "text-white"
          }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
        >
          <BiSearch className="mr-4" />
          <span>Search</span>
        </Link>
      </div>
      <div className="mt-5">
        <Link
          to="/category"
          className={` ${
            (location.pathname === "/category" && "text-red") || "text-white"
          }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
        >
          <BiCategory className="mr-4" />
          <span>Category</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
