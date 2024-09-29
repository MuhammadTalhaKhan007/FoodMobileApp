interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
  type: string;
  quantity: number;
}
const meals: MyProduct[] = [
  {
    id: 1,
    name: "Steak",
    image:
      "https://img.freepik.com/free-photo/grilled-beef-steak-with-fries-grilled-tomato-pepper-sauces_140725-10545.jpg?t=st=1726416996~exp=1726420596~hmac=d09a08ba874397240d8dabb123ef4ecc027f242671ca10ec52b43159a3a8dd1d&w=996",
    price: 50.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
  {
    id: 2,
    name: "Pizza",
    image:
      "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=1060&t=st=1725779454~exp=1725780054~hmac=f3803f5db2c441313253fb049b602bc50426e57e978b3430cf2eacbd88f98064",
    price: 15.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
  {
    id: 3,
    name: "Pasta",
    image:
      "https://img.freepik.com/free-photo/stir-fried-macaroni-with-tomato-sauce-pork_1150-20198.jpg?t=st=1726417072~exp=1726420672~hmac=3d23c38fd4f975f58b8c1a3dd31ecf8665fa2eb5e495b79242c829bb325da6a3&w=996",
    price: 35.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
  {
    id: 4,
    name: "Burger",
    image:
      "https://img.freepik.com/free-photo/big-sandwich-hamburger-burger-with-beef-red-onion-tomato-fried-bacon_2829-5398.jpg?t=st=1726417612~exp=1726421212~hmac=ee630c4cb9faa4f326afb63cf045e61cfcaa770999cbe47a0eabf6704aaccb88&w=740",
    price: 25.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
  {
    id: 5,
    name: "Rice",
    image:
      "https://img.freepik.com/free-photo/appetizing-healthy-rice-with-vegetables-white-plate-wooden-table_2829-19773.jpg?t=st=1726418351~exp=1726421951~hmac=45d420b9f6382df10b32dd5172739ae519c1ed8e9a3fdde1741a0557785cacc0&w=900",
    price: 25.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
  {
    id: 6,
    name: "Sandwich",
    image:
      "https://img.freepik.com/free-photo/grilled-sandwich-with-bacon-fried-egg-tomato-lettuce-served-wooden-cutting-board_1150-42571.jpg?t=st=1726418432~exp=1726422032~hmac=803793c869fb90eae6bc5786ca8faeafdecab2c379ec722997b93bd729e5232a&w=996",
    price: 20.0,
    added: false,
    type: "Meals",
    quantity: 0,
  },
];

export default meals;
