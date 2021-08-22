function sendcom(){
    var comm = document.getElementById("textedit")
    var text = comm.value;
    var xmlhttp = new XMLHttpRequest()
    if (text == "") return;
    xmlhttp.open("GET", "chat.php?phrase="+text);
    comm.value="";
    xmlhttp.onload = function(){
    }  
    xmlhttp.send();
    
}


function loadDoc(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'chatlog.txt');
    
    xmlhttp.onload = function(){
        var text = this.responseText;
        var textlist = text.split("\n").reverse();

        var div = document.getElementById("ta")
        var nlines = div.childElementCount;
        for (var j=0; j<nlines; j++){
            div.removeChild(div.firstChild);
        }

        for (var i=0; i<textlist.length; i++){
            
            var ligne = document.createElement("p");
            ligne.textContent = textlist[i];
            if(ligne.textContent != ""){
                div.appendChild(ligne);
                if (div.childElementCount == 10) {
                    break;
                }
            }
            
    
        }
    }
    xmlhttp.send();
}


setInterval(loadDoc, 500);