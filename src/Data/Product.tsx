interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}
const pizza: MyProduct[] = [
  {
    id: 1,
    name: "Fajita",
    image:
      "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1060&t=st=1725779454~exp=1725780054~hmac=f3803f5db2c441313253fb049b602bc50426e57e978b3430cf2eacbd88f98064",
    price: 1200,
  },
  {
    id: 2,
    name: "Tikka",
    image:
      "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1060&t=st=1725779454~exp=1725780054~hmac=f3803f5db2c441313253fb049b602bc50426e57e978b3430cf2eacbd88f98064",
    price: 1100,
  },
];

export default pizza;
