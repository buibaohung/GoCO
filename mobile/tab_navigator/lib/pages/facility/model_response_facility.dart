import 'dart:convert';

ModelFacility modelFacilityFromJson(String str) => ModelFacility.fromMap(json.decode(str));

String modelFacilityToJson(ModelFacility data) => json.encode(data.toMap());

class ModelFacility {
  Facility facility;

  ModelFacility({
    this.facility,
  });

  factory ModelFacility.fromMap(Map<String, dynamic> json) => ModelFacility(
    facility: json["facility"] == null ? null : Facility.fromMap(json["facility"]),
  );

  Map<String, dynamic> toMap() => {
    "facility": facility == null ? null : facility.toMap(),
  };
}

class Facility {
  String id;
  String name;
  String type;
  String eosUsername;
  String email;
  String phoneNumber;
  String location;
  String website;
  DateTime createdAt;
  DateTime updatedAt;

  Facility({
    this.id,
    this.name,
    this.type,
    this.eosUsername,
    this.email,
    this.phoneNumber,
    this.location,
    this.website,
    this.createdAt,
    this.updatedAt,
  });

  factory Facility.fromMap(Map<String, dynamic> json) => Facility(
    id: json["id"] == null ? null : json["id"],
    name: json["name"] == null ? null : json["name"],
    type: json["type"] == null ? null : json["type"],
    eosUsername: json["eos_username"] == null ? null : json["eos_username"],
    email: json["email"] == null ? null : json["email"],
    phoneNumber: json["phone_number"] == null ? null : json["phone_number"],
    location: json["location"] == null ? null : json["location"],
    website: json["website"] == null ? null : json["website"],
    createdAt: json["created_at"] == null ? null : DateTime.parse(json["created_at"]),
    updatedAt: json["updated_at"] == null ? null : DateTime.parse(json["updated_at"]),
  );

  Map<String, dynamic> toMap() => {
    "id": id == null ? null : id,
    "name": name == null ? null : name,
    "type": type == null ? null : type,
    "eos_username": eosUsername == null ? null : eosUsername,
    "email": email == null ? null : email,
    "phone_number": phoneNumber == null ? null : phoneNumber,
    "location": location == null ? null : location,
    "website": website == null ? null : website,
    "created_at": createdAt == null ? null : createdAt.toIso8601String(),
    "updated_at": updatedAt == null ? null : updatedAt.toIso8601String(),
  };
}
