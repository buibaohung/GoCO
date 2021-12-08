import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:provider/provider.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/network.dart';
import 'package:tab_navigator/eos_client/eos_service.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/locator.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'package:tab_navigator/services/authentication_service.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/services/user_profile_service.dart';

class EosProfileScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return EosProfileScreenState();
  }
}

class EosProfileScreenState extends State<EosProfileScreen> {
  final textFromAccount = TextEditingController();
  final textToAccount = TextEditingController();
  final textQuantity = TextEditingController();
  final textMemo = TextEditingController();

  bool isLoading = true;

  @override
  void initState() {
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
          'Deposit Eos',
          style: TextStyle(
              fontSize: 20,
              fontFamily: 'Montserrat',
              fontWeight: FontWeight.bold,
              color: Colors.white),
        ),
        backgroundColor: ColorStyles.color_background_intro_30,
      ),
      backgroundColor: Color.fromRGBO(241, 241, 248, 1),
      body: isLoading
          ? Center(
              child: SpinKitDoubleBounce(
                color: Colors.black,
                size: Helpers.resizeByWidth(context, 50),
              ),
            )
          : SingleChildScrollView(
              child: buildBody(userLogin),
            ),
    );
  }

  Widget buildBody(UserProfileResponseModel user) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        SizedBox(height: Helpers.resizeByWidth(context, 20)),
        Container(
          margin: const EdgeInsets.only(bottom: 15, left: 15, right: 15),
          child: TextFormField(
            controller: textQuantity,
            decoration: InputDecoration(
              labelText: 'Quantity :',
              hintText: '1 EOS',
              labelStyle: TextStyle(
                fontSize: 16,
                fontFamily: 'Montserrat',
              ),
              hintStyle: TextStyle(
                  fontSize: 14, fontFamily: 'Montserrat', color: Colors.grey),
              border: OutlineInputBorder(
                borderSide: BorderSide(color: Colors.grey),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            keyboardType: TextInputType.number,
            style: TextStyle(
              fontSize: 16,
              fontFamily: 'Montserrat',
            ),
          ),
        ),
        Container(
          margin: const EdgeInsets.all(30),
          width: Helpers.resizeByWidth(context, 300),
          height: Helpers.resizeByWidth(context, 60),
          child: RaisedButton(
            color: ColorStyles.color_background_intro_30,
            child: Text(
              'Deposit',
              style: TextStyle(
                  fontSize: 20,
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.bold,
                  color: Colors.white),
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(35),
            ),
            onPressed: () {
              SharedPrefService().getPrivateKey().then((key){
                EosClientService(privateKey: key).transferEOS(
                    context,
                    double.parse(textQuantity.text),
                    user.eosUsername,
                    'sgexlcsqpwtc',
                    'deposit');
              });
            },
          ),
        ),
      ],
    );
  }

  /// hieu.nguyen: Function load data profile user.
  Future<void> getDataProfile(token) async {
    UserProfileService().doGetData(token).then((response) {
      ///stream data user profile
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();
      _authenticationService.saveUserProfile(response);
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
