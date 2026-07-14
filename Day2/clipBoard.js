const copyBut = document.querySelector(".copy-but");
const codeBlk = document.querySelector(".code-block");

function copyContent() {
  const textToCopy = codeBlk.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyBut.textContent = "Copied";
    })
    .catch((err) => console.error(err.message));
}
copyBut.addEventListener("click", copyContent);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
  if (!("Notification" in window)) {
    window.alert("Doesnt support notifications...");
  } else if (Notification.permission === "granted") {
    showNoti();
  } else if (
    Notification.permission === "denied" ||
    Notification.permission === "default"
  ) {
    console.log("here");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") showNoti();
    });
  }
});

function showNoti() {
  const noti = new Notification("success", {
    body: "Form submitted successfully",
  });
}

function fillLocation() {
  const location = document.getElementById("location");
  console.log(location);
  if (!navigator.geolocation) {
    console.log("Browser doesnt support Geolocation");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async function (pos) {
      console.log(pos);
      const lati = pos.coords.latitude;
      const longi = pos.coords.longitude;
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lati}&longitude=${longi}`,
        );
        // console.log(response);
        if (!response.ok) throw new Error("Http error");
        const data = await response.json();
        console.log(data.city);
        location.setAttribute("value", data.city);
      } catch (err) {
        console.log("Failed", err);
        throw err;
      }
    },
    function (err) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          console.log("User Denied permission");
          break;
        case err.POSITION_UNAVAILABLE:
          console.log("Location information is not available");
          break;
        case err.TIMEOUT:
          console.log("Timeout");
          break;
        default:
          console.log("Some error occured");
          break;
      }
    },
  );
}
window.addEventListener("DOMContentLoaded", fillLocation);

document.querySelector(".share-button").addEventListener("click", async () => {
  const data = {
    title: "Page",
    url: window.location.href,
  };
//   console.log(navigation.share);
  if (navigator.share) {
    try {
      await navigator.share(data);
      console.log("Shared successfully");
    } catch (error) {
      console.error(error);
    }
  } else {
    navigator.clipboard
      .writeText(data.url)
      .then(() => {
        console.log("copied: ",data.url);
      })
      .catch((err) => console.error(err.message));
  }
});
