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
        blockPrefab: {
            default: null,
            type: cc.Prefab
        },
        n: 2,
        scoreBoard: {
            default: null,
            type: cc.Label
        },
        score: 0,
        game: null,
        blocks: [],
        blockPosition: {},
        shared: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        console.log("gameArea.js  :  onLoad");
        this.reset();
        this.startGame();
    },
    reset: function () {
        console.log("gameArea.js  :  reset");
        this.n = 2;
        this.score = 0;
        this.scoreBoard.string = "分数  ：  " + this.score;
        this.shared = 0;
    },
    startGame: function () {
        console.log("gameArea.js  :  startGame");
        this.clearBlocks();
        this.createBlocks();

        this.node.on('touchend', this.listenTouch, this);
    },
    clearBlocks: function () {
        while (this.blocks.length > 0) {
            var block = this.blocks.pop();
            // console.log("block:",block,this.blocks)
            block.destroy();
        }
    },
    createBlocks: function () {
        console.log("this.js  :  createBlocks");
        var n = this.n;
        var width = this.node.width;
        var blockWidth = width / n;
        console.log("blockWidth", blockWidth);

        var r_i = Math.floor(Math.random() * n);
        var r_j = Math.floor(Math.random() * n);
        this.blockPosition = {
            i: r_i,
            j: r_j
        };
        console.log("不同颜色的方块", this.blockPosition)

        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        var color = cc.color(r, g, b, 1);
        var r_color = this.similarColor(r,g,b,this.n);

        console.log("color:", color);

        for (var i = 0; i < n; i++)
            for (var j = 0; j < n; j++) {
                var Block = cc.instantiate(this.blockPrefab);
                this.node.addChild(Block, 0);
                this.blocks.push(Block);
                console.log(Block);
                Block.width = Block.height = blockWidth * 0.8;
                if (i == r_i && j == r_j) {
                    Block.color = r_color;
                }
                else {
                    Block.color = color;
                }

                var x0, y0;
                x0 = y0 = -320 + 320 / n;
                var position = cc.p(x0 + i * blockWidth, y0 + j * blockWidth);

                console.log("节点位置:", position, "size:", Block.width, Block.height);
                Block.setPosition(position);
            }
    },
    similarColor: function (r, g, b, n) {

        var deltaR=7*Math.random()*(8-n);
        var deltaG=7*Math.random()*(8-n);
        var deltaB=14*(8-n)-(deltaG+deltaR);

        console.log('rgb:'+r+g+b,deltaR,deltaG,deltaB);
        r=r-deltaR>0?r-deltaR:r+deltaR;
        g=g-deltaG>0?g-deltaG:g+deltaG;
        b=b-deltaB>0?b-deltaB:b+deltaB;
        return cc.color(r, g, b, 1);
    },
    listenTouch: function (event) {
        console.log("点击了鼠标", event, event._touches[0]._point.x, event._touches[0]._point.y);
        this.clickBlock(event._touches[0]._point.x, event._touches[0]._point.y);
    },
    clickBlock: function (x, y) {
        var position = this.fixScreen(x, y);

        var n = this.n;
        var width = 640;
        var blockWidth = width / n;

        var i = Math.floor(position.x / blockWidth);
        var j = Math.floor((position.y - 160) / blockWidth);
        console.log("点击方块的坐标", i, j, blockWidth);

        if (this.blockPosition.i == i && this.blockPosition.j == j) {
            this.nextStage();
        }
        else {
            this.gameOver();
        }
    },
    //将设备上实际点击的坐标转换为960*640中的坐标
    fixScreen: function (x, y) {
        console.log("设备宽高", cc.winSize);
        var screen_height = cc.winSize.height;
        var screen_width = cc.winSize.width;
        //fitHeight下左右位置的宽高
        var heibian_height = (screen_height - (screen_width / 640 * 960)) / 2;

        var fixed_x = x / screen_width * 640;
        var fixed_y = (y - heibian_height) / (screen_height - 2 * heibian_height) * 960;

        console.log("原坐标", x, y, "黑边", heibian_height);

        console.log("转化为960*640坐标", fixed_x, fixed_y);
        return {x: fixed_x, y: fixed_y};
    },
    //将960*640中的坐标转换为设备上的坐标（以canvas左下为原点）
    unfixedScreen: function (x, y) {
        // console.log("设备宽高", cc.winSize);
        var screen_height = cc.winSize.height;
        var screen_width = cc.winSize.width;
        //fitHeight下左右位置的宽高
        var heibian_height = (screen_height - (screen_width / 640 * 960)) / 2;

        var unfixed_x = x / 640 * screen_height;
        var unfixed_y = y / 960 * (screen_height - 2 * heibian_height);

        console.log("转化为屏幕坐标", unfixed_x, unfixed_y);
        return {x: unfixed_x, y: unfixed_y};
    },
    nextStage: function () {
        console.log("Next Stage")
        this.score += this.n;
        this.scoreBoard.string = "分数  ：  " + this.score;
        if (this.n != 6)
            this.n++;
        this.clearBlocks();
        this.createBlocks();

    },
    gameOver: function () {
        console.log("Game Over");

        //停止监听
        this.node.off('touchend', this.listenTouch, this);
        console.log("关闭监听")
        //分享获得一次继续机会
        var chance = 0;
        if (this.shared == 0) {
            chance = this.game.share();
        }
        else {
            this.uploadScore();
        }
    },

    getChance: function (got) {
        if (got) {
            this.shared = 1;
            //开启监听
            this.node.on('touchend', this.listenTouch, this);
        }
        else {
            this.uploadScore();
        }
    },

    uploadScore: function () {
        console.log("gameArea.js UploadScore");
        console.log("分数 : " + this.score)

        this.game.overToast.getComponent('overToast').show();
    }

    // update (dt) {},
});
