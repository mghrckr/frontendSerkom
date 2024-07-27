import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, Footer } from "@/widgets/layout";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import UserHome from '@/pages/UserHome';
import DataMember from '@/pages/dashboard/dataMember';
import DataKomisi from '@/pages/dashboard/dataKomisi';

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  let imgUrl = '/img/logoSerkom.png';

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
    setOpenSidenav(dispatch, !isSidenavOpen);
  };

  const routes = [
    {
      title: "main pages",
      layout: "auth",
      pages: [
        {
          name: "home",
          path: "/home",
          element: <UserHome />,
        }
      ]
    },
    {
      title: "dashboard",
      layout: "dashboard",
      pages: [
        {
          name: "events",
          path: "/data",
          element: <DataMember/>
        },
        {
          name: "list peserta",
          path: "/dataPeserta",
          element: <DataKomisi/>
        },
      ]
    },
  ];
  
  return (
    <div className={`min-h-screen bg-red-50/50 ${isSidenavOpen ? 'bg-red-900 bg-opacity-50' : ''}`}>
      <Sidenav
        routes={routes}
        brandImg={imgUrl}
        className="text-red-500"
      />
      <div className="p-4 xl:ml-80 text-red-500">
        <IconButton
          size="lg"
          color="red"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-red-900/10 lg:hidden"
          ripple={false}
          onClick={toggleSidenav}
        >
          <Cog6ToothIcon className="h-5 w-5 text-red-500" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact key={path} path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-red-500">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
