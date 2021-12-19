class NetworkBase {
  static final String Base_URL =
      "http://161.97.112.69:3000/"; //abc

  static final Map<String, String> Base_header = {
    "Content-Type": "application/json"
  };

  static String token;

  static Map<String, String> Token = {"Authorization": "Beaer " + token};
}
