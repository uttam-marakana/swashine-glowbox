import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const submitInquiry = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, error: error.message };
  }
};
