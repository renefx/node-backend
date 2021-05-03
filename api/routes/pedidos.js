const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Pedido = require("../models/pedido");
const Produto = require("../models/produto");

module.exports = router;

router.get("/", (req, res) => {
  Pedido.find()
    .populate("lista.idProduto") // .populate("user", "-password -someOtherField -AnotherField")
    .then((doc) => {
      console.log(doc);
      res.send(doc);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/", async function (req, res, next) {
  const { nomeUsuario, lista } = req.body;
  const listaIdProduto = lista.map((elem) => {
    return elem.idProduto;
  });
  const totalEncontrados = await Produto.countDocuments({
    _id: { $in: listaIdProduto },
  });

  if (listaIdProduto.length != totalEncontrados) {
    res.status(406).send({ mensagem: "Produtos não encontrados" });
    return;
  }

  let pedido = new Pedido({
    nomeUsuario: nomeUsuario,
    lista: lista,
  });

  pedido
    .save()
    .then((doc) => {
      console.log(doc);
      res.send({ pedido: doc });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/:pedidoId", (req, res) => {
  const { pedidoId } = req.params;
  Pedido.find({
    _id: pedidoId,
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

router.delete("/:pedidoId", function (req, res) {
  const { pedidoId } = req.params;
  Pedido.remove({
    _id: pedidoId,
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
