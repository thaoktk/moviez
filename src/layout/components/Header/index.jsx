import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { BiLogOutCircle, BiUser } from "react-icons/bi";
import { BsFilterRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/config";
import useToastify from "../../../hooks/useToastify";
import useAuthStore from "../../../store/auth";
import MenuMobile from "../MenuMobile";

function Header() {
  const { currentUser, setCurrentUser } = useAuthStore();
  const [sticky, setSticky] = useState("");

  const showToast = useToastify();

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "!fixed top-0 left-0" : "";
    setSticky(stickyClass);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    signOut(auth).then(() => {
      showToast({
        title: "Logout successfully.",
        status: "success",
      });
    });
    setCurrentUser({});
  };

  return (
    <header
      className={`relative w-full backdrop-blur-lg bg-black/30 z-50 ${sticky}`}
    >
      <div className="lg:px-8 px-5 py-5 w-full flex justify-between items-center">
        <div className="px-3">
          <Link to="/" className="text-3xl text-white font-medium">
            Movie<span className="text-red">z</span>
          </Link>
        </div>
        {currentUser.uid ? (
          <div className="px-3 lg:block hidden">
            <Menu className="">
              <MenuButton>
                <Avatar size="sm" src={currentUser.photoURL} />
              </MenuButton>
              <MenuList className="!relative !z-50 !bg-gray-800 !border-gray-800">
                <MenuItem className="!text-white hover:!bg-gray-600 focus:!bg-gray-600">
                  <Link to="/profile" className="w-full flex items-center">
                    <BiUser className="mr-3" />
                    <span>Profile</span>
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="w-full flex items-center !text-white hover:!bg-gray-600 focus:!bg-gray-600"
                >
                  <BiLogOutCircle className="mr-3" />
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
            </Menu>
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
