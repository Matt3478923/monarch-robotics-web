import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import "./Preferences.css"
import app from "../../firebase"
import { getDatabase, ref, set, get } from "firebase/database";

export default function Preferences() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail, logout } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {userID} = currentUser.id;

    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [notifyEmail, setNotifyEmail] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "users/users/"+userID+"/metadata");
            const snapshot = await get(dbRef);
            if(snapshot.exists()) {
                const targetObject = snapshot.val();
                setFirstName(targetObject.firstname)
                setLastName(targetObject.lastname)
                setNotifyEmail(targetObject.notificationemail)
            } else {
                alert("error");
            }
        }
        fetchData();
    }, [userID])


    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "users/users/"+userID+"/metadata");
        set(newDocRef, {
            firstname: firstName,
            lastname: lastName,
            notificationemail: notifyEmail
        }).then( () => {
            alert("data updated successfully")
        }).catch((error) => {
            alert("error: ", error.message);
        })
    }


    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })

    }

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
        <>
            <div className="settingsDiv">
                <h2 className="centeredTitle">Account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="centeredForm">
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            // ref={emailRef}
                            required
                            defaultValue={currentUser.email}
                            className="field"
                        />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordRef}
                            placeholder="Leave blank to keep the same"
                            className="field"
                        />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            // ref={passwordConfirmRef}
                            placeholder="Leave blank to keep the same"
                            className="field"
                        />
                    </Form.Group>
                    <Button disabled={loading} className="centeredButton" type="submit">
                        Update
                    </Button>
                    <Button variant="link" onClick={handleLogout} className="centeredButton">
                        Log Out
                    </Button>
                </Form>
                <br/>
                <h2 className="centeredTitle">Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="centeredForm">
                    <Form.Group id="email">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={firstName}
                            className="field"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={lastName}
                            className="field"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Form.Label>Notification Email</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={notifyEmail}
                            className="field"
                            onChange={(e) => setNotifyEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button onClick={overwriteData} className="centeredButton" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </>
    )
}