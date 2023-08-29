// 非專業人員請勿更動此檔案
// 隨意更動會造成整個系統錯誤、不穩定
// 更動前請先備份
import Vue from 'vue'

export default ({ app }, inject) => {
    inject('config', Vue.observable({
        // WebSocket 呼叫網址
        webSocket: 'ws://localhost:8701',
        // webSocket: 'ws://192.168.0.173:8701',
        // webSocket: 'ws://localhost:6180',
        // API 呼叫網址
        // monitorInitial:'http://127.0.0.1:5001/api/monitor/initial',
        // objectData:'http://127.0.0.1:5002/api/monitor/object/data'
    }))
}