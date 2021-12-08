import 'dart:convert';

ModelListRating modelListRatingFromJson(String str) =>
    ModelListRating.fromMap(json.decode(str));

String modelListRatingToJson(ModelListRating data) => json.encode(data.toMap());

class ModelListRating {
  List<Rating> ratings;

  ModelListRating({
    this.ratings,
  });

  factory ModelListRating.fromMap(Map<String, dynamic> json) => ModelListRating(
        ratings: json["ratings"] == null
            ? null
            : List<Rating>.from(json["ratings"].map((x) => Rating.fromMap(x))),
      );

  Map<String, dynamic> toMap() => {
        "ratings": ratings == null
            ? null
            : List<dynamic>.from(ratings.map((x) => x.toMap())),
      };
}

class Rating {
  String id;
  String productId;
  String userId;
  int star;
  int stake;
  String content;
  String userName;
  int like;
  int dislike;
  int stakeLike;
  int stakeDislike;

  Rating({
    this.id,
    this.productId,
    this.userId,
    this.star,
    this.stake,
    this.content,
    this.userName,
    this.like,
    this.dislike,
    this.stakeLike,
    this.stakeDislike,
  });

  factory Rating.fromMap(Map<String, dynamic> json) => Rating(
      id: json["id"] == null ? null : json["id"],
      productId: json["product_id"] == null ? null : json["product_id"],
      userId: json["user_id"] == null ? null : json["user_id"],
      star: json["star"] == null ? 0 : json["star"],
      stake: json["stake"] == null ? null : json["stake"],
      content: json["content"] == null ? null : json["content"],
      userName: json["user_name"] == null ? null : json["user_name"],
      like: json["like"] ?? null,
      dislike: json["dislike"] ?? null,
      stakeLike: json["stake_like"] ?? 0,
      stakeDislike: json["stake_dislike"] ?? 0);

  Map<String, dynamic> toMap() => {
        "id": id == null ? null : id,
        "product_id": productId == null ? null : productId,
        "user_id": userId == null ? null : userId,
        "star": star == null ? null : star,
        "stake": stake == null ? null : stake,
        "content": content == null ? null : content,
        "user_name": userName == null ? null : userName,
        "like": like ?? null,
        "dislike": dislike ?? null,
        "stake_like": stakeLike ?? 0,
        "stake_dislike": stakeDislike ?? 0,
      };
}
