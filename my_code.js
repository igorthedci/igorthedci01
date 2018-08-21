
var inited = false;
function clearHint(app, arrow) {
  arrow.children.forEach(function(ch) {
    createjs.Tween.get(ch, { override: true, loop: false })
      .to ({ alpha: 0, }, 500)
      .wait(500)
      .to ({ x: -1000 }, 1)
  })

  app.top_overlay.y = -10000;
  app.top_overlay_text.y = -10000;
  app.top_ball.y = -10000;
  app.removeChild(self.top_ball);
  app.removeChild(app.top_overlay);
  app.removeChild(app.top_overlay_text);

  app.game_block.top_balls.forEach(function(ball) {
     createjs.Tween.get(ball).to({alpha: 1}, 50);
  })
}

var sparklesSprite;


function startGame(app, lib)
{
    var game_block = app.game_block;
    var showHint;
    var showWinPopupTimer;
    
    
    function onFieldClick(evt) {
      if (lib.shownWinPopup)
        return;

        var shape = evt.target;
        // console.log('click', shape.ndx, shape.ndxI);
        if (shape.number) {
            if (shape.number == NextBalls[NextBalls.length - RemainingBalls.length - 1]) {
                createjs.Tween.get(shape.numberObj, { override:false })
                    .to({scaleX: 0, scaleY:0}, 300)
                    .call(function() {
                        app.game_block.removeChild(shape.numberObj);
                        app.game_block.removeChild(shape);
                        var ball = new lib.selection_ball();

                        ball.name = 'ball_'+shape.number;

                        var x = 21 + (lib.cellSize + 2.7) * shape.ndx,
                            y = 149 + lib.cellSize * shape.ndxI - shape.ndxI * 0.5;
                        ball.setTransform(x, y);
                        app.game_block.addChild(ball);

                        var speedXP = 750;

                        var xp = new createjs.Text("+1 xp", "bold 24px arial", "#ff3700");
                        xp.textAlign = "center";
                        xp.lineWidth = 80;
                        xp.shadow = new createjs.Shadow("rgba(255,244,255,1)", 0, 0, 2);
                        xp.setTransform(x + 30, y);

                        var animateXp = createjs.Tween.get(xp, { override: true, loop: false })
                            .to({y: y - 10, alpha: 1}, speedXP / 3)
                            .wait(100)
                            .to({y: y - 50, alpha: 0}, speedXP / 3 * 2);

                        var xp_rays = new lib.white_rays();
                        xp_rays.setTransform(x + 30, y + 15);
                        xp_rays.regX = 278;
                        xp_rays.regY = 275;
                        xp_rays.scaleX = xp_rays.scaleY = 0.2;

                        var animateXpRays = createjs.Tween.get(xp_rays, { override: true, loop: false })
                            .to({y: y + 5, alpha: 1, rotation: 360 * 5}, speedXP / 3)
                            .wait(100)
                            .to({y: y - 40, alpha: 0, rotation: 360 * 15}, speedXP / 3 * 2);
                        
                        app.game_block.addChild(xp_rays);
                        app.game_block.addChild(xp);
                        

                        app.timeline.addTween(createjs.Tween.get(animateXpRays)).wait(2);
                        app.timeline.addTween(createjs.Tween.get(animateXp)).wait(2);

                    });

                clearHint (app, app.hintArrow);
                clearTimeout(showHint);
                
                var number = RemainingBalls.shift();
                app.getNewBall(number);
                if (number) {
                    showHint = setTimeout(function() {

                        //minor hint
                         app.hintArrow = new lib.renderArrow(true);
                         app.hintArrow.parent = app;
                         //this.hintArrow.setTransform(18,146);
                         app.timeline.addTween(createjs.Tween.get(app.hintArrow));

//                        createjs.Tween.get(game_block.getChildByName('number_'+number), { override: false, loop: true })
//                            .to ({ alpha: 0.5, }, 100)
//                            .to ({ alpha: 2, }, 100)
//                            .wait(350)
//                        ;
                    }, 1000);
                }

            } else {
                createjs.Tween.get(shape.numberObj, { override:false, loop: false })
                    .to({ color: '#ff0000', scaleX: 1.2, scaleY: 1.2 }, 50)
                    .wait(500)
                    .to({ color: '#000', scaleX: 1, scaleY: 1 }, 10)
            }
        }
    }

    function onBingoClick(evt) {
        if (RemainingBalls.length > 0) return;
        app.showWinPopup();
    }

    function onInstallClick (evt) {
        if (lib.shownWinPopup)
          return;

        logAtom(5, 2);
        evt.currentTarget.scaleX = evt.currentTarget.scaleY = 1;
        gotostore();
    }

    function onContinueClick(evt) {
      logAtom(5, 2);
      gotostore();
    }

    function addClickListeners() {
        if(!game_block.hasEventListener("mousedown"))
            game_block.addEventListener("mousedown", onFieldClick);
        if(!app.install_btn.hasEventListener("mousedown"))
            app.install_btn.addEventListener("mousedown", onInstallClick);
        if(!app.win_screen.continue_button.hasEventListener("mousedown"))
            app.win_screen.continue_button.addEventListener("mousedown", onContinueClick);
        if(!app.game_block.bingo_button.hasEventListener("mousedown"))
            app.game_block.bingo_button.addEventListener("mousedown", onBingoClick);

    }


    function createScene()
    {
    }

    function initUI()
    {
        addClickListeners();
    }

    function initGame()
    {
        if (inited)
            return;
        inited = true;

        // var data = {
        //   images: ["./img/spritesheet_sparkle_yellow.png"],
        //   frames: {width: 21, height: 23, regX: 10, regY: 11}
        // };
        // sparklesSprite = new createjs.Sprite(new createjs.SpriteSheet(data));

        sparklesSprite = new lib.spritesheet_sparkle();

        // var filter = new createjs.ColorFilter(1,0.8,0.1,1);
        // sparklesSprite.filters = [filter];
        // sparklesSprite.shadow = new cjs.Shadow("rgba(255,200,0,1)", 0, 0, 3);

        createScene();
        initUI();

        logAtom(2, 0);
    }


    initGame();
};



