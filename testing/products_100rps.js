import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '10s'
};

export default function () {

  http.get(`http://localhost:3000/products`);

  sleep(1);
}
