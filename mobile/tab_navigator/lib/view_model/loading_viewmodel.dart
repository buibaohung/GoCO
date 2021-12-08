import 'package:tab_navigator/view_model/base_modle.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';

class LoadingViewModel extends BaseModel {
  bool _isShowLoading = false;

  bool get isShowLoading => this._isShowLoading;

  void showLoading(bool isShowLoading) {
    this._isShowLoading = isShowLoading;
    notifyListeners();
  }

  ChangeNotifierProvider<LoadingViewModel> get providerLoading =>
      ChangeNotifierProvider<LoadingViewModel>(
          builder: (BuildContext context) => this);
}
