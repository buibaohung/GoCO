import 'package:tab_navigator/pages/card_view/time_lines.dart';
import 'package:tab_navigator/pages/home_page/my_tabs.dart';
import 'package:tab_navigator/pages/introdution/intro_screen.dart';

import 'package:flutter/material.dart';
import 'package:tab_navigator/contanst/router_constant.dart';
import 'package:flutter/cupertino.dart';
import 'package:tab_navigator/pages/login/login_screen.dart';

import 'package:tab_navigator/pages/over_view_product/over_view_screen.dart';
import 'package:tab_navigator/pages/detail_product_step/product_step_screen.dart';

import 'package:tab_navigator/pages/register/register_screen.dart';
import 'package:tab_navigator/pages/profile_screen/profile_screen.dart';
import 'package:tab_navigator/pages/recently_scan/recently_scan_screen.dart';

Route<dynamic> genrateRouter(RouteSettings settings) {
  switch (settings.name) {
    case Router_Constant.HomeScreen:
      return MaterialPageRoute(builder: (context) => MyTabs());

    case Router_Constant.IntroScreen:
      return MaterialPageRoute(builder: (context) => IntroScreen());

    case Router_Constant.LoginScreen:
      return MaterialPageRoute(builder: (context) => LoginScreen());

    case Router_Constant.TimeLinesScreen:
      return MaterialPageRoute(builder: (context) => TimeLines());

    case Router_Constant.OverViewProduct:
      return MaterialPageRoute(builder: (context) => OverViewProduct());

    case Router_Constant.ProductStepDetail:
      return MaterialPageRoute(builder: (context) => ProductStepScreen());

    case Router_Constant.RegisterScreen:
      return MaterialPageRoute(builder: (context) => RegisterScreen());

    case Router_Constant.ProfileScreen:
      return MaterialPageRoute(builder: (context) => ProfileScreen());

    case Router_Constant.RecentlyScanScreen:
      return MaterialPageRoute(builder: (context) => RecentlyScan());
  }
}
