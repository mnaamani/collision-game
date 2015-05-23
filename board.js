//globals - d3

//game state
var Game = {
  width: 650,
  height: 500,
  highScore: 0,
  currentScore: 0,
  numberOfEnemies: 10
};


function Enemy(id){
  this.x = Math.random() * 100;
  this.y = Math.random() * 100;
  this.id = id;
}

function Player(){

}


//game loop inside a closure
function run(){

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


  //setInterval callback function
  function loop(){
    console.log(enemies);

    //rendering
    board
      .selectAll('circle')
      .data(enemies)
      .enter()
      .append('circle')
      .attr("cx", 25)
      .attr("cy", 25)
      .attr("r", 25)
      .style("fill", "purple");
  }

  loop();
  //setInterval(loop, 100);
}

run();
