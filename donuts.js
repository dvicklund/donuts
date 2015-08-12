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

// Creation of all the locations
var dow = new Shop(15, "Downtown", 8, 43, 4.50);
var cap = new Shop(14, "Capitol Hill", 4, 37, 2.00);
var sou = new Shop(12, "South Lake Union", 9, 23, 6.33);
var wed = new Shop(11, "Wedgwood", 2, 28, 1.25);
var bal = new Shop(12, "Ballard", 8, 58, 3.75);

// Printing of all locations' information
console.log(dow.toString());
console.log(cap.toString());
console.log(sou.toString());
console.log(wed.toString());
console.log(bal.toString());