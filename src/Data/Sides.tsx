import AsyncStorage from "@react-native-async-storage/async-storage";

interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
  type: string;
  quantity: number;
}
const sides: MyProduct[] = [
  {
    id: 1,
    name: "Garlic Bread",
    image:
      "https://img.freepik.com/free-photo/photo-garlic-bread-slice-isolated-white-background_125540-3899.jpg?t=st=1726420888~exp=1726424488~hmac=0e7428adb941812b4784ab7e9f5c2cfba5e0c5ee426e9015697bb2fc3d385a7e&w=996",
    price: 3.5,
    added: false,
    type: "Sides",
    quantity: 0,
  },
  {
    id: 2,
    name: "Cheese Sticks",
    image:
      "https://img.freepik.com/free-photo/cheese-sticks-batter-wooden-hemp_140725-6542.jpg?t=st=1726420956~exp=1726424556~hmac=15e8a5d05357c3e2ac946745ed4dcd5c10e29722cff219761492ee32807dfb52&w=360",
    price: 4.5,
    added: false,
    type: "Sides",
    quantity: 0,
  },
  {
    id: 3,
    name: "French Fries",
    image:
      "https://img.freepik.com/free-photo/crispy-french-fries-with-ketchup-mayonnaise_1150-26588.jpg?t=st=1726421089~exp=1726424689~hmac=3a4ef2add00a7f9e566256459508477733bd0dbd8dee99e6d14d359645c56132&w=996",
    price: 5.25,
    added: false,
    type: "Sides",
    quantity: 0,
  },
  {
    id: 4,
    name: "Onion Rings",
    image:
      "https://img.freepik.com/free-photo/fried-rings-with-sweet-chili-sauce_140725-6204.jpg?t=st=1726421152~exp=1726424752~hmac=76e74e73c84d611278de9fcc055bdaa4bd73fcc452734a1d6c097da6440879d1&w=740",
    price: 5.75,
    added: false,
    type: "Sides",
    quantity: 0,
  },
  {
    id: 5,
    name: "Chicken Nuggets",
    image:
      "https://img.freepik.com/free-photo/delicious-chicken-nuggets-ketchup-tomatoes-black-plates-dark-surface-with-free-space_179666-42459.jpg?t=st=1726421443~exp=1726425043~hmac=65ed5653a257ac0ff38fb42050b904a84189a0b2c95aff6e5b9cde7badb5ea70&w=996",
    price: 4.75,
    added: false,
    type: "Sides",
    quantity: 0,
  },
  {
    id: 6,
    name: "Caesar Salad",
    image:
      "https://img.freepik.com/free-photo/side-view-caesar-salad-with-fried-chicken_176474-2998.jpg?t=st=1726421516~exp=1726425116~hmac=9d360ac779f78d38a99e30a1a9d0957f5dbe95abd7e6aa8dea5aef8d8617727d&w=740",
    price: 3.75,
    added: false,
    type: "Sides",
    quantity: 0,
  },
];
AsyncStorage.getItem("Sides")
  .then((isSidesSet) => {
    if (!isSidesSet) {
      AsyncStorage.setItem("Sides", JSON.stringify(sides))
        .then(() => {
          console.log("Sides data initialized.");
        })
        .catch((error) => {
          console.error("Error setting Sides:", error);
        });
    } else {
      console.log("Sides data already exists.");
    }
  })
  .catch((error) => {
    console.error("Error retrieving Sides:", error);
  });
export default sides;
