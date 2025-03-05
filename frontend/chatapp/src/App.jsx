import {Navigate, Routes} from "react-router-dom"
import {Route} from "react-router-dom"
import HomePage from "./pages/home"
import SignUp from "./pages/signup"
import Login from "./pages/login"
import SettingsPage from "./pages/settings"
import ProfilePage from "./pages/profile"
import NavBar from "./components/NavBar"
import { useEffect } from "react"
import {useAuthstore} from "./store/useAuthstore"
import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast";

function App() {
  const {isAuth,checkAuth,isCheckingAuth} = useAuthstore()

  useEffect(()=>{
    checkAuth()
  },[]);

  if(isCheckingAuth && !isAuth) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <>
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
     <Routes>
        <Route path ="/" element={isAuth? <HomePage/> : <Navigate to="/login" />}/>
        <Route path ="/SignUp" element={!isAuth ? <SignUp/> : <Navigate to="/Profilepage" />}/>
        <Route path ="/login" element={!isAuth ? <Login/> : <Navigate to="/" />}/>
        <Route path ="/settingsPage" element={<SettingsPage/>}/>
        <Route path ="/ProfilePage" element={isAuth ? <ProfilePage/> : <Navigate to="/SignUp" />}/>
    </Routes>
    </>
  )
}

export default App
