import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Assessment from "./Assessment";
import JobRecommendation from "./JobRecommendation";
import JobDetail from "./JobDetail";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/jobrecommendation" element={<JobRecommendation />} />
          <Route path="/jobdetail" element={<JobDetail />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
