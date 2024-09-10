import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Error403 from "./Pages/Auth/403";
import Writer from "./Pages/Dashboard/Writer";
import NotFound from "./Pages/Auth/404";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<NotFound />} />
        {/* protected Routes*/}
        <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
