const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { text } = require("express");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
});

module.exports = mongoose.model("menu", menuSchema);
