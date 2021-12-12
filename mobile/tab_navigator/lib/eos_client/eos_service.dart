import 'package:eosdart/eosdart.dart';
import 'package:eosdart/eosdart.dart' as prefix0;
import 'package:flutter/material.dart';
import 'package:tab_navigator/contanst/helper.dart';
import 'package:tab_navigator/eos_client/model_error_response.dart';
import 'package:tab_navigator/widget/dialog_info.dart';
import 'package:tab_navigator/contanst/icons.dart';
import 'package:tab_navigator/widget/progress_dialog.dart';
import 'dart:convert';

class EosClientService {
  /// hieu.nguyen: init variables use in Eos.
  EOSClient _eosClient;
  String currency;
  Progress_Dialog pr;
  String keyFotra = '5JwjnTWhk5GSXdi36DtgHPCmhdq29WyW1SudZ4BcspXVCCW8sRh';
  final String privateKey;

  /// hieu.nguyen: init eosClient.
  EosClientService({this.privateKey}) {
    _eosClient = EOSClient('https://api.testnet.eos.io', 'v1',
        privateKeys: [privateKey]);
  }

  /// hieu.nguyen: function transfer EOS.
  void transferEOS(BuildContext context, double eos, String from, String to,
      String message) {
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = from
    ];

    Map data = {
      'from': from,
      'to': to,
      'quantity': '${eos.toStringAsFixed(4)} TNT',
      'memo': message
    };
    print(data.toString());

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'eosio.token'
        ..name = 'transfer'
        ..authorization = auth
        ..data = data
    ];
    Transaction transaction = Transaction()..actions = actions;
    _eosClient.getAccount('sgexlcsqpwtc').then((value){
      print(value.toJson());
    });
    _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      print('errorEos: ${errModel.toMap()}');
      pr.getProgresDialog.hide();
      DialogInfo().showImageDialog(
          context, '', errModel.message, true, ListIcon.ic_error);
    });
  }

  /// hieu.nguyen: function push transaction in smart contract.
  void functionHi(String contract, String message) {
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = 'sgexlcsqpwtc'
    ];

    Map data = {
      'from': contract,
      'message': message,
    };

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = contract
        ..name = 'hi'
        ..authorization = auth
        ..data = data
    ];
    Transaction transaction = Transaction()..actions = actions;
    _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      print(trx);
    });
  }

  /// hieu.nguyen: Function rating in Eos
  Future<bool> functionRating(
      BuildContext context,
      String idRating,
      String idProduct,
      String content,
      int star,
      String account,
      double stakeAmount) async {
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = account
    ];

    Map data = {
      'id': idRating,
      'productId': idProduct,
      'content': content,
      'star': star,
      'owner': account,
      'stakeAmount': (stakeAmount * 10000).toInt()
    };

    print(data.toString());

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'sgexlcsqpwtc'
        ..name = 'newratting'
        ..authorization = auth
        ..data = data
    ];

    Transaction transaction = Transaction()..actions = actions;
    await _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      DialogInfo().showImageDialog(context, errModel.code.toString(),
          errModel.message, true, ListIcon.ic_error);
    });
    return true;
  }

  /// hieu.nguyen: Function get currency balance in Eos
  Future<String> getCurrencyBalance(String eos) async {
    await _eosClient.getTableRow('sgexlcsqpwtc', eos, 'balance').then((value) {
      print(value.values.toString());
      currency = value.values.toString();
      currency = currency.substring(1, currency.length - 1);
    }).catchError((err) {
      print(err);
      return '';
    });
    return currency ?? '';
  }

  /// hieu.nguyen: Function like rating in Eos
  Future<bool> likeRating(BuildContext context, String idRating, String account,
      double stakeAmount) async {
    print(idRating + account);
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = account
    ];

    Map data = {
      'rattingId': idRating,
      'owner': account,
      'stakeAmount': (stakeAmount * 10000).toInt()
    };

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'sgexlcsqpwtc'
        ..name = 'likerat'
        ..authorization = auth
        ..data = data
    ];

    Transaction transaction = Transaction()..actions = actions;
    await _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      DialogInfo().showImageDialog(context, errModel.code.toString(),
          errModel.message, true, ListIcon.ic_error);
    });
    return true;
  }

  /// hieu.nguyen: Function dislike rating in Eos
  Future<bool> dislikeRating(BuildContext context, String idRating,
      String account, double stakeAmount) async {
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = account
    ];

    Map data = {
      'rattingId': idRating,
      'owner': account,
      'stakeAmount': (stakeAmount * 10000).toInt()
    };

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'sgexlcsqpwtc'
        ..name = 'dislikerat'
        ..authorization = auth
        ..data = data
    ];

    Transaction transaction = Transaction()..actions = actions;
    await _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      DialogInfo().showImageDialog(context, errModel.code.toString(),
          errModel.message, true, ListIcon.ic_error);
    });
    return true;
  }

  /// hieu.nguyen: Function delete rating in Eos
  Future<bool> deleteRating(
      BuildContext context, String idRating, String account) async {
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = account
    ];

    Map data = {
      'id': idRating,
    };

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'sgexlcsqpwtc'
        ..name = 'delratting'
        ..authorization = auth
        ..data = data
    ];

    Transaction transaction = Transaction()..actions = actions;
    await _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      DialogInfo().showImageDialog(context, errModel.code.toString(),
          errModel.message, true, ListIcon.ic_error);
    });
    return true;
  }


  /// hieu.nguyen: Function dislike rating in Eos
  Future<bool> deleteVoteRating(BuildContext context, String idRating,
      String account) async {
    pr = new Progress_Dialog(context);
    pr.getProgresDialog.show();
    List<Authorization> auth = [
      Authorization()
        ..permission = 'owner'
        ..actor = account
    ];

    Map data = {
      'owner': account,
      'rattingId': idRating
    };

    List<prefix0.Action> actions = [
      prefix0.Action()
        ..account = 'sgexlcsqpwtc'
        ..name = 'delvoterat'
        ..authorization = auth
        ..data = data
    ];

    Transaction transaction = Transaction()..actions = actions;
    await _eosClient.pushTransaction(transaction, broadcast: true).then((trx) {
      if (trx != null) {
        pr.getProgresDialog.hide();
        DialogInfo().showImageDialog(context, '', 'Your transaction succeeded',
            true, ListIcon.ic_success);
      }
    }).catchError((err) {
      pr.getProgresDialog.hide();
      ErrorResponse errModel = ErrorResponse.fromMap(json.decode(err));
      DialogInfo().showImageDialog(context, errModel.code.toString(),
          errModel.message, true, ListIcon.ic_error);
    });
    return true;
  }
}
