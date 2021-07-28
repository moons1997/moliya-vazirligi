// core components
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import Bank from "views/admin/Bank.js";
import BankAdd from "views/admin/bank/BankAdd";
import Contract from "views/admin/Contract";
import ContractAdd from "views/admin/contract/ContractAdd";

// import Tables from "views/admin/Tables.js";
// import Icons from "views/admin/Icons.js";
// import Profile from "views/admin/Profile.js";
// import Maps from "views/admin/Maps.js";
// import Dashboard from "views/admin/Dashboard.js";

// @material-ui/icons components
import AccountCircle from "@material-ui/icons/AccountCircle";
import FlashOn from "@material-ui/icons/FlashOn";
import VpnKey from "@material-ui/icons/VpnKey";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DescriptionIcon from "@material-ui/icons/Description";

// import Dns from "@material-ui/icons/Dns";
// import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
// import Grain from "@material-ui/icons/Grain";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Palette from "@material-ui/icons/Palette";
// import Person from "@material-ui/icons/Person";
// import Tv from "@material-ui/icons/Tv";

var routes = [
  {
    href: "#pablo",
    name: "Upgrade to pro",
    icon: FlashOn,
    upgradeToPro: true,
  },
  {
    path: "/bank",
    name: "Bank",
    icon: AccountBalanceIcon,
    iconColor: "Primary",
    component: Bank,
    layout: "/admin",
    hidden: false,
  },
  {
    path: "/bank/:id",
    name: "Bank Add",
    icon: AccountBalanceIcon,
    iconColor: "Warning",
    component: BankAdd,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/contract",
    name: "Contract",
    icon: DescriptionIcon,
    iconColor: "WarningLight",
    component: Contract,
    layout: "/admin",
    hidden: false,
  },
  {
    path: "/contract/:id",
    name: "Contract Add",
    icon: AccountBalanceIcon,
    iconColor: "Warning",
    component: ContractAdd,
    layout: "/admin",
    hidden: true,
  },

  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    iconColor: "Info",
    component: Login,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    icon: AccountCircle,
    iconColor: "ErrorLight",
    component: Register,
    layout: "/auth",
    hidden: true,
  },
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: Tv,
  //   iconColor: "Primary",
  //   component: Dashboard,
  //   layout: "/admin",
  //   hidden: false,
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: Grain,
  //   iconColor: "Primary",
  //   component: Icons,
  //   layout: "/admin",
  //   hidden: false,
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   iconColor: "Warning",
  //   component: Maps,
  //   layout: "/admin",
  //   hidden: false,
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: Person,
  //   iconColor: "WarningLight",
  //   component: Profile,
  //   layout: "/admin",
  //   hidden: false,
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: FormatListBulleted,
  //   iconColor: "Error",
  //   component: Tables,
  //   layout: "/admin",
  //   hidden: false,
  // },

  // {
  //   divider: true,
  // },
  // {
  //   title: "Documentation",
  // },
  // {
  //   href: "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Getting started",
  //   icon: FlashOn,
  // },
  // {
  //   href: "https://www.creative-tim.com/learning-lab/material-ui/colors/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Foundation",
  //   icon: Palette,
  // },
  // {
  //   href: "https://www.creative-tim.com/learning-lab/material-ui/alerts/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Components",
  //   icon: Dns,
  // },
];
export default routes;
