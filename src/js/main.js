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

/*var completeData = [];

for (var i = 0; i < 20; i++) {
   var batting = ("{meta: " + baData[i]);

  var value = (", value: " + hrData[i] + "}");
  
  completeData.push(batting + value);
};


console.log(completeData);*/

var homeRuns = {
  labels: labels,
  series: [
    [
      {meta: 0.264, value: 16},  
      {meta: 0.3, value: 22 },
      {meta: 0.327, value: 22},
      {meta: 0.308, value: 27 },
      {meta: 0.309, value: 45},
      {meta: 0.323, value: 40},      
      {meta: 0.258, value: 17 }, 
      {meta: 0.303, value: 49 },
      {meta: 0.304, value: 56},
      {meta: 0.284, value: 56 },
      {meta: 0.285, value: 48},
      {meta: 0.271, value: 40 },      
      {meta: 0.286, value: 22 },
      {meta: 0.264, value: 8},
      {meta: 0.247, value: 13 },
      {meta: 0.253, value: 20},
      {meta: 0.301, value: 35 },
      {meta: 0.252, value: 27},
      {meta: 0.277, value: 30 },
      {meta: 0.249, value: 11},
      {meta: 0.214, value: 19},
      {meta: 0.184, value: 0}
    ]
  ]
};

var homeRuns2 = {
  labels: labels,
  series: [
    [
      {meta: 0.264, value: 20},  
      {meta: 0.3, value: 22 },
      {meta: 0.327, value: 22},
      {meta: 0.308, value: 27 },
      {meta: 0.309, value: 45},
      {meta: 0.323, value: 40},      
      {meta: 0.258, value: 17 }, 
      {meta: 0.303, value: 49 },
      {meta: 0.304, value: 56},
      {meta: 0.284, value: 56 },
      {meta: 0.285, value: 48},
      {meta: 0.271, value: 40 },      
      {meta: 0.286, value: 22 },
      {meta: 0.264, value: 8},
      {meta: 0.247, value: 13 },
      {meta: 0.253, value: 20},
      {meta: 0.301, value: 35 },
      {meta: 0.252, value: 27},
      {meta: 0.277, value: 30 },
      {meta: 0.249, value: 11},
      {meta: 0.214, value: 19},
      {meta: 0.184, value: 0}
    ]
  ]
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
var hrChart2 = Chartist.Bar('.ct-homeruns2', homeRuns2, hrOptions);

var $hrChart = $('.ct-homeruns');

var $toolTip = $hrChart
  .append('<div class="tooltip"></div>')
  .find('.tooltip')
  .hide();

$hrChart.on('mouseenter', '.ct-bar', function() {
  var $bar = $(this),
    value = $bar.attr('ct:value'),
    info = $bar.attr('ct:meta');
  $toolTip.html("Batting Average " + info + '<br>' + value).show();
});

$hrChart.on('mouseleave', '.ct-bar', function() {
  $toolTip.hide();
});


hrChart.on('draw', function(data) {
  var barHorizontalCenter, barVerticalCenter, label, value;
  
  
  if (data.type === "bar") {
    
    if (data.index < 11 || data.index > 18) {
            //Change color to Mariner
       data.element.attr({
      style: 'stroke: blue;'
    });
    }
    
    barHorizontalCenter = data.x1 + (data.element.width() * .5);
    barVerticalCenter = data.y1 + (data.element.height() * -1) - 10;
    console.log(data.index);
     
    value = data.element.attr('ct:value');
      
    
      label = new Chartist.Svg('text');
      label.text(value);

      label.addClass("ct-barlabel");

      label.attr({
        x: barHorizontalCenter,
        y: barVerticalCenter,
        'text-anchor': 'middle'
        
      });
      

      
      return  data.group.append(label);

    
  }

});