import 'package:flutter/material.dart';
import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/services.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/pages/over_view_product/over_view_screen.dart';
import 'package:tab_navigator/pages/recently_scan/model_recently_product.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/widget/item_carousel.dart';
import 'package:carousel_slider/carousel_slider.dart';

class First extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScanCode();
  }
}

class ScanCode extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return ScanCodeState();
  }
}

class ScanCodeState extends State<ScanCode> {
  String result = "Scan code here";
  ListRecentlyProduct listRecently;

  @override
  void initState() {
    super.initState();
    SharedPrefService().getListRecently().then((listModel) {
      if (listModel != null) {
        print('Have data');
        print(listModel.recentlyProduct.length);
        setState(() {
          listRecently = listModel;
        });
      }
    });
  }



  void scanQRCode() async {
    try {
      String qrResult = await BarcodeScanner.scan();
      print(qrResult);
      setState(() {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => OverViewProduct(
              id: qrResult,
            ),
          ),
        );
      });
    } on PlatformException catch (ex) {
      if (ex.code == BarcodeScanner.CameraAccessDenied) {
        setState(() {
          result = "Camera permission access denied!";
        });
      } else {
        setState(() {
          result = "Unknow error $ex";
        });
      }
    } on FormatException {
      setState(() {
        result = "You press the back button before scanning anything.";
      });
    } catch (ex) {
      setState(() {
        result = "Unknow error $ex";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    SharedPrefService().getListRecently().then((listModel) {
      if (listModel != null) {
//        print('Have data');
//        print(listModel.recentlyProduct.length);
        setState(() {
          listRecently = listModel;
        });
      }
    });
    return buildBody();
  }

  Widget buildBody() {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Container(
        margin: listRecently == null ? null : EdgeInsets.only(top: 20),
        alignment:
            listRecently == null ? Alignment.center : Alignment.topCenter,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'Scan code here',
              textAlign: TextAlign.center,
              style: new TextStyle(
                fontSize: 20,
                fontFamily: 'Montserrat',
                color: Colors.black,
              ),
            ),
            SizedBox(
              height: 4.0,
            ),
            new IconButton(
              padding: EdgeInsets.symmetric(vertical: 6.0, horizontal: 15.0),
              icon: Image.asset(ListIcon.qr_Code),
              onPressed: scanQRCode,
              iconSize: 50.0,
            ),
            Spacer(),
            listRecently != null ? buildRecentlyCarousel() : Container(),
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: build Recently Product carousel.
  Widget buildRecentlyCarousel() {
    return Container(
      alignment: Alignment.bottomCenter,
      height: MediaQuery.of(context).size.height * 0.45,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Spacer(),
          Container(
            margin: EdgeInsets.all(15),
            child: Text(
              "Recently products",
              style: new TextStyle(
                fontSize: 20.0,
                fontFamily: 'Montserrat',
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
          ),
          Container(
            margin: EdgeInsets.only(bottom: 5),
            alignment: Alignment.bottomCenter,
            child: CarouselSlider(
              autoPlay: true,
              realPage: listRecently.recentlyProduct.length,
              items: listRecently.recentlyProduct.map((i) => ItemCarousel(
                    id: i.id,
                    name: i.name,
                    price: i.price.toDouble(),
                    rating: i.rating,
                    url: i.url,
                    isProduct: false,
                  )).toList(),
              height: MediaQuery.of(context).size.height * 0.3,
            ),
          ),
        ],
      ),
    );
  }
}
