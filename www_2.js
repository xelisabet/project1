const http = require("http");
//lisame uue päringu URL-i parsimiseks
const url = require("url");
//lisame mooduli failitee kasutamiseks
const path = require("path");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageBegin = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Elisabet Peterson, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '<h1>Elisabet Peterson, veebiprogrammeerimine</h1><p>See leht on tehtud <a href="https://www.tlu.ee/dt">Tallinna Ülikooli</a> veebiprogrammeerimise kursusel ja ei sisalda mõistliku sisu.</p><p>Väike muudatus:). Ma olen pärit Tartust ja armastan kasse!</p><hr>';
const pageBanner = '<img src="vp_banner_2025_ID.jpg" alt="kursuse bänner">';
const pageEnd = '</body></html>';

http.createServer(function(req, res){
	console.log("Päring: " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("parsituna: " + currentUrl.pathname);
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageBegin);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
		res.write(pageEnd);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageBegin);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
				res.write('<p>Vaata valikut <a href="/vanasonad">vanasõnadest</a>.</p>');
				res.write(pageEnd);
				return res.end();
			} else {
				let oldWisdomList = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < oldWisdomList.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageBegin);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageEnd);
				return res.end();
			}
		});
	}
	else if(currentUrl.pathname === "/hobid"){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageBegin);
	res.write(pageBanner);
	res.write(pageBody);
	res.write("\n\t<h2>Minu hobid</h2>");
	res.write('<ul>');
	res.write('<li><a href="https://www.goodreads.com/">Raamatud ja lugemine</a></li>');
	res.write('<li><a href="https://www.strava.com/">Jooksmine ja sport</a></li>');
	res.write('</ul>');
	res.write('<img src="hobid.jpg" alt="Minu hobiga seotud pilt" style="max-width:400px;">');
	res.write(pageEnd);
	return res.end();
}

	else id(currentUrl.pathname === "/vp_banner_2025_ID.jpg"){
		//liidame muidu veebiserverile kättesaamatu kataloogi "images" meie veebi failiteega
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			} 
			else {
				res.writeHead(200, {"Content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	
	else {
		res.end("Viga 404, ei leia sellist veebilehte");
	}

}).listen(5223);
