require=function c(a,r,i){function h(o,e){if(!r[o]){if(!a[o]){var t="function"==typeof require&&require;if(!e&&t)return t(o,!0);if(l)return l(o,!0);var n=new Error("Cannot find module '"+o+"'");throw n.code="MODULE_NOT_FOUND",n}var s=r[o]={exports:{}};a[o][0].call(s.exports,function(e){return h(a[o][1][e]||e)},s,s.exports,c,a,r,i)}return r[o].exports}for(var l="function"==typeof require&&require,e=0;e<i.length;e++)h(i[e]);return h}({gameArea:[function(e,o,t){"use strict";cc._RF.push(o,"46e12anUV1BJ5xOuBuDU3rN","gameArea"),cc.Class({extends:cc.Component,properties:{blockPrefab:{default:null,type:cc.Prefab},n:2,scoreBoard:{default:null,type:cc.Label},score:0,game:null,blocks:[],blockPosition:{},shared:0},onLoad:function(){console.log("gameArea.js  :  onLoad"),this.reset(),this.startGame()},reset:function(){console.log("gameArea.js  :  reset"),this.n=2,this.score=0,this.scoreBoard.string="分数  ：  "+this.score,this.shared=0},startGame:function(){console.log("gameArea.js  :  startGame"),this.clearBlocks(),this.createBlocks(),this.node.on("touchend",this.listenTouch,this)},clearBlocks:function(){for(;0<this.blocks.length;){this.blocks.pop().destroy()}},createBlocks:function(){console.log("this.js  :  createBlocks");var e=this.n,o=this.node.width/e;console.log("blockWidth",o);var t=Math.floor(Math.random()*e),n=Math.floor(Math.random()*e);this.blockPosition={i:t,j:n},console.log("不同颜色的方块",this.blockPosition);var s=Math.floor(256*Math.random()),c=Math.floor(256*Math.random()),a=Math.floor(256*Math.random()),r=cc.color(s,c,a,1),i=this.similarColor(s,c,a,this.n);console.log("color:",r);for(var h=0;h<e;h++)for(var l=0;l<e;l++){var u,g,m=cc.instantiate(this.blockPrefab);this.node.addChild(m,0),this.blocks.push(m),console.log(m),m.width=m.height=.8*o,m.color=h==t&&l==n?i:r,u=g=320/e-320;var d=cc.p(u+h*o,g+l*o);console.log("节点位置:",d,"size:",m.width,m.height),m.setPosition(d)}},similarColor:function(e,o,t,n){var s=7*Math.random()*(8-n),c=7*Math.random()*(8-n),a=14*(8-n)-(c+s);return console.log("rgb:"+e+o+t,s,c,a),e=0<e-s?e-s:e+s,o=0<o-c?o-c:o+c,t=0<t-a?t-a:t+a,cc.color(e,o,t,1)},listenTouch:function(e){console.log("点击了鼠标",e,e._touches[0]._point.x,e._touches[0]._point.y),this.clickBlock(e._touches[0]._point.x,e._touches[0]._point.y)},clickBlock:function(e,o){var t=this.fixScreen(e,o),n=640/this.n,s=Math.floor(t.x/n),c=Math.floor((t.y-160)/n);console.log("点击方块的坐标",s,c,n),this.blockPosition.i==s&&this.blockPosition.j==c?this.nextStage():this.gameOver()},fixScreen:function(e,o){console.log("设备宽高",cc.winSize);var t=cc.winSize.height,n=cc.winSize.width,s=(t-n/640*960)/2,c=e/n*640,a=(o-s)/(t-2*s)*960;return console.log("原坐标",e,o,"黑边",s),console.log("转化为960*640坐标",c,a),{x:c,y:a}},unfixedScreen:function(e,o){var t=cc.winSize.height,n=e/640*t,s=o/960*(t-2*((t-cc.winSize.width/640*960)/2));return console.log("转化为屏幕坐标",n,s),{x:n,y:s}},nextStage:function(){console.log("Next Stage"),this.score+=this.n,this.scoreBoard.string="分数  ：  "+this.score,6!=this.n&&this.n++,this.clearBlocks(),this.createBlocks()},gameOver:function(){console.log("Game Over"),this.node.off("touchend",this.listenTouch,this),console.log("关闭监听");0==this.shared?this.game.share():this.uploadScore()},getChance:function(e){e?(this.shared=1,this.node.on("touchend",this.listenTouch,this)):this.uploadScore()},uploadScore:function(){console.log("gameArea.js UploadScore"),console.log("分数 : "+this.score),this.game.overToast.getComponent("overToast").show()}}),cc._RF.pop()},{}],game:[function(e,o,t){"use strict";var n;cc._RF.push(o,"b4d86x61V5JIYXx1boZflY1","game"),cc.Class({extends:cc.Component,properties:{playerInfo:null,gameArea:{default:null,type:cc.Node},prefabs:[],shareToast:{default:null,type:cc.Node},overToast:{default:null,type:cc.Node}},onLoad:function(){((((n=this).gameArea.getComponent("gameArea").game=n).shareToast.getComponent("shareToast").game=n).overToast.getComponent("overToast").game=n).resetGame();cc.hide();n.overToast.getComponent("overToast").hide(),this.shareToast.getComponent("shareToast").hide()},resetGame:function(){n.overToast.getComponent("overToast").hide(),console.log("game.js  : reset Game"),n.startGame()},startGame:function(){console.log("game.js  : start Game"),n.gameArea.getComponent("gameArea").onLoad()},share:function(){console.log("game.js  : share Game"),this.shareToast.getComponent("shareToast").show()},returnToMenu:function(){var e="menu";console.log("Scene menu is launching");cc.director.loadScene(e,function(){console.log("Scene menu launched")})}}),cc._RF.pop()},{}],menu:[function(e,o,t){"use strict";cc._RF.push(o,"f8bcdnubFZJ95pzOiGdQpdY","menu"),cc.Class({extends:cc.Component,properties:{},startGame:function(){var e="game";console.log("Scene game is launching");cc.director.loadScene(e,function(){console.log("Scene game launched")})}}),cc._RF.pop()},{}],overToast:[function(e,o,t){"use strict";cc._RF.push(o,"9f72a+r48VLC5EPxRONfv9P","overToast"),cc.Class({extends:cc.Component,properties:{game:null},hide:function(){this.node.removeFromParent(!1),console.log("share hide")},show:function(){this.game.node.addChild(this.node),console.log("share show")}}),cc._RF.pop()},{}],shareToast:[function(e,o,t){"use strict";cc._RF.push(o,"40aaesIBNZJfYdZj0ei1Dgj","shareToast"),cc.Class({extends:cc.Component,properties:{game:null},wxShare:function(){console.log("wx share"),this.hide(),this.game.gameArea.getComponent("gameArea").getChance(!0)},cancle:function(e){this.hide(),console.log(this.game),this.game.gameArea.getComponent("gameArea").getChance(!1)},hide:function(){this.node.removeFromParent(!1),console.log("share hide")},show:function(){this.game.node.addChild(this.node),console.log("share show")}}),cc._RF.pop()},{}],startGame:[function(e,o,t){"use strict";cc._RF.push(o,"97c90uOYNtL3YRrvCwq8Uzn","startGame"),cc.Class({extends:cc.Component,properties:{},startGame:function(){gameArea.startGame()}}),cc._RF.pop()},{}]},{},["game","gameArea","menu","overToast","shareToast","startGame"]);