import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tab_navigator/widget/stars_display_widget.dart';
import 'package:tab_navigator/pages/tab_pages/model_data_item_carousel.dart';
import 'package:tab_navigator/contanst/helper.dart';

class RecentlyScan extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return RecentlyScanState();
  }
}

class RecentlyScanState extends State<RecentlyScan> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(255, 255, 255, 0.8),
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back,
            size: 30.0,
            color: Colors.black,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        title: Text(
          "Recently scan",
          style: TextStyle(
              color: Colors.black, fontSize: 20.0, fontFamily: 'Montserrat'),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            for (var item in ListDataRecommend)
              buildItem(item.image, item.name, item.rating, item.price),
          ],
        ),
      ),
    );
  }

  Widget buildItem(url, name, rating, price) {
    return Container(
      margin: EdgeInsets.fromLTRB(15, 3, 15, 2),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        color: Colors.white,
      ),
      width: MediaQuery.of(context).size.width,
      height: Helpers.resizeByWidth(context, 80),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Expanded(
            flex: 1,
            child: buildImage(url),
          ),
          Expanded(
            flex: 3,
            child: buildContent(name, rating, price),
          ),
        ],
      ),
    );
  }

  Widget buildImage(String url) {
    return Container(
      margin: EdgeInsets.all(2),
      width: Helpers.resizeByWidth(context, 150),
      height: Helpers.resizeByWidth(context, 150),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Image.asset(
          url,
          fit: BoxFit.fill,
        ),
      ),
    );
  }

  Widget buildContent(String name, int rating, double price) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Expanded(
          flex: 1,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              SizedBox(width: 10),
              Text(
                name,
                style: new TextStyle(
                  fontSize: 18.0,
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              Spacer(),
              Container(
                padding: const EdgeInsets.all(7.0),
                decoration: new BoxDecoration(
                    border: new Border.all(color: Colors.white),
                    borderRadius: BorderRadius.circular(5.0)),
                child: new Text(
                  "\$" + '$price',
                  style: new TextStyle(
                    fontSize: 14.0,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              )
            ],
          ),
        ),
        Expanded(
          flex: 1,
          child: Container(
            margin: EdgeInsets.only(left: 10),
            child: IconTheme(
              data: IconThemeData(
                color: Colors.amber,
                size: Helpers.resizeByWidth(context, 20),
              ),
              child: StarDisplay(value: rating),
            ),
          ),
        )
      ],
    );
  }
}
