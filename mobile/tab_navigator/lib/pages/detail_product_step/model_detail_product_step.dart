
class model_product_step_data {
  final String id;
  final String time;
  final String origin;
  final String location_at;
  final String owner;
  final List<String> images;

  const model_product_step_data(
      {this.id,
      this.time,
      this.origin,
      this.location_at,
      this.owner,
      this.images});
}

const model_data = model_product_step_data(
  id: "01",
  time: "Wednesday, October 9, 2019",
  location_at: "Family mart store",
  origin: "Jayce's farm",
  owner: "NKH",
  images: [
    "https://s3.amazonaws.com/cloud.scoutmob.com/hp/products/12369/product/Ashley_Field_2.jpg?1548268021",
    "http://tiennong.vn/uploads/images/che1.png",
    "https://st4.depositphotos.com/13194036/20420/i/1600/depositphotos_204206384-stock-photo-handsome-farmer-checking-harvest-clipboard.jpg"
  ],
);
