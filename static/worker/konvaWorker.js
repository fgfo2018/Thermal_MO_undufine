
// load konva framework
importScripts('/js/konva.js');

var temperatureChange = [
    ['rgba(216,58,59,0)',
        'rgba(216,58,59,0.4)'],
    ['rgb(255 199 82 / 0%)',
        'rgb(255 199 82 / 50%)'],
    ['rgba(216,58,59,0.4)',
        'rgba(216,58,59,0)'],
    ['rgb(255 199 82 / 50%)',
        'rgb(255 199 82 / 0%)']]
// monkeypatch Konva for offscreen canvas usage
// var tempSize = {
//     width: 100,
//     height: 100
// }
Konva.Util.createCanvasElement = () => {
    const canvas = new OffscreenCanvas(1, 1);
    canvas.style = {};
    return canvas;
};
// 存放ROI
var blobData = []
var tmpColoralarm = 'rgba(255, 255, 255 ,0)'
// now we can create our canvas content
var stage = new Konva.Stage({
    width: 100,
    height: 100,
    renderer: 'webgl'
});
// Konva.pixelRatio = 1
// setTimeout(() => {
//     stage.width(100)
//     stage.height(100);
//     stage.draw();
//     console.log('update layer')
// }, 5000)
var layer = new Konva.Layer();
stage.add(layer);

// layer.listening(false)

var streaming = new Konva.Image({
    // image: streamimg,
    // transformsEnabled: 'position',
    x: 0,
    y: 0,
    // width: 630,
    // height: 355,
    listening: false,
});

layer.add(streaming);
// var circleTest = new Konva.Circle({
//     x: 300,
//     y: 300,
//     radius: 100,
//     perfectDrawEnabled: false,
//     fill: '#051a1f',
//     stroke: '#fff',
//     strokeWidth: 1,
//     draggable: true,
// });
// layer.add(circleTest);
// circleTest.cache();
// var clone;
// for (var n = 0; n < 10; n++) {
//     // 把star clone下來，並修改x,y軸，然後用迴圈重複渲染
//     clone = circleTest.clone({
//         x: Math.random() * 800,
//         y: Math.random() * 600,
//     });
//     clone.cache();
//     layer.add(clone);
// }

// circle.on('mousemove', function (e) {
//     // var mousePos = stage.getPointerPosition();
//     // writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
//     self.postMessage('move');
// });

// circle.on('mouseout', function (e) {
//     // var mousePos = stage.getPointerPosition();
//     // writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
//     self.postMessage('out');
// });

var canvas = null
var tempoffset = {}

self.onmessage = function (evt) {
    // when canvas is passes we can start our worker
    // we can try to use that canvas for the layer with some manual replacement (and probably better performance)
    // but for simplicity we will just copy layer content into passed canvas
    if (evt.data.streaming) {
        var camid = evt.data.cam_id
        var streaming = evt.data.streaming
        // console.log(streaming[0][camid])
        var imgurl = streaming
        // var imgurl = 'data:image/jpeg;base64,' + streaming
        // var imgurl = 'data:image/jpeg;base64,' + streaming[0][camid]
        streamImage(imgurl)
        streaming = null
        imgurl = null
    }
    if (evt.data.offset) { // resize function
        if (JSON.stringify(tempoffset) !== JSON.stringify(evt.data.offset)) {
            // console.log(evt.data.offset);
            var exer = async () => {
                // const offscreenBitmap = await createImageBitmap(canvas);
                console.log("asdasc", canvas);
                canvas.width = evt.data.offset.width
                canvas.height = evt.data.offset.height
            }
            exer()
            stage.setSize({
                width: evt.data.offset.width,
                height: evt.data.offset.height,
            });
            const ctx = canvas.getContext('2d');
            layer.on('draw', () => {
                ctx.clearRect(0, 0, evt.data.offset.width, evt.data.offset.height);
                ctx.drawImage(layer.getCanvas()._canvas, 0, 0);
            });
        }
        tempoffset = evt.data.offset
    }
    if (evt.data.roidata) {
        var camid = evt.data.cam_id
        var roi = evt.data.roidata[camid]
        // var width1 = evt.data.roiwidth
        // var height1 = evt.data.roiheight
        var width1 = stage.width()
        var height1 = stage.height()
        // console.log(width1, height1)

        // blob
        runRoiblol(evt, camid, width1, height1)
        // spot
        runRoispot(roi, camid, width1, height1)
        // line
        runRoiline(roi, camid, width1, height1)
        // line
        runRoiscope(roi, camid, width1, height1)
    }
    if (evt.data.canvas) {
        canvas = evt.data.canvas;
        // adapt stage size
        // we may need to add extra event to resize stage on a fly
        stage.setSize({
            width: canvas.width,
            height: canvas.height,
        });
        const ctx = canvas.getContext('2d');
        // Konva.Layer has support for "draw" event
        // so every time the layer is re-rendered we need to update the canvas
        layer.on('draw', () => {
            // clear content
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // draw layer content
            ctx.drawImage(layer.getCanvas()._canvas, 0, 0);
        });
        // streaming.width(canvas.width)
        // streaming.height(canvas.height)
    }
    // emulate some drag&drop events
    if (evt.data.eventName === 'mouseup') {
        Konva.DD._endDragBefore(evt.data.event);
    }
    if (evt.data.eventName === 'touchend') {
        Konva.DD._endDragBefore(evt.data.event);
    }
    if (evt.data.eventName === 'mousemove') {
        Konva.DD._drag(evt.data.event);
    }
    if (evt.data.eventName === 'touchmove') {
        Konva.DD._drag(evt.data.event);
    }
    if (evt.data.eventName === 'mouseup') {
        Konva.DD._endDragAfter(evt.data.event);
    }
    if (evt.data.eventName === 'touchend') {
        Konva.DD._endDragAfter(evt.data.event);
    }

    // pass incoming events into the stage
    if (evt.data.eventName) {
        const event = evt.data.eventName.replace('mouse', 'pointer');
        stage['_' + event](evt.data.event);
    }
};


