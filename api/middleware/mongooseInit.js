const mongoose = require("mongoose");
const IpBloqueado = require("../models/ipBloqueado");
const middleware = require("./middleware");

const preencherIpsBloqueados = async () => {
  try {
    let ipBloqueados = await IpBloqueado.find({
      bloqueado: true,
    }).select("ip");
    middleware.setFilterIPs(ipBloqueados.map((ipObj) => ipObj.ip));
  } catch (error) {
    middleware.setFilterIPs([]);
  }
};

const init = () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.yhk3s.mongodb.net/china-box-business?retryWrites=true&w=majority`;

  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (!err) {
        preencherIpsBloqueados();
        console.log(`App conectou com mongo com sucesso!`);
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
};

module.exports = {
  init,
};
