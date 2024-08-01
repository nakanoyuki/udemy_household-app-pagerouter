import { db } from "@/firebase";
import { Schema } from "@/validations/schema";
import { addDoc, collection } from "firebase/firestore";

export const handleSaveTransaction = async (transaction: Schema) => {
  try {
    const docRef = await addDoc(collection(db, "Transaction"), transaction);
  } catch (err) {
    console.log(err);
  }
};
