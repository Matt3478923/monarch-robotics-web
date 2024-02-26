import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import app from '../../firebase';
import { getDatabase, ref, get } from 'firebase/database';

export default function AccessDenied() {
    const { currentUser } = useAuth();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Function to fetch user role from Firebase database
        async function fetchUserRole() {
            if (currentUser) {
                const db = getDatabase(app);
                const userRef = ref(db, `users/users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUserRole(snapshot.val().role);
                }
            }
        }

        fetchUserRole();
    }, [currentUser]);

    return (
        <div>
            <h1>Access Denied</h1>
            {currentUser && (
                <p>Your current role is: {userRole !== null ? userRole : 'Loading...'}</p>
            )}
        </div>
    );
}