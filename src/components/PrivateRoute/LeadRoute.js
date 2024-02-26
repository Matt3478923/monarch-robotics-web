import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import app from '../../firebase';
import { getDatabase, ref, get } from 'firebase/database';

export default function PrivateRoute() {
    const { currentUser } = useAuth();
    const [userRole, setUserRole] = useState(-1); // Set to a loading state

    useEffect(() => {
        // Function to fetch user role from Firebase database
        async function fetchUserRole() {
            if (currentUser) {
                const db = getDatabase(app);
                const userRef = ref(db, `users/users/${currentUser.uid}`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserRole(snapshot.val().role);
                        console.log("userData:", snapshot.val().role);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        }

        fetchUserRole();
    }, [currentUser]);

    console.log("currentUser:", currentUser);
    console.log("userRole:", userRole);

    // Check if user is logged in and has a valid role
    const isValidUser = currentUser && userRole !== -1 && [0, 1, 2, 3, 4, 5, 6].includes(userRole);

    console.log("isValidUser:", isValidUser);

    if (userRole === -1) {
        // Return loading state or another component if needed
        return <p>Loading...</p>;
    }

    return isValidUser ? <Outlet /> : <Navigate to="/access-denied" />;
}
