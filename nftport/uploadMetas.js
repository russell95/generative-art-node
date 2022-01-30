const fs = require("fs");

// Submit ipfs_url to metadata API
let raw_data = fs.readFileSync(`../build/meta/_metadata.json`);
let meta_data = JSON.parse(raw_data);
for (let i = 0; i < meta_data.length; i++) {
  let url = "https://api.nftport.xyz/v0/metadata";
  let options = {
    method: "POST",
    headers: {
      Authorization: "", // API Token
    },
    body: meta_data[i], // JSON payload according to nftport structure
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      meta_array.push(json);
      console.log(`${json.name} metadata uri created`);
    })
    .catch((err) => console.error("error:" + err));
}
fs.writeFileSync("_ipfsMetas.json", JSON.stringify(meta_array));
console.log("metadata uploaded & added to _ipfsMetas.json");
