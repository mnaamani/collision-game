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

function circleCollision(x1, y1, r1, x2, y2, r2) {
  return (x2-x1)*(x2-x1) + (y1-y2)*(y1-y2) <= (r1+r2)*(r1+r2);
}
//game loop inside a closure
(function (){

  //create the enemies (in an array) - enemy data
  var enemies = [];
  var player;


  //generate N enemies in a loop - new Enemy() and push it into the array
  for(var id = 0; id < Game.numberOfEnemies; id++){
    enemies.push( new Enemy(id) );
  }

  var board = d3.select("svg");

  board
    .attr("width", Game.width)
    .attr("height", Game.height);

  //create enemies
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


  //drag feature
  var drag = d3.behavior.drag()
    .on("drag", dragmove);

  function dragmove(d) {
    //console.log("drag event fired:", d, d3.event.x, d3.event.y);

    d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
    //d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  }
  //create player
  player = board
    .append('ellipse')
    .attr("cx", Game.width /2)
    .attr("cy", Game.height /2)
    .attr("rx", Game.enemyRadius /2)
    .attr("ry", Game.enemyRadius /2)
    .style("fill", "orange")
    .call(drag);

  //setInterval callback function
  function animationLoop(){
    //loop through each enemy. tell it to update its x and y
    enemies.forEach(function(enemy){
      enemy.move();
    });

    player.style("fill","orange");

    //rendering
    board
      .selectAll('circle')
      .transition().duration(1000)
      .attr("cx", function(enemy){
        return enemy.x;
      })
      .attr("cy", function(enemy){
        return enemy.y;
      });
  }

  setInterval(animationLoop, 1000);

  setInterval(function(){

    board
      .selectAll('circle').each(function(circles){
        circles.each(function(){
          circle.getAttribute("cx");
          circle.getAttribute("cy");
          circle.getAttribute("r");
        });
      });

  }, 800);

})();

