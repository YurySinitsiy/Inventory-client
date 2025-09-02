import cryptoRandomString from 'crypto-random-string';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const generateValue = (type, value) => {
  switch (type) {
    case 'fixed':
      return value || '';
    case 'random20':
      return cryptoRandomString({ length: 5, type: 'hex' });
    case 'random32':
      return cryptoRandomString({ length: 8, type: 'hex' });
    case 'random6':
      return cryptoRandomString({ length: 6, type: 'numeric' });
    case 'random9':
      return cryptoRandomString({ length: 9, type: 'numeric' });
    case 'guid':
      return uuidv4();
    case 'datetime':
      return dayjs().format('HH:mm/DD.MM.YYYY');
    default:
      return '';
  }
};

export default generateValue;
