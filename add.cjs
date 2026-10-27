const fs=require('fs');
const files=['app/api/admin/volunteers/[id]/cv/route.ts','app/api/admin/volunteers/[id]/route.ts'];
files.forEach(p=>{
  try{
    let c=fs.readFileSync(p,'utf8');
    c=c.replace(/new mongo\.mongoose\.mongo\.GridFSBucket/g,'new mongoose.mongo.GridFSBucket');
    c=c.replace(/new mongo\.GridFSBucket/g,'new mongoose.mongo.GridFSBucket');
    if(c.indexOf('ObjectId')===-1) c='import { ObjectId } from \"mongodb\";\n'+c;
    fs.writeFileSync(p,c);
    console.log('ok',p);
  }catch(e){console.log('err',p,e.message);}
});
