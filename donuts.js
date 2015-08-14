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

  // This variable saves the first call of getDailyDonuts() for accuracy in 
  // the hourly method
  this.getAverageHourlyDonuts = function() {
    return Math.round(this.getDailyDonuts() / this.hours);
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
  
  this.addStore = function(store) {
    this.stores.push(store);
  };

  this.addNewStore = function(hours, location, minCPH, maxCPH, avgDPC) {
    this.stores.push(new Shop(hours, location, minCPH, maxCPH, avgDPC));
  };

  this.generateSpecificReport = function(storeIndex) {
    console.log(this.stores[storeIndex].getLocation(), this.stores[storeIndex].getDailyDonuts(),
      this.stores[storeIndex].getAverageHourlyDonuts());
  };

  this.generateReport = function() {
    for(var store = 0; store < this.stores.length; store++) {
      console.log(this.stores[store].getLocation(), this.stores[store].getDailyDonuts(),
      this.stores[store].getAverageHourlyDonuts());
    }
  };
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