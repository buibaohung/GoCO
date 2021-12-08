import 'dart:convert';

ListRecentlyProduct listRecentlyProductFromJson(String str) => ListRecentlyProduct.fromMap(json.decode(str));

String listRecentlyProductToJson(ListRecentlyProduct data) => json.encode(data.toMap());

class ListRecentlyProduct {
  List<RecentlyProduct> recentlyProduct;

  ListRecentlyProduct({
    this.recentlyProduct,
  });

  factory ListRecentlyProduct.fromMap(Map<String, dynamic> json) => ListRecentlyProduct(
    recentlyProduct: json["RecentlyProduct"] == null ? null : List<RecentlyProduct>.from(json["RecentlyProduct"].map((x) => RecentlyProduct.fromMap(x))),
  );

  Map<String, dynamic> toMap() => {
    "RecentlyProduct": recentlyProduct == null ? null : List<dynamic>.from(recentlyProduct.map((x) => x.toMap())),
  };
}

class RecentlyProduct {
  String id;
  String name;
  int price;
  int rating;
  String url;

  RecentlyProduct({
    this.id,
    this.name,
    this.price,
    this.rating,
    this.url,
  });

  factory RecentlyProduct.fromMap(Map<String, dynamic> json) => RecentlyProduct(
    id: json["id"] == null ? null : json["id"],
    name: json["name"] == null ? null : json["name"],
    price: json["price"] == null ? null : json["price"],
    rating: json["rating"] == null ? null : json["rating"],
    url: json["url"] == null ? null : json["url"],
  );

  Map<String, dynamic> toMap() => {
    "id": id == null ? null : id,
    "name": name == null ? null : name,
    "price": price == null ? null : price,
    "rating": rating == null ? null : rating,
    "url": url == null ? null : url,
  };
}