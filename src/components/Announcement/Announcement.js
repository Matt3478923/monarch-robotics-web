import React, {useState} from 'react';
import app from "../../firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import "./Announcement.css"
import { useAuth } from "../../contexts/AuthContext"


export default function Announcement() {
    const current = new Date();

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [author, setAuthor] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "announcements/messages"));
        set(newDocRef, {
            title: title,
            text: text,
            author: author,
            date: Number(current),
            datestring: `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`,
        }).then( () => {
            alert("data saved successfully")
        }).catch((error) => {
            alert("error: ", error.message);
        })
    }

    return(
        <div className="pageDiv">
            <h1>Create Announcement</h1>
            <div className="centeredForm">
                <h2 className="centeredTitle">Author</h2>
                <input className="field" type='text' value={author}
                       onChange={(e) => setAuthor(e.target.value)}/>

                <h2 className="centeredTitle">Title</h2>
                <input className="field" type='text' value={title}
                       onChange={(e) => setTitle(e.target.value)}/>

                <h2 className="centeredTitle">Text</h2>
                <textarea className="field" type='text' value={text}
                          onChange={(e) => setText(e.target.value)}/>

                <button className="centeredButton" onClick={saveData}>Post</button>
            </div>
        </div>
    );
}