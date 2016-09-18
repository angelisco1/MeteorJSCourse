Recipes = new Mongo.Collection("recipes");

Meteor.methods({
  deleteRecipe: function(id) {
    //User must be the owner
    var recipe = Recipes.findOne(id);
    if (Meteor.userId() != recipe.owner) {
      throw new Meteor.Error("not-authorized", "you dont own this recipe");
    }
    // Recipes.remove(id);
    Recipes.remove({_id: id});
  },
  insertRecipe: function(data) {
    // User must be logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // Set the owner
    data.owner = Meteor.userId();

    // Insert into the DB
    Recipes.insert(data);
  },
  updateRecipe: function(id, data) {
    // User must be logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized", "you have to be logged in");
    }

    //User must be the owner
    var recipe = Recipes.findOne(id);
    if (Meteor.userId() != recipe.owner) {
      throw new Meteor.Error("not-authorized", "you dont own this recipe");
    }

    // Make sure it"s the right owner
    data.owner = Meteor.userId();

    // Update the DB
    Recipes.update(id, data);
  }
});