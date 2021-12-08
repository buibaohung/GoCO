import 'dart:convert';

ModelEventsProduct modelEventsProductFromJson(String str) => ModelEventsProduct.fromMap(json.decode(str));

String modelEventsProductToJson(ModelEventsProduct data) => json.encode(data.toMap());

class ModelEventsProduct {
  List<Event> events;

  ModelEventsProduct({
    this.events,
  });

  factory ModelEventsProduct.fromMap(Map<String, dynamic> json) => ModelEventsProduct(
    events: json["events"] == null ? null : List<Event>.from(json["events"].map((x) => Event.fromMap(x))),
  );

  Map<String, dynamic> toMap() => {
    "events": events == null ? null : List<dynamic>.from(events.map((x) => x.toMap())),
  };
}

class Event {
  String id;
  String productItemId;
  String name;
  DateTime createdAt;
  DateTime soldAt;
  String toProductItemId;
  String transactionId;
  List<Children> childrens;
  String fromFacilityId;
  String toFacilityId;
  String deliveredByFacilityId;
  String fromFacilityName;
  String toFacilityName;
  String deliveredByFacilityName;

  Event({
    this.id,
    this.productItemId,
    this.name,
    this.createdAt,
    this.soldAt,
    this.toProductItemId,
    this.childrens,
    this.fromFacilityId,
    this.toFacilityId,
    this.deliveredByFacilityId,
    this.fromFacilityName,
    this.toFacilityName,
    this.deliveredByFacilityName,
    this.transactionId,
  });

  factory Event.fromMap(Map<String, dynamic> json) => Event(
    id: json["id"] == null ? null : json["id"],
    productItemId: json["product_item_id"] == null ? null : json["product_item_id"],
    name: json["name"] == null ? null : json["name"],
    createdAt: json["created_at"] == null ? null : DateTime.parse(json["created_at"]),
    soldAt: json["sold_at"] == null ? null : DateTime.parse(json["sold_at"]),
    toProductItemId: json["to_product_item_id"] == null ? null : json["to_product_item_id"],
    childrens: json["childrens"] == null ? null : List<Children>.from(json["childrens"].map((x) => Children.fromMap(x))),
    fromFacilityId: json["from_facility_id"] == null ? null : json["from_facility_id"],
    toFacilityId: json["to_facility_id"] == null ? null : json["to_facility_id"],
    deliveredByFacilityId: json["delivered_by_facility_id"] == null ? null : json["delivered_by_facility_id"],
    fromFacilityName: json["from_facility_name"] ?? null,
    toFacilityName: json["to_facility_name"] ?? null,
    deliveredByFacilityName: json["delivered_by_facility_name"] ?? null,
    transactionId : json["transaction_id"] ?? null
  );

  Map<String, dynamic> toMap() => {
    "id": id == null ? null : id,
    "product_item_id": productItemId == null ? null : productItemId,
    "name": name == null ? null : name,
    "created_at": createdAt == null ? null : createdAt.toIso8601String(),
    "sold_at": soldAt == null ? null : soldAt.toIso8601String(),
    "to_product_item_id": toProductItemId == null ? null : toProductItemId,
    "childrens": childrens == null ? null : List<dynamic>.from(childrens.map((x) => x.toMap())),
    "from_facility_id": fromFacilityId == null ? null : fromFacilityId,
    "to_facility_id": toFacilityId == null ? null : toFacilityId,
    "delivered_by_facility_id": deliveredByFacilityId == null ? null : deliveredByFacilityId,
    "from_facility_name" : fromFacilityName ?? null,
    "to_facility_name" : toFacilityName ?? null,
    "delivered_by_facility_name" : deliveredByFacilityName ?? null,
    "transaction_id" : transactionId ?? null,
  };
}

class Children {
  String id;
  String productId;
  DateTime expiryDate;
  DateTime createdAt;
  DateTime updatedAt;
  String productName;
  String avatar;

  Children({
    this.id,
    this.productId,
    this.expiryDate,
    this.createdAt,
    this.updatedAt,
    this.productName,
    this.avatar,
  });

  factory Children.fromMap(Map<String, dynamic> json) => Children(
    id: json["id"] == null ? null : json["id"],
    productId: json["product_id"] == null ? null : json["product_id"],
    expiryDate: json["expiry_date"] == null ? null : DateTime.parse(json["expiry_date"]),
    createdAt: json["created_at"] == null ? null : DateTime.parse(json["created_at"]),
    updatedAt: json["updated_at"] == null ? null : DateTime.parse(json["updated_at"]),
    productName: json["product_name"] == null ? null : json["product_name"],
    avatar: json["avatar"] == null ? null : json["avatar"],
  );

  Map<String, dynamic> toMap() => {
    "id": id == null ? null : id,
    "product_id": productId == null ? null : productId,
    "expiry_date": expiryDate == null ? null : expiryDate.toIso8601String(),
    "created_at": createdAt == null ? null : createdAt.toIso8601String(),
    "updated_at": updatedAt == null ? null : updatedAt.toIso8601String(),
    "product_name": productName == null ? null : productName,
    "avatar": avatar == null ? null : avatar,
  };
}