/*
    ● Game object  should be able to hold the state of the game. 
    It should be able to display form when the game state is 0(WAIT) 
    or the game when the game state is 1(PLAY) or 
    leaderboard when the game state is 2(END).
    ● GAMESTATES: 0 WAIT 1 START 2 END
*/

class Game {
  /*   
    writing code to create objects even though the blueprint/CONSTRUCTOR isn't
    defined yet. This is called writing code using abstraction 
  */
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetBtn = createButton("");

    this.leaderboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    /* The above code is defining three boolean variables:
    `playerMoving`, `leftKeyActive`, and `blast`. These variables
    are likely used in a game or animation to keep track of the
    state of certain actions or events. */

    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  /*
    function definition to get/read/retrieve existing value of gameState from database
  */
  getState() {
    var gameStateRef = databaseOBJ.ref("GAMESTATE");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  /*
    function definition to change existing value of gameState to a 
    new one based on the value of paramter passed in the database
  */
  updateState(newValueInput) {
    // var gameStateRef = databaseOBJ.ref("GAMESTATE");
    // gameStateRef.update({
    //   GAMESTATE: newValueInput,
    // });
    databaseOBJ.ref("/").update({
      GAMESTATE: newValueInput,
    });
  }

  /**
   * The "start" function initializes the game by creating player and form objects, creating car and
   * obstacle sprites, and adding fuel and coin sprites.
   */
  start() {
    /* The above code is creating a new instance of a Player object and assigning it to the variable
  `playerObj`. It then calls the `getCount()` method on the `playerObj` instance and assigns the
  result to the variable `playerCount`. */
    playerObj = new Player();
    playerCount = playerObj.getCount();

    /* The above code is creating a new instance of a Form object and then calling its display method. The
 purpose and implementation of the Form object and its display method are not shown in the provided
 code snippet. */
    formObj = new Form();
    formObj.display();

    /* The above code is creating two sprites named car1 and car2, adding images to them using the
   addImage() function, and setting their scale to 0.05. The commented out lines suggest that there
   may be additional functionality related to a "blastImage" that is not currently being used. */
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_IMG);
    car1.scale = 0.05;
    // car1.addImage("blastImage", blastImage);

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_IMG);
    car2.scale = 0.05;
    // car2.addImage("blastImage", blastImage);

    /* The above code is to create an
   array called "cars" and assign it two variables "car1" and "car2", */
    cars = [car1, car2];

