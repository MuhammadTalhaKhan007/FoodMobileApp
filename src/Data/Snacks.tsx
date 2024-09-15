interface MyProduct {
  id: number;
  name: string;
  price: string;
  image: string;
}
const snacks: MyProduct[] = [
  {
    id: 1,
    name: "Nachos",
    image:
      "https://img.freepik.com/free-photo/mexican-nacho-chips-salsa-dip-bowl_2829-14452.jpg?t=st=1726422282~exp=1726425882~hmac=b7e45c3154c7a2a3b4f4d40c917ba75842c554ddc58eee2894814261f4ecd221&w=740",
    price: "$3.50",
  },
  {
    id: 2,
    name: "Pretzels",
    image:
      "https://img.freepik.com/free-photo/view-arrangement-with-pretzels_23-2148582608.jpg?t=st=1726422371~exp=1726425971~hmac=99354828b0a7a030a579120abbe2b089733a1615b673b9c0fa7f20ef56a1da3d&w=996",
    price: "$2.50",
  },
  {
    id: 3,
    name: "Popcorn",
    image:
      "https://img.freepik.com/free-photo/popcorn-box-filled-with-salty-fluffy-popcorns_23-2148188209.jpg?t=st=1726422410~exp=1726426010~hmac=6063016bf520c4170bbcec1d53c8f2a56d9661a632d9d45d25beabadec70dbd0&w=360",
    price: "$2.00",
  },
  {
    id: 4,
    name: "Chips & Salsa",
    image:
      "https://img.freepik.com/free-photo/tasty-crucnhy-potato-chips-with-sauce-white-background-high-quality-photo_114579-37979.jpg?t=st=1726422482~exp=1726426082~hmac=dfd10ee8284d03c9e70a2b623d7091b7b50c84fc379e14f98d0323155b073c91&w=996",
    price: "$3.00",
  },
  {
    id: 5,
    name: "Trail Mix",
    image:
      "https://img.freepik.com/free-photo/different-dried-fruits_144627-16146.jpg?t=st=1726422581~exp=1726426181~hmac=a436c4f3ab1379c055dcbea71597d35e27f2c0b2acfc6040aae5c5439aca0b87&w=826",
    price: "$2.75",
  },
  {
    id: 6,
    name: "Fruit Cups",
    image:
      "https://img.freepik.com/free-photo/glasses-with-ice-tea-with-mint-peach_23-2148550529.jpg?t=st=1726422692~exp=1726426292~hmac=3068d1d3d81544f227f67bf672bb5d7e2ef3d44c3881baeeaf91b380c7159a4f&w=740",
    price: "$3.75",
  },
];

export default snacks;
