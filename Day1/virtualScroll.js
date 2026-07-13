const arr = [];
for (let i = 1; i <= 10000; i++) {
  let item = {
    id: i,
    title: `Title ${i}`,
    description: `This is the description for item ${i}`,
  };
  arr.push(item);
}
let scrollArea = document.querySelector(".scroll-area");
scrollArea.style.height = "30000px";
console.log(arr.length);
const container = document.querySelector(".container");
const visibleArea = document.querySelector(".visible-section");
const viewPortHeight = visibleArea.clientHeight;
const itemCount = Math.floor(viewPortHeight / 216);
console.log(itemCount);

function createCard(title, description) {
  const div = document.createElement("div");
  const h2tag = document.createElement("h2");
  const ptag = document.createElement("p");
  h2tag.textContent = title;
  ptag.textContent = description;
  div.className = "card";
  div.append(h2tag, ptag);
  console.log(div);
  return div;
}
function render(startIdx, endIdx) {
  container.innerHTML = "";
  for (let i = startIdx; i <= endIdx; i++) {
    // if(rendered.has(i)) continue;
    let cardelement = createCard(arr[i].title, arr[i].description);
    container.append(cardelement);
  }
}
function init() {
  render(0, 4);
}
init();

visibleArea.addEventListener("scroll", (e) => {
  const card = document.querySelector(".card");
  const itemHeight = card ? card.offsetHeight + 16 : 200;
  const containerHeight = visibleArea.offsetHeight;
  let scrollTop = visibleArea.scrollTop;
  let startIndex = Math.floor(scrollTop / itemHeight);
  let visibleitems = Math.ceil(containerHeight / itemHeight);
  let position = itemHeight * startIndex;
  console.log("position is", position);
  container.style.transform = `translateY(${position}px)`;
  console.log("items:", visibleitems);
  console.log(arr.slice(startIndex, startIndex + visibleitems));
  let endIndex = startIndex + visibleitems + 10;
  console.log(`startIndex is ${startIndex} and endIndex is ${endIndex}`);
  render(startIndex, endIndex);
});
