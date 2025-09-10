import {Sidebar} from "../ui/Sidebar";
import {List, Cog, Tag, ChartColumnIncreasing, TrendingUp, UserRound, Receipt} from "lucide-react";


const AppSidebar = () => {
  const links = [
    {label: "Dashboard", href: "/dashboard", icon: <ChartColumnIncreasing size={20}/>},
    {label: "Expenses", href: "/expenses", icon: <List size={20}/>},
    {label: "Incomes", href: "/incomes", icon: <TrendingUp size={20}/>},
    {label: "Receipts", href: "/receipts", icon: <Receipt size={20}/>},
    {label: "Categories", href: "/categories", icon: <Tag size={20}/>},
    {label: "Profile", href: "/profile", icon: <UserRound size={20}/>},
    {label: "Settings", href: "/settings", icon: <Cog size={20}/>},
  ];

  return <Sidebar title="Tetibola" items={links}/>;
};

export default AppSidebar;