// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var Chartist = require("chartist");


var battingAverage = {
  labels: [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
  series: [
    [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184]
  ]
};

var options = {
};


new Chartist.Line('.ct-chart', battingAverage, options);