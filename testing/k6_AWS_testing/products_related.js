import http from 'k6/http';
import { sleep } from 'k6';
import {numberOfUsers, mainIpAddress} from './index.js';

export const options = {
  vus: numberOfUsers,
  duration: '10s'
};

export default function () {

  const randomProductId = (Math.random() * 1000011).toFixed(0);

  http.get(`http://${mainIpAddress}/products/${randomProductId}/related`);

  sleep(1);
}
