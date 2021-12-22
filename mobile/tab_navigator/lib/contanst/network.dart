class NetworkBase {
  static final String Base_URL =
      "https://api.goco.live/"; //abc

  static final Map<String, String> Base_header = {
    "Content-Type": "application/json"
  };

  static String token;

  static Map<String, String> Token = {"Authorization": "Beaer " + token};
}
