//array of types of stones
var stoneType=["gold_small","gold_small","gold_small","gold_med","gold_med","gold_big","gold_big","rock","rock","box"]
//the determined money to win the game
var goalMoney=5000
//current money the player gets
var money=0
//the display of countdown
var timer
var countdown
var app
//the number of missed grabs the playr makes
var missGrab=0

'use strict'
//initiate easy mode
function easy() {
	reset()
	document.getElementById('goal').innerHTML=goalMoney
	var canvas = document.querySelector("canvas")
	app = createApp(canvas)
	canvas.addEventListener("mousedown", app.dig, false)
	app.start()
	timer = setInterval(countdown, 1000)
	money = 0
}
//initiate hard mode
function hard() {
	reset()
	goalMoney=10000
	document.getElementById('goal').innerHTML=goalMoney
	var canvas = document.querySelector("canvas")
	app = createApp(canvas)
	canvas.addEventListener("mousedown", app.dig, false)
	app.start()
	timer = setInterval(countdown, 1000)
	money = 0
}
//clear all the metrics
var reset = function() {
	money = 0
	document.getElementById('money').innerHTML = money
	stoneType.forEach(function(stone){
		document.getElementById(stone+"-grab").innerHTML = 0
    })
}
//record the countdown while the game is on
var countdown = function() {
	var time = parseInt(document.getElementById('timer').innerHTML)
	if (time == 1) {
		clearInterval(timer)
		end()
	} else {
		document.getElementById('timer').innerHTML = time - 1	
	}
}
//terminate the game when the time is up
var end = function() {
	app.stop()
	clearInterval(timer)
	document.getElementById('timer').innerHTML = 60
	showResult()
}
//give the results of the game--win or lose
var showResult = function() {
	var result = 'win'
	if (money< ocument.getElementById('goal').innerHTML) {
		result = 'lose'
	} 
	if (result == 'win') {
		document.getElementById('result').innerHTML = "You WIN! Keep going!"
	} else {
		document.getElementById('result').innerHTML = "You LOSE! Game over!"
	}
	document.getElementById('result').style.display = 'inline'
}

var createApp = function(canvas) { 
	
	var c = canvas.getContext("2d")	
	var stones = []
	var flag1=document.getElementById('easy')
	var flag2=document.getElementById('hard')
	
	var start = function() {
		Array(10).fill(1).forEach(function(key){
			stone()
		})
		gameCountdown = setInterval(function(){
			c.clearRect(0, 0, 700, 500)
			Array(10 - stones.length).fill(1).forEach(function(key){
				stone()
			})	
			stones.forEach(function(stone){
				paintstone(stone)
			})
		
		}, 120)
		flag1.disabled = true
		flag2.disabled = true
	}
    var stop = function() {
		if (flag1.disabled == true&&flag2.disabled == true) {
			clearInterval(gameCountdown)
			c.clearRect(0, 0, 700, 500)
			flag1.disabled = false;
			flag2.disabled = false;
		}		
	}
	//use the hook to dig for gold--if the stone has been clicked, it will be collected
    var dig = function() {
		if (flag1.disabled == false&&flag2.disabled == false) {
			return
		}
		var x = event.layerX 
		var y = event.layerY 	
		//print the mouse--a hook
		var img = document.getElementById('hook')
		c.drawImage(img, x - 50, y - 50,80,80)
		var nextstone = []
		var miss=0;
		//check the click--whether it is gold or rock or box and count the missed grabs
		stones.forEach(function(stone){
			if (stone.positionX > x || stone.positionX < x - 150 ||
				stone.positionY > y || stone.positionY < y - 150) {
				miss+=1;
				nextstone.push(stone)
			} else {
				if (stone.type == 'gold_small') {
					money = money + 50
				} else if (stone.type == 'gold_med') {
					money = money + 100
				} else if (stone.type == 'gold_big') {
					money = money + 150
				} else if (stone.type == 'rock') {
					money = money + 10
				}else if(stone.type=='box'){
                    money = money + Math.floor(Math.random()*500)
				}
				document.getElementById('money').innerHTML = money
				var num = parseInt(document.getElementById(stone.type+"-grab").innerHTML)
				document.getElementById(stone.type+"-grab").innerHTML = num + 1		
			}

		})
		missGrab += (miss==stones.length) ? 1 : 0;
		document.getElementById('missed-grab').innerHTML = missGrab	;
		stones = nextstone
	}
	//paint stones somewhere on the canvas 
    var paintstone = function(stone) {
		
		c.drawImage(stone.img, stone.positionX, stone.positionY)
		stone.positionX += stone.velocityX
		stone.positionY += stone.velocityY
		if (stone.positionX < 0 || stone.positionX > 700 ||
			stone.positionY < 0 || stone.positionY > 500) {
			stone.positionX = Math.floor(Math.random() * 700)
			stone.positionY = Math.floor(Math.random() * 500)
		}	
	}
	//make stones move anywhere on the canvas
	var stone = function() { 
		var curStone = stoneType[Math.floor(Math.random() * 10)]
		var stoneImg = document.getElementById(curStone)
		var stonePositionX = Math.floor(Math.random() * 700)
		var stonePositionY = Math.floor(Math.random() * 500)
		var stoneVelocityX = Math.random() * 20 - 5
		var stoneVelocityY = Math.random() * 20 - 5
		var stone = {
			type: curStone,
			img: stoneImg,
			positionX: stonePositionX,
			positionY: stonePositionY,
			velocityX: stoneVelocityX,
			velocityY: stoneVelocityY
		}
		stones.push(stone)
		paintstone(stone)
	}
	return {
		dig: dig, 
		start: start,
		stop: stop
	}
}

