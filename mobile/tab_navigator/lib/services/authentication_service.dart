import 'dart:async';

import 'package:tab_navigator/pages/login/model_login_response.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';

class AuthenticationService {
  /// Stream user_info all screen.
  StreamController<UserProfileResponseModel> userProfile =
      StreamController<UserProfileResponseModel>();

  StreamController<LoginResponseModel> user_login =
      StreamController<LoginResponseModel>();

  Future<void> fetchData(var data) async {
    user_login.add(data);
  }

  Future<void> saveUserProfile(var data) async {
    userProfile.add(data);
  }
}
