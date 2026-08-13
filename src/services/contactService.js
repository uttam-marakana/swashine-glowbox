import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Save contact / product inquiry to Firestore collection "inquiries"
 */
export const submitInquiry = async (data) => {
  // Guard: placeholder config
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (!apiKey || apiKey === 'your_api_key' || apiKey === 'YOUR_API_KEY') {
    console.warn('Firebase not configured. Set VITE_FIREBASE_* in .env');
    return {
      success: false,
      error: 'Firebase is not configured yet. Please use WhatsApp or set your Firebase keys in .env',
    };
  }

  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      name: data.name || '',
      phone: data.phone || '',
      email: data.email || '',
      product: data.product || '',
      message: data.message || '',
      source: data.source || 'website',
      createdAt: serverTimestamp(),
      status: 'new',
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return {
      success: false,
      error: error.message || 'Failed to save inquiry. Please try WhatsApp.',
    };
  }
};
