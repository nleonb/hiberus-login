import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import Register from "./components/register/register";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route
              path="/dashboard"
              element={
                  <>
                    <Navbar/>
                    <Dashboard/>
                  </>
              }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;