// todo 這邊為主程式 
async function streamImage(img) {
    var imgBlob1 = await fetch(img).then(
        (r) => r.blob()
    );
    var streamimg = await createImageBitmap(imgBlob1);

    streaming.image(streamimg)
    // streaming.scale({
    //     x: 1,
    //     y: 1
    // })
    imgBlob1 = null
    streamimg = null
}
// ! spot function
var tmpspotkey = []
var draggableStatus = true
async function runRoispot(roi, camid, width1, height1) {
    const imgBlob = await fetch('/images/spot_1.png').then(
        (r) => r.blob()
    );
    // use "createImageBitmap" instead of "new window.Image()"
    const img = await createImageBitmap(imgBlob);
    var spotsdata = roi.spot
    var tempkey = []
    var spotsdatalen = spotsdata.length
    for (var i = 0; i < spotsdatalen; i++) {
        var index = spotsdata[i]
        // spotsdata.forEach((index) => {
        var sec = stage.find('.' + 'spotgroup_' + index.spot_number)
        if (sec.length > 0) {
            if (draggableStatus) {
                sec.forEach((index1) => {
                    index1.setAttrs({
                        x: index.spot_position.X *
                            width1,
                        y: index.spot_position.Y *
                            height1
                    })
                    //     index1.x(index.spot_position.X *
                    //         width1)
                    //     index1.y(index.spot_position.Y *
                    //         height1)
                    //     // index1.zIndex(100)
                })
            }
        } else {
            var group = new Konva.Group({
                x: index.spot_position.X *
                    width1,
                y: index.spot_position.Y *
                    height1,
                draggable: true,
                offsetX: 16.5,
                offsetY: 16.5,
                name: 'spotgroup_' + index.spot_number
            });
            var circle1 = new Konva.Circle({
                radius: 9,
                fill: '#fff',
                offsetX: -36,
                perfectDrawEnabled: false,
                offsetY: 5,
                stroke: 'black',
                strokeWidth: 1,
                shadowBlur: 3,
            });
            var yoda = new Konva.Image({
                image: img,
            });
            var simpleText = new Konva.Text({
                text: index.spot_number,
                fontSize: 14,
                perfectDrawEnabled: false,
                fill: 'black',
                offsetX: -32,
                offsetY: 10,
            });
            group.add(circle1);
            group.add(yoda);
            group.add(simpleText);
            layer.add(group);
            group.on('mousemove', function (e) {
                self.postMessage({ type: 'move' });
            });
            group.on('mousedown', function (e) {
                console.log('donw')
                draggableStatus = false;
                self.postMessage({ type: 'move' });
            });

            group.on('mouseup', function (e) {
                console.log('up')
                // var mousePos = stage.getPointerPosition();
                // writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
                draggableStatus = true
                self.postMessage({ type: 'out' });
            });
            group.on('mouseout', function (e) {
                self.postMessage({ type: 'out' });
            });
            console.log('add roi spot')
            circle1 = null
            yoda = null
            simpleText = null
            group = null
        }
        tempkey.push('spotgroup_' + index.spot_number)
        // })
    }
    tmpspotkey.forEach((index) => {
        // console.log(index)
        var serach = tempkey.indexOf(index)
        if (serach === -1) {
            var e = stage.find('.' + index)
            e.forEach((index1) => {
                index1.destroy()
            })
            console.log('remove roi spot' + index)
        }
    })
    tmpspotkey = tempkey
}
// ! -------------
// ! line function
var tmplinekey = []
async function runRoiline(roi, camid, width1, height1) {
    var lines = roi.line
    var tempkey = []
    lines.forEach((index) => {
        var sec = stage.find('.' + 'line1_' + index.line_number)
        var line2 = stage.find('.' + 'line2_' + index.line_number)
        var circle1 = stage.find('.' + 'line_circle1_' + index.line_number)
        var circle2 = stage.find('.' + 'line_circle2_' + index.line_number)
        var circle3 = stage.find('.' + 'line_circle3_' + index.line_number)
        var simpleText1 = stage.find('.' + 'line_simpleText_' + index.line_number)
        if (sec.length > 0) {
            sec.forEach((line) => {
                line.points([
                    index.line_position_point_B.X *
                    width1,
                    index.line_position_point_B.Y *
                    height1,
                    index.line_position_point_A.X *
                    width1,
                    index.line_position_point_A.Y *
                    height1,
                ])
            })
            line2.forEach((line) => {
                line.points([index.line_position_point_B.X *
                    width1,
                index.line_position_point_B.Y *
                height1,
                index.line_position_point_A.X *
                width1,
                index.line_position_point_A.Y *
                height1,])
            })
            circle1.forEach((line) => {
                line.setAttrs({
                    x: index.line_position_point_A.X *
                        width1,
                    y: index.line_position_point_A.Y *
                        height1
                })
            })
            circle2.forEach((line) => {
                line.setAttrs({
                    x: index.line_position_point_B.X *
                        width1,
                    y: index.line_position_point_B.Y *
                        height1
                })
            })
            circle3.forEach((line) => {
                line.setAttrs({
                    x: index.line_position_point_B.X *
                        width1,
                    y: index.line_position_point_B.Y *
                        height1
                })
            })
            simpleText1.forEach((line) => {
                line.setAttrs({
                    x: index.line_position_point_B.X *
                        width1,
                    y: index.line_position_point_B.Y *
                        height1
                })
            })
        } else {
            var L1 = new Konva.Line({
                points: [
                    index.line_position_point_B.X *
                    width1,
                    index.line_position_point_B.Y *
                    height1,
                    index.line_position_point_A.X *
                    width1,
                    index.line_position_point_A.Y *
                    height1,
                ],
                perfectDrawEnabled: false,
                stroke: 'black',
                name: 'line1_' + index.line_number,
                strokeWidth: 4,
            });
            var L2 = new Konva.Line({
                x: 0,
                y: 0,
                perfectDrawEnabled: false,
                points: [
                    index.line_position_point_B.X *
                    width1,
                    index.line_position_point_B.Y *
                    height1,
                    index.line_position_point_A.X *
                    width1,
                    index.line_position_point_A.Y *
                    height1,
                ],
                stroke: '#fff',
                name: 'line2_' + index.line_number,
                strokeWidth: 2,
            });
            var circle1 = new Konva.Circle({
                x: index.line_position_point_A.X *
                    width1,
                y: index.line_position_point_A.Y *
                    height1,
                radius: 7,
                perfectDrawEnabled: false,
                fill: '#051a1f',
                stroke: '#fff',
                name: 'line_circle1_' + index.line_number,
                strokeWidth: 1,
            });
            var circle2 = new Konva.Circle({
                x: index.line_position_point_B.X *
                    width1,
                y: index.line_position_point_B.Y *
                    height1,
                radius: 7,
                perfectDrawEnabled: false,
                fill: '#051a1f',
                stroke: '#fff',
                name: 'line_circle2_' + index.line_number,
                strokeWidth: 1,
            });
            var circle3 = new Konva.Circle({
                x: index.line_position_point_B.X *
                    width1,
                y: index.line_position_point_B.Y *
                    height1,
                radius: 9,
                fill: '#fff',
                offsetX: -20,
                perfectDrawEnabled: false,
                offsetY: 15,
                stroke: 'black',
                strokeWidth: 1,
                name: 'line_circle3_' + index.line_number,
                shadowBlur: 3,
            });
            var simpleText = new Konva.Text({
                x: index.line_position_point_B.X *
                    width1,
                y: index.line_position_point_B.Y *
                    height1,
                text: index.line_number,
                perfectDrawEnabled: false,
                fontSize: 14,
                fill: 'black',
                name: 'line_simpleText_' + index.line_number,
                offsetX: -16,
                offsetY: 21,
            });
            layer.add(L1);
            layer.add(L2);
            layer.add(circle1);
            layer.add(circle2);
            layer.add(circle3);
            layer.add(simpleText);
            // layer.add(group);

            L1 = null
            L2 = null
            circle1 = null
            circle2 = null
            circle3 = null
            simpleText = null
            // group = null
        }
        tempkey.push(index.line_number)
    })
    tmplinekey.forEach((index) => {
        var serach = tempkey.indexOf(index)
        if (serach === -1) {
            var sec = stage.find('.' + 'line1_' + index)
            var line2 = stage.find('.' + 'line2_' + index)
            var circle1 = stage.find('.' + 'line_circle1_' + index)
            var circle2 = stage.find('.' + 'line_circle2_' + index)
            var circle3 = stage.find('.' + 'line_circle3_' + index)
            var simpleText1 = stage.find('.' + 'line_simpleText_' + index)
            sec[0].destroy()
            line2[0].destroy()
            circle1[0].destroy()
            circle2[0].destroy()
            circle3[0].destroy()
            simpleText1[0].destroy()
        }
    })
    tmplinekey = tempkey
}
// ! -------------
// ! line function
var tmpscopekey = []
async function runRoiscope(roi, camid, width1, height1) {
    var scopes = roi.scope
    var tempkey = []
    scopes.forEach((index) => {
        var sec = stage.find('.' + 'scope_rect1_' + index.scope_number)
        var sec2 = stage.find('.' + 'scope_rect2_' + index.scope_number)
        var sec3 = stage.find('.' + 'scope_circle1_' + index.scope_number)
        var sec4 = stage.find('.' + 'scope_simpleText_' + index.scope_number)
        if (sec.length > 0) {
            if (draggableStatus) {
                sec[0].setAttrs({
                    x: index.scope_position_point_LT.X *
                        width1,
                    y: index.scope_position_point_LT.Y *
                        height1,
                    width: width1 *
                        (index.scope_position_point_BR.X -
                            index.scope_position_point_LT.X),
                    height: height1 *
                        (index.scope_position_point_BR.Y -
                            index.scope_position_point_LT.Y)
                })
                sec2[0].setAttrs({
                    x: index.scope_position_point_LT.X *
                        width1,
                    y: index.scope_position_point_LT.Y *
                        height1,
                    width: width1 *
                        (index.scope_position_point_BR.X -
                            index.scope_position_point_LT.X),
                    height: height1 *
                        (index.scope_position_point_BR.Y -
                            index.scope_position_point_LT.Y)
                })
                sec3[0].setAttrs({
                    x: index.scope_position_point_LT.X *
                        width1,
                    y: index.scope_position_point_LT.Y *
                        height1,
                })
                sec4[0].setAttrs({
                    x: index.scope_position_point_LT.X *
                        width1,
                    y: index.scope_position_point_LT.Y *
                        height1,
                })
            }
        } else {
            var rect1 = new Konva.Rect({
                x: index.scope_position_point_LT.X *
                    width1,
                y: index.scope_position_point_LT.Y *
                    height1,
                width: width1 *
                    (index.scope_position_point_BR.X -
                        index.scope_position_point_LT.X),
                height: height1 *
                    (index.scope_position_point_BR.Y -
                        index.scope_position_point_LT.Y),
                stroke: 'black',
                perfectDrawEnabled: false,
                name: 'scope_rect1_' + index.scope_number,
                strokeWidth: 4,
            });
            var rect2 = new Konva.Rect({
                x: index.scope_position_point_LT.X *
                    width1,
                y: index.scope_position_point_LT.Y *
                    height1,
                width: width1 *
                    (index.scope_position_point_BR.X -
                        index.scope_position_point_LT.X),
                height: height1 *
                    (index.scope_position_point_BR.Y -
                        index.scope_position_point_LT.Y),
                stroke: '#fff',
                perfectDrawEnabled: false,
                name: 'scope_rect2_' + index.scope_number,
                draggable: true,
                strokeWidth: 2,
                strokeScaleEnabled: false,
            });
            var circle1 = new Konva.Circle({
                x: index.scope_position_point_LT.X *
                    width1,
                y: index.scope_position_point_LT.Y *
                    height1,
                radius: 9,
                fill: '#fff',
                offsetX: 16,
                offsetY: 8,
                perfectDrawEnabled: false,
                stroke: 'black',
                name: 'scope_circle1_' + index.scope_number,
                strokeWidth: 1,
                shadowBlur: 3,
            });
            var simpleText = new Konva.Text({
                x: index.scope_position_point_LT.X *
                    width1,
                y: index.scope_position_point_LT.Y *
                    height1,
                text: index.scope_number,
                fontSize: 14,
                fill: 'black',
                perfectDrawEnabled: false,
                name: 'scope_simpleText_' + index.scope_number,
                offsetX: 20,
                offsetY: 14,
            });
            // console.log('123', Math.max(0, index.scope_position_point_LT.X *
            // width1))
            rect2.on('mousemove', (e) => {
                self.postMessage({ type: 'move' });
            });
            // ! on() on() touchstart touchmove touchend tap dbltap dragstart dragmove dragend YF:https://konvajs.org/docs/events/Mobile_Events.html
            rect2.on('dragmove', (e) => {
                // console.log(e.target.x())
                var sec = stage.find('.' + 'scope_rect1_' + index.scope_number)
                var sec3 = stage.find('.' + 'scope_circle1_' + index.scope_number)
                var sec4 = stage.find('.' + 'scope_simpleText_' + index.scope_number)
                sec[0].setAttrs({
                    x: e.target.x(),
                    y: e.target.y()
                })
                sec3[0].setAttrs({
                    x: e.target.x(),
                    y: e.target.y()
                })
                sec4[0].setAttrs({
                    x: e.target.x(),
                    y: e.target.y()
                })
                draggableStatus = false

            });
            rect2.on('dragend', (e) => {
                // console.log(e.target.width(), index.scope_number)
                // console.log('up')
                // var mousePos = stage.getPointerPosition();
                // writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
                draggableStatus = true
                self.postMessage({ type: 'out' });
                self.postMessage({
                    type: 'update',
                    response: {
                        x: e.target.x() / width1,
                        y: e.target.y() / height1,
                        width: (e.target.x() + e.target.width()) / width1,
                        height: (e.target.y() + e.target.height()) / height1,
                        type: 'scope',
                        number: index.scope_number
                    }
                });
            });
            rect2.on('mouseout', (e) => {
                self.postMessage({ type: 'out' });
            });
            layer.add(rect1);
            layer.add(rect2);
            layer.add(circle1);
            layer.add(simpleText);
            rect1 = null
            rect2 = null
        }
        tempkey.push(index.scope_number)
    })
    tmpscopekey.forEach((index) => {
        var serach = tempkey.indexOf(index)
        if (serach === -1) {
            var sec = stage.find('.' + 'scope_rect1_' + index)
            var sec2 = stage.find('.' + 'scope_rect2_' + index)
            var sec3 = stage.find('.' + 'scope_circle1_' + index)
            var sec4 = stage.find('.' + 'scope_simpleText_' + index)
            sec[0].destroy()
            sec2[0].destroy()
            sec3[0].destroy()
            sec4[0].destroy()
        }
    })
    tmpscopekey = tempkey
}
// ! -------------
// ! blob function
var tmpblobkey = []
var tmpblobdata = []
var testcache = []
async function runRoiblol(event, camid, width1, height1) {
    const imgBlob = await fetch('data:image/png;base64,' + event.data.slashY).then(
        (r) => r.blob()
    );

    // use "createImageBitmap" instead of "new window.Image()"
    const img = await createImageBitmap(imgBlob);
    var roi = event.data.roidata[camid]
    // var width1 = event.data.roiwidth
    // var height1 = event.data.roiheight
    var blob = roi.blob
    var ar = [] // 計算完的ROI
    blob.forEach((index) => {
        // var sch = tmpblobdata.find((item) => item.data === index.data)
        // console.log(index, sch)
        var associated = 0 // associated = 用來判斷該blob是不是同一個元件
        index.points.forEach((e1, arrayindex) => {
            var pr = []
            e1.forEach((val, index1) => {
                if (index1 % 2) {
                    pr.push((height1 * val))
                } else {
                    pr.push((width1 * val))
                }
            })
            var sch = tmpblobdata.find((item) => JSON.stringify(item.points) === JSON.stringify(pr))
            // console.log(tmpblobdata , pr ,sch)
            var stroke1 = null
            var fill1 = null
            // 判斷元件有沒有超溫
            if (index.blob_alarm_status === 1 && index.blob_temperature_max >= index.blob_threshold) {
                stroke1 = 'rgba(216,58,59,1)'
                fill1 = tmpColoralarm
            } else {
                stroke1 = 'rgb(255 199 82)'
            }
            var svgPath = null
            if (sch === undefined || !sch) {
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
                svgPath = "M" + TempPath[0].x + " " + TempPath[0].y;
                for (var z = 1; z < TempPath.length; z = z + 1) {
                    svgPath = svgPath + " L" + TempPath[z].x + " " + TempPath[z].y;
                }
                console.log(`roi${index.blob_number} is updata`)
                // console.log(e1, sch.points[arrayindex])
            } else {
                svgPath = sch.data
            }
            ar.push({
                points: pr,
                data: svgPath,
                stroke: stroke1,
                strokeWidth: 1,
                lineJoin: 'round',
                tension: index.tension,
                name: `blobFind${index.blob_number}_${associated}`,
                fill: fill1,
                // fillPatternImage: img,
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
            // console.log(`blobFind${index.blob_number}_${associated}`)
            associated += 1
        })
        // output.push(ar)
    })
    tmpblobdata = ar
    // 建立物件
    var tmpkey = []

    ar.forEach((item) => {
        var findofblob = stage.find(`.${item.name}`)
        if (findofblob.length > 0) {
            findofblob[0].data(item.data)
            findofblob[0].attrs = item
            findofblob[0].fillPatternImage(img)
        } else {
            var newarray = staticImage(item, img)
            var path = new Konva.Path(newarray);
            layer.add(path);
            testcache.push(path)
        }
        tmpkey.push(`.${item.name}`)
        // newarray = null
        // path = null
    })

    // 編號
    var array = []
    tmpblobkey.forEach((index) => {
        var path1 = stage.find(index)
        path1.forEach((index2) => {
            array.push(index2.attrs)
        })
    })
    var tempArr = []
    ar.forEach((value, key) => {
        var x = 0
        var y = 0
        var w = 0
        var h = 0
        var yArr = []
        var xArr = []
        // var associated = 0 // associated = 用來判斷該blob是不是同一個元件
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
                name: value.name,
                x: filterAgeThan5[0].x - 11,
                y: filterAgeThan5[0].y - 11,
                fill: 'rgba(216,58,59,1)',
                blob_alarm_status: value.blob_alarm_status,
                blob_temperature_max: value.blob_temperature_max,
                blob_threshold: value.blob_threshold
            })
        } else {
            tempArr.push({
                blob_number: value.blob_number,
                name: value.name,
                x: filterAgeThan5[0].x - 11,
                y: filterAgeThan5[0].y - 11,
                fill: 'rgb(255 199 82)',
                blob_alarm_status: value.blob_alarm_status,
                blob_temperature_max: value.blob_temperature_max,
                blob_threshold: value.blob_threshold
            })
        }
    })
    tempArr.forEach((index) => {
        var findofblob1 = stage.find(`.${index.name}_blobcircle`)
        var findofblob2 = stage.find(`.${index.name}_blobtext`)
        if (findofblob1.length > 0) {
            findofblob1.forEach((roi) => {
                roi.setAttrs({
                    x: index.x,
                    y: index.y
                })
                if (index.blob_alarm_status === 1 && parseFloat(index.blob_temperature_max
                ) >= parseFloat(index.blob_threshold
                )) {
                    roi.fill('rgba(216,58,59,1)')
                } else {
                    roi.fill('rgb(255 199 82)')
                }
            })
        } else {
            var circle1 = new Konva.Circle({
                x: index.x,
                y: index.y,
                fill: index.fill,
                name: index.name + '_blobcircle',
                perfectDrawEnabled: false,
                radius: 10
            });
            layer.add(circle1);
            circle1 = null
        }
        if (findofblob2.length > 0) {
            findofblob2.forEach((roi) => {
                roi.x(index.x)
                roi.y(index.y)
            })
        } else {
            var simpleText = new Konva.Text({
                x: index.x,
                y: index.y,
                width: 20,
                text: index.blob_number,
                perfectDrawEnabled: false,
                fontSize: 14,
                fill: 'black',
                name: index.name + '_blobtext',
                offsetX: 10,
                offsetY: 6,
                align: 'center'
            });
            layer.add(simpleText);
            simpleText = null
        }
    })
    tmpblobkey.forEach((index) => {
        var serach = tmpkey.indexOf(index)
        if (serach === -1) {
            var q = stage.find(index)
            var num = stage.find(index + '_blobcircle')
            var numb = stage.find(index + '_blobtext')
            if (q.length > 0) {
                num.forEach((value) => {
                    value.destroy()
                })
                numb.forEach((value) => {
                    value.destroy()
                })
                q.forEach((value) => {
                    value.destroy()
                })
            }
            console.log("移除", index)
        }
        serach = null
    })
    tmpblobkey = tmpkey
    tmpkey = null
    blobData = blob
    roi = null
    ar = null
}

