# CollectIO

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
MONGO_URI=mongodb://user:pass@host:port/collection?authSource=source
MONGO_OPTIONS=useMongoClient=true
FIRST_START_LOG=Server listening on port
PORT=7070
REST_PORT=8080
DB_USER=user
DB_PASS=pass
DB_HOST=host
DB_PORT=32777
DB_CHANNEL=collection
DB_PUBSUB=mqtt
DB_AUTO_SERVER=false
JWT_SECRET=do.not.read.it.is.secret
BASEPATH=/api/v1/
DEV_PORT=8080
DEVELOPMENT=false
VERIFY_SIGNATURE=i.can.open.doors
CLIENT_ID=alone.i.am.useless
SECRET_ID=do.not.read.it.is.secret
HASH_ALGORITHM=HS256
```

Fields for [cloudinary](https://cloudinary.com/)

```
COOKIE_SECRET=do.not.read.it.is.secret
CLOUDINARY_NAME==cloudinary
CLOUDINARY_API_SECRET=secret
CLOUDINARY_URL=cloudinary://sample
API_KEY=apikey
```

_Be aware of commiting this file in the repository!!!_

### Database

Check this [README](./db/mongodb/README.md) for setting up the database.

### Initial Data

Before running the server for the first time, you can itially add data to the database
by providing a js script under the updates folder. Here you can add more scripts in order
to update the database. Therefore, consider the semantic versioning.

A sample is already placed in this directory [initdata](./updates/1.0.0-initdata.js)

### Architecture

Here you can see a briefly sketch of the architecture:

<img src="./public/images/collect.io.architecture.png">

### Running the server

`npm start`, `nodemon start` or from **VS Code** select `dev start` or `prod start`.

### Open the Admin panel

In order to get access into the admin panel, you have to open following link

[admin panel](http://localhost:7070/keystone/signin)

The credentials are the one you have provided in the script placed in the updates folder.

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
- **KARPOS REST Api:**

## Roadmap

## License

See the [LICENSE](./LICENSE) file for licensing information.
