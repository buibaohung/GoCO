import 'package:get_it/get_it.dart';

import 'package:tab_navigator/services/login_service.dart';
import 'package:tab_navigator/view_model/base_modle.dart';
import 'package:tab_navigator/view_model/login_viewmodel.dart';
import 'package:tab_navigator/pages/Login/model_login_response.dart';
import 'package:tab_navigator/view_model/user_profile_viewmodel.dart';
import 'package:tab_navigator/services/user_profile_service.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'package:tab_navigator/services/authentication_service.dart';

GetIt locator = GetIt();

void setupLocator() {
  locator.registerLazySingleton(() => LoginService());
  locator.registerLazySingleton(() => UserProfileService());
  locator.registerLazySingleton(() => AuthenticationService());

  locator.registerFactory(() => LoginViewModel());
  locator.registerFactory(() => BaseModel());
  locator.registerFactory(() => UserProfileViewModel());


  locator.registerLazySingleton(() => UserProfileResponseModel());
  locator.registerLazySingleton(() => LoginResponseModel());
}
