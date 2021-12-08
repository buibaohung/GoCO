class ErrorResponse {
  int code;
  String message;

  ErrorResponse({this.code, this.message});

  factory ErrorResponse.fromMap(Map<String, dynamic> json) => ErrorResponse(
        code: json['code'] ?? '',
        message: json['message'] ?? '',
      );

  Map<String, dynamic> toMap() => {
        'code': code ?? '',
        'message': message ?? '',
      };
}
