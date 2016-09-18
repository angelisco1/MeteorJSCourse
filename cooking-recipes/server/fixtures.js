Meteor.startup(function(){
  var numRecipes = Recipes.find().count();

  if(numRecipes===0) {
    var fixtures = [
      {
        title: "Pizza Margherita",
        ingredients: "1 pizza base, 1kg cheese and 1kg tomatoes",
        instructions: "Put everithing in the oven and cook for 1 hour"
      },
      {
        title: "Chilean empanadas",
        ingredients: "1kg flour, garlic, onion, spices, egg, meat and olives",
        instructions: "Prepare the dough, fry onions and other items, and cook in the oven"
      },
      {
        title: "Pasta",
        ingredients: "250g of pasta and 1lt water",
        instructions: "Heat water and add pasta. Stir frequently"
      },
      {
        title: "Cheese sandwich",
        ingredients: "2 slices of bread and 1 slice of cheese",
        instructions: "Please the slice of cheese in between the 2 slices of bread"
      }
    ];

    fixtures.forEach(function(element) {
      Recipes.insert(element);
    });

  }

});