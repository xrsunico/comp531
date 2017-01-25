window.onload=function(){
    var start=document.getElementById("click");
    var clicked=false;
    document.getElementById("box").style.display='none';
    var w = window.innerWidth-start.offsetWidth; 
    var h = window.innerHeight-start.offsetHeight;
    start.style.position="absolute";
    start.addEventListener("avoid",avoid,true);
    start.addEventListener("click",start.onclick,false);

    start.onclick=function(){
        if(!clicked){
            clicked=true;
            start.value="Play Again";
            document.getElementById("box").style.display='';
        }
        else{
            document.getElementById("box").style.display='none';
            clicked=false;
            start.value="Click Me";
            avoid();
        }
    }
    function avoid(){
        if (event.shiftKey){	
            return;
        }else if(start.value =="Play Again"){
                return;
        }else{					
            var randomW=Math.floor(Math.random()*w);
            var randomH=Math.floor(Math.random()*h);
            start.style.left=randomW+"px";
            start.style.top=randomH+"px";
        }
    }
}
