import 'package:flutter/material.dart';
import 'package:folding_cell/folding_cell.dart';
import 'package:tab_navigator/contanst/router_constant.dart';

class FoldingCell extends StatelessWidget {
  final _foldingCellKey = GlobalKey<SimpleFoldingCellState>();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      alignment: Alignment.topCenter,
      child: SimpleFoldingCell(
        key: _foldingCellKey,
        frontWidget: _buildFrontWidget(context),
        innerTopWidget: _buildInnerTopWidget(),
        innerBottomWidget: _buildInnerBottomWidget(),
        cellSize: Size(MediaQuery.of(context).size.width, 125),
        padding: EdgeInsets.fromLTRB(0, 15, 0, 15),
        animationDuration: Duration(milliseconds: 300),
        borderRadius: 10,
      ),
    );
  }

  Widget _buildFrontWidget(BuildContext context) {
    return Container(
      color: Color(0xFFffcd3c),
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text("STEP",
              style: TextStyle(
                  color: Color(0xFF2e282a),
                  fontFamily: 'Montserrat',
                  fontSize: 18.0,
                  fontWeight: FontWeight.w800)),
          FlatButton(
            //onPressed: () => _foldingCellKey?.currentState?.toggleFold(),
            onPressed: () {
              Navigator.pushNamed(context, Router_Constant.TimeLinesScreen);
            },
            child: Text(
              "Open",
            ),
            textColor: Colors.white,
            color: Colors.indigoAccent,
            splashColor: Colors.white.withOpacity(0.5),
          )
        ],
      ),
    );
  }

  Widget _buildInnerTopWidget() {
    return Container(
        color: Color(0xFFff9234),
        alignment: Alignment.center,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text("TITLE",
                style: TextStyle(
                    color: Color(0xFF2e282a),
                    fontFamily: 'Montserrat',
                    fontSize: 20.0,
                    fontWeight: FontWeight.w800)),
          ],
        ));
  }

  Widget _buildInnerBottomWidget() {
    return Container(
      color: Color(0xFFecf2f9),
      alignment: Alignment.bottomCenter,
      child: Padding(
        padding: EdgeInsets.only(bottom: 10),
        child: FlatButton(
          onPressed: () => _foldingCellKey?.currentState?.toggleFold(),
          child: Text(
            "Close",
          ),
          textColor: Colors.white,
          color: Colors.indigoAccent,
          splashColor: Colors.white.withOpacity(0.5),
        ),
      ),
    );
  }
}
