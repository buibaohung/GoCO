import 'dart:convert';
import 'package:date_format/date_format.dart';
import 'package:json_annotation/json_annotation.dart';

ModelProduct modelProductFromJson(String str) =>
    ModelProduct.fromMap(json.decode(str));

String modelProductToJson(ModelProduct data) => json.encode(data.toMap());
const List<String> listImage = [
  'assets/images/place_holder.png',
  'assets/images/place_holder.png',
  'assets/images/place_holder.png'
];

@JsonSerializable(nullable: true)
class ModelProduct {
  String id;
  String name;
  String avatar;
  String facilityId;
  int price;
  int rating;
  String description;
  DateTime createdAt;
  DateTime updatedAt;
  List<String> images;

  ModelProduct({
    this.id,
    this.name,
    this.avatar,
    this.facilityId,
    this.price,
    this.description,
    this.createdAt,
    this.updatedAt,
    this.images,
    this.rating,
  });

  factory ModelProduct.fromMap(Map<String, dynamic> json) =>
      ModelProduct(
        id: json["id"] ?? null,
        name: json["name"] ?? null,
        avatar: json["avatar"] ?? null,
        facilityId: json["facility_id"] ?? null,
        price: json["price"] ?? null,
        description: json["description"] ?? null,
        createdAt: DateTime.parse(json["created_at"]) ?? null,
        updatedAt: DateTime.parse(json["updated_at"]) ?? null,
        images: List<String>.from(json["images"].map((x) => x)) ?? listImage,
        rating: json["rating"] ?? null
      );

  Map<String, dynamic> toMap() =>
      {
        "id": id ?? null,
        "name": name ?? null,
        "avatar": avatar ?? null,
        "facility_id": facilityId ?? null,
        "price": price ?? null,
        "description": description ?? null,
        "created_at": createdAt.toIso8601String() ?? null,
        "updated_at": updatedAt.toIso8601String() ?? null,
        "images": List<dynamic>.from(images.map((x) => x)) ?? null ,
        "rating": rating ?? null
      };
}
