// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var $ = require("jquery");
var Chartist = require("chartist");
var tooltip = require("./chartist-plugin-tooltip.min.js");

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

var baOptions = {
  axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  }
};

var baChart =  Chartist.Line('.ct-averages', battingAverage, baOptions);

//BA draw
baChart.on('draw', function(data) {
 
  if (data.type === "point")
    //Change colors
    if (data.index < 11 || data.index > 18) {
      data.element.attr({
        style: 'stroke: blue;'
      });
    }
  });

//BA interactives

var $baChart = $('.ct-averages');

var $toolTip2 = $baChart
.append('<div class="tooltip"></div>')
.find('.tooltip')
.hide();

$baChart.on('mouseenter', '.ct-point', function() {
  var $point = $(this), info = $point.attr('ct:value');
  var meta = Chartist.deserialize(info);

  $toolTip2.html(info).show();
});

$baChart.on('mouseleave', '.ct-point', function() {
  $toolTip2.hide();
});

$baChart.on('mousemove', function(event) {
  $toolTip2.css({
    left: (event.offsetX || event.originalEvent.layerX) - $toolTip2.width() / 2 - 10,
    top: (event.offsetY || event.originalEvent.layerY) - $toolTip2.height() - 30
  });
});

//SLUGGING
var slugging = {
  labels: labels,
  series: [ slugData ]
};

var slugOptions = {
  axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  }
};

var slugChart =  Chartist.Line('.ct-slug', slugging, slugOptions);

//Slug draw
slugChart.on('draw', function(data) {
if (data.type === "point") {
    //Change colors
    if (data.index < 11 || data.index > 18) {
      data.element.attr({
        style: 'stroke: blue;'
      });
    }
  }
});

//Slug interactives

var $slugChart = $('.ct-slug');

var $toolTip3 = $slugChart
.append('<div class="tooltip"></div>')
.find('.tooltip')
.hide();

$slugChart.on('mouseenter', '.ct-point', function() {
  var $point = $(this), info = $point.attr('ct:value');
  var meta = Chartist.deserialize(info);

  $toolTip3.html(info).show();
});

$slugChart.on('mouseleave', '.ct-point', function() {
  $toolTip3.hide();
});

$slugChart.on('mousemove', function(event) {
  $toolTip3.css({
    left: (event.offsetX || event.originalEvent.layerX) - $toolTip3.width() / 2 - 10,
    top: (event.offsetY || event.originalEvent.layerY) - $toolTip3.height() - 30
  });
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
      appendToBody: true,
      pointClass: 'new-point'
    })
  ]
});


//Slug draw
playChart.on('draw', function(data) {
if (data.type === "point") {
    
    //Add tooltips
//      console.log(data);

   var circle = new Chartist.Svg('circle', {
	    cx: [data.x],
      cy: [data.y],
      r: [5], 
      'ct:value': data.value.y,
     'ct:meta': data.meta,
     class: 'new-point',
     
    }, 'ct-area');
  
  data.element.replace(circle);
  
    //Change colors
    if (data.index < 11 || data.index > 18) {
      data.element.attr({
        style: 'stroke: blue;'
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
      battingAverage: baData[i]
    }
  };
  data.push(values);
};

var homeRuns = {
  labels: labels,
  series: [data]
};

var hrOptions = {

  axisX: {
    showGrid: false
  },
  axisY: {
    showGrid: false,
    showLabel: false
  }

};

var hrChart = Chartist.Bar('.ct-homeruns', homeRuns, hrOptions);

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
  
  //Add highlight on selected years

});

//HR interactives

var $hrChart = $('.ct-homeruns');

var $toolTip = $hrChart
.append('<div class="tooltip"></div>')
.find('.tooltip')
.hide();

$hrChart.on('mouseenter', '.ct-bar', function() {
  var $bar = $(this), info = $bar.attr('ct:meta');
  var meta = Chartist.deserialize(info);

  $toolTip.html("Batting Average: " + meta.battingAverage).show();
});

$hrChart.on('mouseleave', '.ct-bar', function() {
  $toolTip.hide();
});

$hrChart.on('mousemove', function(event) {
  $toolTip.css({
    left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
    top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 30
  });
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