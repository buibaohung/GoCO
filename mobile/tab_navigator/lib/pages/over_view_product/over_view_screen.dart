import 'dart:math';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:tab_navigator/contanst/network.dart';
import 'package:flutter/cupertino.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:rating_dialog/rating_dialog.dart';
import 'package:tab_navigator/eos_client/eos_service.dart';
import 'package:tab_navigator/locator.dart';
import 'package:tab_navigator/pages/card_view/time_lines.dart';
import 'package:tab_navigator/pages/over_view_product/model_product_response.dart';
import 'package:tab_navigator/pages/over_view_product/model_response_rating.dart';
import 'package:tab_navigator/pages/over_view_product/model_response_recommend.dart';
import 'package:tab_navigator/pages/profile_screen/model_user_profile_response.dart';
import 'package:tab_navigator/pages/recently_scan/model_recently_product.dart';
import 'package:tab_navigator/services/authentication_service.dart';
import 'package:tab_navigator/services/share_pref_service.dart';
import 'package:tab_navigator/services/user_profile_service.dart';
import 'package:tab_navigator/widget/item_carousel.dart';
import 'package:tab_navigator/widget/item_comment.dart';
import 'package:tab_navigator/widget/stars_display_widget.dart';
import 'package:tab_navigator/model/model_comment.dart';
import 'package:carousel_pro/carousel_pro.dart';
import 'package:tab_navigator/services/product_service.dart';
import 'package:tab_navigator/widget/no_data_screen.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/contanst/colors.dart';

class OverViewProduct extends StatefulWidget {
  final id;

  OverViewProduct({this.id});

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return OverViewProductState();
  }
}

class OverViewProductState extends State<OverViewProduct> {
  ///Initlization model.

  ModelListRating listComment;

  ModelResponseRecommend listRecommend;

  /// hieu.nguyen: list url image for carousel
  List<String> listImage = [
    ListIcon.ca_chua_image,
    ListIcon.ca_chua_2_image,
    ListIcon.ca_chua_3_image
  ];

  /// hieu.nguyen: image in comment.

  ModelProduct model;
  bool _isLoadSuccessed = false;
  bool _isError = false;
  double currency;
  UserProfileResponseModel user;
  String eosAccount;
  String userName;
  String userId;
  String IdRatingToEos;
  String idResponseProduct;
  int durationTimes;
  DateTime startTime;
  DateTime endTime;
  String privateKey;

