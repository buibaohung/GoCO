
class ValidationService {
  bool validateEmail(String email) {
    Pattern pattern =
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';

    Pattern phone_number = r'(^(?:[+0]9)?[0-9]{10,12}$)';
    RegExp regex = new RegExp(phone_number);

    if (regex.hasMatch(email)) {
      return true;
    } else
      return false;
  }


}
