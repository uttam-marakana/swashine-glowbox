import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

/**
 * Save contact / product / dealer inquiry to Firestore "inquiries"
 */
export const submitInquiry = async (data) => {
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase not configured. Set VITE_FIREBASE_* in .env");
    return {
      success: false,
      error:
        "Firebase is not configured yet. Please use WhatsApp or set your Firebase keys in .env",
    };
  }

  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      product: data.product || "",
      message: data.message || "",
      city: data.city || "",
      business: data.business || "",
      volume: data.volume || "",
      source: data.source || "website",
      createdAt: serverTimestamp(),
      status: "new",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return {
      success: false,
      error: error.message || "Failed to save inquiry. Please try WhatsApp.",
    };
  }
};