setTimeout(() => {
    console.log(tmpblobkey);
    testcache[0].cache()
    var testclone = testcache[0].clone({
        data: 'M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z',
        name: 'blob_123123',
        blob_alarm_status: 1,
        blob_temperature_max: "30.6",
        blob_threshold: 0,
    })
    testclone.cache()
    layer.add(testclone)
}, 1000)
// testcache[0].cache()


// ! -------------
// todo 這邊為主程式 end

// todo 這邊為副程式 
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
function compare(a, b) {
    if (a.x < b.x) {
        return -1;
    }
    if (a.x > b.x) {
        return 1;
    }
    return 0;
}
function staticImage(data, img) {
    var arr = data
    var roiTemperatureMax = parseFloat(arr.blob_temperature_max)
    var roiAlarmStatus = parseInt(arr.blob_alarm_status)
    var roiThreshold = parseFloat(arr.blob_threshold)
    // console.log(roiTemperatureMax, roiAlarmStatus, roiThreshold)
    if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) {
        // arr.fill = `rgba(216,58,59,0.7)`
        arr.stroke = 'rgb(216,58,59)'
    } else {
        // arr.fillPatternImage = fillBackground(
        //     temperatureChange[1][0],
        //     temperatureChange[1][1]
        // )
        arr.fillPatternImage = img
        arr.stroke = 'rgb(255 199 82)'
    }
    roiTemperatureMax = null
    roiAlarmStatus = null
    roiThreshold = null
    return arr
}
// 斜線方法
function fillBackground(fillStyle, strokeStyle) {
    var p = document.createElement('canvas')
    p.width = 32
    p.height = 16
    var pctx = p.getContext('2d')

    var x0 = 36
    var x1 = -4
    var y0 = -2
    var y1 = 18
    var offset = 32

    pctx.beginPath()
    pctx.rect(-2, -2, 34, 18)
    pctx.fillStyle = fillStyle
    pctx.fill()

    pctx.strokeStyle = strokeStyle
    pctx.lineWidth = 1
    pctx.beginPath()
    pctx.moveTo(x0, y0)
    pctx.lineTo(x1, y1)
    pctx.moveTo(x0 - offset, y0)
    pctx.lineTo(x1 - offset, y1)
    pctx.moveTo(x0 + offset, y0)
    pctx.lineTo(x1 + offset, y1)
    pctx.stroke()
    pctx = null
    x0 = null
    x1 = null
    y0 = null
    y1 = null
    offset = null
    return p
}
// todo 這邊為副程式 end

