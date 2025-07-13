const { getOrders, getOrdersById } = require("../models/queryOrder");

const readOrders = async (req, res) => {
  try {
    const prod = await getOrders();

    res.send(prod);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

const readOrdersById = async (req, res) => {
  try {
    const userId = req.user.id;

    const prod = await getOrdersById(userId);

    res.send(prod);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
};

module.exports = {
  readOrders,
  readOrdersById,
};
