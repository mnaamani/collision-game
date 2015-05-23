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

function circleCollision(x1, y1, r1, x2, y2, r2) {
  return (x2-x1)*(x2-x1) + (y1-y2)*(y1-y2) <= (r1+r2)*(r1+r2);
}
//game loop inside a closure
(function (){

  //create the enemies (in an array) - enemy data
  var enemies = [];
  var player;

  var board = d3.select("svg");

  board
    .attr("width", Game.width)
    .attr("height", Game.height);

  //generate N enemies in a loop - new Enemy() and push it into the array
  for(var id = 0; id < Game.numberOfEnemies; id++){
    enemies.push(
      board
       .append('circle')
       .attr('cx', function(){
          return Game.enemyRadius + (Math.random() * (Game.width - 2 * Game.enemyRadius));
       })
       .attr('cy', function(){
          return Game.enemyRadius + (Math.random() * (Game.height - 2 * Game.enemyRadius));
       })
       .attr("r", Game.enemyRadius)
       .style("fill", "purple")
    );
  }

  //drag feature
  var drag = d3.behavior.drag()
    .on("drag", dragmove);

  function dragmove(d) {

    d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
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
    //rendering
    board
      .selectAll('circle')
      .transition().duration(1000)
      .attr('cx', function(){
          return Game.enemyRadius + (Math.random() * (Game.width - 2 * Game.enemyRadius));
      })
      .attr('cy', function(){
          return Game.enemyRadius + (Math.random() * (Game.height - 2 * Game.enemyRadius));
      });
  }

  setInterval(animationLoop, 1000);

  setInterval(function(){

    var x1 = player.attr("cx");
    var y1 = player.attr("cy");
    var r1 = player.attr("rx");

    for(var i = 0; i < enemies.length; i++){
      var x2 = enemies[i].attr("cx");
      var y2 = enemies[i].attr("cy");
      var r2 = enemies[i].attr("r");

     if(circleCollision(x1, y1, r1, x2, y2, r2)){
        //
        console.log("detected collision");
     }

    }
  }, 20);

})();

