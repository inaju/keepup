import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getUser(user) {
 
console.log(user?.user,'user?.user')
    const noteCol = query(collection(db, "users"), where("uid", "==", user));
    const noteSnapShot = await getDocs(noteCol);
    const noteList = noteSnapShot.docs.map((doc) => doc.data());

    return noteList
   
  }
