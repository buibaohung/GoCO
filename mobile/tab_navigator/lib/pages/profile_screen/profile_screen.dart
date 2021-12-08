import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:provider/provider.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/contanst/network.dart';
import 'package:tab_navigator/eos_client/eos_service.dart';
import 'package:tab_navigator/locator.dart';
import 'package:tab_navigator/pages/login/login_screen.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/services/authentication_service.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/services/user_profile_service.dart';

class ProfileScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return ProfileScreenState();
  }
}

class ProfileScreenState extends State<ProfileScreen> {
  bool isLoading = true;
  bool isLoadingProfile = true;
  bool isUpdateLoading = false;
  String currency = '';
  String privateKey = '';
  final _textPrivateKey = TextEditingController();
  final _textEosAccount = TextEditingController();
  final _textUserName = TextEditingController();

  @override
  void initState() {
    SharedPrefService().getPrivateKey().then((key) => privateKey = key);
    getDataProfile(NetworkBase.token);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    /*** data_model_login_response when do_login */
    UserProfileResponseModel userLogin = Provider.of<UserProfileResponseModel>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Your profile',
          style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: ColorStyles.color_background_intro_30,
      ),
      backgroundColor: Colors.white,
      body: (isLoading && isLoadingProfile)
          ? Center(
              child: SpinKitDoubleBounce(
                color: Colors.black,
                size: Helpers.resizeByWidth(context, 50),
              ),
            )
          : isUpdateLoading
              ? Center(
                  child: SpinKitDoubleBounce(
                  color: Colors.black,
                  size: Helpers.resizeByWidth(context, 50),
                ))
              : body(userLogin),
    );
  }

  /// hieu.nguyen: build body
  Widget body(UserProfileResponseModel userLogin) {
    return SingleChildScrollView(
      child: Center(
        child: Container(
          color: Colors.white,
          child: Padding(
            padding: EdgeInsets.fromLTRB(15, 10, 15, 15),
            child: Column(
              children: <Widget>[
                SizedBox(height: 25.0),
                buildBalance(),
                SizedBox(height: 25.0),
                _buildAvatar(userLogin.name),
                SizedBox(height: 30.0),
                _buildEmailFiled(userLogin.phoneNumber),
                SizedBox(height: 5.0),
                buildEosAccountField(userLogin.eosUsername, userLogin.name),
                SizedBox(height: 5.0),
                buildPrivateKeyField(userLogin),
                SizedBox(height: 5.0),
                _buildButtonLogout(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget buildBalance() {
    return Container(
      child: Text(
        '$currency',
        style: TextStyle(
            fontFamily: 'Montserrat',
            fontSize: 20.0,
            fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildAvatar(String name) {
    return Container(
      child: Column(
        children: <Widget>[
          Center(
            child: Material(
              shape: CircleBorder(),
              elevation: 8.0,
              child: CircleAvatar(
                radius: 50.0,
                backgroundColor: Colors.grey[400],
                child: ClipOval(
                  child: Image.asset(ListIcon.avatar),
                ),
              ),
            ),
          ),
          SizedBox(height: 10.0),
          Text(
            name,
            textAlign: TextAlign.center,
            style: TextStyle(fontFamily: 'Montserrat', fontSize: 20.0),
          )
        ],
      ),
    );
  }

  Widget _buildEmailFiled(String email) {
    return Container(
      height: Helpers.resizeByWidth(context, 50),
      color: Colors.grey[100],
      child: Row(
        children: <Widget>[
          Expanded(
            flex: 1,
            child: Icon(
              Icons.phone_android,
              color: Colors.black,
              size: 18.0,
            ),
          ),
          Expanded(
            flex: 4,
//            child: Text(_textUsername.text,
//                style: TextStyle(fontFamily: 'Montserrat', fontSize: 16.0)),
            child: Text(
              email,
              style: TextStyle(fontFamily: 'Montserrat', fontSize: 16.0),
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(),
          )
        ],
      ),
    );
  }

  /// hieu.nguyen: build box eos account.
  Widget buildEosAccountField(String eosAccount, String name) {
    return Container(
      height: Helpers.resizeByWidth(context, 50),
      color: Colors.grey[100],
      child: Row(
        children: <Widget>[
          Expanded(
            flex: 1,
            child: Icon(
              Icons.account_circle,
              color: Colors.black,
              size: 18.0,
            ),
          ),
          Expanded(
            flex: 4,
            child: Text(
              eosAccount,
              style: TextStyle(fontFamily: 'Montserrat', fontSize: 16.0),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Expanded(
            flex: 1,
            child: IconButton(
              icon: Icon(
                Icons.mode_edit,
                color: Colors.black,
                size: 18.0,
              ),
              onPressed: () {
                _textEosAccount.text = eosAccount;
                _textUserName.text = name;
                showDialog(
                    barrierDismissible: true,
                    context: context,
                    builder: (context) => buildDialogEditEosAccount());
              },
            ),
          ),
        ],
      ),
    );
  }

  /// hieu.nguyen: build box button logout.
  Widget _buildButtonLogout() {
    return Container(
      height: Helpers.resizeByWidth(context, 50),
      color: Colors.grey[100],
      child: GestureDetector(
        onTap: () {
          /// hieu.nguyen: clear user info in SharedPref : token, private key, user cache.
          SharedPrefService().saveUserCache('', '');
          SharedPrefService().saveToken('');
          SharedPrefService().savePrivateKey('');
          SharedPrefService().saveListRecently(null);

          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (context) => LoginScreen()),
              (Route<dynamic> route) => false);
        },
        child: Row(
          children: <Widget>[
            Expanded(
              flex: 1,
              child: Icon(
                Icons.navigate_next,
                color: Colors.black,
                size: 18.0,
              ),
            ),
            Expanded(
              flex: 4,
              child: Text(
                "Logout",
                style: TextStyle(
                    fontFamily: 'Montserrat',
                    fontSize: 16.0,
                    color: Colors.deepOrangeAccent),
                maxLines: 1,
              ),
            ),
            Expanded(
              flex: 1,
              child: Container(),
            )
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: function load currency.
  Future<void> loadCurrency(String eos, String key) async {
    await EosClientService(privateKey: key).getCurrencyBalance(eos).then((value) async {
      setState(() {
        currency = value.toString();
        isLoading = false;
        isUpdateLoading = false;
      });
    }).catchError((err) {
      setState(() {
        isLoading = false;
        isUpdateLoading = false;
      });
    });
  }

  /// hieu.nguyen: Function load data profile user.
  Future<void> getDataProfile(token) async {
    UserProfileService().doGetData(token).then((response) {
      ///stream data user profile
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();
      _authenticationService.saveUserProfile(response);
      SharedPrefService().getPrivateKey().then((key){
        loadCurrency(response.eosUsername, key);
      });
      setState(() {
        isLoadingProfile = false;
      });
    }).catchError((err) {
      setState(() {
        isLoadingProfile = false;
        print(err);
      });
    });
  }

  /// hieu.nguyen: build private key field.
  Widget buildPrivateKeyField(UserProfileResponseModel user) {
    return Container(
      height: Helpers.resizeByWidth(context, 50),
      color: Colors.grey[100],
      child: Row(
        children: <Widget>[
          Expanded(
            flex: 1,
            child: Icon(
              Icons.vpn_key,
              color: Colors.black,
              size: 18.0,
            ),
          ),
          Expanded(
            flex: 4,
            child: Text(
              privateKey,
              style: TextStyle(fontFamily: 'Montserrat', fontSize: 16.0),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Expanded(
            flex: 1,
            child: IconButton(
              icon: Icon(
                Icons.mode_edit,
                color: Colors.black,
                size: 18.0,
              ),
              onPressed: () {
                _textPrivateKey.text = privateKey;
                showDialog(
                    barrierDismissible: true,
                    context: context,
                    builder: (context) => buildDialogEditPrivateKey(user));
              },
            ),
          ),
        ],
      ),
    );
  }

  /// hieu.nguyen: build dialog edit private key.
  Widget buildDialogEditPrivateKey(UserProfileResponseModel user) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        height: Helpers.resizeByWidth(context, 320),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(top: 10, bottom: 30),
              child: Text(
                'Private key',
                style: TextStyle(
                  fontFamily: 'Montserrat',
                  fontSize: 16.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 3, right: 3, bottom: 10),
              child: TextFormField(
                controller: _textPrivateKey,
                decoration: InputDecoration(
                  labelText: 'Private key',
                  labelStyle: TextStyle(
                    fontSize: 16,
                    fontFamily: 'Montserrat',
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                keyboardType: TextInputType.multiline,
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'Montserrat',
                ),
                maxLines: 5,
              ),
            ),
            Container(
              height: 60,
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.all(10),
                      child: RaisedButton(
                        color: ColorStyles.color_background_intro_30,
                        child: new Text(
                          'Cancel',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.all(10),
                      child: RaisedButton(
                        color: ColorStyles.color_background_intro_30,
                        child: new Text(
                          'OK',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () {
                          SharedPrefService()
                              .savePrivateKey(_textPrivateKey.text);
                          setState(() {
                            privateKey = _textPrivateKey.text;
                            loadCurrency(user.eosUsername, privateKey);
                          });
                          Navigator.pop(context);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: build dialog edit eos account.
  Widget buildDialogEditEosAccount() {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        height: Helpers.resizeByWidth(context, 270),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(top: 10, bottom: 30),
              height: Helpers.resizeByWidth(context, 30),
              child: Text(
                'Edit Profile',
                style: TextStyle(
                  fontFamily: 'Montserrat',
                  fontSize: 16.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 3, right: 3, bottom: 15),
              height: Helpers.resizeByWidth(context, 50),
              child: TextFormField(
                controller: _textUserName,
                decoration: InputDecoration(
                  labelText: 'User name',
                  labelStyle: TextStyle(
                    fontSize: 16,
                    fontFamily: 'Montserrat',
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                keyboardType: TextInputType.multiline,
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'Montserrat',
                ),
                maxLines: 1,
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 3, right: 3, bottom: 10),
              height: Helpers.resizeByWidth(context, 50),
              child: TextFormField(
                controller: _textEosAccount,
                decoration: InputDecoration(
                  labelText: 'Eos user name',
                  labelStyle: TextStyle(
                    fontSize: 16,
                    fontFamily: 'Montserrat',
                  ),
                  border: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                keyboardType: TextInputType.multiline,
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'Montserrat',
                ),
                maxLines: 1,
              ),
            ),
            Container(
              height: 60,
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.all(10),
                      child: RaisedButton(
                        color: ColorStyles.color_background_intro_30,
                        child: new Text(
                          'Cancel',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.all(10),
                      child: RaisedButton(
                        color: ColorStyles.color_background_intro_30,
                        child: new Text(
                          'OK',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () {
                          setState(() {
                            isUpdateLoading = true;
                          });
                          updateProfile(NetworkBase.token, _textUserName.text,
                              _textEosAccount.text);
                          Navigator.pop(context);
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: Function update profile.
  Future<void> updateProfile(String token, String name, String eos) async {
    await UserProfileService()
        .doUpdateProfile(token, name, eos)
        .then((response) {
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();

      /// hieu.nguyen: reload data user profile
      setState(() {
        UserProfileService().doGetData(NetworkBase.token).then((response) {
          _authenticationService.saveUserProfile(response);
          SharedPrefService().getPrivateKey().then((key){
            loadCurrency(response.eosUsername, key);
          });
          isUpdateLoading = false;
        }).catchError((err) {
          setState(() {
            isUpdateLoading = false;
          });
        });
      });
    }).catchError((err) {
      setState(() {
        isUpdateLoading = false;
      });
    });
  }
}
