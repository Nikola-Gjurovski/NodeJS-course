const fs=require('fs');
const http=require('http');
const url=require('url');
const json=fs.readFileSync("./dev-data/data.json","utf-8");
const data=JSON.parse(json);
const overview=fs.readFileSync('./templates/overview.html','utf-8');
const product=fs.readFileSync('./templates/product.html','utf-8');
const replaceHTML=require('./module/replace.js');
const server=http.createServer((req,res)=>{
  const{query,pathname:path}=url.parse(req.url,true);
  if(path==="/"|| path==='/overview'){
    let output="";
    data.forEach( items=>{
      if(items.organic){
      output+=`<figure class="card">
      <div class="card__emoji">${items.image}</div>
      <div class="card__title-box">
        <h2 class="card__title">${items.productName}</h2>
      </div>
  
      <div class="card__details">
        <div class="card__detail-box not-organic">
            <h6 class="card__detail card__detail--organic">Organic!</h6>
        </div>
  
        <div class="card__detail-box">
          <h6 class="card__detail">${items.quantity} per 📦</h6>
        </div>
          
        <div class="card__detail-box">
          <h6 class="card__detail card__detail--price">${items.price}€</h6>
        </div>
      </div>
  
      <a class="card__link" href="/product?id=${items.id}">
        <span>Detail <i class="emoji-right">👉</i></span>
      </a>
    </figure>`
      }
      else{
        output+=`<figure class="card">
      <div class="card__emoji">${items.image}</div>
      <div class="card__title-box">
        <h2 class="card__title">${items.productName}</h2>
      </div>
  
      <div class="card__details">
        <div class="card__detail-box">
            <h6 class="card__detail card__detail--organic">Organic!</h6>
        </div>
  
        <div class="card__detail-box">
          <h6 class="card__detail">${items.quantity} per 📦</h6>
        </div>
          
        <div class="card__detail-box">
          <h6 class="card__detail card__detail--price">${items.price}€</h6>
        </div>
      </div>
  
      <a class="card__link" href="/product?id=${items.id}">
        <span>Detail <i class="emoji-right">👉</i></span>
      </a>
    </figure>`
      }
      
    });
    const neww=overview.replace('{%PRODUCT_CARDS%}',output);
  res.end(neww);
  }
  else if(path==='/product'){
    const fruit=data[query.id];
    const output=replaceHTML(product,fruit);

    res.end(output);
 
  }
  else if(path==='/api'){
    console.log(data);
    res.writeHead(200,{"Content-type":"application/json"});
    res.end(json);
  }
  else{
    res.writeHead(400,{"Content-type":"text/html"});
    res.end("<h1>Page not found</h1>");
  }
})
server.listen(8000,'127.0.0.1',()=>{
  console.log("you are in server with 8000 port");
});