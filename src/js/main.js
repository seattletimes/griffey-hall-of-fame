// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var $ = require("jquery");
var Chartist = require("chartist");
var tooltip = require("./chartist-plugin-tooltip.min.js");
var qsa = require("./lib/qsa");


var labels = ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"]

var years = [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

var baData = [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184];

var hrData = [16, 22, 22, 27, 45, 40, 17, 49, 56, 56, 48, 40, 22, 8, 13, 20, 35, 27, 30, 11, 19, 0];

var bondData = [16, 25, 24, 19, 33, 25, 34, 46, 37, 33, 42, 40, 37, 34, 49, 73, 46, 45, 45, 5, 26, 28]
var rodData = [0, 5, 36, 23, 42, 42, 41, 52, 57, 47, 36, 48, 35, 54, 35, 30, 30, 16, 18, 7, 33, 8]
var aaronData = [13, 27, 26, 44, 30, 39, 40, 34, 45, 44, 24, 32, 44, 39, 29, 44, 38, 47, 34, 40, 20, 12]
var ruthData = [0, 4, 3, 2, 11, 29, 54, 59, 35, 41, 46, 25, 47, 60, 54, 46, 49, 46, 41, 34, 22, 6]
var maysData = [20, 4, 41, 51, 36, 35, 29, 34, 29, 40, 49, 38, 47, 52, 37, 22, 23, 13, 28, 18, 8, 6]

var slugData = [0.42, 0.481, 0.527, 0.535, 0.617, 0.674, 0.481, 0.628, 0.646, 0.611, 0.576, 0.556, 0.533, 0.426, 0.566, 0.513, 0.576, 0.486, 0.496, 0.424, 0.411, 0.204];

var playData = [78, 96, 95, 88, 96, 99, 50, 86, 97, 99, 99, 90, 69, 43, 33, 51, 79, 67, 89, 88, 72, 20];

var rbiData = [61, 80, 100, 103, 109, 90, 42, 140, 147, 146, 134, 118, 65, 23, 26, 60, 92, 72, 93, 71, 57, 7];

//BATTING AVERAGE and SLUG
var battingAverage = {
  labels: labels,
  series: [ baData, slugData ]
};

var ticks = [];

for (var i = 0; i <= 1; i += .05) ticks.push(i);

var baChart = new Chartist.Line('.ct-averages', battingAverage, {
  high: 1,
  low: 0,
  divisor:20,
  axisX: {
  },
  axisY: {
    ticks,
    low: 0,
    type: Chartist.FixedScaleAxis,
    labelInterpolationFnc: l => l.toFixed(3)
  },
   plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'ba new-point'
    })
  ]
});

//BA draw
baChart.on('draw', function(data) {
if (data.type === "point") {
  //Add tooltips
    var circle = new Chartist.Svg('circle', {
      cx: [data.x],
      cy: [data.y],
      r: [5], 
      'ct:value': data.value.y,
      'ct:meta': data.meta,
      class: 'ba new-point'
    }, 'ct-area');
    data.element.replace(circle);

    //Change colors
    if (data.index < 11 || data.index > 18) {
      circle.attr({
        style: 'stroke: #2c3c87;  fill: #2c3c87;'
      });
    }
}
});



//COMPARE 
var compared = {
  labels: labels,
  series: [ hrData, bondData, rodData, aaronData, ruthData, maysData]
};

var compChart = new Chartist.Line('.ct-comp', compared, {
  axisY: {
    showLabel: false
  },
  plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'comp new-point',
       tooltipFnc : function() {
        return event.target.getAttribute('ct:value');
      }
    })
  ]
});


//Comp draw
compChart.on('draw', function(data) {
  if (data.type === "point") {
     var circle = new Chartist.Svg('circle', {
      cx: [data.x],
      cy: [data.y],
      r: [5], 
      'ct:value': data.value.y,
      'ct:meta': data.meta,
      class: 'comp new-point'
    }, 'ct-area');
        data.element.replace(circle);
    
    if (data.seriesIndex != 0) {
       circle.attr({
        style: 'opacity: .3;'
      });
    }
    else {
      circle.attr({
        style: 'stroke-width: 8px;  stroke: #52C4B1;'
      });
    }
  }
    if (data.type === "line") {
      if (data.seriesIndex != 0) {
      data.element.attr({
        style: 'opacity: .2; stroke-width: 1px;'
      });
      }
          else {
      data.element.attr({
        style: 'stroke-width: 5px;  stroke: #52C4B1;'
      });
    }
    }
});

