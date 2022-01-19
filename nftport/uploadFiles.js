const FormData = require("form-data");
const fetch = require("node-fetch");
const basePath = process.cwd();
const fs = require("fs");

fs.readdirSync(`${basePath}/build/images`).forEach((file) => {
  const formData = new FormData();
  const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
  formData.append("file", fileStream);
});

let url = "https://api.nftport.xyz/v0/files";
