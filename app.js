const express=require("express");
const bodyParser=require("body-parser");
const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/userModules/tokenizer.js");
const skillCheck=require(__dirname+"/userModules/skillsChecking.js");
const app=express();
const PORT = process.env.PORT ||5000;
var LinkCount=0;
var urlCollection=[];
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
var url="";
var map={};
var jobTitle="";
app.get("/",function(req,res){
  var ans=[];
  var skillsCur=[];
  var receivedText;
  if(url.length==0){
    print();
  }
  else{
    request(url,function(err,res,body){

      var flag=0;
      if(err){
        console.log(err);
      }
      else{
        if(!urlCollection.includes(url)){
            LinkCount+=1;
            urlCollection.push(url);
            flag=1; //flag variable to prevent counting of same skils if we give the same url twice
        }
        var receivedTextCopy=[];
        var root = HTMLParser.parse(body);
        var JD=root.getElementById('job-detail').querySelector('div.content');
        jobTitle=(root.querySelector('h1.title')).text;
        receivedText=JD.text;
        receivedText=token.tokenizer(receivedText);
        receivedTextCopy=receivedText.split(' ');
        receivedTextCopy=[...new Set(receivedTextCopy)];
        var obj=skillCheck.skillsChecking(receivedTextCopy,map,flag);
        ans=obj.top;
        skillsCur=obj.curJob;
        print();
      }

    });

  }

    function print(){
      res.render("index",{top:ans,skills:skillsCur,jdCurJob:receivedText,LinkCounts:LinkCount,jobTitle:jobTitle});
    }
});
app.post('/',function(req,res){
  url=req.body.enteredItem;
  res.redirect('/');
})
app.listen(PORT,function(){
  console.log("Port started at ${PORT}");
});
