import { createContext, useContext, useEffect, useState } from "react";
import { simpleAuth as auth, db, simpleAuth } from "../firebase-config";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const differentData = 2;

  const logIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const logOut = async () => {
    window.location = "/";
    console.log("signing out");
    return await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithRedirect(auth, googleProvider);
  };
  const getUser = async () => {
    const unsubscribeData = onAuthStateChanged(auth, (currentuser) => {
      handleUser(currentuser);
    });
    return unsubscribeData;
  };

  useEffect(() => {
    getUser();
  }, [differentData]);

  const handleUser = async (currentuser) => {
    try {
      const user = currentuser;
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          console.log(user);
          await setDoc(doc(db, "users", user.email), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            picture: user.photoURL,
          });
          console.log("that is this");
        }
        // navigate("/");
      }
      // console.count();
      // window.location = "/";
    } catch (err) {
      console.error(err);
      // alert(err.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const unsubscribeFunc = onAuthStateChanged(auth, (currentuser) => {
  //   if (currentuser) handleUser(currentuser);
  //   console.log("Auth", currentuser);

  //   setUser(currentuser);
  // });

  // useEffect(() => {
  //   console.count()
  //   if (user) {
  //     // handleUser(user);
  //   }else{
  //     // unsubscribeFunc();
  //   }
  // }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, signInWithGoogle }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

// try {
//   const res = await signInWithPopup(simpleAuth, googleProvider);

//   const user = res.user;
//   const q = query(collection(db, "users"), where("uid", "==", user.uid));
//   const docs = await getDocs(q);
//   if (docs.docs.length === 0) {
//     console.log(user);
//     await setDoc(doc(db, "users", user.email), {
//       uid: user.uid,
//       name: user.displayName,
//       authProvider: "google",
//       email: user.email,
//       picture: user.photoURL,
//     });
//     // navigate("/");
//   }
//   window.location = "/";
// } catch (err) {
//   console.error(err);
//   alert(err.message);
// }