  @override
  void initState() {
    super.initState();
    print(widget.id);

    SharedPrefService().getPrivateKey().then((key) {
      setState(() {
        privateKey = key;
      });
    });

    UserProfileService().doGetData(NetworkBase.token).then((response) {
      ///stream data user profile
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();

      if (response != null) {
        print(response.toMap());
        setState(() {
          _authenticationService.saveUserProfile(response);
          user = Provider.of<UserProfileResponseModel>(context);
          eosAccount = response.eosUsername;
          userName = response.name;
          userId = response.id;
          print(response.eosUsername);
        });
      }

      /// load currency
      SharedPrefService().getPrivateKey().then((key) {
        EosClientService(privateKey: key)
            .getCurrencyBalance(response.eosUsername)
            .then((value) async {
          setState(() {
            currency = double.parse(value.toString());
            print(currency);
          });
        }).catchError((err) {
          print('Error get currency: ' + err.toString());
        });
      });
    }).catchError((err) {
      print('Error get profile api: ' + err.toString());
    });

    ProductService().getInfoProduct(widget.id).then((response) {
      if (response.id != null) {
        /// check list model recently
        SharedPrefService().getListRecently().then((listModel) {
          if (Helpers.checkListRecently(listModel, widget.id)) {
            RecentlyProduct model = new RecentlyProduct(
                id: widget.id,
                price: response.price ?? 0,
                rating: response.rating ?? 0,
                name: response.name,
                url: response.avatar);

            print(model.toMap());
            if (listModel != null) {
              print('Have data to add');
              listModel.recentlyProduct.add(model);
              SharedPrefService().saveListRecently(listModel);
            } else {
              print('No data to add');
              List<RecentlyProduct> tempList = new List<RecentlyProduct>();
              tempList.add(model);
              ListRecentlyProduct newListModel = new ListRecentlyProduct(recentlyProduct: tempList);
              SharedPrefService().saveListRecently(newListModel);
            }
          }
        });

        /// load list comment.
        ProductService().getListComment(response.id).then((listRating) {
          ///load lít product recommend
          ProductService()
              .getProductRecommend(response.id)
              .then((listRecommendResponse) {
            listRecommend = listRecommendResponse;

            /// call api track view product
            ProductService().trackView(response.id).then((value) {
              setState(() {
                startTime = DateTime.now();
              });
            });

            setState(() {
              /// set flag to display
              listComment = listRating;
              model = response;
              idResponseProduct = response.id;
              print(model.toMap());

              _isLoadSuccessed = true;
            });
          }).catchError((err) {
            print('Error get api list product recommend ' + err);
          });
        }).catchError((err) {
          print('Error get api list comment: ' + err);
        });
      } else {
        setState(() {
          _isLoadSuccessed = true;
          _isError = true;
        });
      }
    }).catchError((err) {
      setState(() {
        _isLoadSuccessed = true;
        _isError = true;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    String textComment;
    double eos;
    int ratingResult;

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
                child: coursePrice(),
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
                                value: loadingProgress.expectedTotalBytes !=
                                        null
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
                /// call api track view times.
                endTime = DateTime.now();
                int times = endTime.second - startTime.second;
                ProductService()
                    .trackViewTimes(idResponseProduct, times)
                    .then((response) {});
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

    /// hieu.nguyen: build dialog comment.
    Dialog commentDialog = Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ), //this right here
      child: Container(
        height: Helpers.resizeByWidth(context, 350),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Container(
              padding: EdgeInsets.symmetric(vertical: 3.0, horizontal: 15.0),
              child: Material(
                shape: CircleBorder(),
                elevation: 8.0,
                child: CircleAvatar(
                  radius: 40.0,
                  backgroundColor: Colors.white,
                  child: ClipOval(
                    child: Image.asset(ListIcon.ic_comment),
                  ),
                ),
              ),
            ),
            Container(
              padding: EdgeInsets.all(10.0),
              child: Text(
                'Comment',
                style: TextStyle(
                    color: Colors.black,
                    fontSize: Helpers.resizeByWidth(context, 16),
                    fontFamily: 'Montserrat'),
              ),
            ),
            Container(
              padding: EdgeInsets.all(10),
              child: TextField(
                keyboardType: TextInputType.multiline,
                decoration: InputDecoration(
                  hintText: "Entering your comment",
                  hintStyle: TextStyle(
                      color: Colors.grey,
                      fontSize: Helpers.resizeByWidth(context, 14),
                      fontFamily: 'Montserrat'),
                ),
                onChanged: (value) => textComment = value,
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              child: Row(
                children: <Widget>[
                  Text(
                    'Token submit:',
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: Helpers.resizeByWidth(context, 14),
                        fontFamily: 'Montserrat'),
                  ),
                  Expanded(
                    child: Container(
                      margin: EdgeInsets.only(left: 6),
                      child: TextField(
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                          hintText: "number token",
                          hintStyle: TextStyle(
                              color: Colors.grey,
                              fontSize: Helpers.resizeByWidth(context, 14),
                              fontFamily: 'Montserrat'),
                        ),
                        textAlign: TextAlign.center,
                        onChanged: (value) => eos = double.parse(value),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.all(5),
                      child: FlatButton(
                        color: ColorStyles.color_background_intro_30,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(6.0)),
                        child: new Text(
                          'Cancel',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.all(5),
                      child: FlatButton(
                        color: ColorStyles.color_background_intro_30,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(6.0),
                        ),
                        child: new Text(
                          'Send',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () {
                          /// action push comment to Eos.
                          Navigator.of(context).pop(textComment);
                          pushRatingEos(textComment, IdRatingToEos,
                              ratingResult, eos, eosAccount);

                          /// need reload list comment.
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );

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
                onPressed: () {
                  /// call api track view times.
                  endTime = DateTime.now();
                  int times = endTime.second - startTime.second;
                  ProductService()
                      .trackViewTimes(idResponseProduct, times)
                      .then((response) {});

                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => TimeLines(
                        idProduct: widget.id,
                        name: model.name,
                      ),
                    ),
                  );
                },
                color: ColorStyles.color_background_intro_30,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                child: Text(
                  "READ MORE",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 16.0,
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold),
                ),
              ),
            ),
            SizedBox(height: 15.0),
            GestureDetector(
              child: Text(
                "Rating?",
                style: TextStyle(
                  fontSize: 16.0,
                  decoration: TextDecoration.underline,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Montserrat',
                ),
              ),

              /// hieu.nguyen: build dialog ratting stars.
              onTap: () {
                showDialog(
                  context: context,
                  barrierDismissible: true,
                  // set to false if you want to force a rating
                  builder: (context) {
                    return RatingDialog(
                      icon: Icon(
                        Icons.rate_review,
                        size: Helpers.resizeByWidth(context, 80),
                        color: Colors.red,
                      ),

                      /// option for dialog.
                      title: "Rating",
                      description: "Tap a star to set your rating",
                      submitButton: "Submit",
                      accentColor: Colors.red,

                      /// event press submit
                      onSubmitPressed: (int rating) {
                        setState(() {
                          ratingResult = rating;
                        });

                        /// call function get Id rating --> to push Eos.
                        getIdRatingEos();
                        showDialog(
                            barrierDismissible: true,
                            context: context,
                            builder: (context) => commentDialog);
                      },
                    );
                  },
                );
              },
            ),
          ],
        ),
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

    /// hieu.nguyen: build carousel recommendation.
    Widget buildCarouselRecommend() {
      return Container(
        height: MediaQuery.of(context).size.height * 0.42,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              margin: EdgeInsets.fromLTRB(20, 15, 5, 0),
              child: Text(
                "Recommendation",
                style: new TextStyle(
                  fontSize: Helpers.resizeByWidth(context, 20),
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            ),
            Container(
              padding: EdgeInsets.only(left: 20),
              width: Helpers.resizeByWidth(context, 200),
              child: new Divider(color: Colors.black),
            ),
            listRecommend.products.length > 0
                ? CarouselSlider(
                    autoPlay: true,
                    items: listRecommend.products
                        .map((i) => ItemCarousel(
                              id: i.id,
                              name: i.name,
                              price:
                                  i.price != null ? i.price.toDouble() : null,
                              rating: i.rating.round(),
                              url: i.avatar,
                              isProduct: true,
                            ))
                        .toList(),
                    height: MediaQuery.of(context).size.height * 0.3,
                  )
                : Container(),
          ],
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
            Padding(
              padding: EdgeInsets.only(
                left: Helpers.resizeByWidth(context, 20),
              ),
              child: Text(
                "Comments",
                style: new TextStyle(
                  fontSize: Helpers.resizeByWidth(context, 20),
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            ),
            Container(
              padding: EdgeInsets.only(left: 20),
              width: Helpers.resizeByWidth(context, 140),
              child: new Divider(color: Colors.black),
            ),
            if (listComment != null && listComment.ratings != null)
              for (var item in listComment.ratings)
                ItemComment(
                  rating: item,
                  contextIntent: context,
                  eosAccount: eosAccount ?? null,
                  privateKey: privateKey ?? null,
                  function: updateListComment,
                  userId: userId,
                ),

//            ListView.builder(
//              shrinkWrap: true,
//              itemCount: listComment.ratings.length,
//              itemBuilder: (context,index){
//                return ItemComment(
//                    rating: listComment.ratings[index],
//                    contextIntent: context,
//                    eosAccount: eosAccount ?? null,
//                    privateKey: privateKey ?? null,
//                    userId: userId,
//                    function: updateListComment);
//              },
//            ),
            buildCarouselRecommend(),
          ],
        ),
      );
    }

    /// hieu.nguyen: build Body.
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

  String generateId() {
    var rng = new Random.secure();
    return rng.nextInt(1000000).toString();
  }

  /// hieu.nguyen: Function get id rating to Eos
  Future getIdRatingEos() async {
    await ProductService().getIdRating().then((response) {
      if (response != null) {
        setState(() {
          IdRatingToEos = response.id;
        });
      }
    });
  }

  /// hieu.nguyen: Function PUSH rating to Eos.
  void pushRatingEos(String textComment, String idRating, int ratingResult,
      double eos, String eosAccount) {
    SharedPrefService().getPrivateKey().then((key) {
      EosClientService(privateKey: key)
          .functionRating(context, idRating, model.id, textComment,
              ratingResult, eosAccount, eos)
          .then((result) {
        if (result == true) {
          ProductService().getListComment(idResponseProduct).then((listRating) {
            setState(() {
              listComment = listRating;
            });
          }).catchError((err) {
            print('Error get api list comment: ' + err);
          });
        }
      });
    });
  }

  /// hieu.nguyen: function get data profile.
  void getDataProfile(token) {
    UserProfileService().doGetData(token).then((response) {
      ///stream data user profile
      final AuthenticationService _authenticationService =
          locator<AuthenticationService>();

      _authenticationService.saveUserProfile(response);
      user = Provider.of<UserProfileResponseModel>(context);

      setState(() {
        eosAccount = user.eosUsername;
        print(user.name);
      });
      SharedPrefService().getPrivateKey().then((key) {
        loadCurrency(response.eosUsername, key);
      });
    }).catchError((err) {});
  }

  /// hieu.nguyen: function get currency balance in eos.
  Future<void> loadCurrency(String eos, String key) async {
    await EosClientService(privateKey: key)
        .getCurrencyBalance(eos)
        .then((value) async {
      setState(() {
        currency = double.parse(value.toString());
        print(currency);
      });
    }).catchError((err) {});
  }

  /// hieu.nguyen: update list comment.
  void updateListComment() {
    print('update list comment');
    ProductService().getListComment(idResponseProduct).then((listRating) {
      if (listRating.ratings != null) {
        setState(() {
          listComment = new ModelListRating();
          listComment = listRating;
        });
        print(listComment.toMap());
      }
    }).catchError((err) {
      print('Error get api list comment: ' + err);
    });
  }
}
