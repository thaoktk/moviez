import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { auth, db } from "./firebase/config";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
import useAuth from "./store/auth";
import useTypeSearch from "./store/type";

function App() {
  const location = useLocation();
  const { setCurrentUser } = useAuth();
  const { setTypeSearch } = useTypeSearch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

  useEffect(() => {
    if (/tv/.test(location.pathname)) {
      setTypeSearch("tv");
    } else {
      setTypeSearch("movie");
    }
  }, [location.pathname, setTypeSearch]);

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
