import 'dart:convert';

UserProfileResponseModel modelProfileResponseFromJson(String str) =>
    UserProfileResponseModel.fromMap(json.decode(str));

String modelProfileResponseToJson(UserProfileResponseModel data) =>
    json.encode(data.toMap());

class UserProfileResponseModel {
  String id;
  String name;
  String phoneNumber;
  String eosUsername;

//  DateTime createdAt;
//  DateTime updatedAt;

  UserProfileResponseModel({
    this.id,
    this.name,
    this.phoneNumber,
    this.eosUsername,
//    this.createdAt,
//    this.updatedAt,
  });

  factory UserProfileResponseModel.fromMap(Map<String, dynamic> json) =>
      UserProfileResponseModel(
        id: json["id"],
        name: json["name"] ?? '',
        phoneNumber: json["phone_number"],
        eosUsername: json["eos_username"] ?? '',
//        createdAt: DateTime.parse(json["created_at"]),
//        updatedAt: DateTime.parse(json["updated_at"]),
      );

  Map<String, dynamic> toMap() => {
        "id": id,
        "name": name ?? '',
        "phone_number": phoneNumber,
        "eos_username": eosUsername ?? '',
//        "created_at": createdAt.toIso8601String(),
//        "updated_at": updatedAt.toIso8601String(),
      };
}
