var st = false
var session = 0
self.addEventListener('message', function (e) {
    var res = e.data
    if (res.type === 'open') {
        st = true
    } else if (res.type === 'connection') {
        if (st) {
            session = Math.random() * 9999999
            var params = JSON.parse(res.content)
            Object.keys(params).forEach(key => {
                // console.log(compressBase64Image('data:image/jpeg;base64,' + params.cam_00_00001, 320, 240));
                params[key] = getBlob(atob(params[key]), 'image/jpg')
            })
            self.postMessage({ params, session });
            session++
            params = null
            st = false
        } 
        // else {
        //     console.log("漏禎");
        // }
    }
    res = null
})

function getBlob(byteString, mimeString) {
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    var blob = new Blob([ab], { type: mimeString })
    ab = null
    ia = null
    return blob
}
// function compressBase64Image(base64Image, maxWidth, maxHeight) {
    // console.log("4545", base64ToBlob(base64Image));
    // return new Promise((resolve, reject) => {
        // createImageBitmap(base64ToBlob(base64Image))
            // .then(bitmap => {
                // console.log("ass", bitmap);
                // resolve(bitmap)
                // var arr = {}
                // Object.keys(bitmap).forEach(key => {
                //     let width = bitmap.width;
                //     let height = bitmap.height;
                //     if (width > maxWidth || height > maxHeight) {
                //         if (width > height) {
                //             height *= maxWidth / width;
                //             width = maxWidth;
                //         } else {
                //             width *= maxHeight / height;
                //             height = maxHeight;
                //         }
                //     }

                //     const canvas = new OffscreenCanvas(width, height);
                //     const ctx = canvas.getContext('2d');
                //     ctx.drawImage(bitmap, 0, 0, width, height);

                //     canvas.convertToBlob({ type: 'image/jpeg', quality: 0.7 })
                //         .then(blob => {
                //             const reader = new FileReader();
                //             reader.onloadend = function () {
                //                 const compressedBase64 = reader.result;
                //                 // console.log(canvas);
                //                 arr[key] = resolve(compressedBase64)
                //                 // resolve(compressedBase64);
                //             };
                //             reader.onerror = function () {
                //                 reject(new Error('Failed to convert blob to Base64.'));
                //             };
                //             reader.readAsDataURL(blob);
                //         })
                //         .catch(error => {
                //             reject(new Error('Failed to convert canvas to blob.'));
                //         });
                // })
                // console.log("sss" , arr);
//             })
//             .catch(error => {
//                 reject(new Error('Failed to create image bitmap.'));
//             });
//     });
// }

// function base64ToBlob(base64) {
//     // console.log(base64);
//     var arr = {}
//     Object.keys(base64).forEach(key => {
//         const parts = ('data:image/jpeg;base64,' + base64[key]).split(';base64,');
//         const contentType = parts[0].split(':')[1];
//         const byteCharacters = atob(parts[1]);
//         const byteArrays = [];

//         for (let i = 0; i < byteCharacters.length; i++) {
//             byteArrays.push(byteCharacters.charCodeAt(i));
//         }
//         arr[key] = new Blob([new Uint8Array(byteArrays)], { type: contentType })
//     })
//     // console.log(arr);
//     return arr;
// }