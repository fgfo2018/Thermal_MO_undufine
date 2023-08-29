var temp = []
self.addEventListener('message', function (e) {
    var data = e.data
    var type = data.type
    if (type === 'getImage') {
        // if (bunny !== null) {
        var data1 = JSON.parse(data.content)
        data1 = data1.cam_00_00001
        data1 = 'data:image/png;base64, ' + data1
        var x = new XMLHttpRequest();
        x.responseType = 'blob';
        x.open('GET', data1, true);
        x.onload = function (e) {
            if (x.status === 200) {
                const blob = x.response;
                if (blob.size > 10) {
                    // console.log({ type: 'getImage', parameter: blob });
                    self.postMessage({ type: 'getImage', parameter: blob });
                    // console.log(x);
                    // createImageBitmap(blob)
                    //     .then(bitmap => {
                    //         for (var i = 0; i < temp.length; i++) {
                    //             temp[i].destroy({
                    //                 texture: true, // 將 texture 移除
                    //                 baseTexture: true // 將 baseTexture 移除
                    //             });
                    //         }
                    //         // do what you wanna do
                    //         var secondTexture = PIXI.Texture.from(bitmap);
                    //         bunny.texture = secondTexture
                    //         bunny.width = canvas.width;       // 設定 Sprite 的寬度
                    //         bunny.height = canvas.height;     // 設定 Sprite 的高度
                    //         temp.push(secondTexture)

                    //     })
                    //     .catch(err => {
                    //         // st = true
                    //         console.log('漏禎');
                    //     })
                } else {
                    // st = true
                    console.log('圖像錯誤');
                }
            }
        }
        x.send();
        // }
    }
})


// -----2023/06/30 09:36----- pixjs-streaming backup
// importScripts('pixijs.download_v7.2.4_webworker.js');
// var app = null
// var canvas = null
// var container = null
// // var texture = null
// var bunny = null
// var temp = []
// self.addEventListener('message', function (e) {
//     var data = e.data
//     var type = data.type
//     if (type === 'init') {
//         canvas = data.offscreen
//         canvas.width = data.width
//         canvas.height = data.height
//         app = new PIXI.Application({ view: canvas, width: canvas.width, height: canvas.height, resolution: 1, background: 0x000000 });
//         container = new PIXI.Container();
//         app.stage.addChild(container);
//         app.stage.interactive = true;
//         const graphics = new PIXI.Graphics();
//         // Opt-in to interactivity
//         graphics.interactive = true;
//         // Shows hand cursor
//         graphics.cursor = 'pointer';
//         // Rectangle
//         graphics.beginFill(0xDE3249);
//         graphics.drawRect(50, 50, 100, 100);
//         graphics.endFill();
//         app.stage.addChild(graphics);
//         bunny = new PIXI.Sprite();
//         bunny.width = data.width;       // 設定 Sprite 的寬度
//         bunny.height = data.height;     // 設定 Sprite 的高度
//         app.stage.addChild(bunny);
//     } else if (type === 'getImage') {
//         if (bunny !== null) {
//             var data1 = JSON.parse(data.content)
//             data1 = data1.cam_00_00001
//             data1 = 'data:image/png;base64, ' + data1
//             var x = new XMLHttpRequest();
//             x.responseType = 'blob';
//             x.open('GET', data1, true);
//             x.onload = function (e) {
//                 if (x.status === 200) {
//                     const blob = x.response;
//                     if (blob.size > 10) {
//                         // console.log(x);
//                         createImageBitmap(blob)
//                             .then(bitmap => {
//                                 for (var i = 0; i < temp.length; i++) {
//                                     temp[i].destroy({
//                                         texture: true, // 將 texture 移除
//                                         baseTexture: true // 將 baseTexture 移除
//                                     });
//                                 }
//                                 // do what you wanna do
//                                 var secondTexture = PIXI.Texture.from(bitmap);
//                                 bunny.texture = secondTexture
//                                 bunny.width = canvas.width;       // 設定 Sprite 的寬度
//                                 bunny.height = canvas.height;     // 設定 Sprite 的高度
//                                 temp.push(secondTexture)

//                             })
//                             .catch(err => {
//                                 // st = true
//                                 console.log('漏禎');
//                             })
//                     } else {
//                         // st = true
//                         console.log('圖像錯誤');
//                     }
//                 }
//             }
//             x.send();
//         }
//     }
// })
