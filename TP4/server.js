const http = require("http");
const { report } = require("process");
const fs = require("fs");
const querystring = require("querystring");
const port = process.argv[2];





const requestListener = function (req, res) {
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
            res.write("The file does not exist");
            res.end();
        }

        else {
            var data = fs.readFileSync(textfile);
            var end = ["html", "txt", "js", "css", "png", "jpg"];
            var contentTypes = ["text/html", "text/plain", "application/javascript", "text/css", "image/png", "image/jpeg"]
            var endfile = (textfile.split(".")).slice(-1)[0];
            for(i=0; i<6; i++){
                if (endfile==end[i]){
                    res.writeHeader(200, { 'Content-Type': contentTypes[i] });
                    res.write(data);
                    res.end();
                }
            }

        }
    }

    else if(path.slice(0,7)=="bonjour"){
        var name = path.slice(17);
        res.writeHeader(200, { 'Content-Type':"text/html"});
        res.write("bonjour " + querystring.unescape(name));
        
        res.end();
    }

    else if(path.slice(0,4)=="ciao"){
        var name = path.slice(14);
        name =querystring.unescape(name);
        name = name.replace( /(<([^>]+)>)/ig, '');
        var names ="";
        if (fs.existsSync("names.txt")){
            names = fs.readFileSync("names.txt", "utf-8").toString();
        }   

        fs.writeFileSync("names.txt", name + ", ", {encoding: "utf-8", flag: "a"});
        res.writeHeader(200, { 'Content-Type':"text/html"});
        res.write("ciao " + name+", the following users have already visited this page:")
        res.write(names);
        res.end();

    }

    else if(path.slice(0,5)=="clear"){
        fs.writeFileSync("names.txt", "", {encoding: "utf-8"})
        res.end();
    }
    else{
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write("wrong "+path);
        res.end();
    }
    
    
};

const server = http.createServer(requestListener);
server.listen(port);
