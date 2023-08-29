<template>
    <!-- <div :class="'only'+ canvasId"> -->
    <canvas :id="canvasId"></canvas>
    <!-- </div> -->
</template>
<script>


export default {
    props: ['roidata', 'canvasId', 'camId', 'size'],
    data() {
        return {
            appPixi: null,
            blob: [],
            reference: [],
            spot: [],
            line: [],
            scope: [],
            pixiJsRoiBlobData: [],
            webworker: null,
            width: 320,
            height: 240,
            // width: 640,
            // height: 480,
            // width: 960,
            // height: 720,
            dragTarget: null,
            dragTargettemp: { x: 0, y: 0 },
            mousesaveLocation: { x: 0, y: 0 },
            GroupNameitems:[]
        }
    },
    watch: {
        roidata(data) {
            var roidata = JSON.parse(data.data)
            // console.log(this.camId);
            var postdata = roidata[this.camId].blob
            var reference = roidata[this.camId].reference
            var spot = roidata[this.camId].spot
            var line = roidata[this.camId].line
            var scope = roidata[this.camId].scope
            // console.log(postdata);
            this.webworker.postMessage({
                type: 'splineCurrent',
                data: [postdata, this.height, this.width]
            })
            this.runReference(reference)
            this.runSpot(spot)
            this.runLine(line)
            this.runScope(scope)
            postdata = null
            roidata = null
            reference = null
            spot = null
            line = null
            scope = null
        }
    },
    created() {
        this.GroupNameitems = this.$userMaim.groupList().list
    },
    mounted() {
        // console.log("test", this.size);
        this.initpixi(this.canvasId)
        // setTimeout(() => {
        //     this.appPixi.renderer.resize(window.innerWidth, window.innerHeight);
        // }, 4000)
        this.webworker = new Worker('/worker/workerpixpjs.js');
        this.webworker.addEventListener('message', (e) => {
            var data = e.data
            // console.log(data);
            if (data.type === 'splineCurrent') {
                this.runBlob(data.parameter)
            }
            data = null
        }, false);
    },
    methods: {
        // 初始化
        initpixi(id) {
            // console.log(id);
            var PIXI = window.PIXI
            // 获取 canvas 元素
            var canvas = document.getElementById(id);
            // const div = document.getElementById("test");
            // 创建 PixiJS 应用程序
            var app = new PIXI.Application({
                view: canvas,
                width: this.width,
                height: this.height,
                backgroundColor: 0x00000000, // 透明背景
                transparent: true, // 告诉渲染器使用透明背景
                backgroundAlpha: 0,
                resolution: 2
            });
            this.appPixi = app
            this.animation(app) // 執行動畫
            app.stage.interactive = true;
            app.stage.hitArea = app.screen;
            app.stage.on('pointerup', this.onDragEnd);
            app.stage.on('pointerupoutside', this.onDragEnd);
            PIXI = null
            canvas = null
            app = null
        },
        runReference(data) {
            var newData = {
                data: null,
                pixi: null
            }
            if (this.reference.length > 0) {
                if (JSON.stringify(data[0].reference_position) === JSON.stringify(this.reference[0].data[0].reference_position)) {
                    // console.log('no change');
                    newData.data = data
                    newData.pixi = this.reference[0].pixi
                } else {
                    this.reference[0].pixi.destroy()
                    newData.data = data
                    newData.pixi = this.addpoint({ x: data[0].reference_position.X, y: data[0].reference_position.y }, 'R', 'reference', false)
                    // console.log('change');
                }
            } else {
                newData.data = data
                newData.pixi = this.addpoint({ x: data[0].reference_position.X, y: data[0].reference_position.y }, 'R', 'reference', false)
            }
            // console.log(newData);
            this.reference = [newData]
            newData = null
            // console.log(data[0]);
        },
        onDragMove(event) {
            if (this.dragTarget) {
                var x1 = this.mousesaveLocation.x - event.global.x
                var y1 = this.mousesaveLocation.y - event.global.y
                var nl = { x: this.dragTargettemp.x - x1, y: this.dragTargettemp.y - y1 }
                // console.log(nl);
                // console.log(event.global, null, this.dragTarget.position);
                this.dragTarget.parent.toLocal(nl, null, this.dragTarget.position);
                x1 = null
                y1 = null
                nl = null
            }
        },
        onDragStart(e) {
            // console.log("mousedown", e.global);
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            // this.data = event.data;
            e.currentTarget.alpha = 0.5;
            this.dragTarget = e.currentTarget;
            this.mousesaveLocation = {
                x: e.global.x,
                y: e.global.y
            }
            this.dragTargettemp = {
                x: e.currentTarget.position.x,
                y: e.currentTarget.position.y
            }
            // console.log(this.dragTarget.position);
            this.appPixi.stage.on('pointermove', this.onDragMove);
        },

        onDragEnd() {
            if (this.dragTarget) {
                this.appPixi.stage.off('pointermove', this.onDragMove);
                this.dragTarget.alpha = 1;
                this.dragTarget = null;
            }
        },
        addpoint(data, roidata, name, dragging) {
            var imgurl = '/images/spot_1.png'
            var alarm = false
            var color = '#ffffff'
            var number = 'R'
            if (name === 'spot') {
                number = roidata.spot_number
            }
            if (roidata.spot_alarm_status === 1 && roidata.spot_temperature >= roidata.spot_threshold) {
                imgurl = '/images/spot_1_red.png'
                color = '#B82E40'
                alarm = true
            }
            // console.log(data, number, name);
            var PIXI = window.PIXI
            var group = new PIXI.Container();
            this.appPixi.stage.addChild(group);
            group.x = data.x * this.width; // 设置 x 坐标
            group.y = data.y * this.height; // 设置 y 坐标
            group.name = name
            group.interactive = dragging;
            group.cursor = dragging ? 'pointer' : 'auto';
            var newSprite = PIXI.Sprite.from(imgurl);
            group.addChild(newSprite);
            // group.on('pointerdown', this.onDragStart, group);
            newSprite.x = -16.5
            newSprite.y = -16.5
            // newSprite.width = 30
            var graphics = new PIXI.Graphics();
            if (!alarm) {
                graphics.lineStyle(1, "rgb(0,0,0)", 1);
            }
            graphics.beginFill(color, 1);
            graphics.drawCircle(-20, -20, 10);
            graphics.endFill();
            group.addChild(graphics);
            var style = new PIXI.TextStyle({
                fontSize: 16,
            });
            var basicText = new PIXI.Text(number, style);
            if (parseInt(number) < 10 || number === 'R') {
                basicText.x = -25.5;
                basicText.y = -28.5;
            } else {
                basicText.x = -29.5;
                basicText.y = -28.5;
            }
            group.addChild(basicText);
            group.on('pointerdown', this.onDragStart);
            imgurl = null
            alarm = null
            color = null
            number = null
            PIXI = null
            newSprite = null
            graphics = null
            style = null
            basicText = null
            return group
        },
        runSpot(data) {
            // console.log(data);
            var len = data.length
            var oldData = this.spot
            var oldDataLen = this.spot.length
            try {
                for (var z = 0; z < oldDataLen; z++) {
                    var selectRoi1 = data.find((item) => item.spot_number.toString() === oldData[z].data.spot_number.toString())
                    if (selectRoi1 === undefined) {
                        oldData[z].pixi.destroy()
                        oldData = oldData.filter(obj => obj.data.blob_number !== oldData[z].data.spot_number);
                    }
                    // console.log(selectRoi1);
                }
            } catch (error) {
                console.log(error);
            }
            // console.log(len);
            for (var x = 0; x < len; x++) {
                var spotfindIndex = oldData.findIndex((item) => item.data.spot_number.toString() === data[x].spot_number.toString())
                if (spotfindIndex !== -1) {
                    var newAlarm = data[x].spot_alarm_status === 1 && data[x].spot_temperature >= data[x].spot_threshold
                    var oldAlarm = oldData[spotfindIndex].data.spot_alarm_status === 1 && oldData[spotfindIndex].data.spot_temperature >= oldData[spotfindIndex].data.spot_threshold
                    if (JSON.stringify(data[x].spot_position) === JSON.stringify(oldData[spotfindIndex].data.spot_position) && newAlarm === oldAlarm) {
                        // console.log("no change", data[x].spot_number);
                        // console.log('no change', oldData[spotfindIndex]);
                        oldData[spotfindIndex].data = data[x]
                    } else {
                        // console.log('change', oldData[spotfindIndex]);
                        // console.log("change", data[x].spot_number);
                        oldData[spotfindIndex].pixi.destroy()
                        oldData[spotfindIndex].data = data[x]
                        oldData[spotfindIndex].pixi = this.addpoint({ x: data[x].spot_position.X, y: data[x].spot_position.Y }, data[x], 'spot', true)
                    }
                    newAlarm = null
                    oldAlarm = null
                } else {
                    var temppixijsdata = this.addpoint({ x: data[x].spot_position.X, y: data[x].spot_position.Y }, data[x], 'spot', true)
                    // console.log('add spot', temppixijsdata);
                    oldData.push({
                        data: data[x],
                        pixi: temppixijsdata
                    })
                    temppixijsdata = null
                }
                spotfindIndex = null
            }
            this.spot = oldData
            len = null
            oldData = null
            oldDataLen = null
        },
        runLine(data) {
            var len = data.length
            var oldData = this.line
            var oldDataLen = this.line.length
            try {
                for (var z1 = 0; z1 < oldDataLen; z1++) {
                    var selectRoi1 = data.find((item) => JSON.stringify(item.line_number) === JSON.stringify(oldData[z1].data.line_number))
                    if (selectRoi1 === undefined) {
                        oldData[z1].pixi.destroy()
                        oldData = oldData.filter(obj => obj.data.line_number !== oldData[z1].data.line_number);
                    }
                    selectRoi1 = null
                    // console.log(selectRoi1);
                }
            } catch (error) {
                console.log(error);
            }
            // var oldDataLen = this.line.length
            for (var x = 0; x < len; x++) {
                var linefindIndex = oldData.findIndex((item) => item.data.line_number.toString() === data[x].line_number.toString())
                if (linefindIndex !== -1) {
                    var newAlarm = data[x].line_alarm_status === 1 && data[x].line_temperature_max >= data[x].line_threshold
                    var oldAlarm = oldData[linefindIndex].data.line_alarm_status === 1 && oldData[linefindIndex].data.line_temperature_max >= oldData[linefindIndex].data.line_threshold
                    if (JSON.stringify(data[x].line_position_point_A) === JSON.stringify(oldData[linefindIndex].data.line_position_point_A) && JSON.stringify(data[x].line_position_point_B) === JSON.stringify(oldData[linefindIndex].data.line_position_point_B) && newAlarm === oldAlarm) {
                        // console.log("no change");
                        oldData[linefindIndex].data = data[x]
                    } else {
                        // console.log('change');
                        oldData[linefindIndex].pixi.destroy()
                        oldData[linefindIndex].data = data[x]
                        oldData[linefindIndex].pixi = this.addLine(data[x], 'line')
                    }
                    newAlarm = null
                    oldAlarm = null
                } else {
                    // console.log("add");
                    oldData.push({
                        data: data[x],
                        pixi: this.addLine(data[x], 'line')
                    })
                }
                linefindIndex = null
            }
            this.line = oldData
            len = null
            oldData = null
            oldDataLen = null
        },
        addLine(data, name) {
            var color = '#ffffff'
            var color1 = "rgb(5,26,31)"
            var alarm = false
            if (data.line_alarm_status === 1 && data.line_temperature_max >= data.line_threshold) {
                color = '#B82E40'
                color1 = '#B82E40'
                alarm = true
            }
            // console.log(data, number, name);
            const PIXI = window.PIXI
            var group = new PIXI.Container();
            group.name = name
            group.custom = { number: data.line_number }
            this.appPixi.stage.addChild(group);
            const line1 = new PIXI.Graphics();
            line1.name = "line1"
            line1.lineStyle(3, 0x000000); // 設定邊框為黑色，寬度為 2 像素
            line1.moveTo(data.line_position_point_A.X * this.width, data.line_position_point_A.Y * this.height); // 移動到起始點
            line1.lineTo(data.line_position_point_B.X * this.width, data.line_position_point_B.Y * this.height); // 繪製直線
            group.addChild(line1);
            const line2 = new PIXI.Graphics();
            line2.name = "line2"
            line2.lineStyle(1, color); // 設定邊框為黑色，寬度為 2 像素
            line2.moveTo(data.line_position_point_A.X * this.width, data.line_position_point_A.Y * this.height); // 移動到起始點
            line2.lineTo(data.line_position_point_B.X * this.width, data.line_position_point_B.Y * this.height); // 繪製直線
            group.addChild(line2);
            // 點一
            const graphics1 = new PIXI.Graphics();
            graphics1.name = "line_A"
            graphics1.x = data.line_position_point_A.X * this.width
            graphics1.y = data.line_position_point_A.Y * this.height
            graphics1.interactive = true;
            graphics1.cursor = 'pointer';
            if (!alarm) {
                graphics1.lineStyle(1, "rgb(255,255,255)", 1);
            }
            graphics1.beginFill(color1, 1);
            graphics1.drawCircle(0, 0, 8);
            graphics1.endFill();
            graphics1.on('pointerdown', (e) => { this.onDragStart(e, 'line_A') });
            group.addChild(graphics1);
            // 點二
            const graphics2 = new PIXI.Graphics();
            graphics2.x = data.line_position_point_B.X * this.width
            graphics2.y = data.line_position_point_B.Y * this.height
            graphics2.name = "line_B"
            graphics2.interactive = true;
            graphics2.cursor = 'pointer';
            if (!alarm) {
                graphics2.lineStyle(1, "rgb(255,255,255)", 1);
            }
            graphics2.beginFill(color1, 1);
            graphics2.drawCircle(0, 0, 8);
            graphics2.endFill();
            group.addChild(graphics2);
            graphics2.on('pointerdown', (e) => { this.onDragStart(e, 'line_B') });
            const num = new PIXI.Graphics();
            num.name = "circle"
            num.x = data.line_position_point_B.X * this.width - 15
            num.y = data.line_position_point_B.Y * this.height - 15
            if (!alarm) {
                num.lineStyle(1, "rgb(5,26,31)", 1);
            }
            num.beginFill(color, 1);
            num.drawCircle(0, 0, 10);
            num.endFill();
            group.addChild(num);
            const style = new PIXI.TextStyle({
                fontSize: 16,
            });
            const basicText = new PIXI.Text(data.line_number, style);
            basicText.name = "text"
            if (parseInt(data.line_number) < 10) {
                basicText.x = data.line_position_point_B.X * this.width - 19.5;
                basicText.y = data.line_position_point_B.Y * this.height - 24.5;
            } else {
                basicText.x = data.line_position_point_B.X * this.width - 23.5;
                basicText.y = data.line_position_point_B.Y * this.height - 24.5;
            }
            group.addChild(basicText);
            return group
        },
        runScope(data) {
            // console.log(data);
            var len = data.length
            var oldData = this.scope
            var oldDataLen = this.scope.length
            try {
                for (var z1 = 0; z1 < oldDataLen; z1++) {
                    var selectRoi1 = data.find((item) => parseInt(item.scope_number) === parseInt(oldData[z1].data.scope_number))
                    if (selectRoi1 === undefined) {
                        oldData[z1].pixi.destroy()
                        oldData = oldData.filter(obj => obj.data.scope_number !== oldData[z1].data.scope_number);
                    }
                    // console.log(selectRoi1);
                }
            } catch (error) {
                console.log(error);
            }
            for (var x = 0; x < len; x++) {
                var scopefindIndex = oldData.findIndex((item) => item.data.scope_number.toString() === data[x].scope_number.toString())
                if (scopefindIndex !== -1) {
                    var newAlarm = data[x].scope_alarm_status === 1 && data[x].scope_temperature_max >= data[x].scope_threshold
                    var oldAlarm = oldData[scopefindIndex].data.scope_alarm_status === 1 && oldData[scopefindIndex].data.scope_temperature_max >= oldData[scopefindIndex].data.scope_threshold
                    if (JSON.stringify(data[x].scope_position_point_LT) === JSON.stringify(oldData[scopefindIndex].data.scope_position_point_LT)
                        && JSON.stringify(data[x].scope_position_point_BR) === JSON.stringify(oldData[scopefindIndex].data.scope_position_point_BR)
                        && JSON.stringify(data[x].approval) === JSON.stringify(oldData[scopefindIndex].data.approval)
                        && newAlarm === oldAlarm
                    ) {
                        // console.log("no change");
                        oldData[scopefindIndex].data = data[x]
                    } else {
                        // console.log('change');
                        oldData[scopefindIndex].pixi.destroy()
                        oldData[scopefindIndex].data = data[x]
                        oldData[scopefindIndex].pixi = this.addScope(data[x], 'scope')
                    }
                } else {
                    // console.log("add");
                    oldData.push({
                        data: data[x],
                        pixi: this.addScope(data[x], 'scope')
                    })
                }
            }
            this.scope = oldData
        },
        addScope(data, name) {
            // console.log("asdas" ,data , name);
            var alarm = data.scope_alarm_status === 1 && data.scope_temperature_max >= data.scope_threshold
            var color = '#ffffff'
            if (data.approval === 1) {
                color = '#FF8D41'
            } else if (data.approval === 0 && alarm) {
                color = '#B82E40'
            }
            // if(data.scope_alarm_status === 1 && data.scope_temperature_max >= data.scope_threshold) {
            //     color = '#B82E40'
            // }
            const PIXI = window.PIXI
            var group = new PIXI.Container();
            group.name = name
            this.appPixi.stage.addChild(group);
            group.interactive = true;
            group.cursor = 'pointer';
            group.x = data.scope_position_point_LT.X * this.width
            group.y = data.scope_position_point_LT.Y * this.height
            const rect = new PIXI.Graphics();
            rect.name = 'rect1'
            rect.beginFill(0x000000, 0);
            rect.lineStyle(2, "rgb(0,0,0)", 1);
            var width = data.scope_position_point_BR.X * this.width - data.scope_position_point_LT.X * this.width
            var height = data.scope_position_point_BR.Y * this.height - data.scope_position_point_LT.Y * this.height
            rect.drawRect(0, 0, width, height);
            rect.endFill();
            group.addChild(rect);
            const rect2 = new PIXI.Graphics();
            rect2.name = 'rect2'
            if (data.approval === 0 && alarm) {
                rect2.beginFill('#B82E40', 0.7);
            } else {
                rect2.beginFill(0x000000, 0);
            }
            rect2.lineStyle(1, color, 1);
            rect2.drawRect(0, 0, width, height);
            rect2.endFill();
            group.addChild(rect2);
            const num = new PIXI.Graphics();
            num.lineStyle(1, "rgb(5,26,31)", 1);
            num.beginFill(color, 1);
            num.drawCircle(-13, -13, 10);
            num.endFill();
            group.addChild(num);
            const style = new PIXI.TextStyle({
                fontSize: 16,
            });
            const basicText = new PIXI.Text(data.scope_number, style);
            if (parseInt(data.scope_number) < 10) {
                basicText.x = -17.5;
                basicText.y = -22.5;
            } else {
                basicText.x = -21.5;
                basicText.y = -22.5;
            }
            group.addChild(basicText);
            const mock1rect2 = new PIXI.Graphics();
            mock1rect2.beginFill(0x000000, 1);
            mock1rect2.lineStyle(2, "rgb(255,255,255)", 1);
            mock1rect2.drawRect(0, 0, width, height);
            mock1rect2.endFill();
            mock1rect2.alpha = 0
            group.addChild(mock1rect2);
            // group.on('pointerdown', (event) => { this.onDragStart(group) });
            group.on('pointerdown', this.onDragStart);
            return group
        },
        runBlob(data) {
            var oldData = this.blob
            var oldDataLen = this.blob.length
            var newDataLen = data.length
            var pixiBlob = this.pixiJsRoiBlobData
            // 以下判斷ROI 是否遭到刪除
            try {
                for (var z = 0; z < oldDataLen; z++) {
                    var selectRoi1 = data.find((item) => JSON.stringify(item.blob_number) === JSON.stringify(oldData[z].blob_number))
                    if (selectRoi1 === undefined) {
                        var pixiBlobfind = pixiBlob.findIndex((item) => item.info.blob_number === oldData[z].blob_number)
                        // console.log(pixiBlobfind, pixiBlob, pixiBlob[pixiBlobfind].pixi);
                        var pixilen = pixiBlob[pixiBlobfind].pixi.length
                        var markerlen = pixiBlob[pixiBlobfind].marker.length
                        // if (pixilen > 0) {
                        for (var o = 0; o < pixilen; o++) {
                            pixiBlob[pixiBlobfind].pixi[o].destroy()
                        }
                        for (var as1 = 0; as1 < markerlen; as1++) {
                            pixiBlob[pixiBlobfind].marker[as1].destroy()
                        }
                        // }
                        // pixiBlob[pixiBlobfind].pixi = []
                        pixiBlob = pixiBlob.filter(obj => obj.info.blob_number !== oldData[z].blob_number);
                        pixiBlobfind = null
                    }
                    selectRoi1 = null
                }
            } catch (error) {
                console.log('判斷ROI 是否遭到刪除', error);
            }
            // 判斷
            for (var i = 0; i < newDataLen; i++) {
                // console.log(data[i]);
                var selectRoi = oldData.find((item) => JSON.stringify(item.blob_number) === JSON.stringify(data[i].blob_number))
                if (selectRoi !== undefined) {
                    // todo Roi還存在
                    if (JSON.stringify(selectRoi.points) === JSON.stringify(data[i].points)
                        && selectRoi.alarmStatus === data[i].alarmStatus
                        && selectRoi.approval === data[i].approval
                    ) {
                        // ROI無變化
                        var pixiBlobfind12 = pixiBlob.findIndex((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
                        pixiBlob[pixiBlobfind12].info = data[i]
                        // console.log(this.pixiJsRoiBlobData[0].info.blob_temperature_max);
                        // console.log(pixiBlob[i], data[i]);
                        // console.log(data[i].blob_number, '無變化');
                    } else {
                        // console.log(data[i].blob_number, ' 更新');
                        // ROI有變化

                        var olddata = pixiBlob.find((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
                        var oldpixilen = olddata.pixi.length
                        for (var deletepixi = 0; deletepixi < oldpixilen; deletepixi++) {
                            olddata.pixi[deletepixi].destroy()
                            olddata.marker[deletepixi].destroy()
                        }
                        var newpole = data[i].points.length
                        // console.log(newpole, data[i], data[i].alarmStatus);
                        var newpodata = []
                        var newmarkerdata = []
                        for (var addi = 0; addi < newpole; addi++) {
                            newpodata.push(this.ObjectChanged([data[i].spline[addi], data[i].alarmStatus], true, data[i]))
                            newmarkerdata.push(this.markerPointObjcet(data[i].markerPoint[addi], data[i].blob_number, data[i].alarmStatus, data[i]))
                        }
                        var pixiBlobfind1 = pixiBlob.findIndex((item) => JSON.stringify(item.info.blob_number) === JSON.stringify(data[i].blob_number))
                        pixiBlob[pixiBlobfind1].info = data[i]
                        pixiBlob[pixiBlobfind1].pixi = newpodata
                        pixiBlob[pixiBlobfind1].marker = newmarkerdata
                    }
                } else {
                    // Roi增加
                    var points = []
                    var marker = []
                    var pointslen = data[i].points.length
                    for (var j = 0; j < pointslen; j++) {
                        // points.push(this.ObjectChanged(data[i].points[j], true))
                        points.push(this.ObjectChanged([data[i].spline[j], data[i].alarmStatus], true, data[i]))
                        marker.push(this.markerPointObjcet(data[i].markerPoint[j], data[i].blob_number, data[i].alarmStatus, data[i]))
                        // console.log(data[i]);
                    }
                    pixiBlob.push({
                        info: data[i],
                        pixi: points,
                        marker
                    })
                    // console.log(data[i].blob_number, ' 新增');
                }
                selectRoi = null
            }

            this.pixiJsRoiBlobData = pixiBlob
            this.blob = data
        },
        markerPointObjcet(data, number, alarm, roidata) {
            // var color = ['rgb(255 244 195 / 0%)', 'rgb(255 244 195 / 50%)']
            // var find = this.GroupNameitems.find((item) => item.value === roidata.group_name)
            // if (find !== undefined) {
            //     color = [find.customColor[0], find.customColor[1]]
            // }
            const PIXI = window.PIXI
            const container = new PIXI.Container();
            this.appPixi.stage.addChild(container);
            container.name = 'blob'
            const graphics = new PIXI.Graphics();
            graphics.lineStyle(1, "rgb(0,0,0)", 1);
            if (roidata.approval === 0) {
                if (alarm) {
                    graphics.beginFill(0xDE3249, 0.8);
                } else {
                    graphics.beginFill("rgb(255 255 255 / 0%)", 1);
                    // graphics.beginFill(color[0], 1);
                }
            } else {
                graphics.beginFill("#FF8D41", 1);
            }
            graphics.drawCircle(data.x - 11, data.y - 11, 10);
            graphics.endFill();
            container.addChild(graphics);
            const style = new PIXI.TextStyle({
                fontSize: 16,
            });
            const basicText = new PIXI.Text(number, style);
            if (parseInt(number) < 10) {
                basicText.x = data.x - 16;
                basicText.y = data.y - 19;
            } else {
                basicText.x = data.x - 20;
                basicText.y = data.y - 19;
            }
            container.addChild(basicText);
            return container
        },
        ObjectChanged(data, type, roidata) {
            // type = true : 新增 | 修改
            // 宣告pixi
            const PIXI = window.PIXI
            var pointData = type === true ? data[0] : data.info
            var alarm = type === true ? data[1] : data.alarm
            // const texture = PIXI.Texture.from(this.fillBackground('rgb(255 199 82 / 0%)', 'rgb(255 199 82 / 50%)'));
            if (type) {
                const spline1 = new PIXI.Graphics();
                this.appPixi.stage.addChild(spline1);
                spline1.name = 'blob'
                if (roidata.approval === 0) {
                    if (alarm) {
                        spline1.lineStyle(1, 0xDE3249, 1);
                        spline1.beginFill(0xDE3249, 0.5)
                    } else {
                        // spline1.lineStyle(1, 'rgb(255 199 82 / 0%)', 1);
                        spline1.lineStyle(1, '#fff', 1);
                        // spline1.beginTextureFill({ texture })
                        // spline1.beginTextureFill({ color: 'rgb(255,199,82)'})
                    }
                } else {
                    spline1.lineStyle(1, "#FF8D41", 1);
                    spline1.beginFill("#FF8D41", 0.5)
                }
                spline1.drawPolygon(Array.from(pointData));
                spline1.closePath();
                spline1.endFill();
                return spline1
            } else {
                data.pixi.clear()
                if (alarm) {
                    data.pixi.lineStyle(1, 0xDE3249, 1);
                    data.pixi.beginFill(0xDE3249, 0.5)
                } else {
                    data.pixi.lineStyle(1, 'rgb(255 199 82 / 0%)', 1);
                    // data.pixi.beginTextureFill({ texture })
                }
                data.pixi.drawPolygon(Array.from(pointData));
                data.pixi.closePath();
                data.pixi.endFill();
                return true
            }
        },
        animation() {
            let count = 0;
            this.appPixi.ticker.maxFPS = 30;
            this.appPixi.ticker.add((frame) => {
                var roiDataName = { blob: [], scope: [], line: [], spot: [], reference: [] }
                var sortRoi = ['blob', 'scope', 'line', 'spot', 'reference'] // 由左至右 左邊最下層
                var childrenlen = this.appPixi.stage.children.length
                var childrendata = this.appPixi.stage.children
                var sortRoilength = sortRoi.length
                // var roiDataNamelen = roiDataName.length
                for (var i1 = 0; i1 < childrenlen; i1++) {
                    for (var z1 = 0; z1 < sortRoilength; z1++) {
                        var str = childrendata[i1].name
                        if (str.search(sortRoi[z1]) !== -1) {
                            roiDataName[sortRoi[z1]].push(childrendata[i1])
                        }
                        str = null
                    }
                }
                var totlen = 0
                for (var roisum = 0; roisum < sortRoilength; roisum++) {
                    var len1 = roiDataName[sortRoi[roisum]].length
                    for (var z2 = 0; z2 < len1; z2++) {
                        // console.log(roiDataName[sortRoi[roisum]][z2]);
                        this.appPixi.stage.setChildIndex(roiDataName[sortRoi[roisum]][z2], totlen)
                        totlen++
                    }
                    len1 = null
                }
                // console.log(roiDataName);
                var te = Math.abs(Math.sin(((count * 20) * 2 * Math.PI) / 3000) / 4) + 0.2
                // scope 閃爍
                var scopelen = this.scope.length
                for (var s = 0; s < scopelen; s++) {
                    var scopedata = this.scope[s]
                    var di = scopedata.pixi.children.find((item) => item.name === 'rect2')
                    var di1 = scopedata.pixi.children.find((item) => item.name === 'rect1')
                    if (scopedata.data.scope_alarm_status === 1 && scopedata.data.scope_threshold <= scopedata.data.scope_temperature_max) {
                        // scopedata.pixi.alpha = te
                        di.alpha = te
                        di1.alpha = te
                    } else {
                        di.alpha = 1
                        di1.alpha = 1
                    }
                    scopedata = null
                    di = null
                    di1 = null
                }
                scopelen = null
                // scope 閃爍 end
                // console.log(te);
                var blob12len = this.pixiJsRoiBlobData.length
                for (var i = 0; i < blob12len; i++) {
                    var roidata = this.pixiJsRoiBlobData[i].info
                    var pixilen = this.pixiJsRoiBlobData[i].pixi.length
                    if (roidata.blob_alarm_status === 1 && roidata.blob_threshold <= roidata.blob_temperature_max) {
                        for (var u = 0; u < pixilen; u++) {
                            this.pixiJsRoiBlobData[i].pixi[u].alpha = te;
                        }
                    } else {
                        for (var z = 0; z < pixilen; z++) {
                            this.pixiJsRoiBlobData[i].pixi[z].alpha = 1;
                        }
                    }
                    roidata = null
                    pixilen = null
                }
                count += 0.1 + frame;
                blob12len = null
                te = null
                roiDataName = null
                sortRoi = null
                childrenlen = null
                childrendata = null
                sortRoilength = null
                totlen = null
            });
        },
        fps() {
            // eslint-disable-next-line no-undef
            var stats = new Stats();
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(stats.dom);
            function animate() {
                stats.begin();
                // monitored code goes here
                stats.end();
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        },
        // 斜線方法
        fillBackground(fillStyle, strokeStyle) {
            var p = document.createElement('canvas')
            p.width = 32
            p.height = 16
            var pctx = p.getContext('2d')

            var x0 = 36
            var x1 = -4
            var y0 = -2
            var y1 = 18
            var offset = 32

            pctx.beginPath()
            pctx.rect(-2, -2, 34, 18)
            pctx.fillStyle = fillStyle
            pctx.fill()

            pctx.strokeStyle = strokeStyle
            pctx.lineWidth = 1
            pctx.beginPath()
            pctx.moveTo(x0, y0)
            pctx.lineTo(x1, y1)
            pctx.moveTo(x0 - offset, y0)
            pctx.lineTo(x1 - offset, y1)
            pctx.moveTo(x0 + offset, y0)
            pctx.lineTo(x1 + offset, y1)
            pctx.stroke()
            pctx = null
            x0 = null
            x1 = null
            y0 = null
            y1 = null
            offset = null
            return p
        },
        splineCurrent(points, tension, numOfSeg, close) {
            // var points = e.data.points
            // var tension = e.data.tension
            // var numOfSeg = e.data.numOfSeg
            // var close = e.data.close

            tension = typeof tension === 'number' ? tension : 0.5
            // numOfSeg = typeof numOfSeg === 'number' ? numOfSeg : 25
            numOfSeg = 70

            var pts // for cloning point array
            var i = 1
            var l = points.length
            var rPos = 0
            var rLen = (l - 2) * numOfSeg + 2 + (close ? 2 * numOfSeg : 0)
            var res = new Float32Array(rLen)
            var cache = new Float32Array((numOfSeg + 2) * 4)
            var cachePtr = 4
            var st, st2, st3, st23, st32, parse

            pts = points.slice(0)
            if (close) {
                pts.unshift(points[l - 1]) // insert end point as first point
                pts.unshift(points[l - 2])
                pts.push(points[0], points[1]) // first point as last point
            } else {
                pts.unshift(points[1]) // copy 1. point and insert at beginning
                pts.unshift(points[0])
                pts.push(points[l - 2], points[l - 1]) // duplicate end-points
            }
            // cache inner-loop calculations as they are based on t alone
            cache[0] = 1 // 1,0,0,0
            for (; i < numOfSeg; i++) {
                st = i / numOfSeg
                st2 = st * st
                st3 = st2 * st
                st23 = st3 * 2
                st32 = st2 * 3
                cache[cachePtr++] = st23 - st32 + 1 // c1
                cache[cachePtr++] = st32 - st23 // c2
                cache[cachePtr++] = st3 - 2 * st2 + st // c3
                cache[cachePtr++] = st3 - st2 // c4
            }
            cache[++cachePtr] = 1 // 0,1,0,0

            parse = function (pts, cache, l) {
                var i = 2
                var t, pt1, pt2, pt3, pt4, t1x, t1y, t2x, t2y, c, c1, c2, c3, c4

                for (i; i < l; i += 2) {
                    pt1 = pts[i]
                    pt2 = pts[i + 1]
                    pt3 = pts[i + 2]
                    pt4 = pts[i + 3]
                    t1x = (pt3 - pts[i - 2]) * tension
                    t1y = (pt4 - pts[i - 1]) * tension
                    t2x = (pts[i + 4] - pt1) * tension
                    t2y = (pts[i + 5] - pt2) * tension
                    for (t = 0; t < numOfSeg; t++) {
                        // t * 4;
                        c = t << 2 // jshint ignore: line
                        c1 = cache[c]
                        c2 = cache[c + 1]
                        c3 = cache[c + 2]
                        c4 = cache[c + 3]

                        res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x
                        res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y
                    }
                }
                i = null
                t = null
                pt1 = null
                pt2 = null
                pt3 = null
                pt4 = null
                t1x = null
                t1y = null
                t2x = null
                t2y = null
                c = null
                c1 = null
                c2 = null
                c3 = null
                c4 = null
            }

            // calc. points
            parse(pts, cache, l)

            if (close) {
                // l = points.length;
                pts = []
                pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]) // second last and last
                pts.push(points[0], points[1], points[2], points[3]) // first and second
                parse(pts, cache, 4)
            }
            // add last point
            l = close ? 0 : points.length - 2
            res[rPos++] = points[l]
            res[rPos] = points[l + 1]

            pts = null
            i = null
            l = null
            rPos = null
            rLen = null
            // res = null
            cache = null
            cachePtr = null
            st = null
            st2 = null
            st3 = null
            st23 = null
            st32 = null
            parse = null

            return res
        }
    },
    // 脫鉤(nuxt生命週期)
    beforeDestroy() {
        console.log('脫鉤');
        if (this.webworker !== null) {
            this.webworker.terminate()
            this.webworker = null
        }
        if (this.appPixi !== null) {
            // var sum = this.appPixi.length
            // for (var i = 0; i < sum; i++) {
            this.appPixi.stop()
            this.appPixi.stage.removeChildren()
            // console.log(this.appPixi.stage.children);
            var childrenlen = this.appPixi.stage.children.length
            for (var j = 0; j < childrenlen; j++) {
                this.appPixi.stage.children[j].destroy();
            }
            this.appPixi.destroy();
            this.appPixi = null
            // }
        }
        for (var key in this.$data) {
            // console.log("remove : " + [key]);
            this[key] = null;
        }
    }
}
</script>
<style>
/* .links {
  width: 800px;
  height: 640px;
} */
</style>