import {BrowserRouter, Routes, Route} from "react-router-dom";
import DefaultAppLayout from "./layouts/app-layout.tsx"
import Home from "./pages/Home";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Incomes from "./pages/Incomes";
import Receipts from "./pages/Receipts";
import UserProfile from "./pages/UserProfile";
import ExpensesPage from "./pages/Expenses";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>

        <Route element={<DefaultAppLayout/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/expenses" element={<ExpensesPage/>}/>
          <Route path="/incomes" element={<Incomes/>}/>
          <Route path="/receipts" element={<Receipts/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;