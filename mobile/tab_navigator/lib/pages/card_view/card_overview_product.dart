import 'package:flutter/material.dart';
import 'package:tab_navigator/contanst/router_constant.dart';

class CardProduct extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 30.0, horizontal: 10.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            _buildHeader(context),
            SizedBox(height: 10.0),
            _buildBody(context),
          ],
        ),
      ),
      color: Colors.white70,
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(left: 20.0),
        ),
        FlutterLogo(
          size: 80.0,
        ),
        Padding(
          padding: EdgeInsets.only(left: 15.0),
        ),
        Text(
          'Name Product',
          style: Theme.of(context).textTheme.title,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildBody(BuildContext context) {
    return Column(
      children: <Widget>[
        Text(
          'Content of product. This line is description information about the product.',
          style: TextStyle(fontSize: 14.0, fontFamily: 'Montserrat'),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 5.0),
        Text(
          "Origin: Jayce 's farm",
          style: TextStyle(fontFamily: 'Montserrat', fontSize: 13.0),
        ),
        SizedBox(height: 5.0),
        Text(
          "Store: Family Mart",
          style: TextStyle(fontFamily: 'Montserrat', fontSize: 13.0),
        ),
        SizedBox(height: 10.0),
        FlatButton(
          onPressed: () {
            Navigator.pushNamed(context, Router_Constant.OverViewProduct);
          },
          child: Text('Read more'),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(6.0)),
          color: Colors.indigoAccent,
          textColor: Colors.white,
        ),
      ],
    );
  }
}
