import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

// Function to submit form data
export const submitFormData = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "formSubmissions"), formData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting form data:", error);
    return { success: false, error };
  }
};
