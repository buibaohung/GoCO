import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/contanst/router_constant.dart';
import 'package:tab_navigator/pages/login/cache_user.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/services/validation_service.dart';
import 'package:toast/toast.dart';
import 'package:tab_navigator/view_model/login_viewmodel.dart';
import 'package:tab_navigator/pages/base_view.dart';
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen> {
  final _validationService = ValidationService();
  final _textUsername = TextEditingController();
  final _textPass = TextEditingController();
  bool _validateUsername = true;

  @override
  void initState() {
    /// hieu.nguyen: listener valid phone number.
    _textUsername.addListener(() {
      setState(() {
        (_textUsername.text.isNotEmpty)
            ? _validateUsername =
                _validationService.validateEmail(_textUsername.text)
            : _validateUsername = true;
      });
    });

    /// hieu.nguyen: check login userCache.
    SharedPrefService().getToken().then((token) {
      if (token.isNotEmpty) {
        SharedPrefService().getUserCache().then((user) {
          UserCache userCache = UserCache.fromMap(json.decode(user));
          if (userCache.phoneNumber != null && userCache.password != null) {
            LoginViewModel().doLogin(userCache.phoneNumber, userCache.password,
                Router_Constant.HomeScreen, context);
          }
        });
      }
    });

    super.initState();
  }

  @override
  void dispose() {
    _textUsername.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      body: Center(
        child: Container(
            color: Colors.white,
            child: new SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.all(36.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    AvatarGlow(
                      endRadius: 90,
                      duration: Duration(seconds: 2),
                      glowColor: ColorStyles.color_background_intro_30,
                      repeat: true,
                      repeatPauseDuration: Duration(seconds: 2),
                      startDelay: Duration(seconds: 1),
                      child: Image.asset(
                        ListIcon.logo_goco,
                        color: ColorStyles.color_background_intro_30,
                        width: 200,
                        height: 80,
                      ),
                    ),
                    SizedBox(
                      height: 100.0,
                    ),
                    _buildUserName(),
                    SizedBox(
                      height: 20.0,
                    ),
                    _buildPassword(),
                    SizedBox(
                      height: 80.0,
                    ),
                    _buildButtonLogin()
                  ],
                ),
              ),
            )),
      ),
    );
  }

  Widget _buildUserName() {
    return Container(
      child: TextField(
        controller: _textUsername,
        obscureText: false,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          hintText: 'Phone number',
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(35.0),
          ),
          errorText: _validateUsername
              ? null
              : "Phone numbers must include 10 numbers",
        ),
        keyboardType: TextInputType.number,
        onEditingComplete: () => setState(() {
          _validateUsername =
              _validationService.validateEmail(_textUsername.text);
        }),
      ),
    );
  }

  Widget _buildPassword() {
    return Container(
      child: TextField(
        controller: _textPass,
        obscureText: true,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          hintText: 'Password',
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(35.0),
          ),
        ),
      ),
    );
  }

  Widget _buildButtonLogin() {
    return BaseView<LoginViewModel>(
      builder: (context, model, child) => Container(
        child: Column(
          children: <Widget>[
            Material(
              elevation: 6.0,
              borderRadius: BorderRadius.circular(35.0),
              color: ColorStyles.color_background_intro_30,
              child: MaterialButton(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(35),
                ),
                minWidth: MediaQuery.of(context).size.width,
                padding: EdgeInsets.fromLTRB(20.0, 15.0, 20, 15.0),
                onPressed: () {
                  (_validateUsername == true && _textUsername.text.isNotEmpty)
                      ? model.doLogin(_textUsername.text, _textPass.text,
                          Router_Constant.HomeScreen, context)
                      : Toast.show("Please enter again!", context,
                          gravity: Toast.BOTTOM, duration: Toast.LENGTH_LONG);
                },
                child: Text(
                  'Login',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Montserrat',
                      fontSize: 20.0,
                      color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            SizedBox(
              height: 25.0,
            ),
            GestureDetector(
              child: Text(
                "Don't have an account?",
                style: TextStyle(
                    fontSize: 15.0, decoration: TextDecoration.underline),
              ),
              onTap: () {
                Navigator.pushNamed(context, Router_Constant.RegisterScreen);
              },
            ),
          ],
        ),
      ),
    );
  }

//  Future<void> eventClickLogin() async {
//    await LoginService()
//        .doLogin(_textUsername.text, _textPass.text)
//        .then((apiResponse) async {
//      if (apiResponse.errors.length == 0) {
//        NetworkBase.token = apiResponse.data.token;
//        Navigator.pushNamed(context, Router_Constant.HomeScreen);
//      } else {
//        Toast.show("Failed login!", context,
//            gravity: Toast.BOTTOM, duration: Toast.LENGTH_LONG);
//        print(apiResponse.errors);
//      }
//    }).catchError((err) {
//      print(err);
//    });
//  }
}
