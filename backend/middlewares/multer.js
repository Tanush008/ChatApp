import multer from "multer";
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("avatar");
// export const multipleUpload = multer({ storage }).array("file", 10);
