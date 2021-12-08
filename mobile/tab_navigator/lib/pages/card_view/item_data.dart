import 'package:flutter/material.dart';

class itemData {
  final String title;
  final String time;
  final String content;
  final String image;
  final String location;
  final Color color_background;
  final Icon icon;

  const itemData(
      {this.title,
      this.time,
      this.content,
      this.image,
      this.location,
      this.color_background,
      this.icon});
}

const List<itemData> datas = [
  itemData(
      title: "Begin",
      time: "26/09/2019",
      content: "Begining at Jayce's farm.",
      icon: Icon(
        Icons.filter_1,
        color: Colors.black87,
        size: 32.0,
      ),
      image:
          "http://tiennong.vn/uploads/images/che1.png",
      color_background: Colors.white,
      location: "Jayce's farm"),
  itemData(
      title: "To harvest",
      time: "26/10/2019",
      content: "To harvest at Jayce's farm.",
      icon: Icon(
        Icons.filter_2,
        color: Colors.black87,
        size: 32.0,
      ),
      image:
          "https://s3.amazonaws.com/cloud.scoutmob.com/hp/products/12369/product/Ashley_Field_2.jpg?1548268021",
      color_background: Colors.white,
      location: "Jayce's farm"),
  itemData(
      title: "To verify",
      time: "27/10/2019",
      content: "To verify at Jayce's farm.",
      icon: Icon(
        Icons.filter_3,
        color: Colors.black87,
        size: 32.0,
      ),
      image:
          "https://st4.depositphotos.com/13194036/20420/i/1600/depositphotos_204206384-stock-photo-handsome-farmer-checking-harvest-clipboard.jpg",
      color_background: Colors.white,
      location: "Jayce's farm"),
  itemData(
      title: "Transport",
      time: "27/10/2019",
      content: "Transport of goods by truck.",
      icon: Icon(
        Icons.filter_4,
        color: Colors.black87,
        size: 32.0,
      ),
      image:
          "http://supplychainmit.com/wp-content/uploads/2016/05/bigstock-truck-load-of-bananas-hampi-25611179.jpg",
      color_background: Colors.white,
      location: "Jayce's farm - Family mart"),
  itemData(
      title: "To Store",
      time: "26/09/2019",
      content: "To show product at Family mart",
      icon: Icon(
        Icons.filter_5,
        color: Colors.black87,
        size: 32.0,
      ),
      image:
          "https://www.smergers.com/media/businessphoto/75648-95588221953.jpg",
      color_background: Colors.white,
      location: "Family mart"),
];
