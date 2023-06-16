# IFC-to-glTF Controller Microservice
## Installation
To install this Microservice, make sure Node.js 19 or higher is installed on your device. Installing the Microservice can be done by running the following command. The command makes sure all the dependencies present in the [package.json](https://github.com/stelemme/microservice-cont-ifc-to-gltf/blob/main/package.json) file are correctly installed.
```
npm install
```
## Running the Microservice
The Microservice can be run normally or in development mode respectively with the following commands.
```
npm run start
npm run start:dev
```
## Using the Microservice
The functionality of this Microservice can be acces via the following endpoint.
  
[http://localhost:3000/cont/ifc-to-gltf](http://localhost:3000/cont/ifc-to-gltf)
  
The GET response of the endpoint returns a JSON object that specifies which methods and data types are supported by the endpoint. In this case, the data it needs to receive is a JSON object with the location of the IFC-file, and the two Microservices, given as a URL, and the authentication credentials. When a POST request is sent to this endpoint, the workflow sequence is activated. The axios npm package is used to handle the necessary HTTP requests inside the POST controller. After the sequence is done, when all the Microservices have subsequently fulfilled their task, the final response is returned to the client.

### Example JSON-Request
```
{
    "ifc_location": <location of the IFC-file>,
    "ifc-to-collada_location": <location of the IFC-to-COLLADA Microservice>,
    "collada-to-gltf_location": <location of the COLLADA-to-glTF Microservice>
}
```
