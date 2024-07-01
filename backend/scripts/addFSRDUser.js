const { getHashedString } = require("../helpers/bcrypt");
const FsrdUser = require("../models/FsrdUser");

const users = [
  {
    username: "16823233@mahasiswa.itb.ac.id",
    password: "widyawebsite",
    microsoftMail: "16823233@mahasiswa.itb.ac.id",
    displayName: "Widya Kamilatunnisa",
  },
  {
    username: "16823227@mahasiswa.itb.ac.id",
    password: "saskiawebsite",
    microsoftMail: "16823227@mahasiswa.itb.ac.id",
    displayName: "Saskia kanita Wahyono",
  },
  {
    username: "16823213@mahasiswa.itb.ac.id",
    password: "Ayasha213",
    microsoftMail: "16823213@mahasiswa.itb.ac.id",
    displayName: "Ayasha Pramesti Widyaningrum",
  },
];

const addFSRDUser = async () => {
  try {
    const collection = await FsrdUser.collection();

    for (let user of users) {
      const existingUser = await collection.findOne({ username: user.username });
      const existingUserEmail = await collection.findOne({ microsoftMail: user.username });
      if (existingUser || existingUserEmail) {
        console.log(existingUser || existingUserEmail);
        continue;
      }
      const createdAt = new Date();

      await collection.insertOne({
        username: user.username,
        nim: user.username.split("@")[0],
        password: getHashedString(user.password),
        displayName: user.displayName,
        microsoftMail: user.username,
        createdAt,
        lastOnline: createdAt,
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = addFSRDUser;
