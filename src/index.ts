import { config } from './config';
import axios from 'axios';

(async () => {
  const github = await axios.get('https://api.github.com/zen', {
    auth: {
      username: config.GITHUB_USER,
      password: config.GITHUB_TOKEN,
    },
  });

  console.log(github);
})();
