import 'dart:async';
import 'dart:core';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tab_navigator/contanst/colors.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/eos_client/eos_service.dart';
import 'package:tab_navigator/widget/stars_display_widget.dart';
import 'package:tab_navigator/pages/over_view_product/model_response_rating.dart';

class ItemComment extends StatefulWidget {
  /// hieu.nguyen: constructor for item UI.
  final Rating rating;
  final BuildContext contextIntent;
  final String eosAccount;
  final String privateKey;
  final Function function;
  final String userId;

//  ItemComment(
//      {this.rating,
//      this.contextIntent,
//      this.eosAccount,
//      this.privateKey,
//      this.function,
//      this.userId});

  const ItemComment(
      {Key key,
      this.rating,
      this.contextIntent,
      this.eosAccount,
      this.privateKey,
      this.function,
      this.userId})
      : assert(rating != null),
        super(key: key);

  @override
  State<StatefulWidget> createState() {
    return new ItemCommentState();
  }
}

class ItemCommentState extends State<ItemComment> {
  Rating ratingModel;
  double eos;
  BuildContext contextOverView;
  String privateKey;
  String eosAccount;
  String userId;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    setState(() {
      ratingModel = widget.rating;
      contextOverView = widget.contextIntent;
      eosAccount = widget.eosAccount ?? null;
      privateKey = widget.privateKey ?? null;
      userId = widget.userId;
    });
    print(ratingModel.toMap());
    final buildAvatar = Container(
      padding: EdgeInsets.all(4.0),
      child: CircleAvatar(
        child: Text(
          ratingModel.userName[0].toUpperCase(),
        ),
        backgroundColor: Colors.teal,
      ),
    );

    /// hieu.nguyen: build text for item comment.
    final buildName = Text(
      "${ratingModel.userName}",
      style: TextStyle(fontSize: 16.0, fontFamily: 'Montserrat'),
    );

    /// hieu.nguyen: build item rating.
    final buildStars = Container(
      padding: EdgeInsets.only(left: 10.0),
      child: IconTheme(
        data: IconThemeData(color: Colors.amber, size: 20.0),
        child: StarDisplay(
          value: ratingModel.star,
        ),
      ),
    );

    /// hieu.nguyen: build item text comment.
    final buildComment = Expanded(
      /// hieu.nguyen: check comment null ?
      child: ratingModel.content != null
          ? Text(
              "${ratingModel.content}",
              style: TextStyle(fontSize: 14.0, fontFamily: 'Montserrat'),
              textAlign: TextAlign.start,
            )
          : Container(),
    );

    final buildStake = Container(
      margin: EdgeInsets.only(left: 10),
      child: ratingModel.stake % 10000 == 0
          ? Text(
              '${Helpers.currencyFormatted(ratingModel.stake * 0.0001, ' Eos')}',
              style: TextStyle(fontSize: 14.0, fontFamily: 'Montserrat'),
            )
          : Text(
              '${Helpers.eosFormatted(ratingModel.stake * 0.0001, ' Eos')}',
              style: TextStyle(fontSize: 14.0, fontFamily: 'Montserrat'),
            ),
    );

