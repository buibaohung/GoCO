abstract class BaseModel {
  BaseModel();
  BaseModel.fromJson(Map<String, dynamic> parsedJson);
  BaseModel fromJson(Map<String, dynamic> parsedJson);
  Map<String, dynamic> toJson();

}
