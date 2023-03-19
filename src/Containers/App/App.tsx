import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";



export default function App() {

  

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          index
          element={
            <Loading/>
          }
        />
        <Route
          path="/login"
          element={
            <Login></Login>
          }
        />
        <Route  path="/app/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
