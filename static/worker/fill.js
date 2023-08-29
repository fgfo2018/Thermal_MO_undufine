self.addEventListener('message', function (e) {
    try {
        var rois = JSON.parse(e.data)
        var array = []
        rois.forEach((value, key) => {
            var roi = JSON.parse(value).attrs
            roi.data = null
            array.push(roi)
        })
        // Object.keys(array[0]).forEach(key => {
        //     console.log(key, array[0][key]);
        // })
        self.postMessage("ok");
    } catch (error) {
        self.postMessage("ok");
    }
}, false);
