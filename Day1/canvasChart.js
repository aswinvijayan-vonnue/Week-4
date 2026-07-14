const dataBase = [
  { month: "Jan", sales: 100 },
  { month: "Feb", sales: 450 },
  { month: "Mar", sales: 250 },
  { month: "Apr", sales: 600 },
  { month: "May", sales: 500 },
  { month: "Jun", sales: 550 },
  { month: "Jul", sales: 450 },
  { month: "Aug", sales: 100 },
  { month: "Sep", sales: 200 },
  { month: "Oct", sales: 250 },
  { month: "Nov", sales: 200 },
  { month: "Dec", sales: 300 },
];
const maxVal = Math.max(...dataBase.map((item) => item.sales));
const barWidth = 35;

const chart = document.getElementById("chart");
// chart.style.paddingTop="40px";
const topPadding = 40;
console.log(chart);
const ctx = chart.getContext("2d");
const chartWidth = chart.width - 120;
const chartHeight = chart.height - 80;
console.log(chartWidth);
ctx.strokeStyle = "#2c2b2b";

let drawnGrid = new Set();
function drawGrid(fromX, fromY, toX, toY) {
  if (drawnGrid.has(fromY)) {
    ctx.clearRect(fromX, fromY - 1, toX - fromX, 2);
  }
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.lineWidth = 1;
  ctx.stroke();
  drawnGrid.add(fromY);
}
function displayData(progress=1) {
  let xStart = 60;
  dataBase.forEach((data) => {
    let barHeight = ((data.sales / maxVal) * chartHeight)*progress;
    let yStart = chartHeight - barHeight + topPadding;
    const linearGradient = ctx.createLinearGradient(
      xStart,
      yStart,
      xStart,
      yStart + barHeight,
    );
    linearGradient.addColorStop(0, "rgb(242, 22, 22)");
    linearGradient.addColorStop(1, "rgb(243, 116, 116)");
    ctx.fillStyle = linearGradient;
    ctx.fillRect(xStart, yStart, barWidth, barHeight);
    drawGrid(45, yStart, xStart + barWidth, yStart);

    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText(
      data.month,
      xStart + barWidth / 2,
      chartHeight + topPadding + 10,
    );
    xStart = xStart + 2 * barWidth;
  });
}
// displayData();
function drawAxes() {
  ctx.strokeStyle = "#333"; 
  ctx.lineWidth = 2;    

  ctx.beginPath();
  ctx.moveTo(45, topPadding);
  ctx.lineTo(45, chartHeight + topPadding);
  ctx.lineTo(45 + chartWidth+60, chartHeight + topPadding);
  ctx.stroke();
}
// drawAxes();

function drawYLabel() {
  const ygap = chartHeight / 6;
  let valGap = maxVal / 6;
  console.log(valGap);
  ctx.fillStyle = "#0f0f0f";
  ctx.textBaseline = "middle";
  for (let i = 0; i < 7; i++) {
    let y = topPadding + i * ygap;
    let val = maxVal - i * valGap;
    console.log(`${y},${val}`);
    ctx.fillText(val, 30, y);
  }
}
// drawYLabel();

function animateBar(duration=1000){
    const start=performance.now();
    function animate(currentTime){
        if(!currentTime) currentTime=start;
        const elapsed=currentTime-start;
        const progress=Math.min(elapsed/duration,1);
        const easout=t=>t*(2-t);
        const easedP=easout(progress);
        drawnGrid.clear(); 
        ctx.clearRect(0,0,900,600);
        drawAxes();
        drawYLabel();
        displayData(easedP);
        if(progress<1){
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}
animateBar();

let hoveredBar=null;
const tooltip=document.querySelector('.toolTip');
const canvas=document.querySelector('canvas');
canvas.addEventListener('mousemove',(event)=>{
  console.log(canvas.getBoundingClientRect());
  const singleBar=canvas.getBoundingClientRect();
  const mouseX=event.clientX-singleBar.left;
  console.log("mouseX",mouseX);
  const mouseY=event.clientY-singleBar.top;
  const barVal=barValue(mouseX,mouseY);
  console.log("barval",barVal);
  if(barVal){
    tooltip.textContent=barVal.value;
    tooltip.style.top=mouseY+40+"px";
    tooltip.style.left=mouseX+140+"px";
    tooltip.style.display="block";
  
  }else{
    tooltip.textContent="";
    tooltip.style.display="none";
  }
})


function barValue(mouseX,mouseY){
    let xStart=60;
    for(let [index,data] of dataBase.entries()){
      let barHeight = (data.sales / maxVal) * chartHeight;
      let yStart = chartHeight - barHeight + topPadding;
      if(mouseX>=xStart && mouseX<=xStart+barWidth && mouseY>=yStart && mouseY<= yStart + barHeight){
        let val={index:index,value:data.sales};
        console.log(val);
        return {index:index,value:data.sales};
      }
      xStart = xStart + 2 * barWidth;

    }
    return null;
    
  }

document.querySelector('button').addEventListener('click',()=>{
  console.log("here");
  const url=canvas.toDataURL("image/png");
  const anchor=document.createElement("a");
  anchor.setAttribute("href",url);
  anchor.download="chart.png";
  anchor.click();
})