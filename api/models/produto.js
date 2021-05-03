const mongoose = require("mongoose");

var produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  imagem: String,
  permiteAlteracao: {
    type: Boolean,
    default: false,
  },
});

//Export the model
module.exports = mongoose.model("Produto", produtoSchema);
