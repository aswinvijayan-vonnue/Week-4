const navs = document.querySelectorAll("nav a");
console.log(navs);
function routePage() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  const page = urlParams.get("page") || "home";
  console.log(page);
  document.querySelector("#about-detail").classList.remove("active");
  document
    .querySelectorAll("section")
    .forEach((s) => s.classList.remove("active"));
  if (page.startsWith("about")) {
    const hasDetails = page.split("/").length > 1;
    if (hasDetails) {
      document.querySelector("#about-detail").classList.add("active");
      document.getElementById("about").classList.remove("active");
    } else {
      document.getElementById("about").classList.add("active");
    }
  } else if (page === "contact")
    document.getElementById("contact").classList.add("active");
  else if (page === "services")
    document.getElementById("service").classList.add("active");
  else document.getElementById("home").classList.add("active");
  navs.forEach((nav) => nav.classList.remove("active-nav"));
  const activeNav = document.querySelector(`nav a[data-page="${page}"]`);
  if (activeNav) activeNav.classList.add("active-nav");
  breadCrumb(window.location.search);
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    e.preventDefault();
    console.log("hlo", e.target);
    const url = event.target.getAttribute("href");
    history.pushState(null, "", url);
    routePage(e.target);
  }
});
window.addEventListener("popstate", routePage);
routePage();
document.querySelector(".search-but").addEventListener("click", () => {
  const searchVal = document.querySelector("#search").value.trim();
  console.log(searchVal);
  const url = new URL(window.location);
  url.searchParams.set("serviceType", searchVal);
  console.log(url);
  window.history.pushState({}, "", url);
  document.querySelector("#search").value = "";
});
function breadCrumb(urlSearchpara) {
  const params = new URLSearchParams(urlSearchpara);
  const page = params.get("page") || "home";
  const crumbs = page.split("/");
  console.log(crumbs);
  const mainUl = document.querySelector(".breadCrumb ul");
  mainUl.innerHTML = "";
  console.log(mainUl);
  let url = "clientRouter.html?page=";
  for (let item of crumbs) {
    url = url + item;
    const li = createLi(url, item);
    mainUl.append(li);
    url = url + "/";
  }
}
function createLi(url, page) {
  const li = document.createElement("li");
  const anchorTag = document.createElement("a");
  anchorTag.textContent = page;
  anchorTag.setAttribute("href", url);
  li.append(anchorTag);
  console.log(li);
  return li;
}
