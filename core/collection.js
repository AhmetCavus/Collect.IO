class Collection {

    constructor(list) {
        this.list = list
    }
    
    activateChannel() {
        this.pubSubService = require("./services/connection/pubSubService")
        this.pubSubService.createChannel(this.list.name)
    }
    
    notifyAddItemCollection(item) {
        this.pubSubService.notifyAddItemCollection(this.list.name, item)
    }

    notifyRemoveItem(item) {
        this.pubSubService.notifyRemoveItem(this.list.name, item)
    }

    notifyUpdateCollection(items) {
        this.pubSubService.notifyUpdateCollection(this.list.name, items)
    }

    notifyUpdateCollectionItem(item) {
        this.pubSubService.notifyUpdateCollectionItem(this.list.name, item)
    }

    setOnDisconnectedListener(onDisconnectListener) {
        this.pubSubService.setOnDisconnectedListener(onDisconnectListener)
    }

    get name() {
        return this.list.name
    }

    get schema() {
        return this.list.instance.schema
    }

    get model() {
        return this.list.instance.model
    }
}

module.exports = Collection    