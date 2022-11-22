const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/tokenizer.js");
const skillCheck=require(__dirname+"/skillsChecking.js");
url="https://www.amazon.jobs/en/jobs/2302330/software-development-engineer";
request(url,function(err,res,body)
{
  var receivedTextCopy=[];
  var root = HTMLParser.parse(body);
  var JD=root.getElementById('job-detail').querySelector('div.content');
  var receivedText=JD.text;
  receivedText=token.tokenizer(receivedText);
  receivedTextCopy=receivedText.split(' ');
  receivedTextCopy=[...new Set(receivedTextCopy)];
  skillCheck.skillsChecking(receivedTextCopy);
});
