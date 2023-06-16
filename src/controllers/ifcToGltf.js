const axios = require('axios');

const ifcToGltfGET = (req, res) => {
  res.status(200).json({
    supported_methods: ["GET", "POST"],
    POST_request_data: "application/json",
    POST_response_data: "model/gltf+json",
  });
};

const ifcToGltfPOST = (req, res) => {
  // The data is retrieved out of the incoming HTTP POST request.
  const jsonPayload = req.body;

  axios.get(jsonPayload["ifc_location"], { responseType: 'arraybuffer' })
  .then((response) => {
    const ifcFile = Buffer.from(response.data, 'binary'); 

    let ifcConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: jsonPayload["ifc-to-collada_location"],
      headers: { 
        'Content-Type': 'application/ifc'
      },
      data: ifcFile,
    };

    return axios.request(ifcConfig);
  })
  .then((response) => {
    const colladaFile = Buffer.from(response.data, 'binary');

    let colladaConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: jsonPayload["collada-to-gltf_location"],
      headers: { 
        'Content-Type': 'application/collada+xml'
      },
      data: colladaFile,
    };

    return axios.request(colladaConfig);
  })
  .then((response) => {
    res.status(200).json(response.data);
  })
  .catch((error) => {
    console.log(error);

    // Handle the error and send an appropriate response to the client
    let errorMessage = 'An error occurred while processing the request.';
    if (error.response.status) {
      res.status(error.response.status).json(error.message)
    }

    res.status(500).json({ error: errorMessage });
  });
};

module.exports = {
  ifcToGltfGET,
  ifcToGltfPOST,
};
