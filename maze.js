

function newMaze(){
var m=document.getElementById("rows").value;
var n=document.getElementById("cols").value;

var boxW=8,lineW=2;

var c = document.getElementById("canvas");
c.width=(n*(boxW+lineW))+2*(boxW+lineW)+lineW;
c.height=(m*(boxW+lineW))+2*(boxW+lineW)+lineW;
var ctx = c.getContext("2d");
ctx.fillStyle = "rgb(0,0,255)";

//26 2

for(var i=0;i<=n;i++)
{
    ctx.fillRect((i*(boxW+lineW))+(boxW+lineW),(boxW+lineW),lineW,((boxW+lineW)*m)+lineW);
}

for(var i=0;i<=m;i++)
{
    ctx.fillRect((boxW+lineW),(i*(boxW+lineW))+(boxW+lineW),(boxW+lineW)*n+lineW,lineW);
}

//i,j are line numbers
function removeRight(i,j)
{
    ctx.clearRect((j*(boxW+lineW))+(boxW+2*lineW),(i*(boxW+lineW))+(boxW+lineW),boxW,lineW);
}

function removeDown(i,j)
{
    ctx.clearRect((j*(boxW+lineW))+(boxW+lineW),(i*(boxW+lineW))+(boxW+2*lineW),lineW,boxW);
}



var visCount=1;


var dx=[-1,0,1,0];
var dy=[0,1,0,-1];
var limits={x:50,y:50};
function dfs(i,j,start,vis)
{
    if(visCount==limits.x*limits.y)return;
    var dir=[0,1,2,3];
    var r1=Math.floor(Math.random()*3);
    [dir[3],dir[r1]]=[dir[r1],dir[3]];
    if(r1==0)[dir[1],dir[2]]=[dir[1],dir[2]];
    if(r1==1)[dir[0],dir[2]]=[dir[2],dir[0]];
    if(r1==2)[dir[1],dir[0]]=[dir[0],dir[1]];
    for(var k=0;k<=3;k++)
    {
        var tx=i+dx[dir[k]],ty=j+dy[dir[k]];
        if(tx>=start.x && tx<m && ty>=start.y && ty<n && vis[(tx-start.x)*limits.y+(ty-start.y)]==false && tx<start.x+limits.x && ty<start.y+limits.y)
        {
            vis[(tx-start.x)*limits.y+(ty-start.y)]=true;
            visCount++;
            if(dir[k]==0)removeRight(i,j);
            if(dir[k]==1)removeDown(i,j+1);
            if(dir[k]==2)removeRight(i+1,j);
            if(dir[k]==3)removeDown(i,j);
            if(visCount==limits.x*limits.y)return;
            dfs(tx,ty,start,vis);
        }
    }
}

function onePiece()
{   
    var start={x:0,y:0};
    while(start.x<m && start.y<n)
    {
        var vis=[];
        for(var i=0;i<limits.x*limits.y;i++)vis[i]=false;
        vis[0]=true;
        visCount=1;
        dfs(start.x,start.y,start,vis);
        start.y+=limits.y;
        if(start.y>=n)
        {
            start.x+=limits.x;
            start.y=0;
        }
    }
    var col=limits.y,row=0;
    while(col<n)
    {
        while(row<m)
        {
            removeDown(row,col);
            row+=5;
        }
        row=0;
        col+=limits.y;
    }

    var col=0,row=limits.x;
    while(row<m)
    {
        while(col<n)
        {
            removeRight(row,col);
            col+=5;
        }
        col=0;
        row+=limits.x;
    }

}
onePiece();
//for(var i=0;i<m*n;i++)console.log(vis[i]);


}


newMaze();

var refreshBtn=document.getElementById("refreshBtn");
    refreshBtn.addEventListener("click",function(){
    newMaze();
});

var downloadBtn=document.getElementById("downloadBtn");
downloadBtn.addEventListener("click",function(){
    const a=document.createElement("a");
    document.body.appendChild(a);
    a.href=document.getElementById("canvas").toDataURL();
    a.download="maze.png";
    a.click();
    document.body.removeChild(a);
});

