// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var $ = require("jquery");
var Chartist = require("chartist");

var labels = ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"]

var years = [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

var baData = [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184];

var hrData = [16, 22, 22, 27, 45, 40, 17, 49, 56, 56, 48, 40, 22, 8, 13, 20, 35, 27, 30, 11, 19, 0];


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
  }
};

var baChart =  Chartist.Line('.ct-averages', battingAverage, baOptions);

//BA draw
baChart.on('draw', function(data) {
  var horizctr, vertctr, label, value;
  if (data.type === "point") {

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

    //Change colors
    if (data.index < 11 || data.index > 18) {
      data.element.attr({
        style: 'stroke: blue;'
      });
    }

    //Add numbers on top
    horizctr = data.x1 + (data.element.width() * .5);
    vertctr = data.y1 + (data.element.height() * -1) - 10;
    console.log(data.element.attr(0));

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

 var timeline = (function(){
  var box = document.querySelector('.year');
  var next = box.querySelector('.right');
  var prev = box.querySelector('.left');
  var items = box.querySelectorAll('.content li');
  var counter = 0;
  var amount = items.length;
  var current = items[0];
  box.classList.add('active');
  
  function navigate(direction) {
    current.classList.remove('current');
    counter = counter + direction;
    if (direction === -1 && 
        counter < 0) { 
      counter = amount - 1; 
    }
    if (direction === 1 && 
        !items[counter]) { 
      counter = 0;
    }
    current = items[counter];
    current.classList.add('current');
  }
   next.addEventListener('click', function(ev) {
    navigate(1);
  });
  prev.addEventListener('click', function(ev) {
    navigate(-1);
  });
  navigate(0);
})
 timeline();