import 'package:shared_preferences/shared_preferences.dart';
import 'package:tab_navigator/pages/login/cache_user.dart';
import 'package:tab_navigator/pages/recently_scan/model_recently_product.dart';
import 'dart:convert';

class SharedPrefService {
  static SharedPrefService _instance = new SharedPrefService._internal();

  SharedPrefService._internal();

  factory SharedPrefService() => _instance;

  Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

  /// hieu.nguyen: method get private Key in SharePref
  Future<String> getPrivateKey() async {
    final SharedPreferences prefs = await _prefs;

    return prefs.getString('privateKey') ?? '';
  }

  /// hieu.nguyen: method save private Key in SharePref.
  Future<bool> savePrivateKey(String key) async {
    final SharedPreferences prefs = await _prefs;

    return prefs.setString('privateKey', key);
  }

  /// hieu.nguyen: Function save token to SharedPref.
  Future<void> saveToken(String token) async {
    final SharedPreferences prefs = await _prefs;

    prefs.setString('token', token);
  }

  /// hieu.nguyen: Function get token in SharedPref.
  Future<String> getToken() async {
    final SharedPreferences prefs = await _prefs;

    return prefs.getString('token') ?? '';
  }

  /// hieu.nguyen: Function save user cache.
  Future<void> saveUserCache(String phone, String pass) async {
    final SharedPreferences prefs = await _prefs;

    UserCache userCache = new UserCache(phoneNumber: phone, password: pass);
    prefs.setString('userCache', json.encode(userCache.toMap()));
  }

  /// hieu.nguyen: Function get info user cache.
  Future<String> getUserCache() async {
    final SharedPreferences prefs = await _prefs;

    return prefs.get('userCache') ?? '';
  }

  /// hieu.nguyen: save list recently product
  Future<bool> saveListRecently(ListRecentlyProduct listModel) async {
    final SharedPreferences prefs = await _prefs;

    if (listModel != null) {
      return prefs.setString(
          "listRecentlyProduct", json.encode(listModel.toMap()));
    }
    return prefs.setString("listRecentlyProduct", null);
  }

  /// hieu.nguyen: get list recently product
  Future<ListRecentlyProduct> getListRecently() async {
    final SharedPreferences prefs = await _prefs;

    String model = prefs.getString("listRecentlyProduct") ?? null;
    if (model != null) {
      return ListRecentlyProduct.fromMap(json.decode(model));
    }
    return null;
  }
}
