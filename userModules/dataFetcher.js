const request=require('request');
const HTMLParser = require('node-html-parser');
const token=require(__dirname+"/tokenizer.js");
const skillCheck=require(__dirname+"/skillsChecking.js");
module.exports.dataFetcher=function(url)
{
  function doYourThing(callback)
  {
    request(url,function(err,res,body)
    {
      var ans=[];
      var receivedTextCopy=[];
      var root = HTMLParser.parse(body);
      var JD=root.getElementById('job-detail').querySelector('div.content');
      var receivedText=JD.text;
      receivedText=token.tokenizer(receivedText);
      receivedTextCopy=receivedText.split(' ');
      receivedTextCopy=[...new Set(receivedTextCopy)];
      ans=skillCheck.skillsChecking(receivedTextCopy);
      callback(null,ans);
    });
  }

    function main(){
  doYourThing(function(err, results){
    return results;
  });
};

return main();
}
