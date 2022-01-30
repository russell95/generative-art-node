const fs = require("fs");

let raw_data = fs.readFileSync(`_ipfsMetas.json`);
let meta_data = JSON.parse(raw_data);

meta_data.forEach((meta) => {
  let url = "https://api.nftport.xyz/v0/mints/customizable";
  const mint_payload = {
    chain: "polygon",
    contract_address: "", // deployed contract address
    metadata_uri: meta.meta_uri,
    mint_to_address: "", // meta mask wallet
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "", // API Token
    },
    body: JSON.stringify(mint_payload),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      console.log(`Minted ${json.transaction_external_url}`);
    })
    .catch((err) => console.error("error:" + err));
});
