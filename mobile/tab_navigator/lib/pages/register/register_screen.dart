
import 'package:avatar_glow/avatar_glow.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/pages/login/login_screen.dart';
import 'package:toast/toast.dart';
import 'package:tab_navigator/services/validation_service.dart';
import 'package:tab_navigator/services/register_service.dart';
import 'package:tab_navigator/widget/progress_dialog.dart';

class RegisterScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return RegisterScreenState();
  }
}

class RegisterScreenState extends State<RegisterScreen> {
  final _textUserName = TextEditingController();
  final _textPassword = TextEditingController();
  final _textConfirmPassword = TextEditingController();
  final _textFullName = TextEditingController();

  final _validationService = ValidationService();
  bool _validateUsername = true;
  bool _validateConfirmpass = true;

  @override
  void initState() {
    _textUserName.addListener(() {
      setState(() {
        (_textUserName.text.isNotEmpty)
            ? _validateUsername =
                _validationService.validateEmail(_textUserName.text)
            : _validateUsername = true;
      });
    });

    _textConfirmPassword.addListener(() {
      setState(() {
        (_textConfirmPassword.text.isNotEmpty &&
                _textConfirmPassword.text == _textPassword.text)
            ? _validateConfirmpass = true
            : _validateConfirmpass = false;
      });
    });

    super.initState();
  }

  @override
  void dispose() {
    _textUserName.dispose();
    _textConfirmPassword.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomPadding: false,
        body: SingleChildScrollView(
          child: Center(
            child: Container(
                color: Colors.white,
                child: SingleChildScrollView(
                  child: Padding(
                    padding: EdgeInsets.all(40.0),
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
                        SizedBox(height: 20.0),
                        _buildUserName(),
                        SizedBox(height: 20.0),
                        _buildFullName(),
                        SizedBox(height: 20.0),
                        _buildPassword(),
                        SizedBox(height: 20.0),
                        _buildConfirmPassword(),
                        SizedBox(height: 80.0),
                        _buildButtonRegis()
                      ],
                    ),
                  ),
                )),
          ),
        ));
  }

  Widget _buildUserName() {
    return Container(
      child: TextField(
        controller: _textUserName,
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
      ),
    );
  }

  Widget _buildFullName() {
    return Container(
      child: TextField(
        controller: _textFullName,
        obscureText: false,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          hintText: 'Full name',
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(35.0),
          ),
        ),
      ),
    );
  }

  Widget _buildPassword() {
    return Container(
      child: TextField(
        controller: _textPassword,
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

  Widget _buildConfirmPassword() {
    return Container(
      child: TextField(
        controller: _textConfirmPassword,
        obscureText: true,
        style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
        decoration: InputDecoration(
          hintText: 'Confirm password',
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(35.0),
          ),
          errorText: _validateConfirmpass ? null : "Password is incorrect!",
        ),
      ),
    );
  }

  Widget _buildButtonRegis() {
    return Container(
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
                //Navigator.pushNamed(context, Router_Constant.HomeScreen);
                (_textUserName.text.isNotEmpty &&
                        _textPassword.text.isNotEmpty &&
                        _textConfirmPassword.text.isNotEmpty)
                    ? eventClickRegis()
                    : Toast.show("Please enter again!", context,
                        gravity: Toast.BOTTOM, duration: Toast.LENGTH_LONG);
              },
              child: Text(
                'Register',
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
            height: 20.0,
          ),
        ],
      ),
    );
  }

  Future<void> eventClickRegis() async {
    Progress_Dialog pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    await RegisterService()
        .doRegis(_textUserName.text, _textFullName.text, _textPassword.text)
        .then((apiResponse) async {
      if (apiResponse.name != null) {
        pr.getProgresDialog.hide();
        Route route = MaterialPageRoute(builder: (context) => LoginScreen());
        Navigator.pushReplacement(context, route);
      } else {
        pr.getProgresDialog.hide();
        Toast.show('${apiResponse.code} : ${apiResponse.message}', context,
            gravity: Toast.BOTTOM, duration: Toast.LENGTH_LONG);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      Toast.show(err.toString(), context,
          gravity: Toast.BOTTOM, duration: Toast.LENGTH_LONG);
      print(err);
    });
  }
}
