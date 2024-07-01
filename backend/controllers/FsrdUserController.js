const getFilePath = require("../helpers/getFilePath");
const { CustomError } = require("../middlewares/ErrorHandler");
const FsrdUser = require("../models/FsrdUser");
const Karya = require("../models/Karya");

class FsrdUserController {
  static async put(req, res, next) {
    try {
      const currentUser = res.locals.user;

      const { profilePic, karya1, karya2, karya3, karya4, karya5 } = req.files;
      const {
        karya1Id: oldKarya1Id,
        karya2Id: oldKarya2Id,
        karya3Id: oldKarya3Id,
        karya4Id: oldKarya4Id,
        karya5Id: oldKarya5Id,
        karya1Name,
        karya2Name,
        karya3Name,
        karya4Name,
        karya5Name,
        karya1Prodi,
        karya2Prodi,
        karya3Prodi,
        karya4Prodi,
        karya5Prodi,
        karya1Dimensi,
        karya2Dimensi,
        karya3Dimensi,
        karya4Dimensi,
        karya5Dimensi,
        karya1Media,
        karya2Media,
        karya3Media,
        karya4Media,
        karya5Media,
        displayName,
        socialMedia,
        prodi: notFormattedProdi,
      } = req.body;

      let prodi = notFormattedProdi.toLowerCase().replace(/\s+/g, "-");

      const uploadKarya = async (_id, title, matkul, fileName, dimensi, media, isHighLight) => {
        title = title === "undefined" ? "" : title;
        matkul = matkul === "undefined" ? "" : matkul;
        _id = _id === "undefined" ? "" : _id;
        dimensi = dimensi === "undefined" || dimensi === "null" ? "" : dimensi;
        media = media === "undefined" || media === "null" ? "" : media;
        const username = displayName.replace(/\s+/g, "-").toLowerCase();

        if (_id && _id !== "undefined" && !fileName) {
          const { imgUrl } = await Karya.findOne({ _id });
          await Karya.update({
            _id,
            title: title === "undefined" ? "" : title,
            matkul: matkul === "undefined" ? "" : matkul,
            imgUrl: imgUrl === "undefined" ? "" : imgUrl,
            dimensi,
            prodi,
            UserId: currentUser._id,
            username,
            media,
            isHighLight,
          });
          return _id;
        }

        if (fileName) {
          if (_id) {
            const oldKarya = await Karya.findOne({ _id });
            if (oldKarya) {
              await Karya.delete({ _id });
            }
          }
          const { insertedId } = await Karya.create({
            title,
            matkul,
            imgUrl: process.env.BASE_URL + "/uploads/" + fileName,
            UserId: currentUser._id,
            dimensi,
            prodi,
            username,
            media,
            isHighLight,
          });
          return insertedId.toString();
        }

        if (title || matkul) {
          if (_id) {
            const oldKarya = await Karya.findOne({ _id });
            if (oldKarya) {
              await Karya.delete({ _id });
            }
          }
          const { insertedId } = await Karya.create({
            title,
            matkul,
            imgUrl: "",
            UserId: currentUser._id,
            prodi,
            dimensi,
            username,
            media,
            isHighLight,
          });
          return insertedId.toString();
        }

        return "";
      };

      const karya1Id = await uploadKarya(
        oldKarya1Id,
        karya1Name,
        karya1Prodi,
        karya1?.[0]?.filename,
        karya1Dimensi,
        karya1Media,
        true
      );
      const karya2Id = await uploadKarya(
        oldKarya2Id,
        karya2Name,
        karya2Prodi,
        karya2?.[0]?.filename,
        karya2Dimensi,
        karya2Media,
        false
      );
      const karya3Id = await uploadKarya(
        oldKarya3Id,
        karya3Name,
        karya3Prodi,
        karya3?.[0]?.filename,
        karya3Dimensi,
        karya3Media,
        false
      );
      const karya4Id = await uploadKarya(
        oldKarya4Id,
        karya4Name,
        karya4Prodi,
        karya4?.[0]?.filename,
        karya4Dimensi,
        karya4Media,
        false
      );
      const karya5Id = await uploadKarya(
        oldKarya5Id,
        karya5Name,
        karya5Prodi,
        karya5?.[0]?.filename,
        karya5Dimensi,
        karya5Media,
        false
      );

      if (profilePic?.[0]?.filename) {
        await FsrdUser.update({
          _id: currentUser._id,
          displayName,
          prodi,
          socialMedia: JSON.parse(socialMedia),
          profilePicUrl: process.env.BASE_URL + "/uploads/" + profilePic[0].filename,
          karya1Id,
          karya2Id,
          karya3Id,
          karya4Id,
          karya5Id,
        });
      } else {
        await FsrdUser.update({
          _id: currentUser._id,
          displayName,
          prodi,
          socialMedia: JSON.parse(socialMedia),
          profilePicUrl: currentUser.profilePicUrl,
          karya1Id,
          karya2Id,
          karya3Id,
          karya4Id,
          karya5Id,
        });
      }

      res.status(200).json("OK!");
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { nim } = req.params;

      let user;
      try {
        user = await FsrdUser.findOne({ microsoftMail: `${nim}@mahasiswa.itb.ac.id` });
        if (!user) throw "NOT FOUND";
      } catch {
        user = await FsrdUser.findOne({ username: `${nim}@mahasiswa.itb.ac.id` });
      }
      const emptyKarya = { _id: "", title: "", prodi: "", imgUrl: "", UserId: "", createdAt: "" };
      if (user) {
        user = new FsrdUser(user);
        user.karyas = [
          user.karya1Id ? await Karya.findOne({ _id: user.karya1Id }) : emptyKarya,
          user.karya2Id ? await Karya.findOne({ _id: user.karya2Id }) : emptyKarya,
          user.karya3Id ? await Karya.findOne({ _id: user.karya3Id }) : emptyKarya,
          user.karya4Id ? await Karya.findOne({ _id: user.karya4Id }) : emptyKarya,
          user.karya5Id ? await Karya.findOne({ _id: user.karya5Id }) : emptyKarya,
        ];
      } else {
        user = {
          _id: "",
          nim: "",
          displayName: "",

          prodi: "",
          socialMedia: "",

          profilePicUrl: "",

          karya1Id: "",
          karya2Id: "",
          karya3Id: "",
          karya4Id: "",
          karya5Id: "",

          createdAt: "",
          lastOnline: "",
        };
        user.karyas = [emptyKarya, emptyKarya, emptyKarya, emptyKarya, emptyKarya];
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getAllNIM(req, res, next) {
    try {
      const data = (await FsrdUser.findAll()).map((el) => new FsrdUser(el).nim);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = FsrdUserController;
