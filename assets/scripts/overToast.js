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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

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

    // update (dt) {},
});
