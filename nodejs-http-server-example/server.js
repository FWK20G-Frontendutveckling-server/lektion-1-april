const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(); //Skapar vår server

//Server lyssnar på ett request och kör en funktion som tar två parametrar request och response
server.on('request', (request, response) => {
  console.log('Request url:', request.url); //Den efterfrågade url:en
  console.log('Request method:', request.method); //Vilken metod (GET, POST etc)
  // fs.readFile('index.html', 'utf8', (error, content) => {
  //   response.end(content);
  // });

  //Om den efterfrågade url:en är /(i detta fall localhost:8000) skicka tillbaka en index.html
  if (request.url === '/') {
    const file = fs.createReadStream('frontend/index.html');
    file.pipe(response);
  } else if (request.url === '/api/insults') {
    console.log('Inne här');
    const insults = fs.createReadStream('insults.json');
    insults.pipe(response);
  } else if (request.url === '/api/name') {
    /*
    Eftersom får server enbart agerar på url:er så kan vi egentligen
    skicka tillbaka vad vi vill
    */
    const obj = {
      name: 'Christoffer'
    }
    /*
    Här behöver vi köra JSON.stringify då vi enbart kan skicka tillbaka
    bytes eller strängar till en klient
    */
    response.end(JSON.stringify(obj));
  } else if (request.url === '/about') {
    const file = fs.createReadStream('frontend/about.html');
    file.pipe(response);
  } else {
    //Plocka ut enbart filnamn utan / innan så /style.css blir style.css
    const fileName = path.basename(request.url);
    const file = fs.createReadStream(`frontend/${fileName}`);

    //Om filen hittades och kan öppnas så triggas eventet open
    file.on('open', () => {
      file.pipe(response);
    });

    //Om filen inte hittades triggas error - event istället och nedan körs
    file.on('error', () => {
      response.end('Filen kunde inte hittas');
    })
  }
})

server.listen(8000);