import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useThemeStore } from "./store/themeStore";

const App = () => {
  const { auth, isCheckAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckAuth && !auth)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme} className="bg-base-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={auth ? <Home /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/signup"
          element={!auth ? <Signup /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/login"
          element={!auth ? <Login /> : <Navigate to={"/"} />}
        ></Route>
        <Route path="/settings" element={<Setting />}></Route>
        <Route
          path="/profile"
          element={auth ? <Profile /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
