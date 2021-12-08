import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/contanst/router_constant.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/pages/login/login_screen.dart';
import 'package:tab_navigator/pages/login/model_login_response.dart';
import 'package:tab_navigator/pages/profile_screen/profile_screen.dart';
import 'package:tab_navigator/pages/sliding_menu/eos_profile_screen.dart';
import 'package:tab_navigator/services/share_pref_service.dart';

class MyAppSliding extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MyAppSlidingHomePage();
  }
}

class MyAppSlidingHomePage extends StatefulWidget {
  MyAppSlidingHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  State<StatefulWidget> createState() {
    return MyAppSlidingHomePageState();
  }
}

class MyAppSlidingHomePageState extends State<MyAppSlidingHomePage> {
  @override
  Widget build(BuildContext context) {
    ///Streamer user infor to drawer:
    var user = Provider.of<LoginResponseModel>(context).user;

    var header = new DrawerHeader(
        child: new Text(
          'Headers',
          style: TextStyle(fontSize: 20),
        ),
        margin: EdgeInsets.zero,
        decoration: new BoxDecoration(color: Colors.teal));

    var userAcountHeader = new UserAccountsDrawerHeader(
      decoration: BoxDecoration(
        color: ColorStyles.color_background_intro_30,
      ),
      accountName: new Text(
        user.name,
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      accountEmail: new Text(
        user.phoneNumber,
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      currentAccountPicture: new CircleAvatar(
        backgroundColor: Theme.of(context).platform == TargetPlatform.iOS
            ? ColorStyles.color_background_intro_30
            : Colors.white,
        child: ClipOval(
          child: Image.asset(ListIcon.avatar),
        ),
      ),
    );

    var itemProfile = new ListTile(
      title: new Text(
        'Profile',
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Image.asset(
        ListIcon.ic_user_info,
        color: Colors.grey[800],
        width: 32,
        height: 32,
      ),
      onTap: _onItem1OnTap,
    );

    var itemRecently = new ListTile(
      title: new Text(
        'Recently scan',
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Image.asset(
        ListIcon.ic_recent,
        scale: 1.3,
        color: Colors.grey[800],
      ),
      onTap: () {
        Navigator.of(context).pop();
        Navigator.of(context).pushNamed(Router_Constant.RecentlyScanScreen);
      },
    );

    var itemEosClient = new ListTile(
      title: new Text(
        'Eos deposit',
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Icon(
        Icons.money_off,
        size: 28,
        color: Colors.grey[800],
      ),
      onTap: () {
        Navigator.of(context).pop();
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => EosProfileScreen()));
      },
    );

    var itemFaq = new ListTile(
      title: new Text(
        'FAQ',
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Image.asset(
        ListIcon.ic_faq,
        color: Colors.grey[800],
        width: 30,
        height: 30,
        fit: BoxFit.cover,
      ),
      onTap: () {
        /// trans FAQ screen.
      },
    );

    var itemLogout = new ListTile(
      title: new Text(
        'Logout',
        style: TextStyle(
          fontSize: 15,
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: Image.asset(
        ListIcon.ic_logout,
        color: Colors.grey[800],
        width: 30,
        height: 30,
        fit: BoxFit.cover,
      ),
      onTap: () {
        /// hieu.nguyen: clear user info in SharedPref : token, private key, user cache.
        SharedPrefService().saveUserCache('', '');
        SharedPrefService().saveToken('');
        SharedPrefService().savePrivateKey('');
        SharedPrefService().saveListRecently(null).then((value) {
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(builder: (context) => LoginScreen()),
              (Route<dynamic> route) => false);
        });
      },
    );

    var children = [
      userAcountHeader,
      itemProfile,
//      SizedBox(height: 4),
//      itemRecently,
      SizedBox(height: 4),
      itemEosClient,
      SizedBox(height: 4),
      itemFaq,
      SizedBox(height: 4),
      itemLogout
    ];
    var listView = new ListView(children: children);

    var drawer = new Drawer(child: listView);

    return drawer;
  }

  void _onItem1OnTap() {
    Navigator.of(context).pop();
    // Navigator.of(context).pushNamed(Router_Constant.ProfileScreen);
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => ProfileScreen()));
  }
}
