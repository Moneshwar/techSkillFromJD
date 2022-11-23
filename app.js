const express=require("express");
const bodyParser=require("body-parser");
const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/userModules/tokenizer.js");
const skillCheck=require(__dirname+"/userModules/skillsChecking.js");
const app=express();
var LinkCount=0;
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
var url="https://www.amazon.jobs/en/jobs/2302330/software-development-engineer";
var map={};
app.get("/",function(req,res)
{
  var ans=[];
  var skillsCur=[];
  var receivedText;
    request(url,function(err,res,body)
    {
      LinkCount+=1;
      if(err)
      {
        console.log(err);
      }
      else{
        var receivedTextCopy=[];
        var root = HTMLParser.parse(body);
        var JD=root.getElementById('job-detail').querySelector('div.content');
        receivedText=JD.text;
        receivedText=token.tokenizer(receivedText);
        receivedTextCopy=receivedText.split(' ');
        receivedTextCopy=[...new Set(receivedTextCopy)];
        var obj=skillCheck.skillsChecking(receivedTextCopy,map);
        ans=obj.top;
        skillsCur=obj.curJob;
        print();
      }

    });
    function print()
    {
      res.render("index",{top:ans,skills:skillsCur,jdCurJob:receivedText,LinkCounts:LinkCount});
    }
});
app.post('/',function(req,res)
{
  url=req.body.enteredItem;
  res.redirect('/');
})
app.listen(3000,function()
{
  console.log("Port started at 3000");
});
