import { Meteor } from 'meteor/meteor';

Meteor.methods({
  addMessage: function(messageData) {
    //check if the user is logged in
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    //message needs to have content
    if(!messageData.content){
      throw new Meteor.Error('invalid');
    }

    messageData.date = new Date();
    messageData.owner = Meteor.userId();
    Messages.insert(messageData);
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});
