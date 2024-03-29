import React from "react"
import Signup from "../CreateUser/CreateUser"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
import Login from "../Login/Login"
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import PrimaryRouter from "../PrivateRoute/PrimaryRouter"
import LeadRouter from "../PrivateRoute/LeadRoute"
import ForgotPassword from "../ForgotPassword/ForgotPassword"
import Preferences from "../Preferences/Preferences";
import "./App.css"
import Carpool from "../Carpool/Carpool";
import BMS from "../BMS/BMS";
import Events from "../Events/Events";
import Inventory from "../Inventory/Inventory";
import Purchase from "../Purchase/Purchase";
import NewPost from "../Announcement/Announcement"
import AccessDenied from "../AccessDenied/AccessDenied";
import CreateUser from "../CreateUser/CreateUser"
import CreateEvent from "../CreateEvent/Event"

function App() {
    return (
        <Container>
            <div className="wrapper">
                <div className="menuBar">
                    <div className="menuBarItem">
                        <a href="/" className="menuBarLink"><img className="menuBarImage"
                                                                 src="https://monarchrobotics.files.wordpress.com/2024/02/logo-2.png?w=2040"
                                                                 alt="Logo"/></a>
                    </div>
                    <div className="menuBarItem">
                        <a href="/" className="menuBarLink">Dashboard</a>
                    </div>
                    <div className="menuBarItem">
                        <a href="/preferences" className="menuBarLink">Preferences</a>
                    </div>
                </div>
            </div>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path='/' element={<PrivateRoute/>}>
                            <Route exact path='/' element={<Dashboard/>}/>
                        </Route>
                        <Route exact path='/create-announcement' element={<LeadRouter/>}>
                            <Route exact path='/create-announcement' element={<NewPost/>}/>
                        </Route>
                        <Route exact path='/create-event' element={<LeadRouter/>}>
                            <Route exact path='/create-event' element={<CreateEvent/>}/>
                        </Route>
                        <Route exact path='/create-user' element={<LeadRouter/>}>
                            <Route exact path='/create-user' element={<CreateUser/>}/>
                        </Route>
                        <Route exact path='/preferences' element={<PrivateRoute/>}>
                            <Route exact path='/preferences' element={<Preferences/>}/>
                        </Route>
                        <Route exact path='/battery-managment' element={<PrivateRoute/>}>
                            <Route exact path='/battery-managment' element={<BMS/>}/>
                        </Route>
                        <Route exact path='/purchase-request' element={<PrivateRoute/>}>
                            <Route exact path='/purchase-request' element={<Purchase/>}/>
                        </Route>
                        <Route exact path='/inventory' element={<PrivateRoute/>}>
                            <Route exact path='/inventory' element={<Inventory/>}/>
                        </Route>
                        <Route exact path='/carpool' element={<PrivateRoute/>}>
                            <Route exact path='/carpool' element={<Carpool/>}/>
                        </Route>
                        <Route exact path='/events' element={<PrivateRoute/>}>
                            <Route exact path='/events' element={<Events/>}/>
                        </Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/access-denied' element={<AccessDenied />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </Container>
    )
}

export default App