import { sleep } from 'k6';
import http from 'k6/http';

export default function () {
  http.get('https://app.learnzy.co.in');
  sleep(1);
}
