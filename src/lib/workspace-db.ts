import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface WorkspaceFile {
  id: string;
  name: string;
  type: string; // 'gif' | 'mp4' | 'webm' etc.
  createdAt: Date;
  tool: string; // 'gif-converter', 'video-compressor', 'video-converter', etc.
  blob: Blob;
}

interface WorkspaceDB extends DBSchema {
  files: {
    key: string; // id
    value: WorkspaceFile;
    indexes: { 'by-createdAt': Date; 'by-tool': string };
  };
}

const DB_NAME = 'lmt-workspace';
const DB_VERSION = 1;
const STORE_NAME = 'files';

const initDB = async (): Promise<IDBPDatabase<WorkspaceDB>> => {
  return openDB<WorkspaceDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('by-createdAt', 'createdAt');
      store.createIndex('by-tool', 'tool');
    },
  });
};

/**
 * Add a file to the workspace database.
 * Automatically ensures total files ≤ 10 by deleting the oldest if needed.
 */
export async function addFile(fileBlob: Blob, meta: { name: string; type: string; tool: string }): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const index = store.index('by-createdAt');

  // Generate unique ID
  const id = crypto.randomUUID();
  const file: WorkspaceFile = {
    id,
    name: meta.name,
    type: meta.type,
    createdAt: new Date(),
    tool: meta.tool,
    blob: fileBlob,
  };

  await store.add(file);
  await tx.done;

  // Auto‑cleanup: keep only the 10 most recent files
  const allKeys = await index.getAllKeys();
  if (allKeys.length > 10) {
    const excess = allKeys.length - 10;
    const oldestKeys = allKeys.slice(0, excess); // sorted ascending by date
    const cleanupTx = db.transaction(STORE_NAME, 'readwrite');
    const cleanupStore = cleanupTx.objectStore(STORE_NAME);
    await Promise.all(oldestKeys.map(key => cleanupStore.delete(key)));
    await cleanupTx.done;
  }
}

/**
 * Retrieve the 10 most recent files, sorted newest first.
 */
export async function getRecentFiles(): Promise<WorkspaceFile[]> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const index = store.index('by-createdAt');

  // Get all entries sorted by createdAt ascending (oldest first)
  const all = await index.getAll();
  // Reverse to have newest first, then take first 10
  const recent = all.reverse().slice(0, 10);
  await tx.done;
  return recent;
}

/**
 * Delete a file by its ID.
 */
export async function deleteFile(id: string): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.delete(id);
  await tx.done;
}

/**
 * Clear the entire workspace (for debugging or user action).
 */
export async function clearWorkspace(): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
}