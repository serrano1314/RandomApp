import Login from "./component/Login";
import Register from "./component/Register";
import "./Style.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import RequireAuth from "./component/RequireAuth";
import LinkPage from "./component/LinkPage";

function App() {
  return (
    <>
      <Routes>
        {/* public routes  */}
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="register" element={<Register />} />

          {/* private routes  */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="admin" element={"Admin Page"} />
            <Route path="manager" element={"Manager Page"} />
            <Route path="user" element={"User Page"} />
          </Route>
          <Route path="*" element={"404"} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
