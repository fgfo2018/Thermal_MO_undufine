export default function (context, inject) {
    // 在這邊建立一個ws02 roi監聽器
    // 讓default 呼叫 拿取ROI的群組
    var webstust = true
    // ws01
    var ws01 = null
    var ws01Int = null
    var connectWs01 = () => {
        // ws01 = new WebSocket("ws://192.168.0.173:8701/");
        ws01 = new WebSocket("ws://localhost:8701/");
        ws01.onopen = (e) => {
            console.log('(plugins)串流連接成功::8701');
        }
        ws01.onclose = (e) => {
            console.log("(plugins)串流連接中斷::8701");
            if (webstust) {
                console.log("(plugins)嘗試重新連結...::8701");
                if (ws01Int !== null) {
                    clearTimeout(ws01Int)
                }
                ws01Int = setTimeout(() => {
                    connectWs01()
                    clearTimeout(ws01Int)
                    ws01Int = null
                }, 3000)
            }
        }
    }
    connectWs01()
    // ws02
    var ws02 = null
    var ws02Int = null
    var ws02ROIfunction = null
    var ws02RoiGroupList = {}
    var roiGroupcurr = (e) => {
        var data = JSON.parse(e.data)
        Object.keys(data).forEach((key) => {
            // if (key === 'cam_00_00001') {
            ws02RoiGroupList[key] = {}
            var blob = data[key].blob
            var bloblen = blob.length
            for (var i = 0; i < bloblen; i++) {
                ws02RoiGroupList[key][blob[i].group_name] = []
            }
            for (var z = 0; z < bloblen; z++) {
                var find = ws02RoiGroupList[key][blob[z].group_name].find((e) => (e).toString() === (blob[z].group_id).toString())
                if (find === undefined) {
                    ws02RoiGroupList[key][blob[z].group_name].push((blob[z].group_id).toString())
                }
                find = null
            }
            blob = null
            bloblen = null
            // }
        })
        data = null
    }
    var connectWs02 = () => {
        ws02 = new WebSocket("ws://localhost:8702/");
        // ws02 = new WebSocket("ws://192.168.0.173:8702/");
        ws02.onopen = (e) => {
            console.log('(plugins)串流連接成功::8702');
            ws02.addEventListener('message', roiGroupcurr)
            ws02ROIfunction = roiGroupcurr
        }
        ws02.onclose = (e) => {
            console.log("(plugins)串流連接中斷::8702");
            if (webstust) {
                console.log("(plugins)嘗試重新連結...::8702");
                if (ws02Int !== null) {
                    clearTimeout(ws02Int)
                }
                ws02Int = setTimeout(() => {
                    connectWs02()
                    clearTimeout(ws02Int)
                    ws02Int = null
                }, 3000)
                ws02.removeEventListener('message', ws02ROIfunction)
            }
        }

    }
    connectWs02()

    // ws03
    var ws03 = null
    var ws03Int = null
    var wssend03 = null
    var connectWs03 = () => {
        if (wssend03 !== null) {
            clearInterval(wssend03)
            wssend03 = null
        }
        ws03 = new WebSocket("ws://localhost:8703/");
        // ws03 = new WebSocket("ws://192.168.0.116:8703/");
        ws03.onopen = (e) => {
            console.log('(plugins)串流連接成功::8703');
            wssend03 = setInterval(() => {
                // console.log("心跳");
                ws03.send(JSON.stringify({
                    type: 'life',
                    session: Math.random().toString(36).substr(2),
                }))
            }, 1000)
        }
        ws03.onclose = (e) => {
            if (wssend03 !== null) {
                clearInterval(wssend03)
                wssend03 = null
            }
            console.log("(plugins)串流連接中斷::8703");
            if (webstust) {
                console.log("(plugins)嘗試重新連結...::8703");
                if (ws03Int !== null) {
                    clearTimeout(ws03Int)
                }
                ws03Int = setTimeout(() => {
                    connectWs03()
                    clearTimeout(ws03Int)
                    ws03Int = null
                }, 3000)
            }
        }
        
    }
    connectWs03()
    // ws04
    // var ws04 = null
    // var ws04Int = null
    // var connectWs04 = () => {
    //     ws04 = new WebSocket("ws://localhost:8704/");
    //     // ws04 = new WebSocket("ws://192.168.0.173:8704/");
    //     ws04.onopen = (e) => {
    //         console.log('(plugins)串流連接成功::8704');
    //     }
    //     ws04.onclose = (e) => {
    //         console.log("(plugins)串流連接中斷::8704");
    //         if (webstust) {
    //             console.log("(plugins)嘗試重新連結...::8704");
    //             if (ws04Int !== null) {
    //                 clearTimeout(ws04Int)
    //             }
    //             ws04Int = setTimeout(() => {
    //                 connectWs04()
    //                 clearTimeout(ws04Int)
    //                 ws04Int = null
    //             }, 3000)
    //         }
    //     }
    // }
    // connectWs04()
    // 示例:創建一個 $myPlugin 全局方法
    const myPlugin = {
        webSocketconnect01() {
            return ws01
        },
        webSocketconnect02() {
            return ws02
        },
        getRoiGroupList() {
            return ws02RoiGroupList
        },
        webSocketconnect03() {
            return ws03
        },
        // webSocketconnect04() {
        //     return ws04
        // }
    };

    // if (process.client) {
    // 頁面關閉(瀏覽器)或刷新，執行脫鉤函數
    window.addEventListener('beforeunload', (event) => {
        // 先將整體狀態false 避免重新連接啟動
        webstust = false
        // 先清除計時器
        if (ws01Int !== null) {
            clearTimeout(ws01Int)
        }
        if (ws02Int !== null) {
            clearTimeout(ws02Int)
        }
        if (ws03Int !== null) {
            clearTimeout(ws03Int)
        }
        // if (ws04Int !== null) {
        //     clearTimeout(ws03Int)
        // }
        // console.log('Before unloading the page...');
        // return '你確定要離開? 如果有未保存的資訊，將會丟失!';
    });
    // }
    // 加入全局，讓組件可以訪問
    inject('myPlugin', myPlugin);
}