const HomeBlock = require("../Models/HomePageBlock");

const createHomeBlocks = async (req, res) => {
  let { title, description, image, link, linkText } = req.body;
  let homeBlocks = await HomeBlock.find();
  let length = homeBlocks.length;
  try {
    let newBlock = await HomeBlock.create({
      title,
      description,
      image,
      link,
      linkText,
      number: length,
    });
    res.status(200).send(newBlock);
  } catch (error) {
    console.log(error);
  }
};
const getHomeBlocks = async (req, res) => {
  try {
    const homeBlocks = await HomeBlock.find();
    homeBlocks.sort((a, b) => {
      if (a.number < b.number) {
        return -1;
      }
      if (a.nombre > b.nombre) {
        return 1;
      }
      return 0;
    });
    res.status(200).send(homeBlocks);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHomeBlocks, createHomeBlocks };
