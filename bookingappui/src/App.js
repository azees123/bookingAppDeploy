import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import RegisterPage from "./pages/register/RegisterPage";
import Logout from "./pages/logout/Logout";
import { userInputs } from "./formSource";

function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage inputs={userInputs} title="Add New User"/>} />
          <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
