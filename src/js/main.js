// require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var $ = require("jquery");
var Chartist = require("chartist");
var tooltip = require("./chartist-plugin-tooltip.min.js");
var qsa = require("./lib/qsa");

require("./injuries");


var labels = ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"];

var years = [1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

var baData = [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184];

var griffeyData = [16, 38, 60, 87, 132, 172, 189, 238, 294, 350, 398, 438, 460, 468, 481, 501, 536, 563, 593, 611, 630, 630]
var hrData = [16, 22, 22, 27, 45, 40, 17, 49, 56, 56, 48, 40, 22, 8, 13, 20, 35, 27, 30, 18, 19, 0];

var bondData = [16, 41, 65, 84, 117, 142, 176, 222, 259, 292, 334, 374, 411, 445, 494, 567, 613, 658, 703, 708, 734, 762]

var rodData = [0, 5, 41, 64, 106, 148, 189, 241, 298, 345, 381, 429, 464, 518, 553, 583, 613, 629, 647, 654, 687, 696]

var aaronData = [13, 40, 66, 110, 140, 179, 219, 253, 298, 342, 366, 398, 442, 481, 510, 554, 592, 639, 673, 713, 733, 745]
var ruthData = [0, 4, 7, 9, 20, 49, 103, 162, 197, 238, 284, 309, 356, 416, 470, 516, 565, 611, 652, 686, 708, 714]
var maysData = [20, 24, 65, 116, 152, 187, 216, 250, 279, 319, 368, 406, 453, 505, 542, 564, 587, 600, 628, 646, 654, 660]

var slugData = [0.42, 0.481, 0.527, 0.535, 0.617, 0.674, 0.481, 0.628, 0.646, 0.611, 0.576, 0.556, 0.533, 0.426, 0.566, 0.513, 0.576, 0.486, 0.496, 0.424, 0.411, 0.204];

var playData = [78, 96, 95, 88, 96, 99, 50, 86, 97, 99, 99, 90, 69, 43, 33, 51, 79, 67, 89, 88, 72, 20];

var rbiData = [61, 80, 100, 103, 109, 90, 42, 140, 147, 146, 134, 118, 65, 23, 26, 60, 92, 72, 93, 71, 57, 7];

//Scroll effect
var grif = document.querySelector(".grif-pic");
var hr = document.querySelector("li");
window.addEventListener("scroll",(function() {
  var bounds = hr.getBoundingClientRect();
  if (bounds.bottom < 0) {
    grif.classList.add("after-scroll");
  } else {
    grif.classList.remove("after-scroll");
  };
}));


//COMPARE 
var compared = {
  labels: nums,
  series: [ {className: "griffey focus", data: griffeyData}, {className: "bonds", data: bondData}, {className: "rod", data: rodData}, {className: "aaron", data:  aaronData}, {className: "ruth", data: ruthData}, {className: "mays", data: maysData}]
};

var compChart = new Chartist.Line('.ct-comp', compared, {
  axisY: {
    showLabel: false,
    showGrid: false
  },  
  axisX: {
    showLabel: true,
    showGrid: false
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
   data.element.attr({ "data-index": data.index });
  // console.log(data); 

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
    
  }
    
});


//COMP events
var $leaders = $('.hr-leaders');
var $comp = $('.ct-comp');

document.querySelector(".leader[data-id='griffey']").classList.add("highlighted");

$leaders.on('click', '.leader', function(){
  if (document.querySelector(".highlighted")) document.querySelector(".highlighted").classList.remove("highlighted");
  this.classList.add("highlighted");
  var pos = this.getAttribute("data-id");
  var line = (document.querySelector(`.${pos}`));
  if (document.querySelector(".focus")) document.querySelector(".focus").classList.remove("focus");
  line.classList.add("focus");

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
  axisX: {
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
  var index = current.attr("data-id");
  index = index * 1;

  if (this.classList.contains("left") & index < 0) return;
  if (this.classList.contains("right") & index > 20) return;
  var bar = document.querySelector(`.home-runs svg [data-index="${index}"]`);
 
  if (current == null) {
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

//chatter buttons

  var chatSwitch = function(e) {
   var others = qsa('.comp-chatter');
  
  others.forEach(function(i) {
    i.classList.remove("show");
     });
  
   var pos = this.getAttribute("data-id");
  var chatter = (document.querySelector(`.comp-chatter[data-id="${pos}"]`));
  // console.log(chatter);
  chatter.classList.add("show");
  
};

  qsa(".circle").forEach(i => i.addEventListener("click", chatSwitch));




