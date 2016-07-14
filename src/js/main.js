// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var Chartist = require("chartist");


var battingAverage = {
  labels: ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"],
  series: [
    [0.264, 0.3, 0.327, 0.308, 0.309, 0.323, 0.258, 0.303, 0.304, 0.284, 0.285, 0.271, 0.286, 0.264, 0.247, 0.253, 0.301, 0.252, 0.277, 0.249, 0.214, 0.184]
  ]
};


var baOptions = {
axisX: {
    showGrid: true
  }
};


var baChart =  Chartist.Line('.ct-averages', battingAverage, {
  axisX: {
    showGrid: false
  }
});



var homeRuns = {
  labels: ["'89", "'90", "'91", "'92", "'93", "'94", "'95", "'96", "'97", "'98", "'99", "'00", "'01", "'02", "'03", "'04", "'05", "'06", "'07", "'08", "'09", "'10"],
  series: [
    [16, 22, 22, 27, 45, 40, 17, 49, 56, 56, 48, 40, 22, 8, 13, 20, 35, 27, 30, 11, 19]
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


hrChart.on('draw', function(data) {
  var barHorizontalCenter, barVerticalCenter, label, value;
  if (data.type === "bar") {
    barHorizontalCenter = data.x1 + (data.element.width() * .5);
    barVerticalCenter = data.y1 + (data.element.height() * -1) - 10;
      data.element.attr({
      // Now we set the style attribute on our bar to override the default color of the bar. By using a HSL colour we can easily set the hue of the colour dynamically while keeping the same saturation and lightness. From the context we can also get the current value of the bar. We use that value to calculate a hue between 0 and 100 degree. This will make our bars appear green when close to the maximum and red when close to zero.
      style: 'stroke: hsl(' + Math.floor(Chartist.getMultiValue(context.value) / max * 100) + ', 50%, 50%);'
    });
    value = data.element.attr('ct:value');
      
    console.log(data.value);
    if (value !== '0') {
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
  }

});