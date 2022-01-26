const fs = require("fs");

// Create ipfsMeta json to hold metadata_uri
fs.writeFileSync(
  `E:\\Projects\\generative-art-node\\build\\json\\_ipfsMetas.json`,
  ""
);
const writer = fs.createWriteStream(
  `E:\\Projects\\generative-art-node\\build\\json\\_ipfsMetas.json`,
  {
    flags: "a",
  }
);

let meta_array = [];

// Submit ipfs_url to metadata API
let raw_data = fs.readFileSync(
  `E:\\Projects\\generative-art-node\\build\\meta\\_metadata.json`
);
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
    })
    .catch((err) => console.error("error:" + err));
}
writer.write(JSON.stringify(json, null, 2));
writer.end();
console.log("metadata uploaded & added to _ipfsMetas.json");
