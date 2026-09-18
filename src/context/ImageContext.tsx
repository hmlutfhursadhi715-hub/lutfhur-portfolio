import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  saveImageToStorage,
  getAllImagesFromStorage,
  removeImageFromStorage,
  clearAllStoredImages,
} from '../utils/imageStorage';

export function normalizeKey(key: string): string {
  if (!key) return '';
  return key
    .toLowerCase()
    .trim()
    .replace(/[-_.]/g, '')
    .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
}

interface ImageContextType {
  customImages: Record<string, string>;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  getImageSrc: (id: string, defaultSrc: string) => string;
  updateImage: (id: string, file: File) => Promise<void>;
  bulkAutoMatch: (files: FileList | File[]) => Promise<{ matched: number; matchedItems: string[] }>;
  resetImage: (id: string) => Promise<void>;
  resetAllImages: () => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    getAllImagesFromStorage().then((images) => {
      // Populate normalized aliases as well
      const expanded: Record<string, string> = { ...images };
      for (const [key, url] of Object.entries(images)) {
        const norm = normalizeKey(key);
        expanded[norm] = url;
        if (norm.startsWith('graphic')) {
          const num = norm.replace('graphic', '');
          expanded[`graphic-${num}`] = url;
          expanded[`graphic${num}.jpg`] = url;
        }
        if (norm === 'profile') {
          expanded['profile.jpg'] = url;
        }
      }
      setCustomImages(expanded);
    });
  }, []);

  const getImageSrc = (id: string, defaultSrc: string): string => {
    const normId = normalizeKey(id);
    const normDefault = normalizeKey(defaultSrc);

    if (customImages[id]) return customImages[id];
    if (customImages[normId]) return customImages[normId];
    if (customImages[defaultSrc]) return customImages[defaultSrc];
    if (customImages[normDefault]) return customImages[normDefault];

    return defaultSrc;
  };

  const updateImage = async (id: string, file: File): Promise<void> => {
    const norm = normalizeKey(id);
    await saveImageToStorage(norm, file, file.name);
    const objectUrl = URL.createObjectURL(file);

    setCustomImages((prev) => {
      const updated = { ...prev };
      updated[id] = objectUrl;
      updated[norm] = objectUrl;
      if (norm.startsWith('graphic')) {
        const num = norm.replace('graphic', '');
        updated[`graphic-${num}`] = objectUrl;
        updated[`graphic${num}.jpg`] = objectUrl;
      }
      if (norm === 'profile') {
        updated['profile.jpg'] = objectUrl;
      }
      return updated;
    });
  };

  const bulkAutoMatch = async (
    files: FileList | File[]
  ): Promise<{ matched: number; matchedItems: string[] }> => {
    const fileArray = Array.from(files);
    const matchedList: string[] = [];
    const newMap: Record<string, string> = { ...customImages };
    const assignedSlots = new Set<string>();

    const ALL_SLOTS = ['graphic1', 'graphic2', 'graphic3', 'graphic4', 'graphic5', 'graphic6'];
    const unassignedFiles: File[] = [];

    // Pass 1: Named pattern matching
    for (const file of fileArray) {
      const lower = file.name.toLowerCase();
      let targetId: string | null = null;

      if (
        lower.includes('whatsapp') ||
        lower.includes('profile') ||
        lower.includes('avatar') ||
        lower.includes('portrait')
      ) {
        targetId = 'profile';
      } else if (
        lower.includes('chanel') ||
        lower.includes('3746') ||
        lower.includes('graphic1') ||
        lower.includes('graphic-1') ||
        lower.includes('perfume')
      ) {
        targetId = 'graphic1';
      } else if (
        lower.includes('airbuds') ||
        lower.includes('buds') ||
        lower.includes('noise') ||
        lower.includes('graphic2') ||
        lower.includes('graphic-2')
      ) {
        targetId = 'graphic2';
      } else if (
        lower.includes('facebook') ||
        lower.includes('flavour') ||
        lower.includes('ice') ||
        lower.includes('mint') ||
        lower.includes('graphic3') ||
        lower.includes('graphic-3')
      ) {
        targetId = 'graphic3';
      } else if (
        lower.includes('poster 1') ||
        lower.includes('poster1') ||
        lower.includes('workshop') ||
        lower.includes('dawah') ||
        lower.includes('standee') ||
        lower.includes('graphic4') ||
        lower.includes('graphic-4')
      ) {
        targetId = 'graphic4';
      } else if (
        lower.includes('thumbnail') ||
        lower.includes('10000') ||
        lower.includes('10k') ||
        lower.includes('ai') ||
        lower.includes('graphic5') ||
        lower.includes('graphic-5')
      ) {
        targetId = 'graphic5';
      } else if (
        lower.includes('হিসাব') ||
        lower.includes('surah') ||
        lower.includes('কায়েম') ||
        lower.includes('ibrahim') ||
        lower.includes('quran') ||
        lower.includes('graphic6') ||
        lower.includes('graphic-6')
      ) {
        targetId = 'graphic6';
      }

      if (targetId && !assignedSlots.has(targetId)) {
        assignedSlots.add(targetId);
        await saveImageToStorage(targetId, file, file.name);
        const objUrl = URL.createObjectURL(file);
        newMap[targetId] = objUrl;
        if (targetId.startsWith('graphic')) {
          const num = targetId.replace('graphic', '');
          newMap[`graphic-${num}`] = objUrl;
          newMap[`graphic${num}.jpg`] = objUrl;
        } else if (targetId === 'profile') {
          newMap['profile.jpg'] = objUrl;
        }
        matchedList.push(`${file.name} ➔ ${targetId}`);
      } else {
        unassignedFiles.push(file);
      }
    }

    // Pass 2: Fallback for any unassigned files to available graphic slots
    const remainingSlots = ALL_SLOTS.filter((s) => !assignedSlots.has(s));
    for (let i = 0; i < unassignedFiles.length && i < remainingSlots.length; i++) {
      const file = unassignedFiles[i];
      const slot = remainingSlots[i];
      assignedSlots.add(slot);
      await saveImageToStorage(slot, file, file.name);
      const objUrl = URL.createObjectURL(file);
      newMap[slot] = objUrl;
      const num = slot.replace('graphic', '');
      newMap[`graphic-${num}`] = objUrl;
      newMap[`graphic${num}.jpg`] = objUrl;
      matchedList.push(`${file.name} ➔ ${slot}`);
    }

    setCustomImages(newMap);
    return {
      matched: matchedList.length,
      matchedItems: matchedList,
    };
  };

  const resetImage = async (id: string): Promise<void> => {
    const norm = normalizeKey(id);
    await removeImageFromStorage(norm);
    setCustomImages((prev) => {
      const copy = { ...prev };
      delete copy[id];
      delete copy[norm];
      if (norm.startsWith('graphic')) {
        const num = norm.replace('graphic', '');
        delete copy[`graphic-${num}`];
        delete copy[`graphic${num}.jpg`];
      }
      if (norm === 'profile') {
        delete copy['profile.jpg'];
      }
      return copy;
    });
  };

  const resetAllImages = async (): Promise<void> => {
    await clearAllStoredImages();
    setCustomImages({});
  };

  return (
    <ImageContext.Provider
      value={{
        customImages,
        isUploadModalOpen,
        setIsUploadModalOpen,
        getImageSrc,
        updateImage,
        bulkAutoMatch,
        resetImage,
        resetAllImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
