import 'package:flutter/material.dart';
import 'package:tab_navigator/pages/over_view_product/over_view_screen.dart';
import 'package:tab_navigator/pages/product_recommender/product_recommender_screen.dart';
import 'package:tab_navigator/widget/stars_display_widget.dart';
import 'package:tab_navigator/contanst/helper.dart';

class ItemCarousel extends StatelessWidget {
  final String id;
  final String name;
  final int rating;
  final double price;
  final String url;
  final bool isProduct;

  const ItemCarousel(
      {this.id, this.name, this.rating, this.price, this.url, this.isProduct});

  @override
  Widget build(BuildContext context) {
    return buildContent(context);
  }

  Widget buildContent(context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.7,
      margin: EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: Colors.grey[200],
      ),
      child: FlatButton(
        padding: const EdgeInsets.all(0),
        child: Column(
          children: <Widget>[
            Expanded(
              flex: 2,
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                ),
                margin: EdgeInsets.all(5),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    url,
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
                  ),
                ),
              ),
            ),
            Expanded(
              flex: 1,
              child: Container(
                margin: EdgeInsets.all(5),
                child: Column(
                  children: <Widget>[
                    Text(
                      "$name",
                      style: TextStyle(
                        fontSize: Helpers.resizeByWidth(context, 14),
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Montserrat',
                      ),
                    ),
                    SizedBox(
                      height: 3,
                    ),
                    IconTheme(
                      data: IconThemeData(
                        color: Colors.amber,
                        size: Helpers.resizeByWidth(context, 16),
                      ),
                      child: StarDisplay(value: rating),
                    ),
                    SizedBox(
                      height: 3,
                    ),
                    price != null
                        ? Text(
                            Helpers.currencyFormatted(price.toDouble(), ' đ'),
                            style: TextStyle(
                              fontSize: Helpers.resizeByWidth(context, 14),
                              fontWeight: FontWeight.bold,
                              fontFamily: 'Montserrat',
                            ),
                          )
                        : Container(),
                  ],
                ),
              ),
            )
          ],
        ),
        onPressed: () {
          if (isProduct) {
            Navigator.of(context).push(
              MaterialPageRoute(
                builder: (context) => ProductScreen(
                  id: id,
                ),
              ),
            );
          } else {
            if (id != null) {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => OverViewProduct(
                    id: id,
                  ),
                ),
              );
            }
          }
        },
      ),
    );
  }
}
