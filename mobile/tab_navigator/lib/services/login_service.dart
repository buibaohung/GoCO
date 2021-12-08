import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:tab_navigator/pages/login/model_login_response.dart';
import 'package:tab_navigator/contanst/network.dart';



class LoginService {

  Future<LoginResponseModel> doLogin(String email, String password) async {
    Map<String, dynamic> params = {'phone_number': email, 'Password': password};
    String URL = NetworkBase.Base_URL + "authentication/signin";
    final response = await http.post(URL,
        headers: NetworkBase.Base_header,
        body: json.encode(params));
    if (response.statusCode == 200) {
      return LoginResponseModel.fromMap(json.decode(response.body));
    } else {
      throw Exception('Faild login');
    }
  }
}
