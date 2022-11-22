const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const datafetch=require(__dirname+"/userModules/dataFetcher.js");
app.get("/",function(req,res)
{
  var ans=[];
  url="https://www.amazon.jobs/en/jobs/2302330/software-development-engineer";
  ans=datafetch.dataFetcher(url);
  ans.forEach(function(item)
  {
    console.log(item);
  })
  console.log(ans.length);
  res.send("Hello guys");
});
app.listen(3000,function()
{
  console.log("Port started at 3000");
});
