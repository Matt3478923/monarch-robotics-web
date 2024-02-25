import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="dashboard">
                <div className="dashboardAnnouncements">
                    <h1 className="dashboardTitleH1">Announcements</h1>
                </div>
                <div className="dashboardAdministration">
                    <h1 className="dashboardTitleH1">Administration</h1>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Events</p>
                        <a href="/events" className="sidebarLink">Events</a>
                        <a href="/carpool" className="sidebarLink">Carpool</a>
                    </div>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Team</p>
                        <a href="/inventory" className="sidebarLink">Inventory</a>
                        <a href="/battery-managment" className="sidebarLink">Batteries</a>
                        <a href="/purchase-request" className="sidebarLink">Purchase Requests</a>
                        <br/>
                        <a href="/users" className="sidebarLink">Users</a>
                        <a href="/manage-users" className="sidebarLink">Manage Users</a>
                        <a href="/create-user" className="sidebarLink">Create User</a>
                    </div>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Me</p>
                        <Link to="/preferences" className="sidebarLink">
                            Preferences
                        </Link>
                    </div>
                </div>
            </div>
            <Button variant="link" onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    )
}