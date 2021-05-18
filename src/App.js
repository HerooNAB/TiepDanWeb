import "./App.css";

// Components
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { useStateValue } from "./context/StateProvider";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
function App() {
  const [state, dispatch] = useStateValue();
  return (
    <div className="App">
      {/* Nếu trạng thái đăng nhập là true thì sẽ render ra page <SignIn/> ngược lại là <SignOut/> */}
      {state.isSignIn === "homepage" ? (
        <HomePage />
      ) : state.isSignIn === "signup" ? (
        <SignUp />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
