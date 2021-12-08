import 'package:flutter/material.dart';
import 'package:flutter_money_formatter/flutter_money_formatter.dart';
import 'package:date_format/date_format.dart';
import 'package:tab_navigator/pages/recently_scan/model_recently_product.dart';

class Helpers {
  static String currencyFormatted(double amount, String endText) {
    FlutterMoneyFormatter moneyFormatter = FlutterMoneyFormatter(
        amount: amount,
        settings: MoneyFormatterSettings(
            thousandSeparator: ',', decimalSeparator: '.'));
    return moneyFormatter.output.withoutFractionDigits + endText;
  }

  static double resizeByWidth(context, double value) {
    double screenWidth = MediaQuery.of(context).size.width;
    double result = value * screenWidth / 375;
    return result ?? value;
  }

  static String convertDateInvoiceStringWithoutD(DateTime date) {
    final todayDate = DateTime.now();
    String currentYear = formatDate(todayDate, [yyyy]);
    String year = formatDate(date, [yyyy]);
    String currentMonth = formatDate(todayDate, [mm]);
    String month = formatDate(date, [mm]);
    String currentDay = formatDate(todayDate, [dd]);
    String day = formatDate(date, [dd]);
    if (currentYear == year && currentMonth == month && currentDay == day) {
      return formatDate(date, [
        HH,
        ':',
        nn,
        ' | ',
        dd,
        '/',
        mm,
        '/',
        yyyy,
      ]); //return formatDate(date, [HH, ':', nn]);
    } else {
      return formatDate(date, [
        HH,
        ':',
        nn,
        ' | ',
        dd,
        '/',
        mm,
        '/',
        yyyy,
      ]);
    }
  }

  static bool checkListRecently(ListRecentlyProduct listModel, String id) {
    if (listModel != null) {
      for (var item in listModel.recentlyProduct) {
        if (item.id == id) {
          return false;
        }
      }
    }
    return true;
  }

  static String eosFormatted(double amount, String endText) {
    FlutterMoneyFormatter moneyFormatter = FlutterMoneyFormatter(
        amount: amount,
        settings: MoneyFormatterSettings(
            thousandSeparator: ',', decimalSeparator: '.'));
    return moneyFormatter.output.nonSymbol + endText;
  }

  static String eosFormattedTransfer(double amount, String endText) {
    FlutterMoneyFormatter moneyFormatter = FlutterMoneyFormatter(
        amount: amount,
        settings: MoneyFormatterSettings(
            thousandSeparator: '.', decimalSeparator: ','));
    return moneyFormatter.output.withoutFractionDigits + endText;
  }
}
