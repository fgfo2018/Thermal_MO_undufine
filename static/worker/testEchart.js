self.addEventListener('message', function (e) {
    var data = e.data
    if (data.type === 'realtime') {
        var arr = []
        var arr2 = []
        var time = []
        var max = 600
        var totole = 0
        var start = 0
        var stop = max
        for (var i = 0; i < stop; i++) {
            // arr.shift();
            time.push(i)
        }
        arr.push(Math.random() * 99);
        arr2.push(Math.random() * 99);
        self.postMessage({ series: arr, series2: arr2, stop, start });
        setTimeout(() => {
            setInterval(function () {
                for (var i = 0; i < 5; i++) {
                    if (totole > max) {
                        time.shift()
                        arr.shift()
                        arr2.shift()
                    }
                    // if (arr.length < 100000) {
                    // arr.shift();
                    if (totole > max) {
                        start = start + 1
                        stop = stop + 1
                        time.push(stop)
                    }
                    self.postMessage({ series: arr, series2: arr2, stop, start, time });
                    arr.push(Math.random() * 99);
                    arr2.push(Math.random() * 99);
                    totole++
                    // }
                    // start = null
                    // stop = null
                }
            }, 66)
        }, 1000)
    } else if (data.type === 'set300k') {
        var arr = []
        var time = []
        var start = 0
        var stop = 300000 - 1
        for (var i = 0; i < 300000; i++) {
            // arr.shift();
            time.push(i)
            arr.push(Math.random() * 99);
        }
        self.postMessage({ series: arr, stop, start, time });
    } else if (data.type === 'set600k') {
        var arr = []
        var time = []
        var start = 0
        var stop = 600000 - 1
        for (var i = 0; i < 600000; i++) {
            time.push(i)
            arr.push(Math.random() * 99);
        }
        self.postMessage({ series: arr, stop, start });
    } else if (data.type === 'testlines') {
        var arr = [
            {
                coords: []
            }
        ]
        var time = []
        var start = 0
        var stop = 600000 - 1
        for (var i = 0; i < 100000; i++) {
            time.push(i)
            // arr.push(Math.random() * 99);
            arr[0].coords.push(
                [i, Math.random() * 99]
            )
        }
        self.postMessage({ series: arr, stop, start, time });
    }
})