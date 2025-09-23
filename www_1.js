const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageBegin = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Elisabet Peterson, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '<h1>Elisabet Peterson, veebiprogrammeerimine</h1><p>See leht on tehtud <a href="https://www.tlu.ee/dt">Tallinna Ülikooli</a> veebiprogrammeerimise kursusel ja ei sisalda mõistliku sisu.</p><p>Väike muudatus:). Ma olen pärit Tartust ja armastan kasse!</p><hr>';
const pageEnd = '</body></html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageBegin);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
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
			res.write(pageBody);
			res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageEnd);
			return res.end();
		}
	});
}).listen(5223);
