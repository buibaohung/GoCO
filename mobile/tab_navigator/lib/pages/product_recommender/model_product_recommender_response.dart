import 'dart:convert';

ModelProductRecommender modelProductRecommenderFromJson(String str) => ModelProductRecommender.fromMap(json.decode(str));

String modelProductRecommenderToJson(ModelProductRecommender data) => json.encode(data.toMap());

class ModelProductRecommender {
  String id;
  String name;
  String avatar;
  String facilityId;
  int price;
  String description;
  DateTime createdAt;
  DateTime updatedAt;
  int rating;
  List<String> images;

  ModelProductRecommender({
    this.id,
    this.name,
    this.avatar,
    this.facilityId,
    this.price,
    this.description,
    this.createdAt,
    this.updatedAt,
    this.rating,
    this.images,
  });

  factory ModelProductRecommender.fromMap(Map<String, dynamic> json) => ModelProductRecommender(
    id: json["id"] == null ? null : json["id"],
    name: json["name"] == null ? null : json["name"],
    avatar: json["avatar"] == null ? null : json["avatar"],
    facilityId: json["facility_id"] == null ? null : json["facility_id"],
    price: json["price"] == null ? null : json["price"],
    description: json["description"] == null ? null : json["description"],
    createdAt: json["created_at"] == null ? null : DateTime.parse(json["created_at"]),
    updatedAt: json["updated_at"] == null ? null : DateTime.parse(json["updated_at"]),
    rating: json["rating"] == null ? null : json["rating"],
    images: json["images"] == null ? null : List<String>.from(json["images"].map((x) => x)),
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
    "images": images == null ? null : List<dynamic>.from(images.map((x) => x)),
  };
}