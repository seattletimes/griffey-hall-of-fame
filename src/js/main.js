// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var $ = require("jquery");
var Chartist = require("chartist");

var labels = ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"]

var baData = [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184];

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


var homeRuns = {
  labels: labels,
  series: [
    [
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},  
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },      
      {meta: 'description', value: 1 }, 
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },      
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 1 },
      {meta: 'description', value: 5},
      {meta: 'description', value: 3}
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

var $hrChart = $('.ct-homeruns');

var $toolTip = $hrChart
  .append('<div class="tooltip"></div>')
  .find('.tooltip')
  .hide();

$hrChart.on('mouseenter', '.ct-bar', function() {
  var $bar = $(this),
    value = $bar.attr('ct:value'),
    seriesName = $bar.parent().attr('ct:series-name');
  $toolTip.html(seriesName + '<br>' + value).show();
});

$hrChart.on('mouseleave', '.ct-bar', function() {
  $toolTip.hide();
});


hrChart.on('draw', function(data) {
  var barHorizontalCenter, barVerticalCenter, label, value;

  if (data.type === "bar") {
    barHorizontalCenter = data.x1 + (data.element.width() * .5);
    barVerticalCenter = data.y1 + (data.element.height() * -1) - 10;
    console.log(data);
     
    value = data.element.attr('ct:value');
      
    
      label = new Chartist.Svg('text');
      label.text(value);

      label.addClass("ct-barlabel");

      label.attr({
        x: barHorizontalCenter,
        y: barVerticalCenter,
        'text-anchor': 'middle'
        
      });
      
      //Change color 
       data.element.attr({
  
      style: 'stroke: blue;'
    });
      
      return  data.group.append(label);

    
  }

});