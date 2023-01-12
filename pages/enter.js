import debounce from "lodash.debounce";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context.js";
import { auth, firestore, googleAuthProvider } from "../lib/firebase.js";
import Image from "next/image.js";
import '@styles/Admin.module.css'
// @ts-ignore
// @ts-ignore
//testing
export default function EnterPage(props) {
  const { user, username } = useContext(UserContext);
  //1. user signed Out <SignInButton/>
  //2. user signed in, but missing username <UsernameForm / >
  //3. user signed  in, has username <SignOutButton/>>
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
//sign in with google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <div className="  flex justify-center ounded  p-5  mt-72">
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/300/300221.png"}
        alt="Google Icon"
        height={100}
        width={100}
        className="shadow-xl rounded-full"
      />
      <button className="btn-google ml-4 shadow-lg" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
}

//sign Out
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);
  // useEffect(() => {
  //   checkUsername(formValue);
  // }, [formValue]);

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // const checkUsername = useCallback(
  //   debounce(async (username) => {
  //     if (username.length >= 3) {
  //       const ref = firestore.doc(`usernames/${username}`);
  //       const { exists } = await ref.get();
  //       console.log("Firestore read executed");
  //       setIsValid(!exists);
  //       setLoading(false);
  //     }
  //   }, 500),
  //   []
  // );

  const onSubmit = async (e) => {
    e.preventDefault();
    // @ts-ignore
    const userDoc = firestore.doc(`users/${user.uid}`);
    // @ts-ignore
    const usernameDoc = firestore.doc(`username/${formValue}`);
    const batch = firestore.batch();
    // @ts-ignore
    batch.set(userDoc, {
      username: formValue,
      // @ts-ignore
      photoURL:
        user.photoURL ||
        "https://bestprofilepictures.com/wp-content/uploads/2020/06/Anonymous-Profile-Picture.jpg",
      // @ts-ignore
      displayName: user.displayName,
    });
    // @ts-ignore
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid : {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

// @ts-ignore
function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
