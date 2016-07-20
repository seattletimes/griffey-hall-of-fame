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

var slugData = [0.42, 0.481, 0.527, 0.535, 0.617, 0.674, 0.481, 0.628, 0.646, 0.611, 0.576, 0.556, 0.533, 0.426, 0.566, 0.513, 0.576, 0.486, 0.496, 0.424, 0.411, 0.204];

var playData = [78, 96, 95, 88, 96, 99, 50, 86, 97, 99, 99, 90, 69, 43, 33, 51, 79, 67, 89, 88, 72, 20];

var rbiData = [61, 80, 100, 103, 109, 90, 42, 140, 147, 146, 134, 118, 65, 23, 26, 60, 92, 72, 93, 71, 57, 7];

//BATTING AVERAGE
var battingAverage = {
  labels: labels,
  series: [ baData ]
};


var baChart = new Chartist.Line('.ct-averages', battingAverage, {
  axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
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
        style: 'stroke: blue;  fill: blue;'
      });
    }
}
});


//SLUGGING

var slugging = {
  labels: labels,
  series: [ slugData ]
};


var slugChart =  Chartist.Line('.ct-slug', slugging, {
  axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  },
  plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'slug new-point'
    })
  ]
});


//Slug draw
slugChart.on('draw', function(data) {
  if (data.type === "point") {

    //Add tooltips
    var circle = new Chartist.Svg('circle', {
      cx: [data.x],
      cy: [data.y],
      r: [5], 
      'ct:value': data.value.y,
      'ct:meta': data.meta,
      class: 'slug new-point'
    }, 'ct-area');
    data.element.replace(circle);

    //Change colors
    if (data.index < 11 || data.index > 18) {
      circle.attr({
        style: 'stroke: blue;  fill: blue;'
      });
    }
  }
});



//PLAYED 
var played = {
  labels: labels,
  series: [ playData ]
};


var playChart = new Chartist.Line('.ct-play', played, {
  axisY: {
    showLabel: false
  },
  plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'play new-point'
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
        style: 'stroke: blue;  fill: blue;'
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
      playData: playData[i],
      rbiData: rbiData[i]
    }
  };
  data.push(values);
};

var homeRuns = {
  labels: labels,
  series: [data]
};
console.log(data);
var hrChart = new Chartist.Bar('.ct-homeruns', homeRuns, { axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  }, plugins: [
    Chartist.plugins.tooltip({
      pointClass: 'hr new-point',
      tooltipFnc : function() {
        var meta = event.target.getAttribute('ct:meta');
        var cleanMeta = Chartist.deserialize(meta);
        return "Batting Average: " + cleanMeta.battingAverage + "<br>Slugging Percentage: " + cleanMeta.slugData;
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
        style: 'stroke: blue;'
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
//qsa(".si-img").forEach

//Injuries

/*$(".icon").hover( function() {
  $(`.description`).addClass('show');
});*/

var hoverEffect = function(e) {
  
    var pos = this.getAttribute("data-id");

  var injury = document.querySelector(`.description[data-id="${pos}"]`);
  injury.classList.add('show');
};

qsa(".icon").forEach(i => i.addEventListener("mouseover", hoverEffect));

