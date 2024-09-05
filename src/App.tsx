import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { JobProvider } from "./context/JobContextType";
import { ToastProvider } from "./context/ToastContext";
import { PAGES, PageType } from "./config/menu-list";
import AuthMiddleware from "./middleware/AuthMiddleware";
import { useEffect } from "react";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <JobProvider>
          <ToastProvider>
            <Routes>
              {PAGES.map((page: PageType) => (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    page.isAuth ? (
                      <AuthMiddleware>{page.element}</AuthMiddleware>
                    ) : (
                      page.element
                    )
                  }
                />
              ))}
            </Routes>
          </ToastProvider>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default App;
