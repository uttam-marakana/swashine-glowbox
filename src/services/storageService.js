import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, isFirebaseConfigured } from "./firebase";

export async function uploadProductImage(productKey, file) {
  if (!isFirebaseConfigured || !storage) {
    throw new Error("Firebase Storage is not configured");
  }
  const safe = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `products/${productKey}/${Date.now()}_${safe}`;
  const r = ref(storage, path);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);
  return { url, path };
}
