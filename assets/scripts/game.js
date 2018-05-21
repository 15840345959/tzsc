// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var game;
cc.Class({
    extends: cc.Component,

    properties: {
        playerInfo: null,
        gameArea: {
            default: null,
            type: cc.Node
        },
        prefabs: [],
        shareToast: {
            default: null,
            type: cc.Node
        },
        overToast:{
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        //配置game
        game = this;
        game.gameArea.getComponent('gameArea').game=game;
        game.shareToast.getComponent('shareToast').game=game;
        game.overToast.getComponent('overToast').game=game;

        game.resetGame();

        var hideToast=cc.hide();
        game.overToast.getComponent('overToast').hide();

        this.shareToast.getComponent('shareToast').hide();
    },
    resetGame: function () {
        game.overToast.getComponent('overToast').hide();

        console.log("game.js  : reset Game")
        game.startGame();
    },
    startGame: function () {
        console.log("game.js  : start Game");
        game.gameArea.getComponent('gameArea').onLoad();
    },
    share:function () {
        console.log("game.js  : share Game");

        this.shareToast.getComponent('shareToast').show();
    },
    returnToMenu:function () {
        var sceneName = 'menu';
        console.log('Scene ' + sceneName + ' is launching');
        var onLaunched = function () {
            console.log('Scene ' + sceneName + ' launched');
        };
// 第一个参数为场景的名字，第二个可选参数为场景加载后的回调函数
        cc.director.loadScene(sceneName, onLaunched);
    }
    // update (dt) {},
});
