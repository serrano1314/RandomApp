import Login from "./component/Login";
import Register from "./component/Register";
import "./Style.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import RequireAuth from "./component/RequireAuth";
import LinkPage from "./component/LinkPage";
import Unauthorized from "./component/Unauthorized";
import Admin from "./component/Admin";

const ROLES = {
  admin: "ADMIN",
  manager: "MANAGER",
  user: "USER",
};

function App() {
  return (
    <>
      <Routes>
        {/* public routes  */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* private routes  */}
          <Route
            element={
              <RequireAuth
                allowedRole={[ROLES.admin, ROLES.manager, ROLES.user]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.manager]} />}>
            <Route path="manager" element={"Manager Page"} />
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.user]} />}>
            <Route path="user" element={"User Page"} />
          </Route>

          <Route path="*" element={"404"} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
