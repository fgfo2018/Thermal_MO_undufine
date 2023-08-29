var temp = []
var canvas = []
var ctx = []
self.addEventListener('message', function (e) {
    var data = e.data
    if (data.type === 'init') {
        canvas.push(data.offscreen)
        ctx.push(data.offscreen.getContext('2d'))
    } else if (data.type === 'send') {
        var base64 = 'data:image/jpeg;base64,' + data.base64.cam_00_00001
        fetch(base64, { mode: 'cors' })
            .then(response => response.blob())
            .then(blob => createImageBitmap(blob))
            .then(bitmap => {
                var ctxlen = ctx.length
                for (var i = 0; i < ctxlen; i++) {
                    ctx[i].drawImage(bitmap, 0, 0, ctx[i].canvas.width, ctx[i].canvas.height)
                }
            });
    }
})