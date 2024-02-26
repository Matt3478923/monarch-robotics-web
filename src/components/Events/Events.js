import React, {useEffect, useState} from 'react';
import "./Events.css"
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {get, getDatabase, ref} from "firebase/database";
import app from "../../firebase";

export default function Events() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    let [eventArray, setEventArray] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const db = getDatabase(app);
            const dbRef = ref(db, "events/events");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const newArray = Object.values(snapshot.val());

                // Filter out events with startdate in the past
                const filteredArray = newArray.filter(item => new Date(item.startdate) > new Date());

                // Sort the filteredArray by startdate
                filteredArray.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));

                setEventArray(filteredArray);
            } else {
                alert("error");
            }
        };
        getPosts();
    }, []);
    return(
        <div className="eventsDiv">
            <h1>Events</h1>
            <Link to="/create-event" className="sidebarLink">Create Event</Link>
            <div>
                <div className="announcements">
                    {eventArray.reverse().map((item, index) => (
                        <div key={index} className="announcementCard">
                            <h2 className="announcementTitle">{item.startdatestring} - {item.enddatestring}</h2>
                            <h3 className="announcementTitle">{item.title}</h3>
                            <p className="announcementInfo">{item.type}, {item.author}</p>
                            <p className="announcementText">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}