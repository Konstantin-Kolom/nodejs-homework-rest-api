// const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');

// const avatarsDir = path.join(__dirname, '../../publik/avatars');

const uploadAvatars = async (req, res) => {
  //   const { _id } = req.user;
  //   const { path: tempUpload, originalname } = req.file;
  //   const resultUploaded = path.join(avatarsDir, originalname);
  //   try {
  //     await fs.rename(tempUpload, resultUploaded);
  //     res.status(201).json({
  //       status: 'success',
  //       code: 201,
  //       message: 'avatar uploaded',
  //     });
  //   } catch (error) {
  //     await fs.unlink(tempUpload);
  //   }
};

module.exports = uploadAvatars;
