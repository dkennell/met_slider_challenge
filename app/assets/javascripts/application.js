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

window.onload = function(){
	loadPuzzle()
}

loadPuzzle = function(){
  initializeGlobals()
  img = new Image();
  img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
  img.addEventListener('load', drawTiles, false);
  var boardParts = new Object;
  setBoard(tileCount);
  setListeners()

  console.log("hi")

}


function initializeGlobals(){
  context = document.getElementById("puzzle").getContext("2d");

  boardSize = document.getElementById('puzzle').width;
  tileCount = document.getElementById('scale').value;
  tileSize = boardSize / tileCount;

  
  clickLoc = new Object;
  clickLoc.x = 0;
  clickLoc.y = 0;

  emptyLoc = new Object;
  emptyLoc.x = 0;
  emptyLoc.y = 0;

  solved = false
}


function setBoard(tileCount) {
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

function setListeners(){
    
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
        setTimeout(function() {alert("You solved it!");}, 500);
      }
    };
  }

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
    if (!solved) {
      boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
      boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
      boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
      boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
      toLoc.x = fromLoc.x;
      toLoc.y = fromLoc.y;
      checkSolved();
    }
  }

function checkSolved() {
    var flag = true;
    for (var i = 0; i < tileCount; ++i) {
      for (var j = 0; j < tileCount; ++j) {
        if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
          flag = false;
        }
      }
    }
    solved = flag;
  }

  function drawTiles() {
    context.clearRect ( 0 , 0 , boardSize , boardSize );
    for (var i = 0; i < tileCount; ++i) {
      for (var j = 0; j < tileCount; ++j) {
        x = boardParts[i][j].x;
        y = boardParts[i][j].y;
        if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
          context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
              i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  }









