// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

  var clickLoc = new Object;
  clickLoc.x = 0;
  clickLoc.y = 0;

  var emptyLoc = new Object;
  emptyLoc.x = 0;
  emptyLoc.y = 0;

  var solved = false

window.onload = function(){
	loadPuzzle()
}

loadPuzzle = function(){
	  var img = new Image();
  img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
  img.addEventListener('load', drawTiles, false);
  var boardSize = document.getElementById('puzzle').width;
  var tileCount = document.getElementById('scale').value;
  var tileSize = boardSize / tileCount;
  var boardParts = new Object;
  setBoard();

  console.log("hi")

}

function setBoard() {
    boardParts = new Array(tileCount);
    for (var i = 0; i < tileCount; ++i) {
      boardParts[i] = new Array(tileCount);
      for (var j = 0; j < tileCount; ++j) {
        boardParts[i][j] = new Object;
        boardParts[i][j].x = (tileCount - 1) - i;
        boardParts[i][j].y = (tileCount - 1) - j;
      }
    }
    emptyLoc.x = boardParts[tileCount - 1][tileCount - 1].x;
    emptyLoc.y = boardParts[tileCount - 1][tileCount - 1].y;
    solved = false;
  }

document.getElementById('scale').onchange = function() {
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    setBoard();
    drawTiles();
  };

  document.getElementById('puzzle').onmousemove = function(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  };

  document.getElementById('puzzle').onclick = function() {
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
      slideTile(emptyLoc, clickLoc);
      drawTiles();
    }
    if (solved) {
      alert("You solved it!");
    }
  };

var context = document.getElementById("puzzle").getContext("2d");








