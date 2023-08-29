<template>
    <div>主程式啟動，請勿關閉此視窗</div>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            open:null
        }
    },
    mounted() {
        // 打开新窗口并设置大小和位置
        window.open('http://localhost:3000/', '_blank');
    },
    beforeDestroy() {
        // window.close()
    }
}
</script>
