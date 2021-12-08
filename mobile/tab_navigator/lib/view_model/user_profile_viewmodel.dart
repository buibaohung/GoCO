import 'package:tab_navigator/view_model/base_modle.dart';

import 'package:tab_navigator/enum/viewstate.dart';

import 'package:tab_navigator/services/user_profile_service.dart';
import 'package:tab_navigator/contanst/network.dart';
import 'package:tab_navigator/locator.dart';

class UserProfileViewModel extends BaseModel {
  final UserProfileService _userProfileService = locator<UserProfileService>();

//  UserProfileResponseModel _userProfileResponseModel =
//      UserProfileResponseModel();
//
//  UserProfileResponseModel get getUserProfileResponseModel =>
//      this._userProfileResponseModel;
//
//  Future<void> getDataUserProfile() async {
//    setState(ViewState.Busy);
//    await _userProfileService
//        .doGetData(NetworkBase.token)
//        .then((apiResponse) async {
//      if (apiResponse.errors.length == 0) {
//        this._userProfileResponseModel = apiResponse;
//      } else {
//        print(apiResponse.errors);
//      }
//    }).catchError((err) {
//      print(err);
//    });
//    setState(ViewState.Idle);
//  }
}
