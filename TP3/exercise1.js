function loadDoc(){
    var xmlhttp, text;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'text.txt');
    xmlhttp.onload = function(){
        text = this.responseText;
        var obj = document.getElementById("ta");
        obj.textContent = text; 
    }
    xmlhttp.send();
    
}


function loadDoc2(){
    var xmlhttp, text;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'text.txt');
    xmlhttp.onload = function(){
        text = this.responseText;
        var textlist = text.split("<br/>");

        var div2 = document.getElementById("ta2");

        for (var i=0; i<textlist.length; i++){
            var ligne = document.createElement("p");
            ligne.textContent = textlist[i];
            ligne.style.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            div2.appendChild(ligne);
        }
    }
    
    xmlhttp.send();
}