    /// hieu.nguyen: build UI comment.
    return GestureDetector(
      child: Card(
        margin: EdgeInsets.symmetric(vertical: 10.0),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        child: Padding(
          padding: EdgeInsets.all(10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Row(
                children: <Widget>[
                  buildAvatar,
                  SizedBox(width: 5.0),
                  buildName,
                  buildStars,
                  buildStake
                ],
              ),
              Row(
                children: <Widget>[SizedBox(width: 55.0), buildComment],
              ),
              eosAccount != null && privateKey != null
                  ? Row(
                      children: <Widget>[
                        /// LIKE
                        Container(
                          margin: EdgeInsets.only(top: 15, left: 50, right: 50),
                          child: Row(
                            children: <Widget>[
                              Container(
                                width: Helpers.resizeByWidth(context, 34),
                                height: Helpers.resizeByWidth(context, 34),
                                child: FlatButton(
                                  padding: EdgeInsets.all(4),
                                  child: Image.asset(
                                    ListIcon.ic_like,
                                    width: double.infinity,
                                    height: double.infinity,
                                    color: ratingModel.like != null
                                        ? Colors.black
                                        : Colors.grey,
                                  ),
                                  onPressed: () {
                                    if (ratingModel.like != null) {
                                      deleteVoteRating(ratingModel.id);
                                    } else {
                                      showDialog(
                                          context: contextOverView,
                                          barrierDismissible: true,
                                          builder: (contextOverView) =>
                                              showPopupLike());
                                    }
                                  },
                                ),
                              ),

                              /// STAKE LIKE
                              ratingModel.like != null
                                  ? ratingModel.stakeLike % 10000 == 0
                                      ? Container(
                                          margin: EdgeInsets.only(top: 5),
                                          child: Text(
                                            '${ratingModel.like}   (+${Helpers.currencyFormatted(ratingModel.stakeLike * 0.0001, ' Eos')})',
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: Helpers.resizeByWidth(
                                                    context, 14),
                                                fontFamily: 'Montserrat'),
                                          ),
                                        )
                                      : Container(
                                          margin: EdgeInsets.only(top: 5),
                                          child: Text(
                                            '${ratingModel.like}   (+${Helpers.eosFormatted(ratingModel.stakeLike * 0.0001, ' Eos')})',
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: Helpers.resizeByWidth(
                                                    context, 14),
                                                fontFamily: 'Montserrat'),
                                          ),
                                        )
                                  : Container(),
                            ],
                          ),
                        ),

                        /// DISLIKE
                        Container(
                          margin: EdgeInsets.only(
                            top: 15,
                          ),
                          child: Row(
                            children: <Widget>[
                              /// DISLIKE
                              Container(
                                width: Helpers.resizeByWidth(context, 34),
                                height: Helpers.resizeByWidth(context, 34),
                                margin: EdgeInsets.only(
                                  top: 15,
                                ),
                                child: FlatButton(
                                  padding: EdgeInsets.all(4),
                                  child: Image.asset(
                                    ListIcon.ic_dislike,
                                    width: double.infinity,
                                    height: double.infinity,
                                    color: ratingModel.dislike != null
                                        ? Colors.black
                                        : Colors.grey,
                                  ),
                                  onPressed: () {
                                    if (ratingModel.dislike != null) {
                                      deleteVoteRating(ratingModel.id);
                                    } else {
                                      showDialog(
                                          context: contextOverView,
                                          barrierDismissible: true,
                                          builder: (contextOverView) =>
                                              showPopupDisLike());
                                    }
                                  },
                                ),
                              ),

                              /// STAKE DISLIKE
                              ratingModel.dislike != null
                                  ? ratingModel.stakeDislike % 10000 == 0
                                      ? Container(
                                          margin: EdgeInsets.only(top: 5),
                                          child: Text(
                                            '${ratingModel.dislike}   (-${Helpers.currencyFormatted(ratingModel.stakeDislike * 0.0001, ' Eos')})',
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: Helpers.resizeByWidth(
                                                    context, 14),
                                                fontFamily: 'Montserrat'),
                                          ),
                                        )
                                      : Container(
                                          margin: EdgeInsets.only(top: 5),
                                          child: Text(
                                            '${ratingModel.dislike}   (-${Helpers.eosFormatted(ratingModel.stakeDislike * 0.0001, ' Eos')})',
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: Helpers.resizeByWidth(
                                                    context, 14),
                                                fontFamily: 'Montserrat'),
                                          ),
                                        )
                                  : Container(),
                            ],
                          ),
                        ),

                        Spacer(),

                        /// DELETE
                        userId == ratingModel.userId
                            ? Container(
                                margin: EdgeInsets.only(
                                    left: 10, top: 15, right: 15),
                                child: Container(
                                  width: Helpers.resizeByWidth(context, 34),
                                  height: Helpers.resizeByWidth(context, 34),
                                  margin: EdgeInsets.only(
                                    top: 15,
                                  ),
                                  child: FlatButton(
                                    padding: EdgeInsets.all(4),
                                    child: Image.asset(
                                      ListIcon.ic_delete,
                                      width: double.infinity,
                                      height: double.infinity,
                                      color: Colors.grey,
                                    ),
                                    onPressed: () => showDialog(
                                        context: contextOverView,
                                        barrierDismissible: true,
                                        builder: (contextOverView) =>
                                            showDialogDelete()),
                                  ),
                                ),
                              )
                            : Container(),
                      ],
                    )
                  : Container(),
              SizedBox(height: 5),
            ],
          ),
        ),
      ),
    );
  }

  /// hieu.nguyen: build popup dialog show option like.
  Widget showPopupLike() {
    return Dialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        height: Helpers.resizeByWidth(context, 320),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              alignment: Alignment.topRight,
              child: FlatButton(
                shape: CircleBorder(),
                padding: EdgeInsets.zero,
                child: Icon(
                  Icons.close,
                  size: 24,
                  color: Colors.black,
                ),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
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
                          hintText: "number",
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
                  Container(
                    child: FlatButton(
                      child: Icon(
                        Icons.arrow_forward,
                        size: 24,
                      ),
                      onPressed: () {
                        Navigator.of(context).pop();
                        likeRating(ratingModel.id, eos);
                      },
                    ),
                  )
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
              child: FlatButton(
                color: ColorStyles.color_background_intro_30,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.0),
                ),
                child: Center(
                  child: new Text(
                    ' +1 token',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: Helpers.resizeByWidth(context, 14),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                onPressed: () {
                  setState(() {
                    Navigator.of(context).pop();
                    eos = 1;
                    likeRating(ratingModel.id, 1);
                  });
                },
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
              child: FlatButton(
                color: ColorStyles.color_background_intro_30,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.0),
                ),
                child: Center(
                  child: new Text(
                    ' +5 token',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: Helpers.resizeByWidth(context, 14),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                onPressed: () {
                  setState(() {
                    Navigator.of(context).pop();
                    eos = 5;
                    likeRating(ratingModel.id, 5);
                  });
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// hieu.nguyen: show popup option dislike
  Widget showPopupDisLike() {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      child: Container(
        height: Helpers.resizeByWidth(context, 320),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              alignment: Alignment.topRight,
              child: FlatButton(
                shape: CircleBorder(),
                padding: EdgeInsets.zero,
                child: Icon(
                  Icons.close,
                  size: 24,
                  color: Colors.black,
                ),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
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
                          hintText: "number",
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
                  Container(
                    child: FlatButton(
                      child: Icon(
                        Icons.arrow_forward,
                        size: 24,
                      ),
                      onPressed: () {
                        Navigator.of(context).pop();
                        dislikeRating(ratingModel.id, eos);
                      },
                    ),
                  )
                ],
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
              child: FlatButton(
                color: ColorStyles.color_background_intro_30,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.0),
                ),
                child: Center(
                  child: new Text(
                    ' -1 token',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: Helpers.resizeByWidth(context, 14),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                onPressed: () {
                  setState(() {
                    eos = 1;
                    Navigator.of(context).pop();
                    dislikeRating(ratingModel.id, 1);
                  });
                },
              ),
            ),
            Container(
              margin: EdgeInsets.all(10),
              height: 60,
              child: FlatButton(
                color: ColorStyles.color_background_intro_30,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.0),
                ),
                child: Center(
                  child: new Text(
                    ' -5 token',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: Helpers.resizeByWidth(context, 14),
                      fontFamily: 'Montserrat',
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                onPressed: () {
                  setState(() {
                    eos = 5;
                    Navigator.of(context).pop();
                    dislikeRating(ratingModel.id, 5);
                  });
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget showDialogDelete() {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ), //this right here
      child: Container(
        height: Helpers.resizeByWidth(context, 280),
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
                'Do you want to delete this comment?',
                style: TextStyle(
                    color: Colors.black,
                    fontSize: Helpers.resizeByWidth(context, 16),
                    fontFamily: 'Montserrat'),
                textAlign: TextAlign.center,
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
                          'OK',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: Helpers.resizeByWidth(context, 14),
                            fontFamily: 'Montserrat',
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        onPressed: () {
                          /// action delete comment to Eos.
                          Navigator.of(context).pop();

                          deleteRating(ratingModel.id);
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
  }

  void likeRating(String idRating, double token) {
    EosClientService(privateKey: privateKey)
        .likeRating(contextOverView, idRating, eosAccount, token)
        .then((result) {
      /// reload list comment
      if (result == true) {
        Future.delayed(Duration(seconds: 5));
        {
          setState(() {
            print('call api');
            widget.function();
          });
        }
      }
    });
  }

  void dislikeRating(String idRating, double token) {
    EosClientService(privateKey: privateKey)
        .dislikeRating(contextOverView, idRating, eosAccount, token)
        .then((result) {
      /// reload list comment
      if (result == true) {
        Future.delayed(Duration(seconds: 5));
        {
          setState(() {
            print('call api');
            widget.function();
          });
        }
      }
    });
  }

  void deleteRating(String idRating) {
    EosClientService(privateKey: privateKey)
        .deleteRating(context, idRating, eosAccount)
        .then((result) {
      /// reload list comment
      if (result == true) {
        Future.delayed(Duration(seconds: 5));
        {
          setState(() {
            print('call api');
            widget.function();
          });
        }
      }
    });
  }

  void deleteVoteRating(String idRating) {
    EosClientService(privateKey: privateKey)
        .deleteVoteRating(context, idRating, eosAccount)
        .then((result) {
      if (result == true) {
        Future.delayed(Duration(seconds: 5));
        {
          setState(() {
            print('call api');
            widget.function();
          });
        }
      }
    });
  }
}
