//globals - d3

//game state
var Game = {
  width: 650,
  height: 500,
  highScore: 0,
  currentScore: 0,
  numberOfEnemies: 10,
  enemyRadius: 15,
};


function Enemy(id){
  this.id = id;
  this.move();
}

Enemy.prototype.move = function() {
  this.x = Game.enemyRadius + (Math.random() * (Game.width - 2 * Game.enemyRadius));
  this.y = Game.enemyRadius + (Math.random() * (Game.height - 2 * Game.enemyRadius));
};

function Player(){

}


//game loop inside a closure
(function (){

  //create the enemies (in an array) - enemy data
  var enemies = [];
  //generate N enemies in a loop - new Enemy() and push it into the array
  for(var id = 0; id < Game.numberOfEnemies; id++){
    enemies.push( new Enemy(id) );
  }

  var board = d3.select("svg");

  board
    .attr("width", Game.width)
    .attr("height", Game.height);

    board
      .selectAll('circle')
      .data(enemies)
      .enter()
      .append('circle')
      .attr("cx", function(enemy){
        return enemy.x;
      })
      .attr("cy", function(enemy){
        return enemy.y;
      })
      .attr("r", Game.enemyRadius)
      .style("fill", "purple");

  //setInterval callback function
  function loop(){
    //loop through each enemy. tell it to update its x and y
    enemies.forEach(function(enemy){
      enemy.move();
    });

    //rendering
    board
      .selectAll('circle')
      .data(enemies)
      .attr("cx", function(enemy){
        return enemy.x;
      })
      .attr("cy", function(enemy){
        return enemy.y;
      });
  }

  loop();
  setInterval(loop, 500);
})();

