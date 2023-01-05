import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export async function getData(user,collectionName) {

    const datacol = query(collection(db,collectionName), where("user", "==", user.uid));
    const data = await getDocs(datacol);
    const dataList = data.docs.map((doc) => doc.data());
    console.log(dataList,'dataList')
    return dataList
    // setNoteData(noteList.filter((item) => item.user === user?.uid));
   
  }