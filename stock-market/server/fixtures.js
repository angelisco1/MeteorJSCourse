Meteor.startup(function() {
  var numStocks = Stocks.find().count();

  if(numStocks===0) {
    var fixtures = [
      {symbol: 'GOOG'},
      {symbol: 'AMZN'},
      {symbol: 'MSFT'},
      {symbol: 'ASX.AX'},
      {symbol: 'ANZ.AX'}
    ];
    fixtures.forEach(function(element) {
      Stocks.insert(element);
    });
  }
});