module.exports.skillsChecking=function(receivedTextCopy,map,flag){
  const skill=require(__dirname+"/../data/skillList.js");
  const skillsList=skill.skillList();
  var skillsForThisJob=[];
  skillsList.forEach(function(item){
    var count=0;
    receivedTextCopy.forEach(function(data){
      if(data.toLowerCase()==item.toLowerCase()){
        count=count+1;
      }
    });
    if(count>0){
      skillsForThisJob.push(item);
          var temp=item.toLowerCase();
          var x=0;
          if(temp in map){
              x=map[temp];
            }
            if(flag){
              map[temp]=count+x;
            }

    }
  });
  keysSorted = Object.keys(map).sort(function(a,b){return map[b]-map[a]})
  //Top 10 Most needed skills
  var ans=[];
  for(i=0;i<10 && i<keysSorted.length;i++){
    ans.push(keysSorted[i]);
  }
  var obj={
    top:ans,
    curJob:skillsForThisJob,
  }
  return obj;
}
