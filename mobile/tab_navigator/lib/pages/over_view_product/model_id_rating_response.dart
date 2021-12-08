import 'dart:convert';

IdRating idRatingFromJson(String str) => IdRating.fromMap(json.decode(str));

String idRatingToJson(IdRating data) => json.encode(data.toMap());

class IdRating {
  String id;

  IdRating({
    this.id,
  });

  factory IdRating.fromMap(Map<String, dynamic> json) => IdRating(
    id: json["id"],
  );

  Map<String, dynamic> toMap() => {
    "id": id,
  };
}
