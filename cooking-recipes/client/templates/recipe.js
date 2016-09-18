Template.recipe.helpers({
  recipe: function() {
    // Get id from in the route params
    var recipeId = FlowRouter.getParam("id");
    var recipe = Recipes.findOne(recipeId);
    
    return recipe;
  }
});