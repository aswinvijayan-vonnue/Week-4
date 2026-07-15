const items = Array.from({ length: 1000 }, (_, index) => `Item: ${index + 1}`);
function render() {
  const div = document.createElement("div");
  div.textContent = "newly created div";
  return div;
}
const domContainer = document.querySelector(".domContainer");
const domStart = performance.now();
for (let i = 0; i < 1000; i++) {
  const div = render();
  domContainer.append(div);
}

requestAnimationFrame(() => {
  const domEnd = performance.now();
  console.log("Time taken for 1000 items rendering : ", domEnd - domStart);
});

setTimeout(()=>{
    domContainer.style.display="none";
},2000); //to trigger layout shift and CLS will work

const scrollArea = document.querySelector(".scroll-area");
scrollArea.style.height = "30000px";
const container = document.querySelector(".container");
const visibleArea = document.querySelector(".visible-section");
const viewPortHeight = visibleArea.clientHeight;
const itemCount = Math.floor(viewPortHeight / 216);
console.log(itemCount);

function createCard(val) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.textContent = val;
  div.className = "card";
  div.append(span);
  return div;
}
function renderVirtualScroll(startIdx, endIdx) {
  container.innerHTML = "";
  for (let i = startIdx; i <= endIdx; i++) {
    let cardElement = createCard(items[i]);
    container.append(cardElement);
  }
}

function init() {
  renderVirtualScroll(0, itemCount);
}
init();
let isScrolling = false;
visibleArea.addEventListener("scroll", (e) => {
  const card = document.querySelector(".card");
  const cardHeight = card ? card.offsetHeight + 16 : 200;
  const containerHeight = visibleArea.offsetHeight;
//   console.log("visible area is", containerHeight);
//   console.log("tp at", visibleArea.getBoundingClientRect().top);
  let scrollTop = visibleArea.scrollTop;
//   console.log("top", scrollTop);
  let start = Math.floor(scrollTop / cardHeight);
  let visibleItems = Math.ceil(containerHeight / cardHeight);
  let position = start * cardHeight;
  container.style.transform = `translateY(${position}px)`;
//   console.log(items.slice(start, start + visibleItems));
  let end = start + visibleItems;
  const virtualScrollStart = performance.now();
  renderVirtualScroll(start, end);
  requestAnimationFrame(() => {
    const virtualScrollEnd = performance.now();
    console.log("Rendering duration : ", virtualScrollEnd - virtualScrollStart);
  });
});

const lcpObserver=new PerformanceObserver((entryList)=>{
    const entries=entryList.getEntries();
    const latest=entries[entries.length-1];
    console.log("LCP: ",latest.startTime);
});
lcpObserver.observe({type: "largest-contentful-paint",buffered: true});

let clsVal=0;
const clsObserver=new PerformanceObserver((entryList)=>{
    const entries=entryList.getEntries();
    entries.forEach((entry)=>{
        if(!entry.hadRecentInput){
            clsVal+=entry.value;

        }
    })
    console.log("CLS value is:",clsVal);
})
clsObserver.observe({type: "layout-shift",buffered: true});