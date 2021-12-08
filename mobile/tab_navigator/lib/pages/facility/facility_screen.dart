import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/pages/facility/model_response_facility.dart';
import 'package:tab_navigator/services/product_service.dart';

class Facility extends StatefulWidget {
  final idFacility;

  Facility({this.idFacility});

  @override
  State<StatefulWidget> createState() {
    return FacilityState();
  }
}

class FacilityState extends State<Facility> {
  ModelFacility modelFacility;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    ProductService().getFacilityInfo(widget.idFacility).then((response) {
      setState(() {
        modelFacility = response;
        isLoading = false;
      });
    }).catchError((err) {
      setState(() {
        isLoading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Facility information',
          style: TextStyle(
              fontSize: Helpers.resizeByWidth(context, 20),
              fontFamily: 'Montserrat',
              color: Colors.white,
              fontWeight: FontWeight.bold),
        ),
        backgroundColor: ColorStyles.color_background_intro_30,
      ),
      backgroundColor: Colors.white,
      body: isLoading
          ? Center(
              child: SpinKitDoubleBounce(
                color: Colors.black,
                size: Helpers.resizeByWidth(context, 50),
              ),
            )
          : buildBody(modelFacility),
    );
  }

  Widget buildBody(ModelFacility model) {
    return SingleChildScrollView(
      child: Column(
        children: <Widget>[
          SizedBox(height: 30),
          buildNameFacility(model.facility.name),
          SizedBox(height: 30),
          buildContent('ID', model.facility.id),
          buildContent('Eos name', model.facility.eosUsername),
          buildContent('Type', model.facility.type),
          buildContent('Email', model.facility.email),
          buildContent('Phone', model.facility.phoneNumber),
          buildContent('Website', model.facility.website),
          buildContent('Location', model.facility.location),
          buildContent(
              'Created at',
              Helpers.convertDateInvoiceStringWithoutD(
                  model.facility.createdAt)),
          buildContent(
              'Updated at',
              Helpers.convertDateInvoiceStringWithoutD(
                  model.facility.updatedAt)),
        ],
      ),
    );
  }

  Widget buildNameFacility(String name) {
    return Container(
      alignment: Alignment.center,
      child: Text(
        name,
        style: TextStyle(
          fontSize: Helpers.resizeByWidth(context, 24),
          fontFamily: 'Montserrat',
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
    );
  }

  Widget buildContent(String title, String content) {
    return Container(
      margin: EdgeInsets.only(left: 10, bottom: 20, right: 5),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Expanded(
            flex: 2,
            child: Container(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: Helpers.resizeByWidth(context, 16),
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            ),
          ),
          Expanded(
            flex: 4,
            child: Container(
              child: Text(
                content,
                style: TextStyle(
                  fontSize: Helpers.resizeByWidth(context, 16),
                  fontFamily: 'Montserrat',
                  color: Colors.black,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
