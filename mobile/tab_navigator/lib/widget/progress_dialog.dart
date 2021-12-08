import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:progress_dialog/progress_dialog.dart';

class Progress_Dialog {
  BuildContext context;
  ProgressDialog pr;

  Progress_Dialog(BuildContext context) {
    this.context = context;

    pr = new ProgressDialog(context, type: ProgressDialogType.Normal);
    pr.style(
        message: "Please wait...",
        borderRadius: 10.0,
        backgroundColor: Colors.white,
        elevation: 10.0,
        insetAnimCurve: Curves.easeOut,
        messageTextStyle: TextStyle(
            color: Colors.black, fontSize: 18.0, fontFamily: 'Montserrat'));
  }

  ProgressDialog get getProgresDialog => this.pr;
}
