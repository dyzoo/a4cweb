const fs = require('fs');
const path = require('path');
const files = [
  'app/api/volunteer/route.ts',
  'app/api/admin/volunteers/route.ts',
  'app/api/admin/volunteers/[id]/route.ts',
  'app/api/admin/volunteers/[id]/cv/route.ts',
  'app/api/admin/stats/route.ts'
];
for (const f of files) {
  const p = path.join('E:\\a4cweb', f);
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes("mongoose/node_modules/mongodb")) {
    c = c.replace(/(import mongoose[^\n]+;\n)/, "$1import * as mongo from 'mongoose/node_modules/mongodb';\n");
  }
  c = c.replace(/new mongoose\.mongo\.GridFSBucket/g, 'new mongo.GridFSBucket');
  c = c.replace(/\bGridFSBucket\b/g, 'mongo.GridFSBucket');
  c = c.replace(/\bObjectId\b/g, 'mongo.ObjectId');
  c = c.replace(/(import \* as mongo from 'mongoose\/node_modules\/mongodb';\n){2,}/g, "import * as mongo from 'mongoose/node_modules/mongodb';\n");
  fs.writeFileSync(p, c);
  console.log('done', f);
}
