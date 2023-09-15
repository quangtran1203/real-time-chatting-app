import React, { useRef, useState } from "react";
import './App.css';
import firebase from 'firebase/compat/app';
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import db from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, limit, addDoc, Timestamp } from "firebase/firestore";


function App() {

  const [user] = useAuthState(auth);  // listener to any update on user


  return (
    <div className="App">
      <header>
        <h2>Real-time messaging app</h2>
        <SignOut />
      </header>
      <section>
        {user ? <Chat /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const onClickSignIn = () => {
    signInWithPopup(auth, provider);
  }

  return (
    <button onClick={onClickSignIn}>
      SIGN IN
    </button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SIGN OUT</button>
  )
}

function Chat() {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(30));
  const [messages] = useCollectionData(q, { idField: "id" });
  const [formVal, setFormVal] = useState('');
  const { uid, photoURL } = auth.currentUser;
  const marked = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      text: formVal,
      uid,
      photoURL,
      createdAt: Timestamp.now(),
    });
    setFormVal('');
    marked.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <main>
        {messages && messages.map(m => <ChatMessage key={m.id} message={m} />)}
        <div ref={marked}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formVal} onChange={(e) => setFormVal(e.target.value)} />
        <button type="submit">➡️</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const mClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${mClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>

  );
}

export default App;
