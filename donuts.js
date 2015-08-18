// To do nut, or not to do nut?
// 
// Donuts.
// 
// David Vicklund
// 10 August 2015

function Shop(hours, location, minCPH, maxCPH, avgDPC) {
  this.hours = hours;
  this.location = location;
  this.minCPH = minCPH;
  this.maxCPH = maxCPH;
  this.avgDPC = avgDPC;
  this.hourlySales = [];

  // Finds a random number of customers per hour between the minimum and maximum
  // for that location
  this.randCPH = function() {
    return Math.floor(Math.random()*(this.maxCPH - this.minCPH)) + this.minCPH;
  };

  // Simply returns the location property
  this.getLocation = function() {
    return this.location;
  };

  // Generates random hourly donut sales based upon the average donuts per 
  // customer the randCPH() method (random customers per hour)
  this.generateHourlyDonuts = function() {
    for(var hour = 0; hour < this.hours; hour++) {
      this.hourlySales.push(Math.round(this.randCPH()*this.avgDPC));
    }
  };

  // Populating the hourlySales array
  this.generateHourlyDonuts();

  // Returns the total donuts served per day by calculating and adding donuts
  // per hour the shop is open
  this.getDailyDonuts = function() {
    var total = 0;
    for (var hour = 0; hour < this.hours; hour++) {
      total += this.hourlySales[hour];
    }
    return total;
  };

  // Gets the average number of hourly donuts over the course of a full day
  this.getAverageHourlyDonuts = function() {
    return Math.round(this.getDailyDonuts() / this.hours);
  };

  // Simply returns the hourly sales array
  this.getHourlySalesArray = function() {
    return this.hourlySales;
  };

  // toString() override function with proper formatting
  this.toString = function() {
    return this.location + ": " + this.getDailyDonuts() + " sold daily!  That's about " + 
    this.getAverageHourlyDonuts() + " donuts an hour for " + this.hours + " hours.";
  };
}

// Managerial shop(s) owner class - used to create a collection of stores
function DonutMaster() {
  this.stores = [];
  
  // Adds an existing shop to the stores array
  this.addStore = function(store) {
    this.stores.push(store);
  };

  // Adds a new shop to the stores array
  this.addNewStore = function(hours, location, minCPH, maxCPH, avgDPC) {
    this.stores.push(new Shop(hours, location, minCPH, maxCPH, avgDPC));
  };

  // Returns the stores array
  this.getStores = function() {
    return this.stores;
  };

  // Shows a report for the input store, specified by array index
  this.generateSpecificReport = function(storeIndex) {
    console.log(this.stores[storeIndex].getLocation(), this.stores[storeIndex].getDailyDonuts(),
      this.stores[storeIndex].getAverageHourlyDonuts());
  };

  // Shows a full report for all stores (without labels)
  this.generateReport = function() {
    for(var store = 0; store < this.stores.length; store++) {
      console.log(this.stores[store].getLocation(), this.stores[store].getDailyDonuts(),
      this.stores[store].getAverageHourlyDonuts());
    }
  };

  // Shows a readable report of every store
  this.generateReadableReport = function() {
    for(var store = 0; store < this.stores.length; store++) {
      console.log(this.stores[store].toString());
    }
  }
}

// Arrays of input data
var hours = [15, 14, 12, 11, 12];
var locations = ["Downtown", "Capitol Hill", "South Lake Union", "Wedgwood", "Ballard"];
var minCPHs = [8, 4, 9, 2, 8];
var maxCPHs = [43, 37, 23, 28, 58];
var avgDPCs = [4.50, 2.00, 6.33, 1.25, 3.75];

// Creating and populating new DonutMaster object using the above arrays of information
var dm = new DonutMaster();
for(var shop = 0; shop < locations.length; shop++) {
  dm.addNewStore(hours[shop], locations[shop], minCPHs[shop], maxCPHs[shop], avgDPCs[shop]);
}

// Let's print some strings
for(var shop = 0; shop < dm.stores.length; shop++) {
  console.log(dm.stores[shop].toString());
}

// Inserting all of that information into the HTML table (this is awesome)
// 
// Here we instantiate our array of HTML table row ids
var docIDs = ['downtown', 'capitolHill', 'southLakeUnion', 'wedgwood', 'ballard'];

// Now, we loop through all the rows
for(var loc = 0; loc < docIDs.length; loc++) {
  
  // Holder variable for the current row's <tr>
  var row = document.getElementById(docIDs[loc]);

  // Now, we run through and create every cell in the row, filling each with the
  // appropriate information
  for(var col = 0; col < 15; col++) {
    if(dm.getStores()[loc].hours > col){
      row.insertAdjacentHTML('beforeend', '<td>' + 
        dm.getStores()[loc].getHourlySalesArray()[col] + '</td>');
    }else{
      row.insertAdjacentHTML('beforeend', '<td>closed</td>');
    }
  }

  // And, finally, the average and total figures are inserted
  row.insertAdjacentHTML('beforeend', '<td>' + dm.getStores()[loc].getAverageHourlyDonuts() + 
    '</td><td>' + dm.getStores()[loc].getDailyDonuts() + '</td>');
}
