Template.listing.helpers({
  entries: function() {
    return Recipes.find({}, {sort: {title: 1}});
  },
  isOwner: function() {
    if (!Meteor.userId()) {
      return false;
    }

    // Check if the user is the owner
    return Meteor.userId() == this.owner;
  }
});

Template.listing.events({
  "click .delete": function(event) {
    Meteor.call("deleteRecipe", this._id, function(err, result) {
      if (err) {
        sAlert.error(err.reason);
      } else {
        sAlert.success("The recipe has been deleted!");
      }
    });
  }
});