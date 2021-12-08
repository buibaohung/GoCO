import 'dart:convert';

ModelResponseRecommend modelResponseRecommendFromJson(String str) => ModelResponseRecommend.fromMap(json.decode(str));

String modelResponseRecommendToJson(ModelResponseRecommend data) => json.encode(data.toMap());

class ModelResponseRecommend {
  List<Product> products;

  ModelResponseRecommend({
    this.products,
  });

  factory ModelResponseRecommend.fromMap(Map<String, dynamic> json) => ModelResponseRecommend(
    products: json["products"] == null ? null : List<Product>.from(json["products"].map((x) => Product.fromMap(x))),
  );

  Map<String, dynamic> toMap() => {
    "products": products == null ? null : List<dynamic>.from(products.map((x) => x.toMap())),
  };
}

class Product {
  String id;
  String name;
  String avatar;
  String facilityId;
  int price;
  String description;
  DateTime createdAt;
  DateTime updatedAt;
  double rating;

  Product({
    this.id,
    this.name,
    this.avatar,
    this.facilityId,
    this.price,
    this.description,
    this.createdAt,
    this.updatedAt,
    this.rating,
  });

  factory Product.fromMap(Map<String, dynamic> json) => Product(
    id: json["id"] == null ? null : json["id"],
    name: json["name"] == null ? null : json["name"],
    avatar: json["avatar"] == null ? null : json["avatar"],
    facilityId: json["facility_id"] == null ? null : json["facility_id"],
    price: json["price"] == null ? null : json["price"],
    description: json["description"] == null ? null : json["description"],
    createdAt: json["created_at"] == null ? null : DateTime.parse(json["created_at"]),
    updatedAt: json["updated_at"] == null ? null : DateTime.parse(json["updated_at"]),
    rating: json["rating"] == null ? null : json["rating"].toDouble(),
  );

  Map<String, dynamic> toMap() => {
    "id": id == null ? null : id,
    "name": name == null ? null : name,
    "avatar": avatar == null ? null : avatar,
    "facility_id": facilityId == null ? null : facilityId,
    "price": price == null ? null : price,
    "description": description == null ? null : description,
    "created_at": createdAt == null ? null : createdAt.toIso8601String(),
    "updated_at": updatedAt == null ? null : updatedAt.toIso8601String(),
    "rating": rating == null ? null : rating,
  };
}
