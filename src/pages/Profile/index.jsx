import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import notFoundImage from "../../assets/image/pngwing.com.png";
import FilmItem from "../../components/FilmItem";
import SettingProfile from "../../components/SettingProfile";
import { updateDocument } from "../../firebase/service";
import useCollect from "../../hooks/useCollect";
import { getListFilmsProfile } from "../../shared/actions";
import useAuthStore from "../../store/auth";

function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("setting");
  const [listFilms, setListFilms] = useState([]);

  const user = useCollect("users", currentUser.uid);

  useEffect(() => {
    if (!currentUser.uid) {
      navigate("/");
    }
  }, [currentUser.uid, navigate]);

  useEffect(() => {
    if (activeTab === "favorite") {
      getListFilmsProfile(user.favoriteFilms).then(async (res) => {
        if (res) {
          const list = await Promise.all([...res]);
          setListFilms(list);
        } else {
          setListFilms([]);
        }
      });
    } else if (activeTab === "history") {
      getListFilmsProfile(user.historyFilms).then(async (res) => {
        if (res) {
          const list = await Promise.all([...res]);
          setListFilms(list);
        } else {
          setListFilms([]);
        }
      });
    }
  }, [activeTab, user.favoriteFilms, user.historyFilms]);

  const handleClearFilms = () => {
    if (activeTab === "favorite") {
      updateDocument("users", currentUser.uid, {
        favoriteFilms: [],
      });
    } else if (activeTab === "history") {
      updateDocument("users", currentUser.uid, {
        historyFilms: [],
      });
    }
  };

  const handleDeleteFilm = (filmId) => {
    if (activeTab === "favorite") {
      updateDocument("users", currentUser.uid, {
        favoriteFilms: user.favoriteFilms.filter(
          (film) => film.filmId !== filmId.toString()
        ),
      });
    } else if (activeTab === "history") {
      updateDocument("users", currentUser.uid, {
        historyFilms: user.historyFilms.filter(
          (film) => film.filmId !== filmId.toString()
        ),
      });
    }
  };

  return (
    <div className="lg:px-8 px-5 py-5 flex lg:flex-row flex-col justify-start items-start">
      <ul className="lg:px-8 lg:w-fit w-full flex lg:flex-col flex-row items-center lg:justify-start justify-center">
        <li
          onClick={() => {
            setActiveTab("setting");
          }}
          className={`${
            (activeTab === "setting" && "!text-red !bg-white/10") || ""
          } lg:mb-3 lg:mr-0 mr-3 px-5 py-2 md:w-[200px] w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
        >
          Setting
        </li>
        <li
          onClick={() => {
            setActiveTab("favorite");
          }}
          className={`${
            (activeTab === "favorite" && "!text-red !bg-white/10") || ""
          } lg:mb-3 lg:mr-0 mr-3 px-5 py-2 md:w-[200px] w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
        >
          Favorite
        </li>
        <li
          onClick={() => {
            setActiveTab("history");
          }}
          className={`${
            (activeTab === "history" && "!text-red !bg-white/10") || ""
          } px-5 py-2 md:w-[200px] w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
        >
          History
        </li>
      </ul>
      {activeTab === "setting" ? (
        <div className="lg:mt-0 mt-8 w-full min-h-screen">
          <SettingProfile />
        </div>
      ) : (
        <div className="lg:mt-0 mt-8 w-full min-h-screen">
          {listFilms.length <= 0 ? (
            <div className="mt-5 w-full flex flex-col items-center justify-center">
              <LazyLoadImage
                className="md:w-[500px] w-full h-full object-cover rounded-lg"
                src={notFoundImage}
                alt="404"
              />
              <p className="mt-8 text-3xl text-white text-center font-semibold">
                No such film found
              </p>
              <Link
                to="/"
                className="mt-5 w-full text-xl text-red text-center font-semibold"
              >
                Discover more
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={handleClearFilms}
                className="px-5 py-2 flex items-center text-lg text-red hover:bg-red/20 transition-all rounded-full"
              >
                <BsFillTrashFill className="mr-4" />
                <span>Clear</span>
              </button>
              <div className="mt-5">
                <ul className="mt-8 flex flex-wrap items-center lg:justify-start justify-center md:gap-10 gap-x-4 gap-y-7">
                  {listFilms?.map((film) => (
                    <li key={film.id + v4()} className="w-[150px] h-[250px]">
                      <div className="relative rounded-lg film-section overflow-hidden">
                        <FilmItem type={film.media_type} film={film} />
                      </div>
                      <div className="mt-4 flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteFilm(film.id)}
                          className="px-3"
                        >
                          <BiTrash className="text-xl text-white hover:text-red transition-all" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