//COMP events
var $leaders = $('.hr-leaders');

var $comp = $('.ct-comp');
$leaders.on('click', '.leader', function(){
  
   var pos = this.getAttribute("data-id");
console.log(compChart); 
  compChart.showLine(false);
});

//PLAYED 
var played = {
  labels: labels,
  series: [ playData ]
};


var playChart = new Chartist.Line('.ct-play', played, {
  axisY: {
    showLabel: false,
    showGrid: false
  },
  plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'play new-point',
       tooltipFnc : function() {
        return event.target.getAttribute('ct:value');
      }
    })
  ]
});

//Play draw
playChart.on('draw', function(data) {
  if (data.type === "point") {

    //Add tooltips
    var circle = new Chartist.Svg('circle', {
      cx: [data.x],
      cy: [data.y],
      r: [5], 
      'ct:value': data.value.y,
      'ct:meta': data.meta,
      class: 'play new-point'
    }, 'ct-area');

    data.element.replace(circle);
    //Change colors
    if (data.index < 11 || data.index > 18) {
      circle.attr({
        style: 'stroke: #2c3c87;  fill: #2c3c87;'
      });
    }
  }
});



//HOME RUNS

var data = [];
for (var i = 0; i < 22; i++) {
  var values = {
    value: hrData[i],
    meta: {
      year: years[i],
      battingAverage: baData[i],
      slugData: slugData[i],
      rbiData: rbiData[i]
    }
  };
  data.push(values);
};

var homeRuns = {
  labels: labels,
  series: [data]
};
var hrChart = new Chartist.Bar('.ct-homeruns', homeRuns, { axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  }, plugins: [
    Chartist.plugins.tooltip({
      
      tooltipFnc : function() {
        var meta = event.target.getAttribute('ct:meta');
        var cleanMeta = Chartist.deserialize(meta);
        return "Batting Average: " + cleanMeta.battingAverage + "<br>Slugging Percentage: " + cleanMeta.slugData + "<br>RBI: " + cleanMeta.rbiData;
      }
    })
  ]

});

//HR draw

hrChart.on('draw', function(data) {
  var horizctr, vertctr, label, value;
  if (data.type === "bar") {
    data.element.attr({ "data-index": data.index });

   
    //Change colors
    if (data.index < 11 || data.index > 18) {
      data.element.attr({
        style: 'stroke: #52C4B1;'
      });
    }

    //Add numbers on top
    horizctr = data.x1 + (data.element.width() * .5);
    vertctr = data.y1 + (data.element.height() * -1) - 10;

    value = data.element.attr('ct:value');
    label = new Chartist.Svg('text');
    label.text(value);
    label.addClass("ct-barlabel");
    label.attr({
      x: horizctr,
      y: vertctr,
      'text-anchor': 'middle'
    });
    return  data.group.append(label);
  }
});



//HR timeline



$(".advance").click(function(){
  var $this = $(this);
  var current = $(".year .show");
  var index = current.attr("data-index");
  var bar = document.querySelector(`.home-runs svg [data-index="${index}"]`);
  if (!current.length) {
    current = $(".year div:first");
  }
  var next = $this.hasClass("left") ? current.prev(".year-description") : current.next(".year-description");
  next.addClass("show");
  current.removeClass("show");
});



//Sports Illustrated

var magClick = function(e) {
  var others = qsa('.si-focus');
  
  others.forEach(function(i) {
    i.classList.remove("show");
     });
    var pos = this.getAttribute("data-id");

  var focus = document.querySelector(`.si-focus[data-id="${pos}"]`);
  focus.classList.add('show');
};

qsa(".si-img").forEach(i => i.addEventListener("click", magClick));


//Injuries


var hoverEffect = function(e) {
   var others = qsa('.description');
  
  others.forEach(function(i) {
    i.classList.remove("show");

  });
    var pos = this.getAttribute("data-id");
  
  var injury = document.querySelector(`.description[data-id="${pos}"]`);
  injury.classList.add('show');
};
  
qsa(".icon").forEach(i => i.addEventListener("mouseenter", hoverEffect));


