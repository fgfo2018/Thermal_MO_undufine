<template>
    <div>
        <v-row>
            <v-col cols="1" v-for="(item, index) in base64" :key="index">
                <v-img :src="item.src" class=""></v-img>
            </v-col>
        </v-row>
        <h1 class="mt-16 ml-10">{{ teee }}</h1>
        <!-- <v-btn @click="te2">Start</v-btn><br />
                    <v-btn @click="te1">Stop</v-btn><br />
                    side:{{ test }}<br />
                    side1:{{ test1 }} -->
    </div>
</template>
<script>
export default {
    name: 'TestPage',
    data: () => ({
        test: null,
        worker: null,
        test1: null,
        w: null,
        base64: [],
        webs1: null,
        teee: ''
    }),
    mounted() {
        var aaaaa = ['Wath ', 'day ', 'is ', 'it ', 'today?']
        var ind = 0
        setInterval(() => {
            if (ind < 5) {
                this.teee = this.teee + aaaaa[ind]
                ind++
            }
        }, 500)
        var ar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        var start = null
        var end = null
        var search = ar.filter((e, index) => {
            console.log(index)
            if (e === 4) {
                start = index
            }
            if (e === 7) {
                end = index
            }
            return e > 4 && e < 7
        });
        console.log(search)
        console.log(start, end)
        this.webs1 = new WebSocket('ws://localhost:8877')
        this.webs1.onopen = () => {
            console.log('web socket4 is open')
        }
        this.webs1.onmessage = (event) => {
            // var data = JSON.parse(event.data)
            // console.log(data)
            // console.log(event.data)
        }
        this.webs1.onclose = (event) => { }


        var ws = new WebSocket('ws://192.168.0.173:8777')
        ws.onopen = () => { }
        ws.onmessage = (event) => {
            // console.log(event.data)
            var data = JSON.parse(event.data)
            data = data[0]
            var output = []
            // console.log(data[0])
            var key1 = []
            Object.keys(data).forEach((key) => {
                // console.log(key)
                key1.push(key)
            })
            key1.forEach((value) => {
                // console.log(data[value])
                output.push({
                    src: `data:image/png;base64, ${data[value]}`
                })
            })
            this.base64 = output
        }
        ws.onclose = () => { }

        // var arr = [];
        // for (var i = 0; i < 9999; i++) {
        //     for (var z = 0; z < 9999; z++) {
        //         arr.push([
        //             Math.random() * 999999
        //             ,
        //             Math.random() * 999999
        //         ])
        //     }
        // }
        // console.log(arr)
        // this.test = arr[0][0]
        this.test1 = 'ok'
    },
    methods: {
        
        te2() {
            this.w = setInterval((e) => {
                var worker = new Worker('js/worker.js');
                worker.postMessage("123");
                worker.postMessage("123");
                worker.postMessage("123");
                worker.postMessage("123");
                // worker.close();
                worker.addEventListener('message', (e) => {
                    this.test = e.data[0][0]
                    console.log('Worker said: ', e.data[0]);
                    worker.terminate()
                }, false);
            }, 1)
        },
        te1() {
            clearInterval(this.w)
        }
    },
    beforeDestroy() { }
}
</script>
<style scoped></style>