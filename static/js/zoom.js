(function ($) {
  $.fn.extend({
    customZoom: function (data) {
      var div = this // 宣告作用範圍
      var start = false 
      var initialPosition = {
        x: 0,
        y: 0
      }
      var imagePosition = {
        x: 0,
        y: 0
      }
      div.on('mousedown', function (e) {
        initialPosition = {
          x: e.offsetX,
          y: e.offsetY
        }
        // console.log('down')
        start = true
      })
      div.on('mouseup', function () {
        // console.log('up')
        start = false
      })
      var tmpx = 0
      var tmpy = 0
      div.on('mousemove', function (e) {
        if (start) {
          var difference = {
            x: initialPosition.x - e.offsetX,
            y: initialPosition.y - e.offsetY,
          }
          if (tmpx > difference.x) {
            imagePosition.x = imagePosition.x - 1
          } else if (tmpx === difference.x) {
            imagePosition.x = imagePosition.x - 0
          } else {
            imagePosition.x = imagePosition.x + 1
          }
          if (tmpy > difference.y) {
            imagePosition.y = imagePosition.y - 1
          } else if (tmpy === difference.y) {
            imagePosition.y = imagePosition.y - 0
          } else {
            imagePosition.y = imagePosition.y + 1
          }

          if (imagePosition.x < 0) {
            imagePosition.x = 0
          } else if (imagePosition.x > 100) {
            imagePosition.x = 100
          }

          if (imagePosition.y < 0) {
            imagePosition.y = 0
          } else if (imagePosition.y > 100) {
            imagePosition.y = 100
          }
          tmpx = difference.x
          tmpy = difference.y
        //   console.log(data.cover)

          var zoomer = $(data.cover)
          // console.log(zoomer)
          // var x = (e.offsetX / zoomer.width()) * 100
          // var y = (e.offsetY / zoomer.height()) * 100
          var x = imagePosition.x
          var y = imagePosition.y
          if (x < 0) {
            x = 0
          } else if (x > 100) {
            x = 100
          }
          if (y < 0) {
            y = 0
          } else if (y > 100) {
            y = 100
          }
          zoomer.css('backgroundPosition', x + '% ' + y + '%')
        }
      })
    }
  });
})(jQuery);
// © 2022 YUANSHANG TECHNOLOGY. All Rights Reserved. by Louis 