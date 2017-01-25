//get the sources of images in different cards
var images1=['image/lala1.jpg','image/lala2.jpg','image/lala3.jpg'];
var images2=['image/sw1.jpg','image/sw2.jpg','image/sw3.jpg'];
var images3=['image/leon1.jpg','image/leon2.jpg','image/leon3.jpg'];
var images4=['image/lor1.jpg','image/lor2.jpg','image/lor3.jpg'];
var images5=['image/icp1.jpg','image/icp2.jpg','image/icp3.jpg','image/icp4.jpg'];
//current item in the images array
var current1=0;
var current2=0;
var current3=0;
var current4=0;
var current5=0;

//set random delay time for intervals
function setRandom(){
    return Math.floor((Math.random() * 5) + 1) * 1000;
}

window.onload = function(){
    // navigate to the user's profile page
    document.getElementById("profile_button").onclick = function(){
		location.href="profile.html";
	}
    //loop images in each position
    var interval1=setInterval(function (){
    document.getElementById('image1').src=images1[current1];
    current1=(current1+1)%images1.length;
    },setRandom());
    var interval2=setInterval(function (){
    document.getElementById('image2').src=images2[current2];
    current2=(current2+1)%images2.length;
    },setRandom());
    var interval3=setInterval(function rotate3(){
    document.getElementById('image3').src=images3[current3];
    current3=(current3+1)%images3.length;
    },setRandom());
    var interval4=setInterval(function rotate4(){
    document.getElementById('image4').src=images4[current4];
    current4=(current4+1)%images4.length;
    },setRandom());
    var interval5=setInterval(function rotate5(){
     document.getElementById('image5').src=images5[current5];
     current5=(current5+1)%images5.length;
    },setRandom());
    
    var stop1=document.getElementById("stop1");
    var stop2=document.getElementById("stop2");
    var stop3=document.getElementById("stop3");
    var stop4=document.getElementById("stop4");
    var stop5=document.getElementById("stop5");
    //define the onclick function of each stop button
    stop1.onclick=function(){
        if(stop1.value=="Stop"){
            clearInterval(interval1);
            stop1.value="Start";
        }
        else{
            stop1.value="Stop";
            interval1=setInterval(function (){
            document.getElementById('image1').src=images1[current1];
            current1=(current1+1)%images1.length;
            },setRandom());
        }
    }
    stop2.onclick=function(){
        if(stop2.value=="Stop"){
            clearInterval(interval2);
            stop2.value="Start";
        }
        else{
            stop2.value="Stop";
            interval2=setInterval(function rotate2(){
            document.getElementById('image2').src=images2[current2];
            current2=(current2+1)%images2.length;
            },setRandom());
        }
    }
    stop3.onclick=function(){
        if(stop3.value=="Stop"){
            clearInterval(interval3);
            stop3.value="Start";
        }
        else{
            stop3.value="Stop";
            interval3=setInterval(function (){
            document.getElementById('image3').src=images3[current3];
            current3=(current3+1)%images3.length;
            },setRandom());
        }
    }
    stop4.onclick=function(){
        if(stop4.value=="Stop"){
            clearInterval(interval4);
            stop4.value="Start";
        }
        else{
            stop4.value="Stop";
            interval4=setInterval(function (){
            document.getElementById('image4').src=images4[current4];
            current4=(current4+1)%images4.length;
            },setRandom());
        }
    }
    stop5.onclick=function(){
        if(stop5.value=="Stop"){
            clearInterval(interval5);
            stop5.value="Start";
        }
        else{
            stop5.value="Stop";
            interval5=setInterval(function (){
            document.getElementById('image5').src=images5[current5];
            current5=(current5+1)%images5.length;
            },setRandom());
        }
    }
    

}

