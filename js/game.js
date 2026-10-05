const images=[
{name:"Montaña",src:"assets/montana.svg"},{name:"Bosque",src:"assets/bosque.svg"},{name:"Ciudad",src:"assets/ciudad.svg"},
{name:"Espacio",src:"assets/espacio.svg"},{name:"Mar",src:"assets/mar.svg"},{name:"Desierto",src:"assets/desierto.svg"}];
const levels=[{filter:"grayscale(1)"},{filter:"brightness(.7)"},{filter:"invert(1)"}];
let level=0,image,rotations=[],fixed=[],seconds=0,timerId,started=false;
const $=id=>document.getElementById(id);
$("instructionsBtn").onclick=()=>$("instructions").showModal();
$("closeInstructions").onclick=()=>$("instructions").close();
$("startBtn").onclick=()=>startGame();
$("menuBtn").onclick=showMenu;$("resultMenuBtn").onclick=showMenu;$("nextBtn").onclick=()=>{level++;startGame()};
$("helpBtn").onclick=()=>{
if(!started)return;
const available=rotations.map((_,i)=>i).filter(i=>!fixed.includes(i));if(!available.length)return;
const i=available[Math.floor(Math.random()*available.length)];rotations[i]=0;fixed.push(i);seconds+=5;render();checkWin();
};
function startGame(){
if(level>=levels.length)level=0;
image=images[Math.floor(Math.random()*images.length)];rotations=[1,2,3,1].sort(()=>Math.random()-.5);fixed=[];seconds=0;started=true;
$("intro").classList.add("hidden");$("result").classList.add("hidden");$("game").classList.remove("hidden");
$("levelText").textContent=(level+1)+" / "+levels.length;$("imageName").textContent=image.name;
clearInterval(timerId);timerId=setInterval(()=>{seconds++;updateTimer()},1000);render();updateTimer();
}
function updateTimer(){const m=String(Math.floor(seconds/60)).padStart(2,"0"),s=String(seconds%60).padStart(2,"0");$("timer").textContent=m+":"+s}
function render(){
const board=$("board");board.innerHTML="";
rotations.forEach((rotation,i)=>{
const piece=document.createElement("div");piece.className="piece";piece.style.backgroundImage="url('"+image.src+"')";piece.style.transform="rotate("+rotation*90+"deg)";piece.style.filter=levels[level].filter;
if(fixed.includes(i)){piece.style.filter="none";piece.style.cursor="default";piece.title="Pieza fija por ayudita"}
piece.addEventListener("click",()=>{if(fixed.includes(i))return;rotations[i]=(rotations[i]+3)%4;render();checkWin()});
piece.addEventListener("contextmenu",e=>{e.preventDefault();if(fixed.includes(i))return;rotations[i]=(rotations[i]+1)%4;render();checkWin()});
board.appendChild(piece);
});
}
function checkWin(){
if(rotations.every(r=>r===0)){clearInterval(timerId);started=false;$("finalTime").textContent=$("timer").textContent;$("game").classList.add("hidden");$("result").classList.remove("hidden");$("nextBtn").textContent=level===levels.length-1?"Jugar de nuevo":"Siguiente nivel"}
}
function showMenu(){clearInterval(timerId);started=false;$("game").classList.add("hidden");$("result").classList.add("hidden");$("intro").classList.remove("hidden");level=0}
