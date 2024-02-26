import React, { useState, useEffect } from 'react';
import app from '../../firebase';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import './Announcement.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Announcement() {
    const { currentUser } = useAuth();
    const current = new Date();

    let [title, setTitle] = useState('');
    let [text, setText] = useState('');
    let [author, setAuthor] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                const userId = currentUser.uid;
                const db = getDatabase(app);

                try {
                    const firstNameRef = ref(db, `users/users/${userId}/metadata/firstname`);
                    const lastNameRef = ref(db, `users/users/${userId}/metadata/lastname`);

                    console.log('Fetching first name data from:', firstNameRef.toString());
                    console.log('Fetching last name data from:', lastNameRef.toString());

                    const firstNameSnapshot = await get(firstNameRef);
                    const lastNameSnapshot = await get(lastNameRef);

                    console.log('First Name Snapshot:', firstNameSnapshot.val());
                    console.log('Last Name Snapshot:', lastNameSnapshot.val());

                    if (firstNameSnapshot.exists() && lastNameSnapshot.exists()) {
                        const firstName = firstNameSnapshot.val();
                        const lastName = lastNameSnapshot.val();
                        const fullName = `${firstName} ${lastName}`;

                        console.log('Fetched user data:', { firstName, lastName, fullName });

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
        if (!currentUser) {
            console.error('No current user.');
            return;
        }

        const db = getDatabase(app);
        const newDocRef = push(ref(db, 'announcements/messages'));

        set(newDocRef, {
            title: title,
            text: text,
            author: author,
            authorid: currentUser.uid,
            date: Number(current),
            datestring: `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`,
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
            <h1>Create Announcement</h1>
            <div className="centeredForm">
                <h2 className="centeredTitle">Title</h2>
                <input
                    className="field"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <h2 className="centeredTitle">Text</h2>
                <textarea
                    className="field"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button className="centeredButton" onClick={saveData}>
                    Post
                </button>
            </div>
        </div>
    );
}
