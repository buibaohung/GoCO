class NetworkBase {
  static final String Base_URL =
      "http://34.125.115.98:3000/";

  static final Map<String, String> Base_header = {
    "Content-Type": "application/json"
  };

  static String token;

  static Map<String, String> Token = {"Authorization": "Beaer " + token};
}
