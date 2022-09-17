import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { auth, db } from "./firebase/config";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
import useActiveGenresStore from "./store/activeGenres";
import useAuthStore from "./store/auth";
import useCommonStore from "./store/common";
import useSearchStore from "./store/search";

function App() {
  const location = useLocation();
  const { setCurrentUser } = useAuthStore();
  const { setTypeSearch, setQuerySearch } = useSearchStore();
  const { setActiveGenres } = useActiveGenresStore();
  const { setIsLoading, setPath } = useCommonStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setQuerySearch("");

    if (/tv/.test(location.pathname)) {
      setTypeSearch("tv");
    } else {
      setTypeSearch("movie");
    }

    setActiveGenres([]);

    if (location.pathname !== "/login") {
      setPath(location.pathname);
    }
  }, [
    location.pathname,
    setQuerySearch,
    setTypeSearch,
    setActiveGenres,
    setPath,
  ]);

  useEffect(() => {
    setIsLoading(true);
    const timeOut = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [location.pathname, setIsLoading]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then((doc) => {
          setCurrentUser({
            ...doc.data(),
            id: doc.id,
          });
        });
      }
    });

    return () => unSubscribe();
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Routes>
        {routes.map((route) => {
          const Layout = route.layout || DefaultLayout;
          const Element = route.element;
          return (
            <Route
              key={v4()}
              path={route.path}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
