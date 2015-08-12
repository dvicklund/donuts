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

  // Finds a random number of customers per hour between the minimum and maximun
  // for that locatino
  this.randCPH = function() {
    return Math.floor(Math.random()*(this.maxCPH - this.minCPH)) + this.minCPH;
  };

  // Returns the total donuts served per day by calculating and adding donuts
  // per hour the shop is open
  this.getDailyDonuts = function() {
    var total = 0;
    for (var hour = 0; hour < this.hours; hour++) {
      total += Math.round(this.randCPH() * this.avgDPC);
    }
    return total;
  };

  // This variable saves the first call of getDailyDonuts() for accuracy in 
  // the hourly method
  this.totaDD = this.getDailyDonuts();
  this.getHourlyDonuts = function() {
    return Math.round(this.totaDD / this.hours);
  };

  // toString() override function with proper formatting
  this.toString = function() {
    return this.location + ": " + this.totaDD + " sold daily!  That's about " + 
    this.getHourlyDonuts() + " donuts an hour for " + this.hours + " hours.";
  };
};

// Arrays of input data
var hours = [15, 14, 12, 11, 12];
var locations = ["Downtown", "Capitol Hill", "South Lake Union", "Wedgwood", "Ballard"];
var minCPHs = [8, 4, 9, 2, 8];
var maxCPHs = [43, 37, 23, 28, 58];
var avgDPCs = [4.50, 2.00, 6.33, 1.25, 3.75];

// Holder array for new stores
var allStores = [];

// Creation of all the locations
for(var shop = 0; shop < 5; shop++) {
  allStores.push(new Shop(hours[shop], locations[shop], minCPHs[shop], maxCPHs[shop], avgDPCs[shop]));
} 

// Printing of all locations' information to the console
for(shop in allStores) {
  console.log(allStores[shop].toString());
}