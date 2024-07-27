import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Pembelian Sukses: 0",
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
    title: "Pembelian Gagal: 0",
    value: "RP. 0",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Pembelian Refund : 0",
    value: "RP. 0",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: BanknotesIcon,
    title: "Pembayaran Sukses : 0",
    value: "RP. 0",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Member Aktif : 2",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Member Non Aktif : 0",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total Member : 3",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
  {
    color: "gray",
    icon: UsersIcon,
    title: "Deposit Member",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "dari kemarin",
    },
  },
];

export default statisticsCardsData;
