// To parse this JSON data, do
//
//     final loginResponseModel = loginResponseModelFromJson(jsonString);

import 'dart:convert';

LoginResponseModel loginResponseModelFromJson(String str) =>
    LoginResponseModel.fromMap(json.decode(str));

String loginResponseModelToJson(LoginResponseModel data) =>
    json.encode(data.toMap());

class LoginResponseModel {
  User user;
  String token;
  int code;
  String message;

  LoginResponseModel({this.user, this.token, this.code, this.message});

  factory LoginResponseModel.fromMap(Map<String, dynamic> json) =>
      LoginResponseModel(
          user: User.fromMap(json["user"]) ?? null,
          token: json["token"] ?? null,
          code: json["code"] ?? null,
          message: json["message"] ?? null);

  Map<String, dynamic> toMap() => {
        "user": user.toMap() ?? null,
        "token": token ?? null,
        "code": code ?? null,
        "message": message ?? null,
      };
}

class User {
  String id;
  String name;
  String phoneNumber;
  DateTime createdAt;
  DateTime updatedAt;

  User({
    this.id,
    this.name,
    this.phoneNumber,
    this.createdAt,
    this.updatedAt,
  });

  factory User.fromMap(Map<String, dynamic> json) => User(
        id: json["id"] ?? null,
        name: json["name"] ?? null,
        phoneNumber: json["phone_number"] ?? null,
        createdAt: DateTime.parse(json["created_at"]) ?? null,
        updatedAt: DateTime.parse(json["updated_at"]) ?? null,
      );

  Map<String, dynamic> toMap() => {
        "id": id ?? null,
        "name": name ?? null,
        "phone_number": phoneNumber ?? null,
        "created_at": createdAt.toIso8601String() ?? null,
        "updated_at": updatedAt.toIso8601String() ?? null,
      };
}
