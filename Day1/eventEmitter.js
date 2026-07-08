class EventEmitter {
  constructor() {
    this.events = [];
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((fn) => fn !== listener);
  }
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(...args));
    if(this.events['*'])
        this.events['*'].forEach((listener)=>listener(...args));
  }
  once(event, listener) {
    const onceFunction = (...args) => {
      listener(...args);
      this.off(event, onceFunction);
    };
    this.on(event, onceFunction);
  }
}
const emitter = new EventEmitter();
const successMessage = (type) => console.log(type, ":Submitted successfully");
const errorMessage = () => console.log("There is an error");
emitter.on("formSubmit", successMessage);
emitter.on("formSubmit", errorMessage);
emitter.emit("formSubmit", "Success");
emitter.off("formSubmit", errorMessage);
emitter.emit("formSubmit", "Success");
console.log("Calling once method:");
const paymentMessage = () => console.log("Payment completed successfully");
emitter.once("click", paymentMessage);
emitter.emit("click");
emitter.emit("click"); //this will not invoke click event only trigger once
emitter.emit("formSubmit", "success1");

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }
  getUsers(){
    return this.users;
  }
  addUser(user) {
    this.users.push(user);
    this.emit("userAdded", user);
  }
  removeUser(id) {
    let isFound = this.users.find((u) => u.id == id);
    if (isFound) {
      this.users = this.users.filter((u) => u.id !== id);
      this.emit("userDeleted", isFound);
    }else{
        this.emit('userNotFound',id);
    }
  }
  updateUser(updatePara) {
    let isFound = this.users.find((user) => user.id == updatePara.id);
    if (isFound) {
      this.users = this.users.map((u) => {
        if (u.id == updatePara.id) {
          return { ...u, ...updatePara };
        }
        return u;
      });
      this.emit("userUpdated", updatePara.id);
    } else {
      this.emit("userNotFound", updatePara.id);
    }
  }
}

const addedMessage = (user) => console.log("Successfully added ", user);
const deletedMessage = (user) => console.log("deleted successfully", user);
const updatedMessage = (user) => console.log("updated successfully", user);
const notFoundMessage = (id) => console.log("Cannot find user with id: ", id);
const store = new UserStore();
const getUsers=()=>console.log("Users",store.getUsers());
store.on("userAdded", addedMessage);
store.on("userDeleted", deletedMessage);
store.on("userUpdated", updatedMessage);
store.on("userNotFound", notFoundMessage);
store.on('*',getUsers);
const user1 = { id: 101, name: "Akshay", department: "CSE" };
const user2 = { id: 102, name: "Amal", department: "ECE" };
const user3 = { id: 103, name: "Liya", department: "CSE" };
const update1 = { id: 101, department: "EEE" };
const update = { id: 104, department: "EEE" };
store.addUser(user1);
store.addUser(user2);
store.addUser(user3);
// console.log("Users",store.getUsers());
store.updateUser(update1);
store.updateUser(update);
// console.log("Users",store.getUsers());
store.removeUser(102);
store.removeUser(106);
// console.log("Users",store.getUsers());