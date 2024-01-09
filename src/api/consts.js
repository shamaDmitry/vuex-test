export const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory';
export const API_EXTERNAL = 'https://openexchangerates.org/api';
export const APP_ID = '59556770d8094a85aff173e6f8326e4c';
export const API =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://vuex-test-server.vercel.app/api/v1';
