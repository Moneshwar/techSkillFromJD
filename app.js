const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/tokenizer.js");
const skill=require(__dirname+"/skillList.js");
url="https://www.amazon.jobs/en/jobs/2302224/senior-software-engineer-networking-project-kuiper-networking-and-isp-services";
var receivedTextCopy=[];
request(url,function(err,res,body)
{
  var root = HTMLParser.parse(body);
  var JD=root.getElementById('job-detail').querySelector('div.content');
  var receivedText=JD.text;
  receivedText=token.tokenizer(receivedText);
  receivedTextCopy=receivedText.split(' ');
  console.log(receivedTextCopy);
  receivedTextCopy=[...new Set(receivedTextCopy)];
  Checking();
});

function Checking()
{
  const skillsList=skill.skillList();
  console.log(receivedTextCopy);
  skillsList.forEach(function(item){
    var count=0;
    receivedTextCopy.forEach(function(data){
      if(data==item){
        count=count+1;
      }
    });
    if(count>0){
      console.log(count);
      console.log(item);
    }
  });

}
