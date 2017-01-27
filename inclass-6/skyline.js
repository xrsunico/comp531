'use strict'
var buildings=[];
var createApp = function(canvas) { 

	//create sun 
	var sun = {
		x: 100,
		y: 100,
		r: 20, 
	}

	//create car 
	var car = {
		x:0,
		y:0,
		width:60,
		height:40,
		r:3
	}
	setInterval(function move(){
		moveCar();
		moveSun();
	},100)
	

	//draw the sun and move it
	function moveSun(){
		c.clearRect(0,0,canvas.width,110);	
		c.beginPath();
		c.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI)
		c.fillStyle="red";
		c.fill()
		c.closePath();
		if((sun.x<canvas.width-sun.r)&(sun.y>0)){
			sun.x=sun.x+10;
		}
		else{
			sun.x=50
		}
	}
	
	//move the car
	function moveCar(){
		c.clearRect(0,floor-car.height,1000,car.height);
		c.fillStyle="red";
		c.fillRect(car.x,floor-car.height, car.width, car.height-car.r)	
		c.beginPath();
		c.arc(car.x+car.width/4, floor-car.r, car.r, 0, 2 * Math.PI)
		c.arc(car.x+car.width/2, floor-car.r, car.r, 0, 2 * Math.PI)
		c.fill()
		c.closePath();
		if(car.x<(800-car.width)){
			car.x=car.x+10;
		}
		else{
			car.x=0;
		}
	}
	
	var c = canvas.getContext("2d");
	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var building={
		x:x0,height:blgHeight,width:blgWidth,color:buildingColor}
		buildings.push(building)

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		var buildingColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillStyle = buildingColor
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				//make not all lights are on in each building
				var ran = Math.floor(Math.random()*2);
				if(ran==1)
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}
	return {
		build: build
	}

			
}


window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	var canvas = document.querySelector("canvas")
	canvas.addEventListener('click', grow, false)
	
}
//makes the building grow taller
function grow(e){
	var coord_x=e.clientX
	var coord_y=e.clientY
	buildings.forEach(function(value){
  	if(coord_x>=value.x && coord_x<=value.x+value.width && coord_y>=value.y && coord_y<=value.y+value.height){
  		//make sure the building does not exceed the window
  		if(value.y-20>0){
  		value.y-=20;
  		value.height+=20;
  		}
  	}
  })
}

