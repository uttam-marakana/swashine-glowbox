import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import {
  instagramFeed as staticIg,
  faqs as staticFaqs,
  catalogs as staticCatalogs,
} from "@/data/company";

// Local frame images (project folder — no Firebase Storage)
import frontImg from "@/assets/images/frame-editor/frame_front.png";
import backImg from "@/assets/images/frame-editor/frame_back.png";
import topImg from "@/assets/images/frame-editor/frame_top.png";
import bottomImg from "@/assets/images/frame-editor/frame_bottom.png";

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
    { merge: true },
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

// ——— Global FrameExplorer images (local assets) ———

const defaultFrameViews = {
  front: frontImg,
  back: backImg,
  top: topImg,
  bottom: bottomImg,
};

export async function getFrameViewsAdmin() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, "settings", "frameViews"));
      if (snap.exists()) {
        const d = snap.data();
        return {
          front: d.front || defaultFrameViews.front,
          back: d.back || defaultFrameViews.back,
          top: d.top || defaultFrameViews.top,
          bottom: d.bottom || defaultFrameViews.bottom,
          source: "firestore",
        };
      }
    } catch (e) {
      console.warn(e);
    }
  }
  return { ...defaultFrameViews, source: "local" };
}

export async function getFrameViewsPublic() {
  const data = await getFrameViewsAdmin();
  const { source, ...views } = data;
  return views;
}

export async function saveFrameViews(frameViews) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "Frame images are local. Replace files in src/assets/images/Frame Editor/",
    );
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
    { merge: true },
  );
}
