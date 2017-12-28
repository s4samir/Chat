var chatModule = chatModule || {};

chatModule.createUsers = (function() {
    "use strict"
    var User = function(name, id) {
        this.name = name;
        this.id = id;

    };
    User.prototype.udpateChatBox = function(chatBox) {
        this.chatBox = chatBox;
        this.chatList = chatBox.find(".chatList");
    }

    User.prototype.subscribeforMessage = function() {

        MessageEventPubSub.subscribe(this.id, this.addMessage, this);
        return "Leave";
    };

    User.prototype.publishMessage = function(data) {

        MessageEventPubSub.publish(this.id, this.name, data);
    };

    User.prototype.unsubscribefromMessage = function() {

        MessageEventPubSub.unsubscribe(this.id);
        return "Join";
    };

    User.prototype.addMessage = function(msg, name, id) {

        var tempLi = $("#liTemplate").find("li").eq(0).clone(false);
        var message = this.id === id ? "Me : " + msg : name + " : " + msg;
        tempLi.text(message);
        this.chatList.append(tempLi);
    };

    User.prototype.retrivePreviousMsg = function() {
        MessageEventPubSub.retrivePreviousMsg(this.id);
    }

    return {
        User: User
    }

})();