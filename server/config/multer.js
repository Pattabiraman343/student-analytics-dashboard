import multer from "multer";

// Store files in memory (you can also save to disk if you want)
const storage = multer.memoryStorage();

export const upload = multer({ storage });