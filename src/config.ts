import 'dotenv/config';

class Config {
  GITHUB_USER: string;
  GITHUB_TOKEN: string;

  constructor() {
    this.GITHUB_USER = process.env['GITHUB_USER'] || '';
    this.GITHUB_TOKEN = process.env['GITHUB_TOKEN'] || '';

    this.validate();
  }

  private validate() {
    const errors: string[] = [];
    Object.entries(this).forEach(entry => {
      const [key, val] = entry;
      if (val.length === 0) {
        errors.push(key);
      }
    });

    if (errors.length > 0) {
      throw new Error(`Invalid configuration!  invalid=${errors.join(', ')}`);
    }
  }
}

export const config = new Config();
