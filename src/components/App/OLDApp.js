import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import Events from '../Events/Events'
import Carpool from '../Carpool/Carpool';
import BMS from '../BMS/BMS'
import Inventory from '../Inventory/Inventory';
import Purchase from '../Purchase/Purchase';
import CreateUser from "../CreateUser/CreateUser";
import Users from "../Users/Users";
import UserManagement from "../UserManagment/UserManagment";
import {AuthProvider} from "../../contexts/AuthContext";
import {Container} from "react-bootstrap";
import {Router} from "express";
import PrivateRoute from "../PrivateRoute/PrivateRoute"


function OLDApp() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <div className="wrapper">
                    <div className="menuBar">
                        <div className="menuBarItem">
                            <a href="/" className="menuBarLink"><img className="menuBarImage"
                                                                     src="https://monarchrobotics.files.wordpress.com/2024/02/logo-2.png?w=2040" alt="Logo"/></a>
                        </div>
                        <div className="menuBarItem">
                            <a href="/dashboard" className="menuBarLink">Dashboard</a>
                        </div>
                        <div className="menuBarItem">
                            <a href="/preferences" className="menuBarLink">Preferences</a>
                        </div>
                    </div>
                </div>
                <Route path="/" element={
                           <PrivateRoute>
                               <Dashboard />
                           </PrivateRoute>
                       }
                />
            </div>
        </Container>
    );
}

export default OLDApp;