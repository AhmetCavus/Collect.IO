const socketService = require("./socketService");

class PubSubService {

    init(server) {
        socketService.init(server)
    } 

    createChannel(channelName) {
        var socketResult = socketService.createChannel(channelName);

        // TODO: Do other steps before delivering the result if neccessary

        return socketResult;
    }

    sendBroadcast(message, channelName) {
        socketService.sendBroadcast(message, channelName);
    }

    notifyAddItemCollection(schema, item) {
        socketService.notifyAddItemCollection(schema, item);
    }
    
    notifyRemoveItem(schema, item) {
        socketService.notifyRemoveItem(schema, item);
    }
	
	notifyUpdateCollection(schema, items) {
        socketService.notifyUpdateCollection(schema, items);
    }

    notifyUpdateCollectionItem(schema, item) {
        socketService.notifyUpdateCollectionItem(schema, item);
	}
	
	setOnDisconnectedListener(onDisconnectListener) {
		socketService.setOnDisconnectedListener(onDisconnectListener);
	}

}

module.exports = new PubSubService()