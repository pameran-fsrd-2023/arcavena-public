require("dotenv").config();

const { MongoConnect, MongoClose } = require("./configs/MongoConnect");
const addPreviewImage = require("./scripts/old/addPreviewImage");

(async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await MongoConnect();
    await addPreviewImage();
  } catch (err) {
    console.log(err);
  } finally {
    await MongoClose();
    console.log("done");
    return;
  }
})();
