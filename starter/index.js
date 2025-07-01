const fs = require("fs");
const http = require("http");
const path = require("path");

const slugify = require("slugify"); // slug is basically  just the last part of the url that contain a unique string that identifies the resource
// that the website is displaying

const url = require("url");
// const { text } = require("stream/consumers");

const replaceTemplate = require("./module/replaceTemplate"); // yong meaning ng . is the current location of the modules or yong point ng . natin is yong root file natin

/*
IDEA Learn How to Read Files
      NOTE: How to Read Files?
      TO be able to read Files We need to  call the FS Module or the File System  => require
*/

/*
IDEA Learn How to Read and Write Files
   NOTE: so onething that you have to remember na yong approach nato is synchronouse approach at iba pa yong 
   Asychrnouse.
*/
/*
   NOTE: this is the basic of reading files first ./ nag start sa root directory which is yong starter and then sunod yong file na txt 
   since don yong location ng text file natin and then yong name ng text file natin so sa situation natin ang name ng file natin is
   input.txt 

   Next na sisilat mo sa loob ng readFilesSync natin is yong UTF-& so napaka mandatory 
   para maiwasan natin yong tinatawag nilang buffer
*/
//NOTE: By doing this we will able to read the  value indext the txt
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;

/*
   THis how to Create a new file and write the text in it in Synchronouse way
   so as you can see
   1. First we need to call the FS Module or the File System  
   2. Second we Need to type where we going to put the file or type the file location
   3. Third we need to type the name of the file
   4. is we need to use the  ( , ) and then the value that we want to put in usually naka variable
         yong lalagay natin value which is yong textOut na yon is basically the text that we want to put in the file
 */
fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file Written");

/*
REVIEW: Blocking And Non-Blocking Asynchronous Nature Node of js
*/

/*
   How Synchronose works?
	If you remember the way that synchronous works is if the code encounter something it will wait to finish first
	Bago sya mag proceed.

	const fs = require("fs");
	const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
   const textOut = `This is what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;

	So In another idea synchronous  is a processed one after another line by line.

   So Here in out example is this code happened line by line , so basically we can say that  the synchronous is a blocking code.
   this turn into a big problem from us


   IDEA so what is the solution?
      Note -> By using the Asynchronous approach we can solve this problem simply because the Asynchronous is a non-blocking code
         Note -> meaning that the code will not wait for the previous code to finish before proceeding to the next line of code


 */
/*
   NOTE: Example code
  in our code example below we use the Asynchronous approach which accepts a call back fuunction
  so basically this will start reading the file, and after that it will immediately move on to the next statement natin 
  which is yong printiing to the console that string-reading file and then after the reading  
  the call  back function ay tatawagin then yong data na naka console .log will then be printed to the console natin \

  so logical ]
   after may dispaly ng reading data natin since na sa global sya sunod na mag didisplay yong data natin
   inthat way walang ngyari na blocking code
   .
 */
const Async = fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
    //  console.log(data);
});
// console.log("reading data");

/*
 Idea Reading the File in asynchronouse way 
 */

// Non-blocking , asynchronous

/*
  why ganito sya basically kaya ganito sya dahil sa under the hood ni javascript
  may pinapariority si javascrip tapos i chcheck ni call back function kung meron bang 
  laman yon kung meron uunahin i execute yong code na yon bago nya i execute yong code nya


      JavaScript Execution Priority (Event Loop Order)
      JavaScript runs in this priority order:
         Global (synchronous code) – runs first immediately.
         Microtasks – e.g., Promise.then, async/await.
         Macrotasks – e.g., setTimeout, setInterval, DOM events, traditional callbacks.


      so sa madalign salita since gumagamit tayo ng asychro after nya madaanan yong code na may asych
      mag poproceed lang uli sya i execute nya yong nasa baba ng hindi nag aantay matapos yong code natin
      sa asynch and only then when the file is completly read then yong asynch function natin don lang sya mag rurun
 */
/*
   anatomy of async file
 -> file , call back function , utf-8 , first parameter err, 2nd param data 
 -> just remember na palaging una si error
*/
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//     //  console.log(data);
// });
//
/*
 accessing the data  

 this is also call back hell!
//  */
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    //  console.log(data1);
    fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
        //   console.log(data2);

        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            // console.log(data3);

            fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
                //  console.log("your file has been written");
            });
        });
    });
});
// console.log("will read file!");

//REVIEW: Creating a webServer and  Basic Routing
/*
  this web server capable accepting request and  response to the request
  NOTE: to be able to do that we need to use the http or write http
 */

// Note: this is how to create server
/*
  The Responnse eto yong i sesend back natin sa mismong UI natin 
  or kay front end  
 */
/*
 Routing  
   first we need to type this on the top of the code 
   const url = require("url");


 */
//************************************************ */
/*
 We going to use the synchronouse code here
    why ? becuas the top level code only execute once right i the beginning

    remember the code na nasa outside ng call back function is only ever executed 
    onece na nag start na yong program natin 

    so hindi na mattern kung ba block yong execution since it only happned once
    so hindi mo dapat ipag alala kung yong code na yon i nag block since 
    naka top level namn sya which is execute once lang namn then hindi na sya mang yayari
 */
// response.end("API");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObj = JSON.parse(data); // this  convert our data into javasript json or object data  or javascript data
/*
 (err, data) => {
     this will convert our data.json into javascript
   
        to be able to send to our front end you have to write  this 
         console.log(productData);
      
    200 status code means okey
     response.writeHead(200, { "Content-type": "application/json" });
     response.end(data);
    }); 

*/

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs); // convert the character inttto lower case
// console.log(slugify("fresh-avocado", { lower: true }));

const server = http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true);

    //*Overview page
    if (pathname === "/" || pathname === "/overview") {
        response.writeHead(200, { "Content-type": "text/html" }); // pag mag reresponse ka ng html dapat yong Content Type os -> text/html
        // to be zble to add the value to our html we need to replace the the place holder na ginawa natin don sa mismong html
        const cardHtml = dataObj.map((dataObj) => replaceTemplate(tempCard, dataObj)).join("");

        /*
          we also replace thne tempOverview natin using the PRODUCT_CARDS 
          and the converted version of our dataObj natin na ni replace natin sa replace temp na naka convert sa string
         */
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
        response.end(output);

        // *Product page
    } else if (pathname === `/product`) {
        response.writeHead(200, { "Content-type": "text/html" });
        const product = dataObj[query.id]; // our query is object that why we need to do this
        // the tempProduct is basically the html content na ginawa natin or yong template while the product is the id
        const output = replaceTemplate(tempProduct, product);
        response.end(output);
        // *API
    } else if (pathname === "/api") {
        // what we send here is the writeHead kung anong klasing content yong pinasa natin
        response.writeHead(200, { "Content-type": "application/json" });
        // this will diplay in our web browser
        response.end(data);

        // !NOT FOUND
    } else {
        // so basically yong logic dito if the url does not exist to our server this code will execute
        // response writeHead this will return 404 sa console  natin
        response.writeHead(404, {
            /*
           `` using the is not allowed!
           -> '' <- use that!

           the content type is anong type nung nag display
           my-own-header -> can be use to send some metadata about sa response natin
          */
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        response.end("<h1>Page Not Found!</h1>");
    }
});

/*
   the 8000 is called port
 */
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to request on port 8000");
});
