import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography, Button } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-red-800 to-red-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const role = localStorage.getItem('role')
  const location = useLocation();

  // Menghapus local storage saat komponen di-mount atau ada perubahan di route/link
  useEffect(() => {
    localStorage.removeItem('bank');
    localStorage.removeItem('supplier');
    localStorage.removeItem('user');
    localStorage.removeItem('startLocal');
    localStorage.removeItem('endLocal');
    localStorage.removeItem('startLocalBank');
    localStorage.removeItem('endLocalBank');
  }, [location.pathname]);
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-red-100`}
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div className={`relative flex items-center justify-center`}>
        <Link to="/" className="py-8 px-10 text-center">
          <img src={brandImg} alt="Your Image" style={{ width: '200px' }} />
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "red"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, subpages }) => (
              <li key={name}>
                {subpages ? (
                  <div>
                    <Button
                      variant="text"
                      color="inherit"
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                      <ChevronDownIcon className="w-5 h-5 text-red-500" />
                    </Button>
                    <ul className="ml-8 mb-2">
                      {subpages.map(({ name: subName, path: subPath }) => (
                        <li key={subName}>
                          <NavLink to={`/${layout}${subPath}`} activeClassName="text-blue-600">
                            <Button
                              variant="text"
                              color="inherit"
                              className="flex items-center gap-4 px-4 capitalize"
                              fullWidth
                            >
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                {subName}
                              </Typography>
                            </Button>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                              ? "white"
                              : "red"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
