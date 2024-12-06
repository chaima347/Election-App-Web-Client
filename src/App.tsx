import "./App.css";
import { useAuth } from "./AuthContext";
import Candidates from "./Candidates";
import Favorites from "./favorites";
import Header from "./Header";
import ElectionResults from "./result";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Header />
      <div className="main-content">
        {user === null ? (
          <div className="auth-container">
            <div className="auth-forms">
              <Signin />
              <Signup />
            </div>
          </div>
        ) : (
          <div className="app-content">
            <ElectionResults/>
            <Favorites />
            <Candidates />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
