const FormData = require("form-data");
const fetch = require("node-fetch");
const path = require("path");
const basePath = process.cwd();
const fs = require("fs");

fs.readdirSync(`E:\\Projects\\generative-art-node\\build\\images`).forEach(
  (file) => {
    const formData = new FormData();
    const fileStream = fs.createReadStream(
      `E:\\Projects\\generative-art-node\\build\\images\\${file}`
    );
    formData.append("file", fileStream);

    let url = "https://api.nftport.xyz/v0/files";

    let options = {
      method: "POST",
      headers: {
        Authorization: "", // API Token
      },
      body: formData,
    };

    fetch(url, options)
      .then((res) => res.json()) // IPFS url response
      .then((json) => {
        const fileName = path.parse(json.file_name).name; // get processed file name
        let raw_data = fs.readFileSync(
          `E:\\Projects\\generative-art-node\\build\\meta\\_metadata.json`
        );
        let meta_data = JSON.parse(raw_data);
        // Set IPFS url
        for (let i = 0; i < meta_data.length; i++) {
          if (String(meta_data[i].edition) == fileName) {
            meta_data[i].ipfs_url = json.ipfs_url;
          }
        }
        fs.writeFileSync(
          `E:\\Projects\\generative-art-node\\build\\meta\\_metadata.json`, // write generated ipfs_url to metadata json file
          JSON.stringify(meta_data, null, 2)
        );
        console.log(`${json.file_name} uploaded & _metadat.json updated`);
      })
      .catch((err) => console.error("error: " + err));
  }
);
