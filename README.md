# CollectIO

![Build Status](https://dev.azure.com/cinary/Collect.IO/_apis/build/status/AhmetCavus.Collect.IO?branchName=main)
![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/cinary/collect.io/7)
![Azure DevOps tests](https://img.shields.io/azure-devops/tests/cinary/collect.io/7)
![npm](https://img.shields.io/npm/v/collectio-cms)

A lightweight headless CMS built on top of the classic KeystoneJS.
The main purpose is to providing convenient services in order to
automate following features:

- auth management
- token management
- providing model mapping
- security management
- service connections

As mentioned before, this framework is based on the classic version of [Keystone.js](https://v4.keystonejs.com/) offering
[nested lists](https://www.npmjs.com/package/keystone-nestedlist).

The server is customized so that the system is maintainable easily by the admin panel.

## Getting Started

### Installation

`git clone https://github.com/AhmetCavus/Collect.IO.git`

or

`git clone git@github.com:AhmetCavus/Collect.IO.git`

`cd .\Collect.IO\`

or

`cd Collect.IO`

`npm i`

### Configuration

First of all, you have to provide an env file '.env' in your project root folder.
This file should contain following keys:

Mandatory fields

```
MONGO_URI=mongodb://user:pass@host:port/collection?authSource=admin
JWT_SECRET=do.not.read.it.is.jwt.secret
VERIFY_SIGNATURE=i.can.open.doors
CLIENT_ID=alone.i.am.useless
SECRET_ID=do.not.read.it.is.client.secret
```

Fields for [cloudinary](https://cloudinary.com/)

```
COOKIE_SECRET=do.not.read.it.is.cookie.secret
CLOUDINARY_NAME==cloudinary
CLOUDINARY_API_SECRET=secret
CLOUDINARY_URL=cloudinary://sample
API_KEY=apikey
```

_Be aware of commiting this file in the repository!!!_

### Database

Check this [README](./db/mongodb/README.md) for setting up the database.

### Initial Data

Before running the server for the first time, you can initially add data to the database
by providing a js script under the updates folder. Here you can add more scripts in order
to update the database. Therefore, consider the semantic versioning.

A sample is already placed in this directory [initdata](./updates/1.0.0-initdata.js)

### Architecture

Here you can see a briefly sketch of the architecture:

<img src="./public/images/collect.io.architecture.png">

### Running the server

`npm start`, `nodemon start` or from **VS Code** select `dev start` or `prod start`.

### Usage

```nodejs
const CollectIO = require("../core/collectio.app")
const collectio = new CollectIO.App()

collectio.start({autoDbStart: false, adminPort: 8181}).then(() => {
  console.log("Collectio is up and running")

  collectio.config((app, express) => {
    app.get("/test", (req, res) => {
      res.sendFile(__dirname + "/core/public/index.html")
    })
  })
})
```

For more information check the unit test project folder.

### Options

In order to configurate the server and ports, you can specify following values on startup:

```nodejs
collectio.start(options)
```

| Key           | Description                                                                | Default                                    |
| -----------   | :------------------------------------------------------------------------- | :----------------------------------------- |
| adminPort     | Specify the port for the admin panel                                       | 3000                                       |
| restPort      | Specify the port for the rest API                                          | 8080                                       |
| autoDbStart   | Whether auto start the db engine or not                                    | false                                      |
| autoUpdate    | Whether auto update the db with the scripts from the updates folder or not | false                                      |
| updatePath    | The path of the directory, where the update scripts are placed             | updates                                    |
| nav           | A JSON Object representing the nav graph regarding to the models           | { account: ["admins", "clients", "roles"]} |
| modelPath     | The path of the models, that should be registered in the db                |                                            |
| secureRestApi | Whether to auto secure the Rest API with the secrets in the environment    | true                                       |

### Open the Admin panel

In order to get access into the admin panel, you have to open following link

[admin panel](http://[host]:[specified admin port]/keystone/signin)

The credentials are the one you have provided in the script placed in the updates folder.
Moreover, if you customized the admin port, you have to set the correct port number.

### Accessing to collections

In order to access the collection provided in the models, you can simply call the code below

```nodejs
const device = collectio.collection("device")
// device.model is the mongoose schema
```
After that, collectio provides you convenient methods to notify observers

| Function    | Description                                                                |
| ----------- | :------------------------------------------------------------------------- |
| sendBroadcast(message, channelName) | Send a broadcast to all oberservers registererd to the given channel name |
| notifyAddItemCollection(schema, item) | Notify all oberservers listening to changes for the given schema and provide the new created item |
| notifyRemoveItem(schema, item) | Notify all oberservers listening to changes for the given schema and provide the removed item |
| notifyUpdateCollection(schema, items) | Notify all oberservers listening to changes for the given schema and provide the items of the changed collection |
| notifyUpdateCollectionItem(schema, item) | Notify all oberservers listening to changes for the given schema and provide the updated item of the collection |

For every model schema in your models path, a collection will be created in the database. In addition, it will be supplied with bi-directional communication through sockets. You can get further detail in the API calls section.

### API calls

An OpenAPI Spec will be provided here. TBD

### Creating models

For instructions of creating models, you can check the docu of the classic KeystoneJS [How to create models](https://v4.keystonejs.com/api/field/options)

In order to create nested list, check following sample file: [TodoModel](./app/models/todo.js)

### Playground

You can enter the playground by calling `localhost:8080` in your browser.

### Tests

npm test

## Requirements

**Node:**

- NodeJS >= 10.16 <=14
- NPM >= 6.x

**Database:**

- MongoDB >= 3.6
- ...

**We recommend always using the latest version of minio to start your new projects**.

## Features

- **Auth service:**
- **Token service:**
- **Auto db connection:**
- **Model service:**
- **Web socket support:**
- **CollectIO REST Api:**

## Roadmap

## License

See the [LICENSE](./LICENSE) file for licensing information.
