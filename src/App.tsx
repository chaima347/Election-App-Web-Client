import "./App.css";
import { useAuth } from "./AuthContext";
import Candidates from "./Candidates";
import Favorites from "./favorites";
import Header from "./Header";
import Signin from "./Signin";
import Signup from "./Signup";

function App() {
  const { user } = useAuth();
  return (
    <>
      <Header />
      {user === null ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Signin />
          <Signup />
        </div>
      ) : (
        <>
          <Favorites />
          <Candidates />
        </>
      )}
    </>
  );
}

export default App;
