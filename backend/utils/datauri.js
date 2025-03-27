import DataUriParser from "datauri/parser.js";
import path from "path";
const getDatauri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  // console.log("fdfaadfa");
  // console.log(file);
  return parser.format(extName, file.buffer);
};
export default getDatauri;
