const path = require("path");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const descriptionGET = (req, res) => {
  var options = {
    root: path.join(__dirname, "..", "..", "public"),
    headers: {
      Server: "My Node.js Server",
      "Content-Type": "text/html",
    },
  };
  res.status(200).sendFile("some-operation.html", options);
};

const someOperationGET = (req, res) => {
  const fileUrl = 'http://localhost:3000/test/Duplex.ifc'

  axios
  .get(fileUrl, { responseType: 'arraybuffer' })
  .then((response) => {
    const data = Buffer.from(response.data, 'binary'); 

    const ifcData = new FormData();
    ifcData.append('ifcFile', data, 'Duplex.ifc');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3003/cnv/IFCtoDAE',
      headers: ifcData.getHeaders(),
      data: ifcData,
    };

    axios
      .request(config)
      .then((response) => {
        const daeFileName = 'base-files/daeFile-' + Date.now() + '.dae'
        const daeFilePath = path.join(__dirname, '..', '..', daeFileName);
        fs.writeFile(daeFilePath, response.data, 'binary', (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error saving the file' }); 
          } else {
            console.log('File saved successfully:', daeFilePath);

            let daeData = new FormData();
            daeData.append('daeFile', fs.createReadStream(path.join(__dirname, '..', '..', daeFileName)));

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'http://localhost:3001/cnv/IFCtoGLTF',
              headers: { 
                ...daeData.getHeaders()
              },
              data : daeData
            };

            axios.request(config)
            .then((response) => {
              const gltfFileName = 'base-files/gltfFile-' + Date.now() + '.gltf'
              const gltfFilePath = path.join(__dirname, '..', '..', gltfFileName);
              fs.writeFile(gltfFilePath, JSON.stringify(response.data), 'binary', (error) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ message: 'Error saving the file' }); 
                } else {
                  console.log('File saved successfully:', gltfFilePath);
                  res.status(200).json(response.data);
                  deleteFile(daeFilePath)
                  deleteFile(gltfFilePath)
                }
              })
            })
            .catch((error) => {
              res.status(404);
              console.log(error);
            });
          }
        });
      })
      .catch((error) => {
        res.status(404);
        console.log(error);
      });
  })
  .catch((error) => {
    res.status(404);
    console.log(error);
  });
};

const deleteFile = (path) => {
  try {
      fs.unlinkSync(path)
      console.log('File deleted successfully: ' + path)
  } catch (err) {
      console.error(err)
  }
}

module.exports = {
  descriptionGET,
  someOperationGET,
};