    /* The above code is creating a group of obstacles and adding obstacle sprites to the game at
    specific positions. The positions and images of the obstacles are defined in the
    `obstaclesPositions` array. The `addSprites` function is used to add the obstacles to the
    `obstaclesGroup` with a certain scale and position. */
    obstaclesGroup = new Group();
    var obstaclesPositions = [
      { x: width / 2 - 150, y: height - 1300, image: obstacle1IMG },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1IMG },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1IMG },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1IMG },
      { x: width / 2, y: height - 5300, image: obstacle1IMG },
      { x: width / 2 + 250, y: height - 800, image: obstacle2IMG },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2IMG },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2IMG },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2IMG },
      { x: width / 2, y: height - 2800, image: obstacle2IMG },
    ];
    //Adding obstacles sprite in the game
    this.addSprites(
      obstaclesGroup,
      obstaclesPositions.length,
      obstacle1IMG,
      0.04,
      obstaclesPositions
    );

    fuelsGroup = new Group();
    // Adding fuel sprite in the game
    this.addSprites(fuelsGroup, 4, fuelIMG, 0.01);

    powerCoinsGroup = new Group();
    // Adding coin sprite in the game
    this.addSprites(powerCoinsGroup, 18, powerCoinIMG, 0.001);
  }

  //function definition to add sprite object to a group
  // it is added only after the sprite object is created fully
  // and has been applied full modifications such as image, velocity, scale, position, etc
  /**
   * This function creates a specified number of sprites with given properties and adds them to a sprite
   * group.
   * @param spriteGroup - The group that the sprites will be added to.
   * @param numberOfSprites - The number of sprites that should be created and added to the sprite group.
   * @param spriteImage - The image or animation that will be used for the sprite.
   * @param scale - The scale parameter is a number that determines the size of the sprite. It is used to
   * set the scale property of the sprite object.
   * @param [positions] - An optional array of objects that contain x, y, and image properties. If this
   * array is provided, the function will use the x and y values from each object to position the
   * sprites, and the image property to set the sprite's image. If this array is not provided, the
   * function will generate random x and y values based within given range.
   */
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    /* In this loop, i variable = 0 and if i is less than the number of sprites in 
    the group then the game should add another i. Everytime the loop repeats it creates a new sprite, 
    gives it a random x and y, gives it the animation or picture, stes the scale and then adds it to the
    group that we have created. The loop function will repeat as long as the given condition is true.
    Basically it gives the sprites the properties and makes a new sprite which is part of the group.*/
    for (var i = 0; i < numberOfSprites; i++) {
      /* This command is for the condition that is given in order for the loop to work.
      The loop will only work as long as this condition is true and if it is not true the functions wont
      take place and a new sprite wont be created.*/
      var newX, newY;

      /* The code is checking if the length of the `positions` array is greater than 0. If it is,
      then the code inside the curly braces (`{}`) will be executed. */
      if (positions.length > 0) {
        /* this line is saying that if the length of the x and y positions is more than 0 the 
        commands bellow will be executed*/

        /*This command is there to create a new x position for every new sprite that is created.*/
        newX = positions[i].x;

        /*This command is there to create a new y position for every new sprite that is created.*/
        newY = positions[i].y;

        /* The above code is assigning the value of the `image` property of the `positions[i]` object to
      the `spriteImage` variable in JavaScript. */
        spriteImage = positions[i].image;
      } else {
        /* The  code is generating two random values for the variables `newX` and `newY`. */
        newX = random(width / 2 + 150, width / 2 - 150);
        newY = random(-height * 4.5, height - 400);
      }
      //
      var sprite = createSprite(newX, newY);
      /* this command is to create a new sprite with a random x and y everytime the condition for the
      loop is true.*/
      sprite.addImage("sprite", spriteImage);

      /* The above code is setting the scale property of a sprite object to the value of the variable
      "scale".*/
      sprite.scale = scale;

      /* The above code is adding a sprite to a sprite group. */
      spriteGroup.add(sprite);
    }
  }

  /**
   * The function resets the game state and player count in the database and reloads the webpage.
   */
  handleResetBtn() {
    this.resetBtn.mousePressed(() => {
      databaseOBJ.ref("/").set({
        PLAYERCOUNT: 0,
        GAMESTATE: 0,
        CARSATEND: 0,
        PLAYERS: {},
      });
      window.location.reload();
    });
  }

  /**
   * The function handles the elements of a game, including hiding a form, positioning and styling
   * various titles and buttons, and displaying leaderboard information.
   */
  handleElements() {
    formObj.hide();
    formObj.titleImg.position(40, 50);
    formObj.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetBtn.class("resetButton");
    this.resetBtn.position(width / 2 + 230, 100);

    this.leaderboardTitle.html("Leaderboard");
    this.leaderboardTitle.class("resetText");
    this.leaderboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  /**
   * This function displays a life bar on the screen using an image and rectangles.
   */
  showLifeBar() {
    push();
    /* It appears to be using the `image()`function in JavaScript to display an image called `lifeIMG` at a specific position on the
    canvas. However, without seeing the rest of the code and understanding the purpose of the
    program, it is difficult to provide a more specific explanation. */
    image(lifeIMG, width / 2 - 130, height - playerObj.positionY - 400, 20, 20);

    /* This code is drawing a white rectangle with a width of 185 and a height of 20 at the center
    of the canvas, with its top left corner positioned at (width / 2 - 100, height -
    playerObj.positionY - 400). The exact position of the rectangle depends on the value of
    playerObj.positionY, which is not shown in the code snippet. */
    fill("white");
    rect(width / 2 - 100, height - playerObj.positionY - 400, 185, 20);

    /* This code is drawing a rectangle on a canvas using the p5.js library. The rectangle is
    filled with a pink color specified by the fill() function. The rect() function is then used to
    draw the rectangle with the following parameters: */
    fill("#f50057");
    rect(
      width / 2 - 100,
      height - playerObj.positionY - 400,
      playerObj.life,
      20
    );
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelIMG, width / 2 - 130, height - playerObj.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - playerObj.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(
      width / 2 - 100,
      height - playerObj.positionY - 350,
      playerObj.fuel,
      20
    );
    noStroke();
    pop();
  }

  /**
   * The function displays the leaderboard by retrieving player information and arranging it based on
   * their rank and score.
   */
  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].RANK === 0 && players[1].RANK === 0) |
      (players[0].RANK === 1)
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].RANK +
        "&emsp;" +
        players[0].NAME +
        "&emsp;" +
        players[0].SCORE;

      leader2 =
        players[1].RANK +
        "&emsp;" +
        players[1].NAME +
        "&emsp;" +
        players[1].SCORE;
    }

    if (players[1].RANK === 1) {
      leader1 =
        players[1].RANK +
        "&emsp;" +
        players[1].NAME +
        "&emsp;" +
        players[1].SCORE;

      leader2 =
        players[0].RANK +
        "&emsp;" +
        players[0].NAME +
        "&emsp;" +
        players[0].SCORE;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  /*
    function defintion to activate the gameObj to START 1 mode and 
    aligned all players to starting positions at the start line
  */
  play() {
    /* The code is calling two methods, `handleElements()` and `handleResetBtn()`, on the current
    object. It is likely part of a larger JavaScript program or class that is responsible for
    handling elements and resetting a form or page. */
    this.handleElements();
    this.handleResetBtn();
    /*
      static function call to retrieve existing playerObj records: name and distance 
      value for all registered players according to the index in the database  
    */
    Player.getPlayersInfo();

    /*
      function call to retrieve existing value of CarsAtEnd from database
    */
    playerObj.getCarsAtEnd();

    if (allPlayers !== undefined) {
      image(trackIMG, 0, -height * 5, width, height * 6);

      this.showFuelBar();
      this.showLifeBar();
      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        //use data form the database to display the cars in x and y direction
        var calculatedX = allPlayers[plr].POSITIONX;
        var calculatedY = height - allPlayers[plr].POSITIONY;

        console.log("calculatedX: " + calculatedX);
        console.log("calculatedY " + calculatedY);

        console.log(
          " cars[index - 1].position.x: " + cars[index - 1].position.x
        );
        console.log(
          " cars[index - 1].position.y: " + cars[index - 1].position.y
        );

        cars[index - 1].position.x = calculatedX;
        cars[index - 1].position.y = calculatedY;

        /* The code is checking the current life of a player in a game and if it is less than or equal
       to 0, it changes the image of the corresponding car to a blast image. */
        //console.log(allPlayers[plr].LIFE);
        var currentLife = allPlayers[plr].LIFE;

        if (currentLife <= 0) {
          //console.log(allPlayers[plr].LIFE);
          cars[index - 1].changeImage("blastIMG", blastIMG);
        }

        if (index === playerObj.index) {
          stroke(10);
          fill("lightpink");
          ellipse(calculatedX, calculatedY, 90, 90);

          /* The above code is incomplete and cannot be accurately described without additional context.
          It appears to be a snippet of code written in JavaScript, but it is missing the surrounding
          code that would provide information about the purpose and functionality of the methods being
          called. */
          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleCarACollisionWithCarB(index);
          this.handleObstacleCollision(index);

          if (playerObj.life <= 0) {
            this.blast = true;
            this.playerMoving = false;
          }
          // Changing camera position in y direction
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      if (this.playerMoving) {
        playerObj.positionY += 5;
        playerObj.updatePlayerInfo();
      }

      // handling keyboard events
      this.handlePlayerControls();
      //Creating finish line
      const finishLine = height * 6 - 100;

     /* The above code is checking if the player's Y position is greater than the finish line. If it
     is, then the game state is set to 2, the player's rank is incremented by 1, the number of cars
     at the end is updated, the player's information is updated, and the rank is displayed. */
      if (playerObj.positionY > finishLine) {
        gameState = 2;
        playerObj.rank += 1;
        Player.updateCarsAtEnd(playerObj.rank);
        playerObj.updatePlayerInfo();
        this.showRank();
      }


      drawSprites();
    }
  }

  handlePlayerControls() {
    //handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      playerObj.positionY += 10;
      playerObj.updatePlayerInfo();
    }
    if (keyIsDown(RIGHT_ARROW) && playerObj.positionX < width / 2 + 300) {
      this.leftKeyActive = false;
      playerObj.positionX += 5;
      playerObj.updatePlayerInfo();
    }
    if (keyIsDown(LEFT_ARROW) && playerObj.positionX > width / 3 - 50) {
      this.leftKeyActive = true;
      playerObj.positionX -= 5;
      playerObj.updatePlayerInfo();
    }
  }

  /**
   * The function handles adding fuel to the player's car and reducing the fuel level, triggering a game
   * over state if the fuel level reaches zero.
   * @param index - The index parameter is used to identify which car in the cars array is being handled
   * for fuel. It is subtracted by 1 because arrays are zero-indexed in JavaScript.
   */
  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuelsGroup, function (collector, collected) {
      playerObj.fuel = 185;
      //collected is the sprite in the group collectibles that triggered the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (playerObj.fuel > 0 && this.playerMoving) {
      playerObj.fuel -= 1;
    }
    /* The code is checking if the fuel property of the playerObj object is less than or equal to 0. If it
is, the gameState variable is set to 2 and the gameOver method is called. */

    if (playerObj.fuel <= 0) {
      gameState = 2;
    /* The above code is written in JavaScript and it is calling a function named "gameOver" using the
    "this" keyword. However, the code is incomplete as it ends with three pound signs ( */
      this.gameOver();
    }
  }

  /**
   * This function adds 21 points to the player's score and removes a collected power coin sprite from
   * the game.
   * @param index - The index parameter is an integer that represents the index of the car in the cars
   * array that is currently being checked for overlap with the powerCoins group. The "-1" is used
   * because arrays are zero-indexed, so the first car in the array would have an index of 0.
   */
  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoinsGroup, function (collector, collected) {
      playerObj.score += 21;
      playerObj.updatePlayerInfo();
      //collected is the sprite in the group collectibles that triggered the event
      collected.remove();
    });
  }

  /**
   * This function handles collision between a car and an obstacle, adjusting the player's position and
   * reducing their life accordingly.
   * @param index - The index parameter is an integer value representing the index of the car that
   * collided with an obstacle.
   */
  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstaclesGroup)) {
      if (this.leftKeyActive) {
        playerObj.positionX += 100;
      } else {
        playerObj.positionX -= 100;
      }

      //Reducing Player Life
      if (playerObj.life > 0) {
        playerObj.life -= 185 / 4;
      }

      playerObj.updatePlayerInfo();
    }
  }

  /**
   * This function handles collisions between two cars and updates the player's position and life
   * accordingly.
   * @param index - The index parameter represents the index of the car that collided with another car.
   * It is used to determine which cars collided and to perform the appropriate actions based on the
   * collision.
   */
  handleCarACollisionWithCarB(index) {
    if (index === 1) {
      if (cars[index - 1].collide(cars[1])) {
        if (this.leftKeyActive) {
          playerObj.positionX += 100;
        } else {
          playerObj.positionX -= 100;
        }

        //Reducing Player Life
        if (playerObj.life > 0) {
          playerObj.life -= 185 / 4;
        }

        playerObj.updatePlayerInfo();
      }
    }
    if (index === 2) {
      if (cars[index - 1].collide(cars[0])) {
        if (this.leftKeyActive) {
          playerObj.positionX += 100;
        } else {
          playerObj.positionX -= 100;
        }

        //Reducing Player Life
        if (playerObj.life > 0) {
          playerObj.life -= 185 / 4;
        }

        playerObj.updatePlayerInfo();
      }
    }
  }

  /**
   * The function displays a congratulatory message with the player's rank and an image of a cup.
   */
  showRank() {
  /* The above code is displaying a pop-up message using the SweetAlert library. The pop-up message
  congratulates the player for reaching the finish line successfully and displays their rank. It
  also includes an image of a cup and a confirmation button. */
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${playerObj.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok",
    });
  }

  /**
   * The function displays a pop-up message indicating that the game is over and the player has lost.
   */
  gameOver() {
    swal({
      title: `GAME OVER !!`,
      text: "Ooops you lost the race !!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
