import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/pages/component/bottom_sheet_full_height.dart';
import 'package:tab_navigator/pages/component/popup_aggreration.dart';
import 'package:tab_navigator/pages/facility/facility_screen.dart';
import 'package:timeline_list/timeline.dart';
import 'package:timeline_list/timeline_model.dart';
import 'package:url_launcher/url_launcher.dart';
import 'item_data.dart';
import 'package:tab_navigator/pages/over_view_product/model_events_product.dart';
import 'package:tab_navigator/services/product_service.dart';
import 'package:tab_navigator/contanst/icons.dart';

class TimeLines extends StatefulWidget {
  final idProduct;
  final String name;

  TimeLines({this.idProduct, this.name});

  @override
  State<StatefulWidget> createState() {
    return TimeLinesState();
  }
}

class TimeLinesState extends State<TimeLines> {
  ModelEventsProduct model;
  bool isLoading = true;

  @override
  void initState() {
    print(widget.idProduct);
    getData(widget.idProduct);
    super.initState();
  }

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
          widget.name != null ? "'${widget.name}' events" : 'Step Product',
          style: TextStyle(
              color: Colors.black, fontSize: 20.0, fontFamily: 'Montserrat'),
        ),
      ),
      body: isLoading
          ? Center(
              child: SpinKitDoubleBounce(
                color: Colors.black,
                size: Helpers.resizeByWidth(context, 50),
              ),
            )
          : timelineModel(TimelinePosition.Left),
    );
  }

  timelineModel(TimelinePosition position) => Timeline.builder(
        itemBuilder: centerTimelineBuilder,
        position: position,
        itemCount: model.events.length,
        physics: position == TimelinePosition.Left
            ? ClampingScrollPhysics()
            : BouncingScrollPhysics(),
      );

  TimelineModel centerTimelineBuilder(BuildContext context, int i) {
    final _data = model.events[i];

    return TimelineModel(
      GestureDetector(
          child: Card(
            margin: EdgeInsets.symmetric(vertical: 16.0),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0)),
            clipBehavior: Clip.antiAlias,
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                    margin: const EdgeInsets.only(left: 10),
                    child: Text(
                      formatNameEvent(_data.name),
                      style: new TextStyle(
                        fontSize: Helpers.resizeByWidth(context, 20),
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(
                    height: 8.0,
                  ),
                  Container(
                    child: Row(
                      children: <Widget>[
                        Container(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                'Create at: ' +
                                    Helpers.convertDateInvoiceStringWithoutD(
                                        _data.createdAt),
                                style: new TextStyle(
                                  fontSize: Helpers.resizeByWidth(context, 12),
                                  fontFamily: 'Montserrat',
                                ),
                              ),
                              const SizedBox(
                                height: 8.0,
                              ),
                              Text(
                                'Sold at: ' +
                                    Helpers.convertDateInvoiceStringWithoutD(
                                        _data.soldAt),
                                style: new TextStyle(
                                  fontSize: Helpers.resizeByWidth(context, 12),
                                  fontFamily: 'Montserrat',
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          alignment: Alignment.center,
                          width: 34,
                          height: 34,
                          margin: EdgeInsets.only(left: 15, top: 5),
                          child: FlatButton(
                            padding: EdgeInsets.all(3),
                            child: Image.asset(
                              ListIcon.ic_link,
                              fit: BoxFit.cover,
                            ),
                            shape: CircleBorder(),
                            color: Colors.white70,
                            onPressed: () => _launchURL(_data.transactionId),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 8.0,
                  ),
                ],
              ),
            ),
          ),
          onTap: () {
            if (_data.childrens != null) {
              showPopupAggregation(_data, 'AGGREGATION');
            } else if (_data.name == 'TRANSFORMATION') {
              showPopupAggregation(_data, 'TRANSFORMATION');
            } else if (_data.name == 'START_DELIVERY') {
              showPopupDelivery(_data);
            }
          }),
      icon: Icon(Icons.adjust),
      isFirst: i == 0,
      iconBackground: Colors.white,
      isLast: i == datas.length,
      position:
          i % 2 == 0 ? TimelineItemPosition.right : TimelineItemPosition.left,
    );
  }

  /// hieu.nguyen: Function get data events from production.
  Future getData(String idProduct) async {
    await ProductService().getEventsProduct(idProduct).then((response) {
      print(model);
      setState(() {
        model = response;
        isLoading = false;
      });
    });
  }

  String formatNameEvent(String name) {
    String nameFormatted = '';
    List<String> temp = name.split('_');
    if (temp != null && temp.length > 1) {
      for (var i in temp) {
        nameFormatted = nameFormatted + i + ' ';
      }
      return nameFormatted;
    } else {
      return name;
    }
  }

  /// hieu.nguyen: Fucntion show popup AGGREGATION & TRANSFORMATION
  void showPopupAggregation(Event _event, String _title) {
    showModalBottomSheetFullHeight(
      context: context,
      maxHeight: MediaQuery.of(context).size.height * 0.5,
      builder: (BuildContext context) {
        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {},
          child: new PopupAggregation(
            event: _event,
            title: _title,
          ),
        );
      },
    );
  }

  /// hieu.nguyen: build UI popup delivery info.
  Widget buildPopupDelivery(Event _event) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Delivery information',
          style: TextStyle(
              fontSize: Helpers.resizeByWidth(context, 20),
              fontFamily: 'Montserrat',
              color: Colors.white,
              fontWeight: FontWeight.bold),
        ),
        backgroundColor: ColorStyles.color_background_intro_30,
      ),
      backgroundColor: Colors.white,
      body: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(right: 10, left: 30),
                child: Text(
                  'From:',
                  style: TextStyle(
                    fontSize: Helpers.resizeByWidth(context, 16),
                    fontFamily: 'Montserrat',
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.only(right: 10),
                child: FlatButton(
                  color: Colors.white,
                  padding: EdgeInsets.all(0),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => Facility(
                              idFacility: _event.fromFacilityId,
                            )));
                  },
                  child: Text(
                    _event.fromFacilityName,
                    style: TextStyle(
                      fontSize: Helpers.resizeByWidth(context, 16),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(right: 10, left: 30),
                child: Text(
                  'To:',
                  style: TextStyle(
                    fontSize: Helpers.resizeByWidth(context, 16),
                    fontFamily: 'Montserrat',
                  ),
                ),
              ),
              Container(
                margin: const EdgeInsets.only(right: 10, top: 5),
                child: FlatButton(
                  color: Colors.white,
                  padding: EdgeInsets.all(0),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => Facility(
                              idFacility: _event.toFacilityId,
                            )));
                  },
                  child: Text(
                    _event.toFacilityName,
                    style: TextStyle(
                      fontSize: Helpers.resizeByWidth(context, 16),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                      color: Colors.black,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Container(
                margin: const EdgeInsets.only(left: 30),
                child: Text(
                  'Delivered by ',
                  style: TextStyle(
                    fontSize: Helpers.resizeByWidth(context, 16),
                    fontFamily: 'Montserrat',
                  ),
                ),
              ),
              Container(
                child: FlatButton(
                  color: Colors.white,
                  padding: EdgeInsets.all(0),
                  onPressed: () {
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (context) => Facility(
                              idFacility: _event.deliveredByFacilityId,
                            )));
                  },
                  child: Text(
                    _event.deliveredByFacilityName,
                    style: TextStyle(
                        fontSize: Helpers.resizeByWidth(context, 16),
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        decoration: TextDecoration.underline,
                        color: Colors.black),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  /// hieu.nguyen: Function show popup delivery information.
  void showPopupDelivery(Event _event) {
    showModalBottomSheetFullHeight(
      context: context,
      maxHeight: Helpers.resizeByWidth(context, 250),
      builder: (BuildContext context) {
        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () {},
          child: buildPopupDelivery(_event),
        );
      },
    );
  }

  /// hieu.nguyen: function open browser read detail transaction.
  Future _launchURL(String transactionID) async {
    String url = 'https://jungle.bloks.io/transaction/$transactionID';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }
}
