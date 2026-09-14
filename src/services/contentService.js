import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  instagramFeed as staticIg,
  faqs as staticFaqs,
  catalogs as staticCatalogs,
} from "@/data/company";

async function getSettings(key, fallbackItems) {
  if (!isFirebaseConfigured || !db) {
    return { items: fallbackItems || [], source: "company.js" };
  }
  try {
    const snap = await getDoc(doc(db, "settings", key));
    if (snap.exists() && Array.isArray(snap.data().items)) {
      return { items: snap.data().items, source: "firestore" };
    }
  } catch (e) {
    console.warn(e);
  }
  return { items: fallbackItems || [], source: "company.js" };
}

async function saveSettings(key, items) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }
  await setDoc(
    doc(db, "settings", key),
    { items, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export const getInstagramFeedAdmin = () =>
  getSettings("instagram", staticIg || []);
export const saveInstagramFeed = (items) => saveSettings("instagram", items);

export const getFaqsAdmin = () => getSettings("faqs", staticFaqs || []);
export const saveFaqs = (items) => saveSettings("faqs", items);

export const getCatalogsAdmin = () =>
  getSettings("catalogs", staticCatalogs || []);
export const saveCatalogs = (items) => saveSettings("catalogs", items);

// ——— Global FrameExplorer images (same on all products) ———

const defaultFrameViews = {
  front: "",
  back: "",
  top: "",
  bottom: "",
};

export async function getFrameViewsAdmin() {
  if (!isFirebaseConfigured || !db) {
    return { ...defaultFrameViews, source: "empty" };
  }
  try {
    const snap = await getDoc(doc(db, "settings", "frameViews"));
    if (snap.exists()) {
      const d = snap.data();
      return {
        front: d.front || "",
        back: d.back || "",
        top: d.top || "",
        bottom: d.bottom || "",
        source: "firestore",
      };
    }
  } catch (e) {
    console.warn(e);
  }
  return { ...defaultFrameViews, source: "empty" };
}

export async function getFrameViewsPublic() {
  const data = await getFrameViewsAdmin();
  const { source, ...views } = data;
  return views;
}

export async function saveFrameViews(frameViews) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase not configured");
  }
  await setDoc(
    doc(db, "settings", "frameViews"),
    {
      front: frameViews.front || "",
      back: frameViews.back || "",
      top: frameViews.top || "",
      bottom: frameViews.bottom || "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}