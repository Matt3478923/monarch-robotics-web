import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            <h1 className="pageTitle">Dashboard</h1>
            <div className="dashboard">
                <div className="dashboardAnnouncements">
                    <h1 className="dashboardTitleH1">Announcements</h1>
                </div>
                <div className="dashboardAdministration">
                    <h1 className="dashboardTitleH1">Administration</h1>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Events</p>
                        <Link to="/events" className="sidebarLink">Events</Link>
                        <Link to="/carpool" className="sidebarLink">Carpool</Link>
                    </div>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Team</p>
                        <Link to="/inventory" className="sidebarLink">Inventory</Link>
                        <Link to="/battery-managment" className="sidebarLink">Batteries</Link>
                        <Link to="/purchase-request" className="sidebarLink">Purchase Requests</Link>
                    </div>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Me</p>
                        <Link to="/preferences" className="sidebarLink">Preferences</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}