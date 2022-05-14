class SignUpController {
  handle(httpRequest: any): any {
    console.log(httpRequest);
    return {
      statusCode: 400,
    };
  }
}

export default SignUpController;
