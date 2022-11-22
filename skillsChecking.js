module.exports.skillsChecking=function(receivedTextCopy)
{
  const skill=require(__dirname+"/data/skillList.js");
  var map={};
  const skillsList=skill.skillList();
  //console.log(receivedTextCopy);
  skillsList.forEach(function(item){
    var count=0;
    receivedTextCopy.forEach(function(data){
      if(data.toLowerCase()==item.toLowerCase()){
        count=count+1;
      }
    });
    if(count>0){
          var temp=item.toLowerCase();
          var x=0;
          if(temp in map)
            {
              x=map[temp];
            }
          map[temp]=count+x;
    }
  });
  keysSorted = Object.keys(map).sort(function(a,b){return map[b]-map[a]})
  //Top 10 Most needed skills
  for(i=0;i<10;i++)
  {
    console.log(keysSorted[i]);
  }
}
