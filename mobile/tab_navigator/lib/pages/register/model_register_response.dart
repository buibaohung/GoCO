// To parse this JSON data, do
//
//     final registerResponseModel = registerResponseModelFromJson(jsonString);

import 'dart:convert';

RegisterResponseModel registerResponseModelFromJson(String str) =>
    RegisterResponseModel.fromMap(json.decode(str));

String registerResponseModelToJson(RegisterResponseModel data) =>
    json.encode(data.toMap());

class RegisterResponseModel {
  String id;
  String name;
  String phoneNumber;
  int code;
  String message;

  RegisterResponseModel(
      {this.id, this.name, this.phoneNumber, this.code, this.message});

  factory RegisterResponseModel.fromMap(Map<String, dynamic> json) =>
      RegisterResponseModel(
          id: json["id"] ?? null,
          name: json["name"] ?? null,
          phoneNumber: json["phone_number"] ?? null,
          code: json["code"] ?? null,
          message: json["message"] ?? null);

  Map<String, dynamic> toMap() => {
        "id": id ?? null,
        "name": name ?? null,
        "phone_number": phoneNumber ?? null,
        "code": code ?? null,
        "message": message ?? null,
      };
}
