Meteor.setInterval(function() {
  var symbols = [];
  Stocks.find().forEach(function(element) {
    symbols.push(element.symbol);
  });

  // Get data from Yahoo Finance API
  var results = YahooFinance.snapshot({symbols: symbols, fields: ['s', 'b']});

  // Update collection
  results.forEach(function(result) {
    let stock = Stocks.findOne({symbol: result.symbol});

    if(result.bid) {
      // Price change
      let change = stock.price ? result.bid - stock.price : null;
      
      // Update entry
      Stocks.update(stock._id, {$set: {price: result.bid, change: change}});
    }

  }); 

}, 5000);
