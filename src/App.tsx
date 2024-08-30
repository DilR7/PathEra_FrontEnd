import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Assessment from "./Assessment";
import JobRecommendation from "./JobRecommendation";
import JobDetail from "./JobDetail";
import { UserProvider } from "./context/UserContext";
import { JobProvider } from "./context/JobContextType";
import InterviewSimulation from "./InterviewSimulation";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <JobProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route
                path="/jobrecommendation"
                element={<JobRecommendation />}
              />
              <Route path="/jobdetail/:id?" element={<JobDetail />} />
              <Route path="/interview" element={<InterviewSimulation />} />
            </Routes>
          </ToastProvider>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
