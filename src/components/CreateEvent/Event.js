import React, { useState, useEffect } from 'react';
import app from '../../firebase';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import './Event.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Announcement() {
    const { currentUser } = useAuth();
    const current = new Date();

    let [title, setTitle] = useState('');
    let [text, setText] = useState('');
    let [author, setAuthor] = useState('');
    let [startDate, setStartDate] = useState('');
    let [endDate, setEndDate] = useState('');
    let [eventType, setEventType] = useState('');
    let [eventLocation, setEventLocation] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userId = currentUser.uid;
                const db = getDatabase(app);

                try {
                    const firstNameRef = ref(db, `users/users/${userId}/metadata/firstname`);
                    const lastNameRef = ref(db, `users/users/${userId}/metadata/lastname`);

                    const firstNameSnapshot = await get(firstNameRef);
                    const lastNameSnapshot = await get(lastNameRef);

                    if (firstNameSnapshot.exists() && lastNameSnapshot.exists()) {
                        const firstName = firstNameSnapshot.val();
                        const lastName = lastNameSnapshot.val();
                        const fullName = `${firstName} ${lastName}`;

                        setAuthor(fullName);
                    } else {
                        console.log('First name or last name not found in the database.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            }
        };


        fetchUserData();
    }, [currentUser]);

    const saveData = async () => {
        console.error(startDate);
        if (!currentUser) {
            console.error('No current user.');
            return;
        }

        const db = getDatabase(app);
        const newDocRef = push(ref(db, 'events/events'));

        set(newDocRef, {
            title: title,
            description: text,
            author: author,
            authorid: currentUser.uid,
            startdate: Number(Date.parse(startDate)),
            enddate: Number(Date.parse(endDate)),
            startdatestring: formatDate(startDate),
            enddatestring: formatDate(endDate),
            location: eventLocation,
            type: eventType,
        })
            .then(() => {
                alert('Post Created');
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    };

    return (
        <div className="pageDiv">
            <h1>Create Event</h1>
            <div className="centeredForm">
                {/*end date, start date*/}
                <p className="centeredTitle">Title</p>
                <input
                    className="field"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <p className="centeredTitle">Start</p>
                <input
                    className="field"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <p className="centeredTitle">End</p>
                <input
                    className="field"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <p className="centeredTitle">Text</p>
                <textarea
                    className="field"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <p className="centeredTitle">Location</p>
                <input
                    className="field"
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                />

                <select name="type" id="type" className="field" value={eventType}
                        onChange={(e) => setEventType(e.target.value)}>
                    <option value="Meeting">Meeting</option>
                    <option value="Practice">Practice</option>
                    <option value="Competition">Competition</option>
                    <option value="Showcase">Showcase</option>
                </select>


                <button className="centeredButton" onClick={saveData}>
                    Post
                </button>
            </div>
        </div>
    );
}
