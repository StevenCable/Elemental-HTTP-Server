/*jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const PORT = process.env.PORT || 3000;


function sendError(resp){
  resp = "Can't find what doesn't exist";
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.write(resp);
  res.end();
}

function sendContent(res, content){
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.write(content);
  res.end();
}

function updateHTML(newString){

}


const server = http.createServer((req, res) =>{
    let parsedElementData = '';
    // let reqBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      console.log(chunk);
      parsedElementData = qs.parse(chunk);
      // reqBody += chunk;
    });
  fs.readdir('./public', function(err,files){
    if(err){
      throw error;
    }
    console.log("files: ", files);
  });
    

  req.on('end', () =>{
    fs.writeFile(`./public/${parsedElementData.elementName}.html`,`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${parsedElementData.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${parsedElementData.elementName}</h1>
  <h2>H</h2>
  <h3>Atomic number ${parsedElementData.elementAtomicNumber}</h3>
  <p>${parsedElementData.elementName} is a chemical element with symbol "${parsedElementData.elementSymbol}" and atomic number ${parsedElementData.elementAtomicNumber}. It is a member of the noble gases and is also Superman's only known weakness, aside form Louis Lane of course.</p>
  <p><a href="/">back</a></p>
</body>
</html>`);

    fs.readFile(`./public/${req.url}` ||'', (err,content) => {
      if(err){
        fs.readFile(`./public/404.html`);
        res.end();
      }else{
        res.write(content);
        res.end();
      }
    });
  });
});

server.listen(PORT, ()=>{
  console.log("server is listening on: ", PORT);
});