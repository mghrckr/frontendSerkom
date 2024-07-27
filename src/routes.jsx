import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentIcon,
  ShoppingBagIcon,
  SignalIcon,
  FolderOpenIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
  WalletIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import UserHome from "./pages/UserHome";
import { SignIn, SignUp } from "./pages/auth";
import AboutUs from "./pages/AboutUs";
import { element } from "prop-types";
import Services from "./pages/Services";
import Team from "./pages/Team";
import EventPelatihan from "./pages/Event Pelatihan";
import Portofolio from "./pages/Portofolio";
import DataMember from "./pages/dashboard/dataMember";
import { FormPeserta } from "./pages/formPeserta";
import DataKomisi from "./pages/dashboard/dataKomisi";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        name: "home",
        path: "/home",
        element: <UserHome />,
      },
      {
        name: "about us",
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        name: "form peserta",
        path: "/formPeserta",
        element: <FormPeserta />,
      },
    ]
  },
  {
    title: "contain pages",
    layout: "contain",
    pages: [
      {
        name: "services",
        path: "/services",
        element: <Services />
      },
      {
        name: "Event Pelatihan",
        path: "/eventPelatihan",
        element: <EventPelatihan />
      },
      {
        name: "portfolio",
        path: "/portfolio",
        element: <Portofolio />
      },
      {
        name: "team",
        path: "/team",
        element: <Team />
      },
    ]
  },
  {
    title: "dashboard",
    layout: "dashboard",
    pages: [
      {
        name: "data",
        path: "/data",
        element: <DataMember />
      },
      {
        name: "list peserta",
        path: "/dataPeserta",
        element: <DataKomisi/>
      },
    ]
  },
];

export default routes;
