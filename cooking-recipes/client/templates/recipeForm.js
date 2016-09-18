Template.recipeForm.helpers({
  showTitle: function() {
    var title = "New Recipe";

    var recipeId = FlowRouter.getParam("id");
    var recipe = Recipes.findOne(recipeId);

    if (recipe) {
      title = recipe.title;
    }

    return title;
  },
  recipe: function() {

    var recipeId = FlowRouter.getParam("id");
    var recipe = Recipes.findOne(recipeId) || {};

    return recipe;
  },
  canShow: function() {
    var result = true;

    if (!Meteor.userId()) {
      return false
    } else {
      var recipeId = FlowRouter.getParam("id");
      var recipe = Recipes.findOne(recipeId);

      if (recipe) {
        result = recipe.owner == Meteor.userId();
      }
    }

    if (result) {
      return true;
    } else {
      FlowRouter.redirect("/");
    }
  },
  isPrivate: function() {
    var recipeId = FlowRouter.getParam("id");
    var recipe = Recipes.findOne(recipeId);

    if (!recipe) {
      return false;
    } else {
      return recipe.private ? "checked" : false;
    }
  }
});

Template.recipeForm.events({
  "submit #recipeForm": function(event) {
    //prevent form submission
    event.preventDefault();

    var data = {
      title: event.target.querySelector("#title").value,
      ingredients: event.target.querySelector("#ingredients").value,
      instructions: event.target.querySelector("#instructions").value,
      private: event.target.querySelector("#private").checked
    };

    var recipeId = FlowRouter.getParam("id");
    if (recipeId) {
      Meteor.call("updateRecipe", recipeId, data, function(err, result) {
        if (err) {
          sAlert.error(err.reason);
        } else {
          sAlert.success("The recipe has been updated!");
        }
      });
    } else {
      Meteor.call("insertRecipe", data, function(err, result) {
        if (err) {
          sAlert.error(err.reason);
        } else {
          sAlert.success("New recipe created!");
        }
      });
    }

    FlowRouter.go("/");
  }
});