import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import {
  BiCameraMovie,
  BiCategory,
  BiLogInCircle,
  BiLogOutCircle,
  BiSearch,
  BiTv
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../../firebase/config";
import useAuth from "../../../store/auth";

function MenuMobile({ isOpen, onClose }) {
  const { currentUser, setCurrentUser } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser({});
    onClose();
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent className="!bg-gray-800">
          <DrawerCloseButton className="text-white" />
          <DrawerHeader className="text-white">Menu</DrawerHeader>
          <DrawerBody>
            <div className="">
              <Link
                to="/"
                onClick={() => onClose()}
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
                onClick={() => onClose()}
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
                onClick={() => onClose()}
                className={` ${
                  (location.pathname === "/search" && "text-red") ||
                  "text-white"
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
                onClick={() => onClose()}
                className={` ${
                  (location.pathname === "/category" && "text-red") ||
                  "text-white"
                }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
              >
                <BiCategory className="mr-4" />
                <span>Category</span>
              </Link>
            </div>
            <div className="mt-6 w-full h-[1px] bg-white/40" />
            {!currentUser.uid ? (
              <div className="mt-5">
                <Link
                  to="/login"
                  onClick={() => onClose()}
                  className={` ${
                    (location.pathname === "/login" && "text-red") ||
                    "text-white"
                  }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
                >
                  <BiLogInCircle className="mr-4" />
                  <span>Login</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-5">
                  <Link
                    to="/profile"
                    onClick={() => onClose()}
                    className={` ${
                      (location.pathname === "/profile" && "text-red") ||
                      "text-white"
                    }
         px-3 flex items-center text-xl text-white hover:text-red transition-all`}
                  >
                    <Avatar
                      size="sm"
                      className="mr-4"
                      src={currentUser.photoURL}
                    />
                    <span>{currentUser.displayName}</span>
                  </Link>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => handleLogout()}
                    className="px-3 flex items-center text-xl text-white hover:text-red transition-all"
                  >
                    <BiLogOutCircle className="mr-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MenuMobile;
