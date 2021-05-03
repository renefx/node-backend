const express = require("express");
const router = express.Router();

const Produto = require("../models/produto");

router.get("/", (req, res) => {
  let { pagina } = req.headers;
  pagina = pagina === undefined ? 0 : pagina;
  const elementos = 3,
    skipElementos = pagina * elementos;

  Produto.find()
    .skip(skipElementos)
    .limit(elementos)
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/", function (req, res, next) {
  let produto = new Produto({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
    imager: req.body.imagem,
    pemiteAlteracao: req.body.pemiteAlteracao,
  });

  produto
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({ produto: doc });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "MongoError" && err.code === 11000) {
        res
          .status(409)
          .send({ mensagem: "Produto já existente!", erro: err.message });
      } else {
        next(err);
      }
    });
});

router.get("/image/:produtoId", (req, res) => {
  const { produtoId } = req.params;
  res.send("👌");
});

router.get("/:produtoId", (req, res) => {
  const { produtoId } = req.params;
  Produto.find({
    _id: produtoId,
  })
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.patch("/:produtoId", function (req, res) {
  const { produtoId } = req.params;
  const updateParams = {};
  for (const param of Object.keys(req.body)) {
    updateParams[param] = req.body[param];
  }
  Produto.updateOne({ _id: produtoId }, { $set: updateParams })
    .then((doc) => {
      console.log(doc);
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.delete("/:produtoId", function (req, res) {
  const { produtoId } = req.params;
  Produto.remove({
    _id: produtoId,
  })
    .then((doc) => {
      console.log(doc);
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
