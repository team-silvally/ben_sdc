import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '10s'
};

export default function () {

  const randomProductId = (Math.random() * 1000011).toFixed(0);

  http.get(`http://localhost:3000/products/${randomProductId}`);

  sleep(1);
}
