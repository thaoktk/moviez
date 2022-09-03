import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFilterRight } from "react-icons/bs";
import { Avatar, useDisclosure } from "@chakra-ui/react";
import MenuMobile from "../MenuMobile";
import useAuth from "../../../store/auth";

function Header() {
  const { currentUser } = useAuth();

  const [sticky, setSticky] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "fixed top-0 left-0 z-10" : "";
    setSticky(stickyClass);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <header className={`w-full backdrop-blur-lg bg-black/30 ${sticky}`}>
      <div className="lg:px-8 px-5 py-5 w-full flex justify-between items-center">
        <div className="px-3">
          <Link to="/" className="text-3xl text-white font-medium">
            Movie<span className="text-red">z</span>
          </Link>
        </div>
        {currentUser.uid ? (
          <div className="px-3 lg:block hidden">
            <Avatar size="sm" src={currentUser.photoURL} />
          </div>
        ) : (
          <div className="px-3 lg:block hidden">
            <Link
              to="/login"
              className="text-xl text-white hover:text-red transition-all"
            >
              Login
            </Link>
          </div>
        )}
        <button onClick={onOpen} className="px-3 lg:hidden block">
          <BsFilterRight className="text-2xl text-white" />
        </button>
      </div>

      <MenuMobile isOpen={isOpen} onClose={onClose} />
    </header>
  );
}

export default Header;
