$files = @(
  "app/api/volunteer/route.ts",
  "app/api/admin/volunteers/route.ts",
  "app/api/admin/volunteers/[id]/route.ts",
  "app/api/admin/volunteers/[id]/cv/route.ts",
  "app/api/admin/stats/route.ts"
)
foreach($f in $files){
  $p = Join-Path "E:\a4cweb" $f
  if(Test-Path $p){
    $c = Get-Content $p -Raw
    if($c -notmatch "mongoose/node_modules/mongodb"){
      $c = $c -replace "(import mongoose from [^\r\n]+;)", '$1' + "`r`nimport * as mongo from 'mongoose/node_modules/mongodb';"
    }
    $c = $c -replace "new mongoose.mongo.GridFSBucket", "new mongo.GridFSBucket"
    $c = $c -replace "GridFSBucket", "mongo.GridFSBucket"
    $c = $c -replace "\bObjectId\b", "mongo.ObjectId"
    $c = $c -replace "(import \* as mongo from 'mongoose/node_modules/mongodb';[\r\n]+){2,}", "import * as mongo from 'mongoose/node_modules/mongodb';`r`n"
    Set-Content $p -Value $c -NoNewline -Encoding utf8
    Write-Output "updated $f"
  } else {
    Write-Output "missing $f"
  }
}
