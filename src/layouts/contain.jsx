import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import routes from "@/routes";

export function Contain() {
  const navbarRoutes = [
    {
      name: "services",
      path: "/contain/services",
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto py-8">
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "contain" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

Contain.displayName = "/src/layout/Contain.jsx";

export default Contain;
