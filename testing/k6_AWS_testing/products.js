import http from 'k6/http';
import { sleep } from 'k6';
import {numberOfUsers, mainIpAddress} from './index.js';

export const options = {
  vus: numberOfUsers,
  duration: '10s'
};

export default function () {

  http.get(`http://${mainIpAddress}/products`);

  sleep(1);
}
