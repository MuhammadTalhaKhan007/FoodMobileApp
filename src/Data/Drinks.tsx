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
const drinks: MyProduct[] = [
  {
    id: 1,
    name: "Lime Soda",
    image:
      "https://img.freepik.com/premium-photo/refreshing-green-can-with-lime-slices-ice_825767-56003.jpg?w=740",
    price: 2.0,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
  {
    id: 2,
    name: "Iced Tea",
    image:
      "https://img.freepik.com/premium-photo/delicious-iced-tea-mason-jar-white-background_641503-196867.jpg?w=996",
    price: 2.5,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
  {
    id: 3,
    name: "Bubble Tea",
    image:
      "https://img.freepik.com/free-photo/delicious-bubble-tea-drink-with-straw_23-2149870657.jpg?t=st=1726423245~exp=1726426845~hmac=6a884490829c5ff14e5c5c776cc4440f250db688f7fd91220a39a19d26c01c1b&w=360",
    price: 3.0,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
  {
    id: 4,
    name: "Coffee",
    image:
      "https://img.freepik.com/premium-photo/cup-coffee-with-smoke-coffee-beans-old-wooden-background_1102161-3097.jpg?w=740",
    price: 3.75,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
  {
    id: 5,
    name: "Green Tea",
    image:
      "https://img.freepik.com/premium-photo/white-tea-cup-white-background_1003619-5003.jpg?w=740",
    price: 1.75,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
  {
    id: 6,
    name: "Milkshake",
    image:
      "https://img.freepik.com/free-photo/front-view-milkshake-wih-pink-background_23-2148296055.jpg?t=st=1726423445~exp=1726427045~hmac=98d7fd5a7b721f7548c715d7c83d165ca751313f77ebf508cfc1578b95e891ce&w=360",
    price: 20.0,
    added: false,
    type: "Drinks",
    quantity: 0,
  },
];
AsyncStorage.getItem("Drinks")
  .then((isDrinksSet) => {
    if (!isDrinksSet) {
      AsyncStorage.setItem("Drinks", JSON.stringify(drinks))
        .then(() => {
          console.log("Drinks data initialized.");
        })
        .catch((error) => {
          console.error("Error setting Drinks:", error);
        });
    } else {
      console.log("Drinks data already exists.");
    }
  })
  .catch((error) => {
    console.error("Error retrieving Drinks:", error);
  });

export default drinks;
