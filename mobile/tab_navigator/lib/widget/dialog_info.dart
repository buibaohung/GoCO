import 'package:tab_navigator/contanst/helper.dart';
import 'package:flutter/material.dart';

class DialogInfo {
  void showErrorDialog(
      BuildContext context, String title, String alert, Function yesAction) {
    Color orange = Colors.green;
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.transparent,
          contentPadding: EdgeInsets.all(0),
          titlePadding: EdgeInsets.all(0),
          title: Container(
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
                color: orange,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(5), topRight: Radius.circular(5))),
            child: Text(title,
                style: TextStyle(
                    fontSize: Helpers.resizeByWidth(context, 20),
                    color: Colors.white,
                    fontFamily: 'woodfordbourne',
                    fontWeight: FontWeight.w700)),
          ),
          content: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(5),
                bottomRight: Radius.circular(5),
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(20),
                  alignment: Alignment.center,
                  child: Text(alert,
                      style: TextStyle(
                          fontSize: Helpers.resizeByWidth(context, 20),
                          color: orange,
                          fontFamily: 'woodfordbourne',
                          fontWeight: FontWeight.w400)),
                ),
                Container(
                    padding: EdgeInsets.only(right: 15, bottom: 5),
                    alignment: Alignment.bottomRight,
                    child: Row(
                      children: <Widget>[
                        Spacer(),
                        RaisedButton(
                          highlightColor: Colors.black12,
                          splashColor: Colors.black12,
                          elevation: 0,
                          shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(25.0),
                          ),
                          color: Colors.white,
                          onPressed: () {
                            Navigator.pop(context);
                            yesAction();
                          },
                          child: Text(
                            'Yes',
                            style: TextStyle(
                                fontSize: Helpers.resizeByWidth(context, 20),
                                color: orange,
                                fontFamily: 'woodfordbourne',
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                        SizedBox(
                          width: 20,
                        ),
                        RaisedButton(
                          highlightColor: Colors.black12,
                          splashColor: Colors.black12,
                          elevation: 0,
                          shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(25.0),
                          ),
                          color: Colors.white,
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Text(
                            'No',
                            style: TextStyle(
                                fontSize: Helpers.resizeByWidth(context, 20),
                                color: orange,
                                fontFamily: 'woodfordbourne',
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                      ],
                    ))
              ],
            ),
          ),
        );
      },
    );
  }

  void showImageDialog(BuildContext context, String title, String content,
      bool hasX, String imagePath) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          backgroundColor: Colors.white,
          contentPadding: EdgeInsets.all(0),
          titlePadding: EdgeInsets.all(0),
          title: Container(
            padding: EdgeInsets.all(0),
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(5), topRight: Radius.circular(5))),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Spacer(),
                    hasX
                        ? Container(
                            width: 40,
                            height: 40,
                            child: FlatButton(
                              padding: EdgeInsets.all(0),
                              onPressed: () {
                                Navigator.pop(context);
                              },
                              child: Icon(
                                Icons.clear,
                                size: 24.0,
                                color: Color.fromRGBO(108, 108, 110, 1),
                              ),
                            ),
                          )
                        : Container(
                            height: 40,
                            width: 40,
                          ),
                  ],
                ),
                Image.asset(
                  imagePath,
                  width: 128,
                  height: 128,
                ),
                SizedBox(
                  height: 10,
                )
              ],
            ),
          ),
          content: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(5),
                bottomRight: Radius.circular(5),
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Container(
                  alignment: Alignment.center,
                  child: Text(title,
                      style: TextStyle(
                          fontSize: Helpers.resizeByWidth(context, 18),
                          color: Colors.black,
                          fontFamily: 'Montserrat',
                          fontWeight: FontWeight.bold)),
                ),
                Container(
                  alignment: Alignment.topCenter,
                  margin: EdgeInsets.only(top: 5),
                  child: Text(
                    content,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: Helpers.resizeByWidth(context, 14),
                      color: Colors.black,
                      fontFamily: 'Montserrat',
                    ),
                  ),
                ),
                Container(
                  padding:
                      EdgeInsets.only(left: 20, top: 23, right: 20, bottom: 20),
                  width: MediaQuery.of(context).size.width - 60,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Container(),
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      Expanded(
                        flex: 1,
                        child: RaisedButton(
                          // highlightColor: Colors.black12,
                          // splashColor: Colors.black12,
                          shape: new RoundedRectangleBorder(
                            borderRadius: new BorderRadius.circular(25.0),
                          ),
                          padding: EdgeInsets.all(0),
                          color: Color.fromRGBO(253, 178, 24, 1),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Container(
                            height: 50,
                            alignment: Alignment.center,
                            child: Text(
                              'OK',
                              style: TextStyle(
                                fontSize: Helpers.resizeByWidth(context, 14),
                                color: Colors.white,
                                fontFamily: 'Montserrat',
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
