import 'package:carousel_pro/carousel_pro.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/pages/facility/facility_screen.dart';
import 'package:tab_navigator/pages/product_recommender/model_product_recommender_response.dart';
import 'package:tab_navigator/services/product_service.dart';
import 'package:tab_navigator/widget/no_data_screen.dart';
import 'package:tab_navigator/widget/stars_display_widget.dart';

class ProductScreen extends StatefulWidget {
  final String id;

  ProductScreen({this.id});

  @override
  State<StatefulWidget> createState() {
    return ProductScreenState();
  }
}

class ProductScreenState extends State<ProductScreen> {
  ModelProductRecommender model;
  bool _isLoadSuccessed = false;
  bool _isError = false;

  @override
  void initState() {
    /// call api get info product.
    ProductService().getInfoProductRecommend(widget.id).then((response) {
      if (response.id != null) {
        setState(() {
          model = response;
          _isLoadSuccessed = true;
        });
      } else {
        setState(() {
          _isError = true;
        });
      }
    }).catchError((err) {
      setState(() {
        _isError = true;
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoadSuccessed
          ? _isError ? NoData() : body()
          : Center(
              child: SpinKitDoubleBounce(
                color: Colors.black,
                size: Helpers.resizeByWidth(context, 50),
              ),
            ),
    );
  }

  /// hieu.nguyen: build item Price.
  Widget coursePrice() {
    return Container(
      padding: const EdgeInsets.all(7.0),
      decoration: new BoxDecoration(
          border: new Border.all(color: Colors.black),
          borderRadius: BorderRadius.circular(5.0)),
      child: new Text(
        '${Helpers.currencyFormatted(model.price.toDouble(), ' đ')}',
        style: TextStyle(
          color: Colors.black,
          fontFamily: 'Montserrat',
          fontSize: 14,
          fontWeight: FontWeight.bold,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }

  /// hieu.nguyen: build Top content.
  Widget topContentText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Icon(
          Icons.add_shopping_cart,
          color: Colors.black,
          size: Helpers.resizeByWidth(context, 40),
        ),
        Container(
          width: Helpers.resizeByWidth(context, 90),
          child: new Divider(color: Colors.black),
        ),
        SizedBox(height: Helpers.resizeByWidth(context, 10)),
        Text(
          '${model.name}',
          style: TextStyle(
              color: Colors.black,
              fontSize: Helpers.resizeByWidth(context, 25),
              fontFamily: 'Montserrat'),
        ),
        SizedBox(height: Helpers.resizeByWidth(context, 10)),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Expanded(
              flex: 3,
              child: IconTheme(
                data: IconThemeData(
                  color: Colors.amber,
                  size: Helpers.resizeByWidth(context, 30),
                ),
                child: StarDisplay(value: model.rating ?? 0),
              ),
            ),
            Expanded(
              flex: 2,
              child: model.price != null ? coursePrice() : Container(),
            )
          ],
        ),
      ],
    );
  }

  /// hieu.nguyen: build UI in top.
  Widget topContent() {
    return Stack(
      children: <Widget>[
        Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height * 0.5,
          child: Carousel(
            autoplay: true,
            dotColor: Colors.white,
            indicatorBgPadding: 2,
            images: model.images
                .map((i) => Image.network(
                      i,
                      fit: BoxFit.cover,
                      loadingBuilder: (BuildContext context, Widget child,
                          ImageChunkEvent loadingProgress) {
                        if (loadingProgress != null) {
                          return Center(
                            child: CircularProgressIndicator(
                              value: loadingProgress.expectedTotalBytes != null
                                  ? loadingProgress.cumulativeBytesLoaded /
                                      loadingProgress.expectedTotalBytes
                                  : null,
                              valueColor:
                                  AlwaysStoppedAnimation<Color>(Colors.black),
                            ),
                          );
                        } else {
                          return child;
                        }
                      },
                    ))
                .toList(),
          ),
        ),
        Positioned(
          left: Helpers.resizeByWidth(context, 8),
          top: Helpers.resizeByWidth(context, 50),
          child: InkWell(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(
              Icons.arrow_back,
              color: Colors.black,
              size: Helpers.resizeByWidth(context, 30),
            ),
          ),
        )
      ],
    );
  }

  Widget buildNameProduct() {
    return Container(
      margin: EdgeInsets.all(10),
      padding: EdgeInsets.fromLTRB(10, 10, 10, 20),
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
          border: Border.all(color: Colors.grey),
          borderRadius: BorderRadius.circular(8)),
      child: Center(
        child: topContentText(),
      ),
    );
  }

  /// hieu.nguyen: build bottom content.
  Widget bottomContentText() {
    return Text(
      model.description,
      style: TextStyle(
          fontSize: Helpers.resizeByWidth(context, 18),
          height: 1.2,
          fontFamily: 'Montserrat'),
    );
  }

  /// hieu.nguyen: build bottom content.
  Widget bottomContent() {
    return Container(
      // height: MediaQuery.of(context).size.height,
      width: MediaQuery.of(context).size.width,
      // color: Theme.of(context).primaryColor,
      padding: EdgeInsets.all(10.0),
      child: Center(
        child: Column(
          children: <Widget>[
            Container(
              child: Card(
                elevation: 4.0,
                child: Padding(
                  padding: EdgeInsets.all(7.0),
                  child: bottomContentText(),
                ),
              ),
            ),
            readButton()
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: BODY SCREEN.
  Widget body() {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          topContent(),
          buildNameProduct(),
          bottomContent(),
        ],
      ),
    );
  }

  /// hieu.nguyen: build UI read more button.
  Widget readButton() {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 20.0),
      width: MediaQuery.of(context).size.width,
      child: Column(
        children: <Widget>[
          ButtonTheme(
            padding: EdgeInsets.symmetric(vertical: 10.0),
            height: Helpers.resizeByWidth(context, 60),
            minWidth: Helpers.resizeByWidth(context, 300),
            child: RaisedButton(
              onPressed: () => {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (context) => Facility(
                      idFacility: model.facilityId,
                    ),
                  ),
                )
              },
              color: ColorStyles.color_background_intro_30,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)),
              child: Text(
                "READ FACILITY",
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16.0,
                    fontFamily: 'Montserrat',
                    fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
