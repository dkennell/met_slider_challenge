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


function start(){
  c.width=480;
  c.height=480;
  var w=myImg.width;
  var h=myImg.height;
  // resize img to fit in the canvas 
  // You can alternately request img to fit into any specified width/height
  var sizer=scalePreserveAspectRatio(w,h,c.width,c.height);
  ctx.drawImage(myImg,0,0,w,h, c.width/2 - w*sizer/2, c.height/2 - h*sizer/2,w*sizer,h*sizer);
}



function scalePreserveAspectRatio(imgW,imgH,maxW,maxH){
    return(Math.min((maxW/imgW),(maxH/imgH)));
}

loadPuzzle = function(){
  initializeGlobals()
  img = new Image();
  switch (document.getElementById("exhibit").value){
    case "tugra":
      var name = "Tughra (Official Signature) of Sultan Süleiman the Magnificent (r. 1520–66)"
      var date = "ca. 1555–60"
      var medium = "Ink, opaque watercolor, and gold on paper"
      img.src = "https://images.metmuseum.org/CRDImages/is/original/DP234753.jpg"
      break;
    case "washstand":
      var name = "Scottish Washstand (British, Glasgow, Scotland 1868–1928 London)"
      var date = "1904"
      var medium = "Oak, ceramic tile, colored and mirror glass, and lead"
      img.src = "https://images.metmuseum.org/CRDImages/ma/original/DT1424.jpg"
      break;
    case "statuette":
      var name = "Greek Bronze statuette of a rider wearing an elephant skin"
      var date = "Hellenistic Period, 3rd century B.C."
      var medium = "Bronze"
      img.src = "https://images.metmuseum.org/CRDImages/gr/original/DP104920.jpg"
      break;
    case "bottle":
      var name = "Peruvian Wari Feline Bottle"
      var date = "8th–10th century"
      var medium = "Ceramic"
      img.src = "https://images.metmuseum.org/CRDImages/ao/original/DT4041.jpg"
      break;
    case "armor":
      var name = "Italian Armor"
      var date = "ca. 1400–1450 and later"
      var medium = "Steel, copper alloy, textile, leather"
      img.src = "https://images.metmuseum.org/CRDImages/aa/original/DT778.jpg";
      break;

  }

  document.getElementById("name").innerHTML = name
  document.getElementById("date").innerHTML = date
  document.getElementById("medium").innerHTML = medium

  img.height="1%"
  img.addEventListener('load', drawTiles, false);
  var boardParts = new Object;
  setBoard(tileCount);
  setListeners()

  console.log("hi")

}


function initializeGlobals(){
  context = document.getElementById("puzzle").getContext("2d");

  boardSize = document.getElementById('puzzle').width;
  tileCount = 4 //document.getElementById('scale').value;
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
    
    // document.getElementById('scale').onchange = function() {
    //   tileCount = this.value;
    //   tileSize = boardSize / tileCount;
    //   setBoard();
    //   drawTiles();
    // };
    document.getElementById('exhibit').onchange = function() {
      loadPuzzle()
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
    var sizingRatio = scalePreserveAspectRatio(img.width,img.height,480,480)


    context.clearRect ( 0 , 0 , boardSize , boardSize );
    for (var i = 0; i < tileCount; ++i) {
      for (var j = 0; j < tileCount; ++j) {
        x = boardParts[i][j].x;
        y = boardParts[i][j].y;
        if(i != emptyLoc.x || j != emptyLoc.y || solved == true) {
          context.drawImage(img, x * tileSize*(1/sizingRatio), y * tileSize*(1/sizingRatio), tileSize*(1/sizingRatio), tileSize*(1/sizingRatio),
              i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  }









