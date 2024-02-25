import React from "react"
import Signup from "../CreateUser/CreateUser"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
import Login from "../Login/Login"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import ForgotPassword from "../ForgotPassword/ForgotPassword"
import UpdateProfile from "../Preferences/Preferences"
import Preferences from "../Preferences/Preferences";

function App() {
    return (
        <Container
        >
            <div className="w-100">
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route exact path='/' element={<PrivateRoute/>}>
                                <Route exact path='/' element={<Dashboard/>}/>
                            </Route>
                            <Route exact path='/preferences' element={<PrivateRoute/>}>
                                <Route exact path='/preferences' element={<Preferences/>}/>
                            </Route>
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/forgot-password' element={<ForgotPassword />} />
                        </Routes>
                    </AuthProvider>
                </Router>
            </div>
        </Container>
    )
}

export default App