// var delaydata = new Date()
// delaydata = delaydata.getTime()
var fps123 = 0
function requestAnimationFrame(cb) {
    // var delaydataend = new Date()
    // delaydataend = delaydataend.getTime()
    // var delaysum = (delaydata + 1000) - delaydataend
    // if (delaysum < 0){
    //     console.log('get 1 秒');
    //     delaydata = delaydata + 1000
    // }
    setTimeout(cb, 16);
}
var saveBlob = []
// that function is large and adapted from bunnies demo
// the only interesting part here is how to load images to use for Konva.Image
var intervalsum = 0
var focusBlolbNumber1 = null

async function runBunnies() {

    function update() {
        self.postMessage({ type: 'updataoffsetWH' });
        // if (canvas !== null) {
        // layer.setSize({
        //     width: canvas.width,
        //     height: canvas.height,
        // });
        // }
        // console.log(canvas.width ,canvas.height)
        // zindex 重整
        // ! 這邊為blob動畫
        if (fps123 % 5 === 0) {
            // console.log(fps123)
            var roiDataName = { spot: [], line: [], scope: [], blob: [] }
            var sortRoi = ['blob', 'scope', 'line', 'spot'] // 由左至右 左邊最下層
            var roitotleSum = 1
            // 長度快取
            var getChildrenlength = layer.getChildren().length
            var sortRoilength = sortRoi.length
            // console.log(layer.getChildren())
            // layer.getChildren().forEach((child) => {
            for (var i = 0; i < getChildrenlength; i++) {
                // Object.keys(roiDataName).forEach((key) => {
                for (var z = 0; z < sortRoilength; z++) {
                    var str = layer.getChildren()[i].name()
                    if (str.search(sortRoi[z]) !== -1) {
                        roiDataName[sortRoi[z]].push(str)
                    }
                    // })
                }
            }
            // })
            for (var z = 0; z < sortRoilength; z++) {
                var roiDataNamelen = roiDataName[sortRoi[z]].length
                // sortRoi.forEach((index) => {
                // roiDataName[index].forEach((index1) => {
                for (var j = 0; j < roiDataNamelen; j++) {
                    var ye = stage.find('.' + roiDataName[sortRoi[z]][j])
                    var yelen = ye.length
                    for (var k = 0; k < yelen; k++) {
                        ye[k].zIndex(roitotleSum);
                        roitotleSum++
                    }
                    // ye.forEach((find1) => {
                    //     find1.zIndex(roitotleSum);
                    //     roitotleSum++
                    // })
                }
                // })
                // })
            }
            // end
            var path = []
            // var newtmpblobkey = [...tmpblobkey, '.blob_123123']
            // console.log(newtmpblobkey);
            var tmpblobkeylen = tmpblobkey.length
            // tmpblobkey.forEach((index) => {
            for (var t = 0; t < tmpblobkeylen; t++) {
                var path1 = stage.find(tmpblobkey[t])
                var path1len = path1.length
                for (var k = 0; k < path1len; k++) {
                    path.push(path1[k])
                }
                // path1.forEach((index2) => {
                // })
            }
            // })
            // console.log(tmpblobkey)
            var st = true
            var points = []
            // var SelfRect = []
            var pathlen = path.length
            for (var p = 0; p < pathlen; p++) {
                // path.forEach((value, index) => {
                // var point = value.toObject()
                points.push(path[p].attrs.points)
                // })
            }
            var srtingPath = JSON.stringify(points)
            saveBlob === srtingPath ? st = false : st = true
            // st = true
            // console.log("updata roi")
            for (var tte = 0; tte < pathlen; tte++) {
                var value = path[tte]
                // path.forEach((value, index) => {
                // Blob background fill 
                var co2 = Math.abs(Math.sin((intervalsum * 2 * Math.PI) / 3000) / 4) + 0.2
                var roiNumber = parseFloat(value.attrs.blob_number)
                var roiTemperatureMax = parseFloat(value.attrs.blob_temperature_max)
                var roiAlarmStatus = parseInt(value.attrs.blob_alarm_status)
                // var roigroupname = value.attrs.group_name
                var roiThreshold = parseFloat(value.attrs.blob_threshold)
                if (focusBlolbNumber1 !== null) {
                    var focusBlolbNumber = parseInt(blobData[parseInt(focusBlolbNumber1)].blob_number)
                }
                if (roiAlarmStatus === 1 && roiTemperatureMax >= roiThreshold) { // 超溫
                    if (focusBlolbNumber === roiNumber) {
                        value.fill(`rgba(216,58,59,0.7)`)
                    } else {
                        value.fill(`rgba(216,58,59,${co2})`)
                        tmpColoralarm = `rgba(216,58,59,${co2})`
                    }
                    value.fillPatternImage('')
                    value.stroke('rgb(216,58,59)')
                } else { // 沒超溫
                    // 選取相同區域
                    // if (focusBlolbNumber === roiNumber) {
                    //     value.fillPatternImage(this.fillBackground(
                    //         temperatureChange[3][0],
                    //         temperatureChange[3][1]
                    //     ))
                    // } else {
                    //     value.fillPatternImage(this.fillBackground(
                    //         temperatureChange[1][0],
                    //         temperatureChange[1][1]
                    //     ))
                    //     if (this.shortLogBlobGroup === roigroupname) {
                    //         value.fillPatternImage(this.fillBackground(
                    //             temperatureChange[4][0],
                    //             temperatureChange[4][1]
                    //         ))
                    //     }
                    // }

                    value.fill('')
                    value.stroke('rgb(255 199 82)')
                }
                // })
            }

            intervalsum = intervalsum + 130
            if (intervalsum > 100000) {
                intervalsum = 0
            }
        }
        // ! 這邊為blob動畫 ----^^^^
        layer.drawScene();
        fps123++
        requestAnimationFrame(update);
    }
    update();
}

runBunnies();