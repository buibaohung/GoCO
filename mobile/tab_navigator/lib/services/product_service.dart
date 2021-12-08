import 'dart:convert';

import 'package:tab_navigator/contanst/network.dart';
import 'package:tab_navigator/main.dart';
import 'package:tab_navigator/pages/over_view_product/model_product_response.dart';
import 'package:tab_navigator/pages/over_view_product/model_id_rating_response.dart';
import 'package:tab_navigator/pages/over_view_product/model_events_product.dart';
import 'package:http/http.dart' as http;
import 'package:tab_navigator/pages/over_view_product/model_response_rating.dart';
import 'package:tab_navigator/pages/facility/model_response_facility.dart';
import 'package:tab_navigator/pages/over_view_product/model_response_recommend.dart';
import 'package:tab_navigator/pages/product_recommender/model_product_recommender_response.dart';

class ProductService {
  /// hieu.nguyen: service get info product.
  Future<ModelProduct> getInfoProduct(String idProduct) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String URL = NetworkBase.Base_URL + "public/product-items/$idProduct";
    final response = await http.get(URL, headers: header);

    if (response.statusCode == 200) {
      return ModelProduct.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: service get ID rating in eos.
  Future<IdRating> getIdRating() async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String URL = NetworkBase.Base_URL + "system/id";

    Map<String, dynamic> params = {
      'table': 'ratings',
    };

    final response =
        await http.post(URL, headers: header, body: json.encode(params));

    if (response.statusCode == 200) {
      return IdRating.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: Function get list events product.
  Future<ModelEventsProduct> getEventsProduct(String idProduct) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String url =
        NetworkBase.Base_URL + "public/product-items/$idProduct/events";

    final response = await http.get(url, headers: header);

    if (response.statusCode == 200) {
      return ModelEventsProduct.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: Function get list rating & comment.
  Future<ModelListRating> getListComment(String idProduct) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String url = NetworkBase.Base_URL + "public/products/$idProduct/ratings";

    final response = await http.get(url, headers: header);

    if (response.statusCode == 200) {
      return ModelListRating.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: service get facility info
  Future<ModelFacility> getFacilityInfo(String idFacility) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String url = NetworkBase.Base_URL + "public/facilities/$idFacility";

    final response = await http.get(url, headers: header);

    if (response.statusCode == 200) {
      return ModelFacility.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: service get list product recommend.
  Future<ModelResponseRecommend> getProductRecommend(String idProduct) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String url = NetworkBase.Base_URL + "public/products/$idProduct/recommend";

    final response = await http.get(url, headers: header);

    if (response.statusCode == 200) {
      return ModelResponseRecommend.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  Future<ModelProductRecommender> getInfoProductRecommend(
      String idProduct) async {
    Map<String, String> header = {
      "Content-Type": "application/json",
    };

    String url = NetworkBase.Base_URL + "public/products/$idProduct";

    final response = await http.get(url, headers: header);

    if (response.statusCode == 200) {
      return ModelProductRecommender.fromMap(json.decode(response.body));
    } else {
      return null;
    }
  }

  /// hieu.nguyen: Function track views product.
  Future<void> trackView(String idProduct) async {
    Map<String, String> header = {
      "Authorization": "Bearer " + NetworkBase.token,
      "Content-Type": "application/json"
    };

    Map<String, String> body = {"product_id": idProduct};

    String url = NetworkBase.Base_URL + "auth/interactions/views";

    final response =
        await http.post(url, headers: header, body: json.encode(body));
    if (response.statusCode == 200) {
      print("track views");
    } else {
      print("reack views failed!");
    }
  }

  /// hieu.nguyen: Function track views TIMES product.
  Future<void> trackViewTimes(String idProduct, int duration) async {
    Map<String, String> header = {
      "Authorization": "Bearer " + NetworkBase.token,
      "Content-Type": "application/json"
    };

    Map<String, String> body = {
      "product_id": idProduct,
      "duration": duration.toString()
    };

    String url = NetworkBase.Base_URL + "auth/interactions/views";

    final response =
        await http.post(url, headers: header, body: json.encode(body));
    if (response.statusCode == 200) {
      print("track views times $duration");
    } else {
      print("reack views times failed!");
    }
  }
}
