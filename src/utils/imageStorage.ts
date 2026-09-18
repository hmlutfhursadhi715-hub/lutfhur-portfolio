// Client-side IndexedDB image storage helper
// Allows persisting user-uploaded high-res images directly in the browser

const DB_NAME = 'portfolio_assets_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_images';

export interface ImageItem {
  id: string; // 'profile' | 'graphic1' | 'graphic2' | 'graphic3' | 'graphic4' | 'graphic5' | 'graphic6'
  blob: Blob;
  name: string;
  updatedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImageToStorage(id: string, file: File | Blob, name: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const item: ImageItem = {
      id,
      blob: file,
      name,
      updatedAt: Date.now(),
    };
    const req = store.put(item);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getAllImagesFromStorage(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const items: ImageItem[] = req.result || [];
        const map: Record<string, string> = {};
        for (const item of items) {
          map[item.id] = URL.createObjectURL(item.blob);
        }
        resolve(map);
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to load images from IndexedDB:', err);
    return {};
  }
}

export async function removeImageFromStorage(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function clearAllStoredImages(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
