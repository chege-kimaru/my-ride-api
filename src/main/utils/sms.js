// import africastalking from 'africastalking';
//
// const AfricasTalking = africastalking({
//     apiKey: process.env.AFRICASTALKING_APIKEY,         // use your sandbox app API key for development in the test environment
//     username: process.env.AFRICASTALKING_USERNAME,      // use 'sandbox' for development in the test environment
// });

export default class Sms {


    constructor() {
        const options = {
            apiKey: process.env.AFRICASTALKING_APIKEY,         // use your sandbox app API key for development in the test environment
            username: process.env.AFRICASTALKING_USERNAME,   // use 'sandbox' for development in the test environment
        };
        const AfricasTalking = require('africastalking')(options);

        this.sms = AfricasTalking.SMS;
    }


    async send({to, message}) {
        if (String(to).startsWith('0')) {
            to = '+254' + String(to).substr(1);
        }
        return this.sms.send({to, message});
    }
}
