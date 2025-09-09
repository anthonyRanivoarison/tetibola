import Sidebar from "../ui/Sidebar";
import {List, Cog, Tag, ChartColumnIncreasing, TrendingUp, UserRound, Receipt} from "lucide-react";

const AppSidebar = ({isOpen}: never) => {
  const size = isOpen ? 20 : 18;
  const groups = [
    {
      title: "Main",
      items: [
        {label: "Dashboard", href: "/dashboard", icon: <ChartColumnIncreasing size={20}/>},
      ],
    },
    {
      title: "Management",
      items: [
        {label: "Expenses", href: "/expenses", icon: <List size={size}/>},
        {label: "Incomes", href: "/incomes", icon: <TrendingUp size={size}/>},
        {label: "Receipts", href: "/receipts", icon: <Receipt size={size}/>},
        {label: "Categories", href: "/categories", icon: <Tag size={size}/>},
      ],
    },
    {
      title: "Account",
      items: [
        {label: "Profile", href: "/profile", icon: <UserRound size={size}/>},
        {label: "Settings", href: "/settings", icon: <Cog size={size}/>},
      ],
    },
  ];

  return <Sidebar title="Tetibola" groups={groups} isOpen={isOpen}/>;
};

export default AppSidebar;
