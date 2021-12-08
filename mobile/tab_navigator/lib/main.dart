import 'package:flutter/material.dart';
import 'package:tab_navigator/pages/introdution/intro_screen.dart';
import 'package:tab_navigator/pages/login/model_login_response.dart';
import 'package:tab_navigator/locator.dart';
import 'package:provider/provider.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'router.dart' as router;
import 'package:tab_navigator/services/authentication_service.dart';

void main() {
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MyApp_State();
  }
}

class _MyApp_State extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        StreamProvider<UserProfileResponseModel>(
          builder: (context) =>
              locator<AuthenticationService>().userProfile.stream,
        ),
        StreamProvider<LoginResponseModel>(
          builder: (context) =>
          locator<AuthenticationService>().user_login.stream,
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primaryColor: Colors.blue,
        ),
        onGenerateRoute: router.genrateRouter,
        initialRoute: '/',
        home: HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: IntroScreen(),
//        child: OverViewProduct(),
      ),
    );
  }
}
