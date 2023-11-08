class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    try {
      const loginResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
          data: this.loginPayload,
        }
      );
      const loginResponseJson = await loginResponse.json();
      const token = loginResponseJson.token;
      console.log(token);
      return token;
    } catch (error) {
      console.error("Error while getting token:", error);
      throw error;
    }
  }

  async createOrder(orderPayload) {
    try {
      let response = {};
      response.token = await this.getToken();
      const orderResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: response.token,
            "Content-Type": "application/json",
          },
        }
      );
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      const orderId = orderResponseJson.orders[0];
      response.orderId = orderId;
      return response;
    } catch (error) {
      console.error("Error while creating order:", error);
      throw error;
    }
  }
}

export default ApiUtils;
