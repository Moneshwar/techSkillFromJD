const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/tokenizer.js");
url="https://www.amazon.jobs/en/jobs/2302224/senior-software-engineer-networking-project-kuiper-networking-and-isp-services";
request(url,function(err,res,body)
{
  var root = HTMLParser.parse(body);
  var JD=root.getElementById('job-detail').querySelector('div.content');
  var receivedText=JD.text;
  receivedText=token.tokenizer(receivedText);
  console.log(receivedText);
})
