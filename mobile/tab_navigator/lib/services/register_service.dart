import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:tab_navigator/pages/register/model_register_response.dart';
import 'package:tab_navigator/contanst/network.dart';

class RegisterService {
  Future<RegisterResponseModel> doRegis(String email, String full_name,
      String password) async {
    Map<String, dynamic> params = {
      'name': full_name,
      'phone_number': email,
      'Password': password,
    };

    String URL = NetworkBase.Base_URL + "authentication/signup";
    final response = await http.post(URL,
        headers: NetworkBase.Base_header, body: json.encode(params));

    if (response.statusCode == 200) {
      //return RegisterResponseModel.fromJson(json.decode(response.body));
      return RegisterResponseModel.fromMap(json.decode(response.body));
    } else {
      print(response.body);
      return RegisterResponseModel.fromMap(json.decode(response.body));
      //throw Exception('Faild register');
    }
  }
}
