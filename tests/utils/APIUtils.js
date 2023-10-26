class APIUtils
{
    constructor(apiContext, loginPayload)
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    }
    async getToken()
    {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
              data: this.loginPayload,
            }
          )
          const loginResponseToken = await loginResponse.json();
          const token = loginResponseToken.token;
          console.log("LOG: Token: ", token);
          return token;
    }
    async createOrder(orderPayload)
    {
        let response = {};
        response.token = await this.getToken();
        const createdOrderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
          {  
            data: orderPayload,
            headers: {
              'Authorization': response.token,
              'Content-type': 'application/json'
            },
          });
          const oderResponseInfo = await createdOrderResponse.json();
          const orderId = oderResponseInfo.orders[0];
          console.log("LOG: Product Order ID: ", orderId);
          response.orderId = orderId;
          return response;
    }
}

module.exports = {APIUtils};
