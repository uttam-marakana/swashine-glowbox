import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export async function listInquiries() {
  if (!isFirebaseConfigured || !db) return [];
  const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateInquiryStatus(id, status) {
  await updateDoc(doc(db, "inquiries", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteInquiry(id) {
  await deleteDoc(doc(db, "inquiries", id));
}
