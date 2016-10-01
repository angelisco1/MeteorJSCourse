Template.addStock.events({
  "submit #addStockForm": function(event) {
    event.preventDefault();
    var data = {
      symbol: event.target.querySelector("#symbol").value
    };

    Meteor.call("addStock", data);

    event.target.reset();
  }
});