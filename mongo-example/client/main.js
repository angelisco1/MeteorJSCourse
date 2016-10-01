import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.sales.helpers({
  sales: function() {
    return Sales.find();
  },
  salesTotalGreaterThan2000: function() {
    return Sales.find({total: {$gt: 2000}});
  },
  salesWithExistingRepeatingCostumer: function() {
    return Sales.find({repeatingCostumer: {$exists: true}});
  },
  salesThatContainsPurpleProducts: function() {
    return Sales.find({products: {$in: ['purple']}});
  },
  salesThatNotContainsPurpleProducts: function() {
    return Sales.find({products: {$nin: ['purple']}});
  },
  salesThatContainsThisProductsAndQtyIsGreaterThan10: function() {
    return Sales.find({products: {$nin: ['purple']}, qty: {$gt: 10}});
  },
  salesThatContainsThisProductsAndQtyIsGreaterThan10: function() {
    return Sales.find({products: {$nin: ['purple']}, qty: {$gt: 10}});
  },
  salesWithFalseRepeatingCostumer: function() {
    return Sales.find({
      $and: [
        {repeatingCostumer: {$exists: true}},
        {repeatingCostumer: false}
      ]
    });
  },
  salesSorted: function(){
    return Sales.find(
      {
        products: {$in: ['purple', 'orange']},
        qty: {$gt: 10}
      },
      {
        sort: [['qty', 'asc'], ['_id', 'desc']], //Sort by qty and _id
        // sort: {qty: 1}, //Sort by qty
        limit: 10, //Number of elements showed
        fields: {qty: 0, products: 0}, //Which fields you don't want to show 
        skip: 7
      }
    );
  }
  //Remove sales
  // Sales.remove({}); //Remove all elements in DB
  // Sales.remove({total: {$gt: 2000}}); //Remove elements with total greater than 2000 
  
  //Update sales
  // Sales.update({total: {$gt: 1000}}, {$set: {onSale: true, total:1100}}) //That way modified 1 element
  // Sales.update({total: {$gt: 1000}}, {$set: {onSale: true, total:1100}}, {multi: true}) //That way (multi => true) modifies all elements that satisfy the conditions
  // Sales.update({total: {$gt: 1000}}, {$set: {onSale: true, total:1100}}, {upsert: true})

});