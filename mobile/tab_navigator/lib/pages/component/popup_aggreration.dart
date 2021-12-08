import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/pages/card_view/time_lines.dart';
import 'package:tab_navigator/pages/over_view_product/model_events_product.dart';
import 'package:tab_navigator/pages/over_view_product/model_product_response.dart';
import 'package:tab_navigator/services/product_service.dart';

class PopupAggregation extends StatefulWidget {
  final Event event;
  final String title;

  PopupAggregation({this.event, this.title});

  @override
  State<StatefulWidget> createState() {
    return PopupAggregationState();
  }
}

class PopupAggregationState extends State<PopupAggregation> {
  Event event;
  bool _isLoadingTrans = true;
  ModelProduct modelProduct;

  @override
  void initState() {
    event = widget.event ?? null;
    if (event.toProductItemId != null) {
      fetchData(event.toProductItemId);
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: ColorStyles.color_background_intro_30,
        automaticallyImplyLeading: false,
        title: Container(
          alignment: Alignment.center,
          child: Text(
            widget.title,
            style: new TextStyle(
              fontSize: 18,
              fontFamily: 'Montserrat',
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
      backgroundColor: Colors.grey[200],
      body: event.childrens != null
          ? buildListProduct()
          : _isLoadingTrans
              ? Center(
                  child: SpinKitDoubleBounce(
                    color: Colors.black,
                    size: Helpers.resizeByWidth(context, 50),
                  ),
                )
              : buildItem(modelProduct.avatar, modelProduct.name,
                  event.toProductItemId, true),
    );
  }

  Widget buildListProduct() {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          SizedBox(height: 10),
          for (var item in event.childrens)
            buildItem(item.avatar, item.productName, item.id, true),
        ],
      ),
    );
  }

  void fetchData(String idProduct) {
    ProductService().getInfoProduct(idProduct).then((response) {
      setState(() {
        modelProduct = response;
        _isLoadingTrans = false;
      });
    });
  }

  Widget buildItem(String url, String name, String id, bool hasNext) {
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
            child: Container(
              alignment: Alignment.center,
              child: Row(
                children: <Widget>[
                  Container(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Container(
                          margin: EdgeInsets.only(left: 10),
                          child: Text(
                            name,
                            style: new TextStyle(
                              fontSize: 18.0,
                              fontFamily: 'Montserrat',
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(left: 10, top: 5),
                          child: Text(
                            id,
                            style: new TextStyle(
                              fontSize: 12.0,
                              fontFamily: 'Montserrat',
                              color: Colors.grey,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Spacer(),
                  hasNext
                      ? FlatButton(
                          padding: EdgeInsets.all(0),
                          child: Icon(
                            Icons.navigate_next,
                            size: 26,
                            color: Colors.black,
                          ),
                          shape: CircleBorder(),
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) =>
                                    TimeLines(name: name, idProduct: id),
                              ),
                            );
                          },
                        )
                      : Container(),
                ],
              ),
            ),
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
        child: Image.network(
          url,
          fit: BoxFit.fill,
          loadingBuilder: (BuildContext context, Widget child,
              ImageChunkEvent loadingProgress) {
            if (loadingProgress != null) {
              return Center(
                child: CircularProgressIndicator(
                  value: loadingProgress.expectedTotalBytes != null
                      ? loadingProgress.cumulativeBytesLoaded /
                          loadingProgress.expectedTotalBytes
                      : null,
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.black),
                ),
              );
            } else {
              return child;
            }
          },
        ),
      ),
    );
  }
}
