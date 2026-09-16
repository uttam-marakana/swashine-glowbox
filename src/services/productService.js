import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { products as staticProducts } from "@/data/company";

const COL = "products";

/** slug → { image, gallery } from company.js (Vite-resolved local URLs) */
function getLocalMediaBySlug() {
  const map = {};
  for (const p of staticProducts || []) {
    if (!p?.slug) continue;
    const image = p.image || "";
    const gallery =
      Array.isArray(p.gallery) && p.gallery.length
        ? p.gallery
        : image
          ? [image]
          : [];
    map[p.slug] = { image, gallery };
  }
  return map;
}

/**
 * Firebase/static details + local images only.
 * Images never come from Firestore paths (those break on Vercel).
 */
function mergeWithLocalImages(data, firestoreId = null, source = "firestore") {
  const local = getLocalMediaBySlug()[data.slug] || {
    image: "",
    gallery: [],
  };

  return {
    ...data,
    firestoreId,
    source,
    image: local.image,
    gallery: local.gallery,
  };
}

export function getStaticProducts() {
  return (staticProducts || []).map((p) => ({
    ...p,
    firestoreId: null,
    source: "company.js",
  }));
}

/** Admin list — still show Firestore fields; attach local images for preview */
export async function listProductsAdmin() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, COL));
      if (!snap.empty) {
        const list = snap.docs.map((d) =>
          mergeWithLocalImages(d.data(), d.id, "firestore"),
        );
        list.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
        return list;
      }
    } catch (e) {
      console.warn("Firestore products failed, using company.js", e);
    }
  }
  return getStaticProducts();
}

/** Public site: details from Firestore, images from company.js */
export async function listProductsPublic() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, COL));
      if (!snap.empty) {
        const list = snap.docs.map((d) =>
          mergeWithLocalImages(d.data(), d.id, "firestore"),
        );
        list.sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));
        return list;
      }
    } catch (e) {
      console.warn("listProductsPublic failed, using company.js", e);
    }
  }
  return getStaticProducts();
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const list = await listProductsPublic();
  return list.find((p) => p.slug === slug) || null;
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
        return mergeWithLocalImages(snap.data(), snap.id, "firestore");
      }
    } catch (e) {
      console.warn(e);
    }
  }

  const staticList = getStaticProducts();
  return (
    staticList.find((p) => p.slug === firestoreIdOrSlug) ||
    staticList.find((p) => String(p.id) === String(firestoreIdOrSlug)) ||
    null
  );
}

/** Strip image fields so Firebase never stores broken /src paths */
function detailsOnly(data) {
  const payload = { ...data };
  delete payload.firestoreId;
  delete payload.source;
  delete payload.image;
  delete payload.gallery;
  return payload;
}

export async function createProduct(data) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Firebase not configured — cannot save. Products are read from company.js.",
    );
  }
  const payload = detailsOnly(data);
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
  await updateDoc(doc(db, COL, firestoreId), {
    ...detailsOnly(data),
    updatedAt: serverTimestamp(),
  });
}

export async function upsertProduct(form) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }

  const firestoreId = form.firestoreId || null;
  const payload = detailsOnly(form);

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

/**
 * Seed details only (optional). Images stay in company.js.
 * Skips image/gallery so Vercel never depends on Firestore photo URLs.
 */
export async function seedProductsFromCompany() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }
  const existing = await getDocs(collection(db, COL));
  if (!existing.empty) {
    return {
      seeded: 0,
      message:
        "Firestore already has products. Edit in Admin — seed only runs on an empty collection.",
    };
  }
  let count = 0;
  for (const p of staticProducts) {
    const { frameViews, image, gallery, ...rest } = p;
    await addDoc(collection(db, COL), {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    count += 1;
  }
  return {
    seeded: count,
    message: `Seeded ${count} products (details only; images from company.js)`,
  };
}
