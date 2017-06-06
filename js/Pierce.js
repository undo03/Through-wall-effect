/**
 * Created by 35107 on 2017/5/11.
 */
function Pierce(eleId) {
    this.oDiv = document.getElementById(eleId);

    this.oDiv.disL = this.oDiv.offsetLeft;
    this.oDiv.disT = this.oDiv.offsetTop;
    this.oDiv.disR = this.oDiv.disL + this.oDiv.offsetWidth;
    this.oDiv.disB = this.oDiv.disT + this.oDiv.offsetHeight;

    this.init();
}

Pierce.prototype = {
    constructor: Pierce,
    init: function () {
        var _this = this;
        this.oDiv.addEventListener('mouseenter', function(e){
            _this.moveIn(e);
        }, false);
        this.oDiv.addEventListener('mouseleave', function(e){
            _this.moveOut(e);
        }, false);
    },
    moveIn:function(e){
        //this还是实例
        //判断鼠标移入的方向
        var resL = Math.abs(e.clientX - this.oDiv.disL),//距离左边
            resT = Math.abs(e.clientY - this.oDiv.disT),//距离上边
            resR = Math.abs(e.clientX - this.oDiv.disR),//距离右边
            resB = Math.abs(e.clientY - this.oDiv.disB);//距离下边
        var min = Math.min(resL, resB, resR, resT);

        //console.log(resL, resB, resR, resT, min);
        if (min === resL) {
            //console.log('左边移入');
            this.maskIn.call(this,'left');
        } else if (min === resT) {
            //console.log('上边移入');
            this.maskIn.call(this,'top');
        } else if (min === resR) {
            //console.log('右边移入');
            this.maskIn.call(this,'right');
        } else {
            //console.log('下边移入');
            this.maskIn.call(this,'bottom');
        }
    },
    maskIn:function(direction){
        //根据移动的方向,初始化参数和移动层的初始位置
        var attr = 'marginTop', otherAttr = 'marginLeft', step = -15, maxDis = 'offsetHeight';
        if (direction === 'left' || direction === 'top') {
            step = 15;
        }
        if (direction === 'left' || direction === 'right') {
            attr = 'marginLeft';
            maxDis = 'offsetWidth';
            otherAttr = 'marginTop';
        }
        var oMask = this.oDiv.getElementsByTagName('div')[0];
        clearInterval(oMask.timer);
        step < 0 ? oMask.style[attr] = this.oDiv[maxDis] + 'px' : oMask.style[attr] = -this.oDiv[maxDis] + 'px';
        oMask.style[otherAttr] = 0;
        oMask.style.display = 'block';
        oMask.timer = setInterval(function () {
            var disL = parseFloat(oMask.style[attr]) + step;
            if (step > 0) {
                if (disL >= 0) {
                    oMask.style.marginLeft = 0;
                    oMask.style.marginTop = 0;
                    clearInterval(oMask.timer);
                } else {
                    oMask.style[attr] = disL + 'px';
                }
            } else {
                if (disL <= 0) {
                    oMask.style.marginLeft = 0;
                    oMask.style.marginTop = 0;
                    clearInterval(oMask.timer);
                } else {
                    oMask.style[attr] = disL + 'px';
                }
            }
        }, 10);
    },
    moveOut:function(e){
        //判断鼠标移出的方向
        var resL = Math.abs(e.clientX - this.oDiv.disL),//距离左边
            resT = Math.abs(e.clientY - this.oDiv.disT),//距离上边
            resR = Math.abs(e.clientX - this.oDiv.disR),//距离右边
            resB = Math.abs(e.clientY - this.oDiv.disB);//距离下边
        var min = Math.min(resL, resB, resR, resT);

        //console.log(resL, resB, resR, resT, min);
        if (min === resL) {
            //console.log('左边移出');
            this.maskOut.call(this,'left');
        } else if (min === resT) {
            //console.log('上边移出');
            this.maskOut.call(this,'top');
        } else if (min === resR) {
            //console.log('右边移出');
            this.maskOut.call(this,'right');
        } else {
            //console.log('下边移出');
            this.maskOut.call(this,'bottom');
        }
    },
    maskOut:function(direction){
        var oMask = this.oDiv.getElementsByTagName('div')[0];
        clearInterval(oMask.timer);
        //oMask.style.marginLeft = 0;
        //oMask.style.marginTop = 0;
        var attr = 'marginTop', step = 15, maxDis = 'offsetHeight';
        if (direction === 'left' || direction === 'top') {
            step = -15;
        }
        if (direction === 'left' || direction === 'right') {
            attr = 'marginLeft';
            maxDis = 'offsetWidth';
        }
        var _this = this;
        oMask.timer = setInterval(function () {
            var disL = parseFloat(oMask.style[attr]) + step;
            if (step < 0) {
                if (disL <= -_this.oDiv[maxDis]) {
                    oMask.style.display = 'none';
                    clearInterval(oMask.timer);
                } else {
                    oMask.style[attr] = disL + 'px';
                }
            } else {
                if (disL >= _this.oDiv[maxDis]) {
                    oMask.style.display = 'none';
                    clearInterval(oMask.timer);
                } else {
                    oMask.style[attr] = disL + 'px';
                }
            }
        }, 10);
    }

};