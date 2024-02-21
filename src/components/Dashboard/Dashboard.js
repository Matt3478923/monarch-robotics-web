import React from 'react';
import "./Dashboard.css";

export default function Dashboard() {
    return(
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
                    </div>
                    <div className="sidebarItem">
                        <p className="sidebarTitleH2">Me</p>
                        <a href="/preferences" className="sidebarLink">Preferences</a>
                    </div>
                </div>
            </div>
        </div>
    );
}