function sparklesClick(evt) {
  // console.log(evt, stage)
  addSparkles((Math.random() * 100 + 100) | 0, 
    evt.stageX / stage.scaleX, evt.stageY / (stage.scaleY) - stage.y, 1);
};

function addSparkles(count, x, y, speed) {
  //create the specified number of sparkles
  for (var i = 0; i < count; i++) {
    // clone the original sparkle, so we don't need to set shared properties:
    var sparkle = sparklesSprite.clone();
    // set display properties:
    sparkle.x = x;
    sparkle.y = y;
    //sparkle.rotation = Math.random()*360;
    sparkle.alpha = Math.random() * 0.5 + 0.5;
    sparkle.scaleX = sparkle.scaleY = Math.random() + 0.3;
    // set up velocities:
    var a = Math.PI * 2 * Math.random();
    var v = (Math.random() - 0.5) * 30 * speed;
    sparkle.vX = Math.cos(a) * v;
    sparkle.vY = Math.sin(a) * v;
    sparkle.vS = (Math.random() - 0.5) * 0.2; // scale
    sparkle.vA = -Math.random() * 0.05 - 0.01; // alpha
    // start the animation on a random frame:
    sparkle.gotoAndPlay(Math.random() * sparkle.spriteSheet.getNumFrames());
    sparkle.isSparcle = true;
    // add to the display list:
    stage.addChild(sparkle);
  }
}

function sparklesTick(event) {
  // loop through all of the active sparkles on stage:
  var l = stage.getNumChildren();
  var m = event.delta / 16;
  for (var i = l - 1; i > 0; i--) {
    var sparkle = stage.getChildAt(i);
    if(!sparkle.isSparcle)
      continue;

    // apply gravity and friction
    sparkle.vY += 0.8 * m;
    sparkle.vX *= 0.99;
    // update position, scale, and alpha:
    sparkle.x += sparkle.vX * m;
    sparkle.y += sparkle.vY * m;
    sparkle.scaleX = sparkle.scaleY = sparkle.scaleX + sparkle.vS * m;
    sparkle.alpha += sparkle.vA * m;
    //remove sparkles that are off screen or not invisble
    if (sparkle.alpha <= 0 || sparkle.y > (canvas.height / stage.scaleX - stage.y)) {
      stage.removeChildAt(i);
    }
  }
  
  // draw the updates to stage
  stage.update(event);
}