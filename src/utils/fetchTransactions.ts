import { db } from "@/firebase";
import { Transaction } from "@/type";
import { collection, getDocs } from "firebase/firestore";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Transaction"));
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Transaction[];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch transactions");
  }
};
