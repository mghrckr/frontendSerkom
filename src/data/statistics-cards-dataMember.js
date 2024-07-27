import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsDataMember = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Saldo Member Aktif",
    value: "RP. 0",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Saldo Member Non Aktif",
    value: "RP. 0",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Komisi Member",
    value: "RP. 0",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Total Point Member",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
];

export default statisticsCardsDataMember;
