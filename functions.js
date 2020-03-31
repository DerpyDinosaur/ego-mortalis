function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var currentLeaf = 0;
var clockWise = true;
var xCounter = 0;
var isRight = true;
function dropLeaf(){
    leaves.children[leavesToFall[currentLeaf]].y += leaves.children[leavesToFall[currentLeaf]].vy;

    if(xCounter <= 200 && isRight){
    	leaves.children[leavesToFall[currentLeaf]].x += leaves.children[leavesToFall[currentLeaf]].vx;
    	xCounter = xCounter+1;
    }else if(xCounter <= 400 && isRight){
    	leaves.children[leavesToFall[currentLeaf]].x -= leaves.children[leavesToFall[currentLeaf]].vx;
    	xCounter = xCounter+1;
    	if(xCounter == 400){
    		isRight = false;
    		xCounter = 0;
    	}
    }else if(xCounter <= 200 && !(isRight)){
    	leaves.children[leavesToFall[currentLeaf]].x += leaves.children[leavesToFall[currentLeaf]].vx;
    	xCounter = xCounter+1;
    }else if(xCounter <= 400 && !(isRight)){
    	leaves.children[leavesToFall[currentLeaf]].x -= leaves.children[leavesToFall[currentLeaf]].vx;
    	xCounter = xCounter+1;
    	if(xCounter == 400){
    		isRight = true;
    		xCounter = 0;
    	}
    }
    
    if(clockWise){
    	leaves.children[leavesToFall[currentLeaf]].rotation = leaves.children[leavesToFall[currentLeaf]].rotation + 0.008;
    }else{
    	leaves.children[leavesToFall[currentLeaf]].rotation = leaves.children[leavesToFall[currentLeaf]].rotation - 0.008;
    }
    
    if(Math.floor(leaves.children[leavesToFall[currentLeaf]].y) >= 705){
    	currentLeaf = currentLeaf+1;
    	clockWise = !(clockWise);
    }

    if(currentLeaf > 17){
    	leaves.children[leavesToFall[currentLeaf-18]].alpha -= 0.05;

    	if(leaves.children[leavesToFall[currentLeaf-18]].alpha == 0){
    		leaves.removeChild(leavesToFall[currentLeaf-18]);
    	}
    }

    document.getElementById("counter").innerHTML = currentLeaf + timeSpent - 10;
}
