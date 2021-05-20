# DB initialization

If you're using the "autoDbStart=true" option, you've to consider following step:

_Do not remove this file!!!_
The folder "db/mongodb" is necessary for the startup of the server.

## Getting Started

### Installation

The operating sysem of the server should provide [mongodb](https://www.mongodb.com/de) locally.
Collect.IO uses mongodb to store and persist the data necessary for any kind of application.

Therefore download and install the community edition of mongodb as described in the instructions at the [official pages](https://www.mongodb.com/try/download/community).

After installation mongodb, check if **mongod** and **mongo** commands are available in your terminal. If not, you have to register your mongo executable path in the environments of your operation system.
