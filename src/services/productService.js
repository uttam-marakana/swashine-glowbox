import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { products as staticProducts } from "@/data/company";

const COL = "products";

/** Normalize static company.js products for admin UI */
export function getStaticProducts() {
  return (staticProducts || []).map((p) => ({
    ...p,
    firestoreId: null,
    source: "company.js",
  }));
}

/**
 * Prefer Firestore if it has docs; otherwise fall back to company.js
 */
export async function listProductsAdmin() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COL), orderBy("id", "asc"));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({
          firestoreId: d.id,
          source: "firestore",
          ...d.data(),
        }));
      }
    } catch (e) {
      console.warn("Firestore products failed, using company.js", e);
    }
  }
  return getStaticProducts();
}

export async function getProductAdmin(firestoreIdOrSlug) {
  // Firestore doc id
  if (
    isFirebaseConfigured &&
    db &&
    firestoreIdOrSlug &&
    firestoreIdOrSlug !== "new"
  ) {
    try {
      const snap = await getDoc(doc(db, COL, firestoreIdOrSlug));
      if (snap.exists()) {
        return { firestoreId: snap.id, source: "firestore", ...snap.data() };
      }
    } catch (e) {
      console.warn(e);
    }
  }

  // Fallback: company.js by slug or numeric id
  const staticList = getStaticProducts();
  const found =
    staticList.find((p) => p.slug === firestoreIdOrSlug) ||
    staticList.find((p) => String(p.id) === String(firestoreIdOrSlug));
  return found || null;
}

export async function createProduct(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase not configured — cannot save. Products are read from company.js.",
    );
  }
  const ref = await addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProduct(firestoreId, data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase not configured — edit company.js or configure Firebase.",
    );
  }
  if (!firestoreId) {
    throw new Error(
      "This product is from company.js. Seed it to Firestore first to edit online.",
    );
  }
  await updateDoc(doc(db, COL, firestoreId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(firestoreId) {
  if (!firestoreId) {
    throw new Error(
      "Cannot delete company.js product from admin. Remove it in data/company.js.",
    );
  }
  await deleteDoc(doc(db, COL, firestoreId));
}

/** One-time: copy all company.js products into Firestore */
export async function seedProductsFromCompany() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }
  const existing = await getDocs(collection(db, COL));
  if (!existing.empty) {
    return { seeded: 0, message: "Firestore already has products. Skip seed." };
  }
  let count = 0;
  for (const p of staticProducts) {
    await addDoc(collection(db, COL), {
      ...p,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    count += 1;
  }
  return { seeded: count, message: `Seeded ${count} products from company.js` };
}
