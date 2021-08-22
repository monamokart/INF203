const http = require("http");
const { report } = require("process");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const port = process.argv[2];




function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}


const requestListener = function (req, res) {
    var parse_url = url.parse(req.url)
    var path = req.url
    path = path.slice(1,path.length)

    if (path==""){
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write('The server works');
        res.end();
    }

    else if (path=="stop"){
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write("The server will stop now.");
        res.end();
        process.exit(0);
    }

    else if (path.slice(0,7)=="root/.."){
        res.writeHeader(403, { 'Content-Type': 'text/html' })
        res.write("Forbidden");
        res.end();
    }

    else if(path.slice(0,5)=="root/"){
        var textfile = path.slice(5);
        if(!fs.existsSync(textfile)){
            res.writeHeader(404, { 'Content-Type': 'text/html' })
            res.write("The file does not exist :"+textfile);
            res.end();
        }

        else {
            var data = fs.readFileSync(textfile);
            var end = ["html", "txt", "js", "css", "png", "jpg", "json"];
            var contentTypes = ["text/html", "text/plain", "application/javascript", "text/css", "image/png", "image/jpeg", "application/json"]
            var endfile = (textfile.split(".")).slice(-1)[0];
            for(i=0; i<7; i++){
                if (endfile==end[i]){
                    res.writeHeader(200, { 'Content-Type': contentTypes[i] });
                    res.write(data);
                    res.end();
                    return;
                }
            }

        }
    }

    else if (path.slice(0,6)=="slices" ){
        if (!fs.existsSync("storage.json")) {
            res.writeHeader(404);
            res.end()
        
          }

        else {
            var data = fs.readFileSync("storage.json")
            res.writeHeader(200, { 'Content-Type': 'application/json' })
            res.write(data);
            res.end();
        }
    }


    else if (path.slice(0,3)=="add"){
        var parse_query = querystring.parse(parse_url.query);
        if (parse_query.value == ""|| parse_query.title == "" ||parse_query.color=="" ){
 
            res.writeHeader(400, { 'Content-Type': 'text/html' } );
            res.write("There is a problem with the format of the request")
            res.end()
            
              
        }

        else if (fs.existsSync("storage.json")){
            
            var data = JSON.parse(fs.readFileSync("storage.json"));
            data.push({title: parse_query.title, color: parse_query.color, value: parse_query.value});
            fs.writeFileSync("storage.json", JSON.stringify(data));
            res.writeHeader(200);
            res.end();
        }

        else {
            var data = [{title: parse_query.title, color: parse_query.color, value: parse_query.value}];
            fs.writeFileSync("storage.json", JSON.stringify(data));
            res.writeHeader(200);
            res.end()
        }
    }

    else if (path.slice(0,6)=="remove"){
        if (!fs.existsSync("storage.json")) {
            res.writeHeader(404);
            res.end()
        
          }
        else{

            parse_query = querystring.parse(parse_url.query);
            var data = JSON.parse(fs.readFileSync("storage.json"));
            data.splice(parse_query.index, 1);
            fs.writeFileSync("storage.json", JSON.stringify(data));
            res.writeHeader(200);
            res.end();
        }
    }

    else if (path.slice(0,5)=="clear"){
        fs.writeFileSync("storage.json", JSON.stringify([]))
        res.writeHeader(200);
        res.end();

    }

    else if (path.slice(0,7)=="restore"){
        if (!fs.existsSync("storage.json")) {
            res.writeHeader(404);
            res.end()
        
          }
        else{

            var data = JSON.parse(fs.readFileSync("storage.json"));
            data = data.slice(0,3);
            fs.writeFileSync("storage.json", JSON.stringify(data));
            res.writeHeader(200);
            res.end();
        }
    }



    
    else if(path.slice(0,5)=="chart"){
        var slices = JSON.parse(fs.readFileSync("storage.json"));
        
        
        var rep = '<svg id="piechart" viewBox="-1 -1 2 2" height=500 width=500>';

        var value_tot = 0;
        for(var slice of slices) {
            value_tot += new Number(slice.value);
        }
        var cum = 0;
        for (var slice of slices) {
            var percent = slice.value/value_tot;
            var [x_start, y_start] = getCoordinatesForPercent(cum);
            
      
            //var [x_title, y_title] = getCoordinatesForPercent(cum + percent/2);
      
            cum += percent;
            
            var [x_end, y_end] = getCoordinatesForPercent(cum);
      
            var largeArcFlag = percent > .5 ? 1 : 0;
      
            var pathData = [
                `M ${x_start} ${y_start}`,
                `A 1 1 0 ${largeArcFlag} 1 ${x_end} ${y_end}`,
                `L 0 0`,
              ].join(' ');

            rep += '<path d="' + pathData + '" fill="' + slice.color + '"></path>';

      
          }
        rep+='</svg>'
        res.writeHeader(200, {"Content-Type": "image/svg+xml"});
        res.write(rep);
        res.end();
    }

    else{
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write("wrong "+path);
        res.end();
    }

    
    
    
}

const server = http.createServer(requestListener);
server.listen(port);