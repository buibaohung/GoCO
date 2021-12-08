import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import '../detail_product_step/model_detail_product_step.dart';

class ProductStepScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return Product_Step_Screen_State();
  }
}

class Product_Step_Screen_State extends State<ProductStepScreen>
    with TickerProviderStateMixin {
  final model = model_data;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
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
        backgroundColor: Colors.white,
        title: Text(
          "STEP PRODUCT DETAIL",
          style: TextStyle(
            color: Colors.black,
            fontSize: 20.0,
            fontFamily: 'Montserrat'
          ),
        ),
      ),
      body: _buildroductDetailPage(),
    );
  }

  _buildroductDetailPage() {
    Size screenSize = MediaQuery.of(context).size;
    return ListView(
      children: <Widget>[
        Container(
          padding: const EdgeInsets.all(4.0),
          child: Card(
            elevation: 4.0,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                _buildProductImageWidgets(),
                SizedBox(height: 12.0),
                _buildProductTitleWidget(),
                SizedBox(height: 12.0),
                _buildBodyContentProduct(),
                SizedBox(height: 12.0)
              ],
            ),
          ),
        ),
      ],
    );
  }

  _buildProductImageWidgets() {
    TabController imagesController =
        TabController(length: model.images.length, vsync: this);
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Container(
        height: 250.0,
        child: Center(
          child: DefaultTabController(
            length: model.images.length,
            child: Stack(
              children: <Widget>[
                TabBarView(
                  controller: imagesController,
                  children: <Widget>[
                    for (var item in model.images) Image.network(item),
                  ],
                ),
                Container(
                  alignment: FractionalOffset(0.5, 0.95),
                  child: TabPageSelector(
                    controller: imagesController,
                    selectedColor: Colors.grey,
                    color: Colors.white,
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  _buildProductTitleWidget() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: Center(
        child: Text(
          //name,
          "Step ID - " + model.id,
          style: TextStyle(
              fontSize: 16.0, color: Colors.black, fontFamily: 'Montserrat'),
        ),
      ),
    );
  }

  _buildBodyContentProduct() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            "Time: " + model.time,
            style: TextStyle(
                fontSize: 14.0, color: Colors.black, fontFamily: 'Montserrat'),
          ),
          SizedBox(height: 10.0),
          Text(
            "Origin: " + model.origin,
            textAlign: TextAlign.start,
            style: TextStyle(
                fontSize: 14.0, color: Colors.black, fontFamily: 'Montserrat'),
          ),
          SizedBox(height: 10.0),
          Text(
            "Location at: " + model.location_at,
            textAlign: TextAlign.start,
            style: TextStyle(
                fontSize: 14.0, color: Colors.black, fontFamily: 'Montserrat'),
          ),
          SizedBox(height: 10.0),
          Text(
            "Owner: " + model.owner,
            textAlign: TextAlign.start,
            style: TextStyle(
                fontSize: 14.0, color: Colors.black, fontFamily: 'Montserrat'),
          ),
        ],
      ),
    );
  }
}
