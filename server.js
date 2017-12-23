const http = require('http');
const fs = require('fs');
const path = require('path');

const requestHandler = function(req,res){
  console.log(req.url);
  const contentType = {
    ".js":"text/javascript",
    ".html":'text/html',
    ".css":"text/css",
  };
  if (req.url == "/") req.url = "/index.html";
  if(fs.existsSync("."+req.url)){
    res.writeHead(200,{'content-type':contentType[path.extname(req.url)]});
    res.write(fs.readFileSync("."+req.url,'utf8'));
  } else {
    res.write("file Not Found");
    res.statusCode = 404;
  };
  res.end();
};

let server = http.createServer(requestHandler);
server.listen(9999);
console.log("server listening on port 9999");
