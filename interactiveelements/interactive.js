var canvas;
var ctx;
var w = 1200;
var h = 700;
var allRect = [];

var o1 = {
    "x": w / 5,
    "y": h / 2,
    "w": 40,
    "h": 80,
    "c": 300,
    "a": 0.9,
    "angle": 0,
    "changle": 2,
    "distance": 5
}




//document.onkeydown = spacebar;
document.querySelector("#myCanvas").onclick = click;
document.querySelector("#myCanvas").onmousemove = move;


setUpCanvas();

animationLoop();


function animationLoop() {
    clear();
    for (var i = 0; i < allRect.length; i++) {
        rect(allRect[i]);
        bounce(allRect[i]);
        forward(allRect[i])
        collision();
    }
    requestAnimationFrame(animationLoop);
}

function collision(){
    var differencex = Math.abs(allRect[0]-allRect[3]);
    var differencey = Math.abs(allRect[3]-allRect[3]);
    var hdist = Math.sqrt(differencex*differencex + differencey*differencey);
    if(hdist < allRect[6]+allRect[6]){
        if(differencex < differencey){
            o1.changey *= -1;
            o2.changey *= -1;
        }else{
            o1.changex *= -1;
            o2.changex *= -1;
        }
        console.log("collision", hdist);
    }

}

function moveShape(event) {
    if (allRect.length != 0) {
        //up 38
        if (event.keyCode == 38) {
            allRect[0].d++
            // allRect[0].angle = -90;
            // forward(allRect[0], 5);
        };
        //down 48
        if (event.keyCode == 40) {
            allRect[0].d--
            // allRect[0].angle = 90;
            // forward(allRect[0], 5);
        }
        //left 37
        if (event.keyCode == 37) {
            // allRect[0].angle = -180;
            // forward(allRect[0], 5);
            turn(allRect[0], -15);
        }
        //right 39
        if (event.keyCode == 39) {
            // allRect[0].angle = 0;
            // forward(allRect[0], 5);
            turn (allRect[0], 15);
        }


        console.log("moveShape", event.keyCode)
    }
}

function move(event) {
    for (var i = 0; i < allRect.length; i++) {
        allRect[i].h = randn(10) + event.offsetX / 8;
        allRect[i].w = 1 + event.offsetY - rand(0.5);
    }
}

function click(event) {
    addObject(allRect);
    for (var i = 0; i < allRect.length; i++) {
        allRect[i].y = randn(200) + event.offsetX / 8;
        allRect[i].c = randn(200) + event.offsetY / 2;
    
}
}



function addObject(a) { 
    a.push({
        "x": w / 2,
        "y": h / 2,
        "w": rand(100),
        "h": 100,
        "d": 1,
        "a": 1,
        "angle": 0,
        "changle": 15
    });
}


function bounce(o) {
    if (o.x > w || o.x < 0) {
        turn(o, 180);
    };
    if (o.y > h || o.y < 0) {
        turn(o, 180);
    }
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}

function rect(o) {
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    var d = o.d;

    turn(o, 100);
    forward(o, o.w / 6);
    turn(o, 90);
    forward(o, o.h / 4);
    turn(o, 90);
    // o.x -= o.w/2;
    // o.y -= o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x, 1000);
    forward(o, o.w); //updating x and y coords
    ctx.lineTo(o.x, o.y,o.x);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y,o.x);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y,o.x,o.x);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);
    ctx.strokeStyle = "hsla(" + o.c + ",100%,50%," + o.a + ")";
    ctx.stroke();
    o.x = x;
    o.y = y;
    o.angle = a;
    o.d = d;
}


function turn(o, angle) {
    if (angle != undefined) {
        o.changle = angle;
    };
    o.angle += o.changle;
}


function forward(o, d) {
    var changeX;
    var changeY;
    var oneDegree = Math.PI / 180; ///2*Math.Pi/360
    if (d != undefined) {
        o.d = d;
    };
    changeX = o.d * Math.cos(o.angle * oneDegree);
    changeY = o.d * Math.sin(o.angle * oneDegree);
    o.x += changeX;
    o.y += changeY;
}


function randn(r) {
    var result = Math.random() * r - r / 2;
    return result
}

function randi(r) {
    var result = Math.floor(Math.random() * r);
    return result
}

function rand(r) {
    return Math.random() * r
}

function setUpCanvas() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;

}



