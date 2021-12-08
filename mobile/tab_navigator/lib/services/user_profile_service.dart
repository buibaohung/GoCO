import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'package:tab_navigator/contanst/network.dart';

class UserProfileService {
  /// hieu.nguyen: service  get data profile
  Future<UserProfileResponseModel> doGetData(String token) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    };

    print(token);
    String URL = NetworkBase.Base_URL + "auth/profile";
    final response = await http.get(URL, headers: header);

    if (response.statusCode == 200) {
      return UserProfileResponseModel.fromMap(json.decode(response.body));
    } else {
      print(response.statusCode);
      throw Exception('Faild get data user profile');
    }
  }

  /// hieu.nguyen: service update data profile and eos account.
  Future<UserProfileResponseModel> doUpdateProfile(
      String token, String name, String eosUser) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    };

    Map<String, dynamic> params = {
      'user': {'name': name, 'eos_username': eosUser}
    };
    String URL = NetworkBase.Base_URL + "auth/profile";
    final response = await http.put(
      URL,
      headers: header,
      body: json.encode(params),
    );

    if (response.statusCode == 200) {
      return UserProfileResponseModel.fromMap(json.decode(response.body));
    } else {
      print(response.statusCode);
      throw Exception('Faild update data user profile');
    }
  }
}

/// hieu.nguyen: class model user request update.
class user {
  final String name;
  final String eos_username;

  user({this.name, this.eos_username});

  Map<String, dynamic> toMap() => {
        "name": this.name ?? '',
        "eos_username": this.eos_username ?? '',
      };
}
