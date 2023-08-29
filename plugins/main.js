export default function (app, inject) {
    // app.$store.commit('increment1'); // 调用Vuex store中的 mutation
    app.store.commit('myData/increment1'); 
    const counter = app.store.state.myData.counter; // 访问Vuex store中的 state
    console.log("main get" ,counter);
    var GroupNameitems = [
        {
            value: 'wire',
            text: 'wire',
            customColor: ['rgb(230 173 57 / 0%)', 'rgb(230 173 57 / 50%)'],
            img: '/images/Group-wire.png'
        },
        {
            value: 'fuse',
            text: 'fuse',
            customColor: ['rgb(0 206 83 / 0%)', 'rgb(0 206 83 / 50%)'],
            img: '/images/Group-fuse.png'
        },
        {
            value: 'ct',
            text: 'ct',
            customColor: ['rgb(2 93 255 / 0%)', 'rgb(2 93 255 / 50%)'],
            img: '/images/Group-CT.png'
        },
        {
            value: 'others',
            text: 'others',
            customColor: ['rgb(255 255 255 / 0%)', 'rgb(255 255 255 / 50%)'],
            img: '/images/others.png'
        }
    ]
    var GroupNameSelect = GroupNameitems[0].value
    // var group = (e) => {
    //     arr.push(e)
    // }
    // test
    // 创建一个目标对象，存储你的变量
    // const data1 = {};

    // // 创建一个Proxy对象来拦截对data的操作
    // const dataProxy = new Proxy(data1, {
    //     set: (target, key, value) => {
    //         target[key] = value;
    //         // 在这里添加你想要执行的监听逻辑
    //         console.log(`${key}的值已更新：(pluig)`, value);
    //         return true;
    //     },
    // });
    // setInterval(()=>{
    //   dataProxy.yourVariable = Math.random() * 1000; // 控制台输出：yourVariable的值已更新： 42
    // },1000)
    // test end
    // 示例:創建一個 $myPlugin 全局方法
    const userMaim = {
        groupList() {
            return { list: GroupNameitems, select: GroupNameSelect }
        },
    };
    // if (process.client) {
    // 頁面關閉(瀏覽器)或刷新，執行脫鉤函數
    window.addEventListener('beforeunload', (event) => {
        console.log("脫鉤");
    });
    // }
    // 加入全局，讓組件可以訪問
    inject('userMaim', userMaim);
}