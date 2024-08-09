import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Assessment from "./Assessment";
import JobRecommendation from "./JobRecommendation";
import JobDetail from "./JobDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/jobrecommendation" element={<JobRecommendation />} />
        <Route path="/jobdetail" element={<JobDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
