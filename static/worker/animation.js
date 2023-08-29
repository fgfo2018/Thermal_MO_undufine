self.addEventListener('message', function (e) {
    try {
        var rois = JSON.parse(e.data[0])
        var array = []
        // console.log(Math.max.apply(null, [9, 92, 1, 22]))
        rois.forEach((value, key) => {
            var roi = JSON.parse(value).attrs
            roi.data = null
            array.push(roi)
        })
        // console.log(array[0].points)
        // var yArr = []
        // var xArr = []
        // array[0].points.forEach((value, key) => {
        //     if (key % 2 === 0) {
        //         xArr.push(value)
        //     } else {
        //         yArr.push(value)
        //     }
        // })
        // x = Math.min.apply(null, xArr)
        // y = Math.min.apply(null, yArr)
        // w = Math.max.apply(null, xArr)
        // h = Math.max.apply(null, yArr)
        // console.log(x,
        //     y,
        //     w,
        //     h)
        var tempArr = []
        array.forEach((value, key) => {
            var x = 0
            var y = 0
            var w = 0
            var h = 0
            var yArr = []
            var xArr = []
            value.points.forEach((value, key) => {
                if (key % 2 === 0) {
                    xArr.push(value)
                } else {
                    yArr.push(value)
                }
            })
            x = Math.min.apply(null, xArr)
            y = Math.min.apply(null, yArr)
            w = Math.max.apply(null, xArr)
            h = Math.max.apply(null, yArr)
            // console.log(x,
            //     y,
            //     w,
            //     h)
            // 
            var pr = []
            value.points.forEach((val, index1) => {
                if (index1 % 2) {
                    pr.push(val)
                } else {
                    pr.push(val)
                }
            })
            var path = splineCurrent(pr, 0.5, 25, true)
            var arr = []
            var tmp = { x: 0, y: 0 }
            path.forEach((value1, index1) => {
                if (index1 % 2) {
                    tmp.y = value1
                    arr.push(tmp)
                    tmp = { x: 0, y: 0 }
                } else {
                    tmp.x = value1
                }
                // arr.push({ x: value1.points[0], y: value1.points[1] })
            })
            var filterAgeThan5 = arr.filter(function (item, index, array) {
                // return item.y > e.data[1][key].y + (e.data[1][key].height * 0) && item.y <= e.data[1][key].y + (e.data[1][key].height * 0.05);
                return item.y > y + (h * 0) && item.y <= y + (h * 0.05);
            });
            filterAgeThan5.sort(compare)
            if (value.blob_alarm_status === 1 && parseFloat(value.blob_temperature_max
            ) >= parseFloat(value.blob_threshold
            )) {
                tempArr.push({
                    blob_number: value.blob_number,
                    x: filterAgeThan5[0].x - 11,
                    y: filterAgeThan5[0].y - 11,
                    fill: 'rgba(216,58,59,1)',
                })
            } else {
                tempArr.push({
                    blob_number: value.blob_number,
                    x: filterAgeThan5[0].x - 11,
                    y: filterAgeThan5[0].y - 11,
                    fill: 'rgb(255 199 82)',
                })
            }


        })

        // e.data.forEach((value) => {
        //     var arr = []
        //     value.path.forEach((value1, index1) => {
        //         arr.push({ x: value1.points[0], y: value1.points[1] })
        //     })

        //     // console.log(arr)
        //     var filterAgeThan5 = arr.filter(function (item, index, array) {
        //         return item.y > value.SelfRect.y + (value.SelfRect.height * 0) && item.y <= value.SelfRect.y + (value.SelfRect.height * 0.05);
        //     });
        //     filterAgeThan5.sort(compare)
        //     if (value.blob_alarm_status === 1 && parseFloat(value.blob_temperature_max
        //     ) >= parseFloat(value.blob_threshold
        //     )) {
        //         tempArr.push({
        //             blob_number: value.blob_number,
        //             x: filterAgeThan5[0].x - 11,
        //             y: filterAgeThan5[0].y - 11,
        //             fill: 'rgba(216,58,59,1)',
        //         })
        //     } else {
        //         tempArr.push({
        //             blob_number: value.blob_number,
        //             x: filterAgeThan5[0].x - 11,
        //             y: filterAgeThan5[0].y - 11,
        //             fill: 'rgb(255 199 82)',
        //         })
        //     }
        // })

        // this.blobnumbers = tempArr
        self.postMessage(tempArr);
    } catch (error) {
        self.postMessage([]);
    }
}, false)

