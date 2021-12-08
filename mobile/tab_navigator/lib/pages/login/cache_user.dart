import 'dart:convert';

UserCache UserCacheFromJson(String str) => UserCache.fromMap(json.decode(str));

String UserCacheToJson(UserCache data) => json.encode(data.toMap());

class UserCache {
  String phoneNumber;
  String password;

  UserCache({this.phoneNumber, this.password});

  factory UserCache.fromMap(Map<String, dynamic> json) => UserCache(
        phoneNumber: json["phoneNumber"] ?? '',
        password: json["password"] ?? '',
      );

  Map<String, dynamic> toMap() => {
        "phoneNumber": this.phoneNumber ?? '',
        "password": this.password ?? '',
      };
}
