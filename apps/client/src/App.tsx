import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Incomes from "./pages/Incomes";
import Receipts from "./pages/Receipts";
import UserProfile from "./pages/UserProfile";
import Expenses from "./pages/Expenses";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/incomes" element={<Incomes/>}/>
        <Route path="/receipts" element={<Receipts/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;