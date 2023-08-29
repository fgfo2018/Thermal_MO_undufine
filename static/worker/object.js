self.addEventListener('message', function (e) {
    try {
        // return res
        var blob = e.data.data
        var ar = []
        blob.forEach((index) => {
            var associated = 0 // associated = 用來判斷該blob是不是同一個元件
            index.points.forEach((e1) => {
                var pr = []
                e1.forEach((val, index1) => {
                    if (index1 % 2) {
                        pr.push((e.data.height * val))
                    } else {
                        pr.push((e.data.width * val))
                    }
                })
                // console.log('test', pr)
                var stroke1 = null
                // var fillcolor = null
                // 判斷元件有沒有超溫
                if (index.blob_alarm_status === 1 && index.blob_temperature_max >= index.blob_threshold) {
                    //   fille = null
                    //   fillcolor = 'rgba(216,58,59,0.2)'
                    stroke1 = 'rgba(216,58,59,1)'
                } else {
                    //   fille = this.fillBackground(
                    //     this.temperatureChange[1][0],
                    //     this.temperatureChange[1][1]
                    //   )
                    //   fillcolor = null
                    stroke1 = 'rgb(255 199 82)'
                }
                var path = splineCurrent(pr, 0.5, 25, true)
                var TempPath = []
                var a = null
                path.forEach((va, ie) => {
                    if (ie % 2 === 0) {
                        a = {
                            x: 0,
                            y: 0
                        }
                        a.x = va
                    } else {
                        a.y = va
                        TempPath.push(a)
                    }
                })
                // object to path svg
                var svgPath = "M" + TempPath[0].x + " " + TempPath[0].y;
                for (var z = 1; z < TempPath.length; z = z + 1) {
                    svgPath = svgPath + " L" + TempPath[z].x + " " + TempPath[z].y;
                }
                ar.push({
                    points: pr,
                    data: svgPath,
                    stroke: stroke1,
                    strokeWidth: 1,
                    lineJoin: 'round',
                    tension: index.tension,
                    name: 'blobFind',
                    // fill:fillcolor,
                    // fillPatternImage: fille,
                    perfectDrawEnabled: false,
                    closed: true,
                    fillPatternRotation: -20,
                    /*
                     * line segments with a length of 33px
                     * with a gap of 10px
                     */
                    // dash: [33, 10],
                    // lineCap: 'round',
                    group_name: index.group_name,
                    blob_number: index.blob_number,
                    blob_alarm_status: index.blob_alarm_status,
                    blob_temperature_max: parseFloat(index.blob_temperature_max).toFixed(1),
                    blob_threshold: index.blob_threshold,
                    associated
                })
                associated += 1
            })
            // output.push(ar)
        })

        self.postMessage(ar);
    } catch (error) {
        self.postMessage([]);
    }
}, false);

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