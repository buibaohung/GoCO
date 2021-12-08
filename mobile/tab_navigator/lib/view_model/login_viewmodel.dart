import 'package:flutter/cupertino.dart';
import 'package:tab_navigator/services/authentication_service.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/services/user_profile_service.dart';
import 'package:tab_navigator/view_model/base_modle.dart';
import 'package:tab_navigator/pages/login/model_login_response.dart';
import 'package:tab_navigator/services/login_service.dart';
import 'package:tab_navigator/contanst/network.dart';
import 'package:tab_navigator/enum/viewstate.dart';
import 'package:tab_navigator/locator.dart';
import 'package:tab_navigator/widget/progress_dialog.dart';
import 'package:toast/toast.dart';

class LoginViewModel extends BaseModel {
  final LoginService _loginService = locator<LoginService>();
  final AuthenticationService _authenticationService =
      locator<AuthenticationService>();
  final UserProfileService profileService = locator<UserProfileService>();

  LoginResponseModel _loginResponseModel = LoginResponseModel();

  LoginResponseModel get getLoginResponseModel => this._loginResponseModel;

  Future<void> doLogin(
      String email, String password, String route, BuildContext context) async {
    Progress_Dialog pr = new Progress_Dialog(context);
    //setState(ViewState.Busy);
    pr.getProgresDialog.show();
    await _loginService.doLogin(email, password).then((apiResponse) async {
      ///save token
      NetworkBase.token = apiResponse.token;

      ///get data
      this._loginResponseModel = apiResponse;

      /// stream data userLogin.
      _authenticationService.user_login.add(apiResponse);

      ///save token in SharedPref
      SharedPrefService().saveToken(apiResponse.token);

      ///save user cache in SharedPref.
      SharedPrefService().saveUserCache(email, password);

      pr.getProgresDialog.hide();
      Navigator.popAndPushNamed(context, route);
    }).catchError((err) {
      pr.getProgresDialog.hide();
      Toast.show('Failed login!', context,
          duration: Toast.LENGTH_LONG, gravity: Toast.BOTTOM);
      print(err);
    });
    //setState(ViewState.Idle);
  }
}
