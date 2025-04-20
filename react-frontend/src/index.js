import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./index.css";
// import Navbar from "./components/Navbar";
// import Login from "./page/Login";
// import Register from "./page/Register";
import Class from "./page/Class"; // วิธีนี้ใช้เมื่อ Home.js มี export default
import Classwork from "./page/Classwork";
import Createlab from "./page/Createlab";
import reportWebVitals from "./reportWebVitals";



const AppLayout = () => {
  const location = useLocation();
  // const hideNavbarPaths = ["/login", "/register"];
  // const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {/* {showNavbar && <Navbar />} */}
      <main className="main-content">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/Class" element={<Class />} />
          <Route path="/Classwork" element={<Classwork />} />
          <Route path="/Createlab" element={<Createlab />} />
          {/* <Route path="/myingredient" element={<Myingredient />} />
          <Route path="/editingredient" element={<Editingredient />} />
          <Route path="/foodallergies" element={<Foodallergies />} />
          <Route path="/inmenu/:name" element={<Inmenu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/remainingredients" element={<Remainingredients />} />
          <Route path="/edit-profile" element={<Editprofile />} />
          <Route path="/choose-picture" element={<Choosepicture />} /> */}
        </Routes>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
