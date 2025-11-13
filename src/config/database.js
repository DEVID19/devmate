const mongooes = require("mongoose");

const connectDB = async () => {
  await mongooes.connect(
    "mongodb+srv://namastedev:TestPass123@namastenode.ojzvwdy.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
