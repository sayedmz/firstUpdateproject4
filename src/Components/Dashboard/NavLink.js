import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    name: "users",
    path: "users",
    icon: faUsers,
    role: "1995",
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faPlus,
    role: "1995",
  },
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faPlus,
    role: ["1995", "1996"],
  },
];
