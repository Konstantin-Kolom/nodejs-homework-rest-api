const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { Unauthorized, BadRequest } = require('http-errors');

const avatarsDir = path.join(__dirname, '../../publiс/avatars');
const tempDir = path.join(__dirname, '../../temp');

const updateAvatars = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;
  const resultUploaded = path.join(avatarsDir, imageName);

  const [, extension] = req.file.mimetype.split('/');

  if (extension !== 'png') {
    fs.unlink(tempUpload);
    throw new BadRequest(`Invalid file format. Only *.png can be uploaded`);
  }

  await Jimp.read(`${tempDir}/${originalname}`)
    .then(avatar => {
      return avatar.resize(250, 250).write(`${tempDir}/${originalname}`);
    })
    .catch(err => {
      console.error(err);
    });

  try {
    await fs.rename(tempUpload, resultUploaded);
    const avatarURL = path.join('../../publiс/avatars', imageName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(201).json({
      status: 'success',
      code: 200,
      message: 'avatar uploaded',
      avatarURL,
      imageName,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw new Unauthorized(`Not authorized`);
  }
};

module.exports = updateAvatars;
