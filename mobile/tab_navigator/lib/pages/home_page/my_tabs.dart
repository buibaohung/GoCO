import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/locator.dart';
import 'package:tab_navigator/pages/tab_pages/first_page.dart';
import 'package:tab_navigator/pages/sliding_menu/sliding_menu_using_drawer.dart';

import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/services/authentication_service.dart';
import 'package:tab_navigator/services/user_profile_service.dart';
import 'package:double_back_to_close_app/double_back_to_close_app.dart';

class MyTabs extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyTabState();
  }
}

class _MyTabState extends State<MyTabs> {
  bool isLoading = false;
  static const snackBarDuration = Duration(seconds: 3);

  final snackBar = SnackBar(
    content: Text('Press back again to leave'),
    duration: snackBarDuration,
  );

  DateTime backButtonPressTime;

  @override
  Widget build(BuildContext context) {

    return new Scaffold(
      appBar: new AppBar(
        title: new Text(
          'GoCO',
          style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: ColorStyles.color_background_intro_30,
      ),
      backgroundColor: Color.fromRGBO(224, 231, 235, 1),

      /// hieu.nguyen: scan code screen.
      body: DoubleBackToCloseApp(
        child: isLoading
            ? Center(
                child: SpinKitDoubleBounce(
                  color: Colors.black,
                  size: Helpers.resizeByWidth(context, 50),
                ),
              )
            : First(),
        snackBar: const SnackBar(
          content: Text('Tap back again to leave'),
        ),
      ),
      drawer: MyAppSliding(),
    );
  }

  @override
  void initState() {
    super.initState();
  }

  /// hieu.nguyen: Function get dât use profile then stream data to all screen.
  void getDataProfile(token) {
    UserProfileService().doGetData(token).then((response) {
      ///stream data user profile
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();
      _authenticationService.fetchData(response);
      setState(() {
        isLoading = false;
      });
    }).catchError((err) {
      setState(() {
        isLoading = false;
        print(err);
      });
    });
  }

}
