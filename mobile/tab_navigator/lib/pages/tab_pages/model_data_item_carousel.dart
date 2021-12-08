class ItemDataCarousel {
  final String id;
  final String name;
  final int rating;
  final double price;
  final String image;

  const ItemDataCarousel(
      {this.id, this.name, this.rating, this.price, this.image});
}

const List<ItemDataCarousel> ListDataCarousel = [
  ItemDataCarousel(
    id: '35329861186753599',
    name: "Tomatoes",
    image: "assets/icons/ca_chua.jpg",
    rating: 4,
    price: 20000,
  ),
  ItemDataCarousel(
    id: '35330045585134656',
    name: "Potato",
    image: "assets/icons/image_potato.jpg",
    rating: 5,
    price: 10000,
  ),
  ItemDataCarousel(
    id: '35335494606787656',
    name: "Carrots",
    image: "assets/icons/image_carrots.jpg",
    rating: 3,
    price: 15000,
  ),
];

const List<ItemDataCarousel> ListDataRecommend = [
  ItemDataCarousel(
    name: "Green cabbage",
    image: "assets/icons/green_cabbage.jpeg",
    rating: 4,
    price: 6,
  ),
  ItemDataCarousel(
    name: "Green peas",
    image: "assets/icons/green_peas.jpeg",
    rating: 4,
    price: 9,
  ),
  ItemDataCarousel(
    name: "Green plant",
    image: "assets/icons/green_plant.jpeg",
    rating: 3,
    price: 21,
  ),
  ItemDataCarousel(
    name: "Pepper bells",
    image: "assets/icons/pepper_bells.jpeg",
    rating: 5,
    price: 3,
  ),
];