function compare(a, b) {
    if (a.x < b.x) {
        return -1;
    }
    if (a.x > b.x) {
        return 1;
    }
    return 0;
}

function splineCurrent(points, tension, numOfSeg, close) {
    // var points = e.data.points
    // var tension = e.data.tension
    // var numOfSeg = e.data.numOfSeg
    // var close = e.data.close

    tension = typeof tension === 'number' ? tension : 0.5
    // numOfSeg = typeof numOfSeg === 'number' ? numOfSeg : 25
    numOfSeg = 70

    var pts // for cloning point array
    var i = 1
    var l = points.length
    var rPos = 0
    var rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0)
    var res = new Float32Array(rLen)
    var cache = new Float32Array((numOfSeg + 2) * 4)
    var cachePtr = 4
    var st, st2, st3, st23, st32, parse

    pts = points.slice(0)
    if (close) {
        pts.unshift(points[l - 1]) // insert end point as first point
        pts.unshift(points[l - 2])
        pts.push(points[0], points[1]) // first point as last point
    } else {
        pts.unshift(points[1]) // copy 1. point and insert at beginning
        pts.unshift(points[0])
        pts.push(points[l - 2], points[l - 1]) // duplicate end-points
    }
    // cache inner-loop calculations as they are based on t alone
    cache[0] = 1 // 1,0,0,0
    for (; i < numOfSeg; i++) {
        st = i / numOfSeg
        st2 = st * st
        st3 = st2 * st
        st23 = st3 * 2
        st32 = st2 * 3
        cache[cachePtr++] = st23 - st32 + 1 // c1
        cache[cachePtr++] = st32 - st23 // c2
        cache[cachePtr++] = st3 - 2 * st2 + st // c3
        cache[cachePtr++] = st3 - st2 // c4
    }
    cache[++cachePtr] = 1 // 0,1,0,0

    parse = function (pts, cache, l) {
        var i = 2
        var t, pt1, pt2, pt3, pt4, t1x, t1y, t2x, t2y, c, c1, c2, c3, c4

        for (i; i < l; i += 2) {
            pt1 = pts[i]
            pt2 = pts[i + 1]
            pt3 = pts[i + 2]
            pt4 = pts[i + 3]
            t1x = (pt3 - pts[i - 2]) * tension
            t1y = (pt4 - pts[i - 1]) * tension
            t2x = (pts[i + 4] - pt1) * tension
            t2y = (pts[i + 5] - pt2) * tension
            for (t = 0; t < numOfSeg; t++) {
                // t * 4;
                c = t << 2 // jshint ignore: line
                c1 = cache[c]
                c2 = cache[c + 1]
                c3 = cache[c + 2]
                c4 = cache[c + 3]

                res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x
                res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y
            }
        }
        i = null
        t = null
        pt1 = null
        pt2 = null
        pt3 = null
        pt4 = null
        t1x = null
        t1y = null
        t2x = null
        t2y = null
        c = null
        c1 = null
        c2 = null
        c3 = null
        c4 = null
    }

    // calc. points
    parse(pts, cache, l)

    if (close) {
        // l = points.length;
        pts = []
        pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]) // second last and last
        pts.push(points[0], points[1], points[2], points[3]) // first and second
        parse(pts, cache, 4)
    }
    // add last point
    l = close ? 0 : points.length - 2
    res[rPos++] = points[l]
    res[rPos] = points[l + 1]

    pts = null
    i = null
    l = null
    rPos = null
    rLen = null
    // res = null
    cache = null
    cachePtr = null
    st = null
    st2 = null
    st3 = null
    st23 = null
    st32 = null
    parse = null

    return res
}