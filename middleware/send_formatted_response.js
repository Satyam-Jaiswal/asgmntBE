const send_formatted_response = (body, success, message) => {
  if (!message) message = "ok";
  if (success == false && body?.code == 11000)
    message = "Duplicate entry found. Kindly check input values";
  if (success == false && body?.name == "ValidationError") {
    if (body.name) {
      for (field in body.errors) {
        message = body.errors[field].message;
        break;
      }
    }
  }
  return {
    body,
    success,
    message: success ? "ok" : message,
  };
};

module.exports = send_formatted_response;
