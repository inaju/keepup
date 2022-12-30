import Main from "./components/Main";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import SharedNote from "./components/SharedNote";
import Login from "./components/Login";
import { UserAuthContextProvider, useUserAuth } from "./auth/UserAuthContext";

function App() {

  return (
    <div className="">
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sharedNote" element={<SharedNote />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
