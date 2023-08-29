export const state = () => ({
    counter: 0,
    tab: '',
    params: {
        hoverWindowStatus: false, // 判斷滑鼠是否在浮動視窗，避免穿透觸發pixijs事件
        lockedRoiTable: [], // pixijs 鎖定的物件
        hover: {}, // pixijs hover的事件
        tooltipHover: [], // 浮動視窗 hover的物件
        tooltipFocus: {}, // 浮動視窗 鎖定的物件
        historicalGroup: {}
    }
});

export const mutations = {
    changesLocked(state, data) {
        state.params.lockedRoiTable = data;
    },
    changesHover(state, data) {
        // console.log("hover", data);
        state.params.hover = data;
    },
    mouseoverWindwos(state, data) {
        state.params.hoverWindowStatus = data;
    },
    clickWindowsGroup(state, data) {
        state.params.tooltipFocus = data;
    },
    hoverWindowsGroup(state, data) {
        state.params.tooltipHover = data;
    },
    historicalGroupSet(state, data) {
        state.params.historicalGroup = data;
    }
};

export const actions = {
    incrementAsync({ commit }, data) {
        var type = data.type
        if (type === 'Locked') {
            commit('changesLocked', data.params); // commit([觸發指定方法])
        } else if (type === 'hover') {
            commit('changesHover', data.params.hover);
        } else if (type === 'mouseoverWindwos') {
            // 判斷滑鼠是否在總攬視窗
            commit('mouseoverWindwos', data.params);
        } else if (type === 'mouseoutWindwos') {
            // 判斷滑鼠是否在總攬視窗
            commit('mouseoverWindwos', data.params);
        } else if (type === 'clickWindowsGroup') {
            // console.log(data.params);
            commit('clickWindowsGroup', data.params);
        } else if (type === 'hoverWindowsGroup') {
            commit('hoverWindowsGroup', data.params);
        } else if (type === 'HistoricalGroupSet') {
            commit('historicalGroupSet', data.params);
        }
    },
};