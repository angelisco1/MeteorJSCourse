import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.listing.helpers({
  entries: function() {
    return Messages.find();
  },
  formattedDate: function() {
    return this.date ? moment(this.date).format('ddd, hA h:mm:ss') : '';
  }
});

Template.newEntry.events({
  'submit #entryForm': function(event) {
    //prevent for submission
    event.preventDefault();

    var c = event.target.querySelector('#content').value;

    //insert into the Collection
    Meteor.call('addMessage', {content: c});
    //Messages.insert({content: c, date: new Date()});

    //reset the form
    event.target.reset();
  }
});
