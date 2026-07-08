const CartModule = (function () {
  var items = [];
  return {
    addItem(item) {
      items.push(item);
    },
    removeItem(id) {
      items = items.filter((item) => item.id !== id);
    },
    updateQuantity(id, qty) {
      let item = items.find((item) => item.id == id);
      if (item) item.quantity = qty;
    },
    getItems() {
      return [...items];
    },
    getTotal() {
      return items.reduce((acc, item) => acc + item.value, 0);
    },
    clear() {
      items = [];
    }
  };
})();
const item1={id:101,name:'Sugar',quantity:20,value:200};
const item2={id:102,name:'Rice',quantity:10,value:100};
const item3={id:103,name:'Apple',quantity:40,value:50};
CartModule.addItem(item1);
CartModule.addItem(item2);
console.log(CartModule.getItems());
console.log("Total is",CartModule.getTotal());
CartModule.updateQuantity(102,40);
console.log(CartModule.getItems());
CartModule.removeItem(102);
CartModule.addItem(item3);
console.log(CartModule.getItems());
console.log(CartModule.items); //shows undefined
CartModule.clear();
console.log(CartModule.getItems());
// items.push(item1); //cannot mutate the array
