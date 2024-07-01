const path = require("path");

const getFilePath = (urlUploaded) => {
  if (!urlUploaded) return "";

  const temp = urlUploaded.split("/");
  const fileName = temp[temp.length - 1];

  return path.join(__dirname, "../public/uploads", fileName);
};

module.exports = getFilePath;
