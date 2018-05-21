// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        game: null
    },

    wxShare: function () {
        //这里通过微信分享
        console.log("wx share")
        this.hide();
        this.game.gameArea.getComponent('gameArea').getChance(true);
    },
    cancle: function (callback) {
        this.hide();
        console.log(this.game);
        this.game.gameArea.getComponent('gameArea').getChance(false);
    },
    hide: function () {
        this.node.removeFromParent(false);
        // parentNode.addChild(this.node);
        console.log("share hide")
        // var hideToast=cc.hide();
        // this.node.runAction(hideToast);
    },
    show:function () {
        this.game.node.addChild(this.node);
        console.log("share show")
        // var showToast=cc.show();
        // this.node.runAction(showToast);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    // update (dt) {},
});
