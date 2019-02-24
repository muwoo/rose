import { createAPI } from '../util';
import config from '../config';

const baseUrl = {
  mock: ['https://www.easy-mock.com/mock/5c6ead0e37202863fa565925'],
  // dev: ['http://192.168.22.170:7001', 'service 123'],
  // production: ['http://10.247.47.153:8080', 'service 123']
}[process.env.NODE_ENV === 'development' ? config.env : process.env.NODE_ENV];

export default createAPI(...baseUrl);
