var counter = 0
var time= null;
var objectslide;

function loadJSON(){
    var xmlhttp, text;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'slides.json')
    xmlhttp.onload = function(){
        text = this.responseText;
        objectslide = JSON.parse(text);
    }
    xmlhttp.send();
    
}

loadJSON();

function playslides(){
    
    div = document.getElementById("container");
    while (div.childElementCount !=0){
           div.removeChild(div.firstChild);
    }
    var frame = document.createElement("iframe");
    frame.src = objectslide.slides[counter].url;
    div.appendChild(frame);
    counter+=1
    if(counter<6){
        setTimeout(playslides, 2000);
    }
}