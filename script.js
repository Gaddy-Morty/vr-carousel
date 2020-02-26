import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '30s',
};

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function() {
  const random = getRandomIntInclusive(10000000, 15000000);
  let res = http.get(`http://localhost:3000/api/v2/listings/${random}/photos`);
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(1);
}
