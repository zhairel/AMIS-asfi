import { FormData } from '@/types/form';

const STORAGE_KEY = 'asfi_membership_draft';
const META_KEY = 'asfi_membership_draft_meta';
const DB_NAME = 'asfi_registration_db';
const DB_VERSION = 1;
const STORE_NAME = 'draft_files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDraftFiles(files: Record<string, string | null | undefined>): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    for (const [key, val] of Object.entries(files)) {
      if (val) {
        store.put(val, key);
      } else {
        store.delete(key);
      }
    }
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    // Silently continue if IndexedDB is blocked or disabled
    console.warn('Draft files could not be saved to IndexedDB:', err);
  }
}

export async function loadDraftFiles(): Promise<Record<string, string | null>> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const keys = ['photo2x2', 'applicantId', 'beneficiaryId', 'guardianId'];
    const results: Record<string, string | null> = {};

    await Promise.all(
      keys.map((k) => {
        return new Promise<void>((resolve) => {
          const req = store.get(k);
          req.onsuccess = () => {
            results[k] = req.result || null;
            resolve();
          };
          req.onerror = () => {
            results[k] = null;
            resolve();
          };
        });
      })
    );
    return results;
  } catch {
    return {};
  }
}

export async function clearDraftFiles(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    // Ignore error
  }
}

export function saveDraftState(
  formData: FormData,
  step: number,
  completedSteps: number[]
): void {
  if (typeof window === 'undefined') return;
  try {
    const forStorage = { ...formData };
    delete (forStorage as any).photo2x2;
    delete (forStorage as any).applicantId;
    delete (forStorage as any).beneficiaryId;
    delete (forStorage as any).guardianId;
    delete (forStorage as any).signatureDataUrl;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(forStorage));
    localStorage.setItem(
      META_KEY,
      JSON.stringify({
        step,
        completedSteps,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (err) {
    console.warn('Failed to save draft to localStorage:', err);
  }

  // Also store documents in IndexedDB so large files persist without exceeding localStorage quota
  saveDraftFiles({
    photo2x2: formData.photo2x2,
    applicantId: formData.applicantId,
    beneficiaryId: formData.beneficiaryId,
    guardianId: formData.guardianId,
  });
}

export async function loadDraftState(): Promise<{
  formData: Partial<FormData>;
  step: number;
  completedSteps: number[];
  savedAt: string | null;
  hasDraft: boolean;
}> {
  if (typeof window === 'undefined') {
    return { formData: {}, step: 1, completedSteps: [], savedAt: null, hasDraft: false };
  }

  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const rawMeta = localStorage.getItem(META_KEY);

    if (!rawData) {
      return { formData: {}, step: 1, completedSteps: [], savedAt: null, hasDraft: false };
    }

    const parsedData = JSON.parse(rawData);
    let step = 1;
    let completedSteps: number[] = [];
    let savedAt: string | null = null;

    if (rawMeta) {
      try {
        const meta = JSON.parse(rawMeta);
        step = Number(meta.step) || 1;
        completedSteps = Array.isArray(meta.completedSteps) ? meta.completedSteps : [];
        savedAt = meta.savedAt || null;
      } catch {
        // ignore
      }
    }

    // Check if there is meaningful data entered
    const hasMeaningfulData = Boolean(
      parsedData.firstName?.trim() ||
      parsedData.lastName?.trim() ||
      parsedData.contactNumber?.trim() ||
      parsedData.presentAddress?.trim() ||
      parsedData.beneficiaryFirstName?.trim() ||
      step > 1
    );

    if (!hasMeaningfulData) {
      return { formData: {}, step: 1, completedSteps: [], savedAt: null, hasDraft: false };
    }

    // Load files from IndexedDB
    const files = await loadDraftFiles();
    const fullFormData = {
      ...parsedData,
      ...files,
    };

    return {
      formData: fullFormData,
      step,
      completedSteps,
      savedAt,
      hasDraft: true,
    };
  } catch {
    return { formData: {}, step: 1, completedSteps: [], savedAt: null, hasDraft: false };
  }
}

export async function clearDraftState(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(META_KEY);
    await clearDraftFiles();
  } catch {
    // Ignore error
  }
}
