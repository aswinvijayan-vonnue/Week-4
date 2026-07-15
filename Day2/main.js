if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {})
      .catch((err) => {
        console.log(err);
      });
  });
}

let installPrompt;
const installBut=document.querySelector('#install');
window.addEventListener('beforeinstallprompt',(event)=>{
  event.preventDefault();
  installPrompt=event;
  installBut.style.display="block";
});
installBut.addEventListener('click',async ()=>{
  if(!installPrompt) return;
  const res=await installPrompt.prompt();
  installPrompt=null;
  installBut.style.display="none";

})
