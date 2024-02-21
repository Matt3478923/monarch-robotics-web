import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';
import Events from '../Events/Events'
import Carpool from '../Carpool/Carpool';
import BMS from '../BMS/BMS'
import Inventory from '../Inventory/Inventory';
import Purchase from '../Purchase/Purchase';


function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <div className="menuBar">
                <div className="menuBarItem">
                    <a href="/" className="menuBarLink"><img className="menuBarImage" src="https://monarchrobotics.files.wordpress.com/2024/02/logo-2.png?w=2040"/></a>
                </div>
                <div className="menuBarItem">
                    <a href="/dashboard" className="menuBarLink">Dashboard</a>
                </div>
                <div className="menuBarItem">
                    <a href="/preferences" className="menuBarLink">Preferences</a>
                </div>
            </div>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/preferences">
                        <Preferences/>
                    </Route>
                    <Route path="/events">
                        <Events/>
                    </Route>
                    <Route path="/carpool">
                        <Carpool/>
                    </Route>
                    <Route path="/inventory">
                        <Inventory/>
                    </Route>
                    <Route path="/purchase-request">
                        <Purchase/>
                    </Route>
                    <Route path="/battery-managment">
                        <BMS/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;