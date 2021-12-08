import 'package:flutter/material.dart';
import 'package:avatar_glow/avatar_glow.dart';
import 'delayed_animation.dart';
import 'package:tab_navigator/contanst/router_constant.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/icons.dart';

class IntroScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Intro_Screen_State();
  }
}

class _Intro_Screen_State extends State<IntroScreen>
    with SingleTickerProviderStateMixin {
  final int delayAmount = 500;
  double _scale;
  AnimationController _controller;

  @override
  void initState() {
    _controller = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 200),
      lowerBound: 0.0,
      upperBound: 0.1,
    )..addListener(() {
        setState(() {});
      });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final color = Colors.white;
    _scale = 1 - _controller.value;
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        //backgroundColor: ColorStyles.color_background_intro_30,
        body: Center(
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  ColorStyles.color_background_intro_30,
                  ColorStyles.color_background_intro_60
                ],
              ),
            ),
            child: Column(
              children: <Widget>[
                AvatarGlow(
                  endRadius: 90,
                  duration: Duration(seconds: 2),
                  glowColor: Colors.white24,
                  repeat: true,
                  repeatPauseDuration: Duration(seconds: 2),
                  startDelay: Duration(seconds: 1),
                  child: Image.asset(
                    ListIcon.logo_goco,
                    color: Colors.white,
                    width: 200,
                    height: 80,
                  ),
                ),
                DelayedAnimation(
                  child: Text(
                    'GoCO',
                    style: TextStyle(
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                      fontSize: 35.0,
                      color: color,
                    ),
                  ),
                  delay: delayAmount + 500,
                ),
                SizedBox(
                  height: 20,
                ),
                DelayedAnimation(
                  child: Text("I'm Verify Product",
                      style: TextStyle(
                          fontFamily: 'Montserrat',
                          fontWeight: FontWeight.bold,
                          fontSize: 25.0,
                          color: color)),
                  delay: delayAmount + 1000,
                ),
                SizedBox(
                  height: 20,
                ),
                Spacer(),
                DelayedAnimation(
                  child: GestureDetector(
                    onTapDown: _onTapDown,
                    onTapUp: _onTapUp,
                    child: Transform.scale(
                      scale: _scale,
                      child: _getAnimatedButtonUI(),
                    ),
                  ),
                  delay: delayAmount + 1200,
                ),
                SizedBox(
                  height: 20.00,
                ),
                SizedBox(
                  height: 50.0,
                  child: DelayedAnimation(
                    child: Text(
                      'You already to start with your products.',
                      style: TextStyle(
                          fontFamily: 'Montserrat',
                          fontSize: 13.0,
                          fontWeight: FontWeight.bold,
                          color: color),
                    ),
                    delay: delayAmount + 1500,
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _getAnimatedButtonUI() {
    return Container(
      height: 60,
      width: 270,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(100.00),
        color: Colors.white,
      ),
      child: MaterialButton(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(100),
        ),
        color: Colors.white,
        child: SizedBox.expand(
          child: Center(
            child: Text(
              'Let go',
              style: TextStyle(
                fontFamily: 'Montserrat',
                fontSize: 27.0,
                fontWeight: FontWeight.bold,
                color: ColorStyles.color_text_intro,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
        onPressed: () {
          Navigator.popAndPushNamed(context, Router_Constant.LoginScreen);
        },
      ),
    );
  }

  void _onTapDown(TapDownDetails details) {
    _controller.forward();
  }

  void _onTapUp(TapUpDetails details) {
    _controller.reverse();
  }
}
