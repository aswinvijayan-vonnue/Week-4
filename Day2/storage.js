const box = document.querySelector(".box");
const buttons = document.querySelectorAll("button");
const bgColor = localStorage.getItem("color");
if (bgColor) {
  box.style.backgroundColor = bgColor;
}
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    box.style.backgroundColor = button.getAttribute("value");
    localStorage.setItem("color", button.getAttribute("value"));
  });
});

class storageManager {
  get(key) {
    const val = sessionStorage.getItem(key);
    if (!val) return null;
    const value = JSON.parse(val);
    if (val.expiry < Date.now()) {
      console.log("expired:", key);
      this.delete(key);
      return null;
    }
    return value;
  }
  set(key, value, ttl = 10000) {
    const item = {
      value: value,
      expiry: Date.now() + ttl,
    };
    console.log("success");
    sessionStorage.setItem(key, JSON.stringify(item));
    return item;
  }
  delete(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
}

const strg = new storageManager();
// strg.set('customer1',"amal");

//======IndexedDB============//
let openRequest = indexedDB.open("store", 2);
openRequest.onerror = () => console.log("Error", openRequest.error);
openRequest.onupgradeneeded = () => {
  // console.log("here");
  let db = openRequest.result;
  if (!db.objectStoreNames.contains("students"))
    db.createObjectStore("students", { keyPath: "id" });
  // console.log(db.objectStoreNames);
};
openRequest.onsuccess = () => {
  // console.log("success");
  let db = openRequest.result;
  // console.log(db.objectStoreNames);
  let transaction = db.transaction("students", "readwrite");
  let studentsDB = transaction.objectStore("students");
  let student1 = {
    id: "207",
    name: "Liya",
    department: "ECE",
  };
  // addData(studentsDB,student1);
  // console.log();
  // getData(studentsDB,'208')
};

function addData(ref, data) {
  let req = ref.add(data);
  req.onsuccess = () => {
    console.log("Student added in the database", req.result);
  };
  req.onerror = () => console.log(req.error);
}
const getData = (ref, key) => {
  let res = ref.get(key);
  console.log(res);
  res.onsuccess = () => {
    console.log(res.result);
  };
  res.onerror = () => {
    console.log(res.error);
  };
};
