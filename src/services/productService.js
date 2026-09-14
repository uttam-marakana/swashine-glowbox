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
  const payload = { ...data };
  delete payload.firestoreId;
  delete payload.source;

  const ref = await addDoc(collection(db, COL), {
    ...payload,
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
      "This product is from company.js. Use Save (upsert) or Seed first.",
    );
  }
  const payload = { ...data };
  delete payload.firestoreId;
  delete payload.source;

  await updateDoc(doc(db, COL, firestoreId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Create or update — allows editing company.js items without seed first.
 * Keeps frameViews, gallery, etc. on the document.
 */
export async function upsertProduct(form) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }

  const payload = { ...form };
  const firestoreId = payload.firestoreId || null;
  delete payload.firestoreId;
  delete payload.source;

  if (firestoreId) {
    await updateDoc(doc(db, COL, firestoreId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
    return firestoreId;
  }

  const ref = await addDoc(collection(db, COL), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
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
