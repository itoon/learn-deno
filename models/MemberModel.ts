import { DATA_TYPES, Model } from 'https://deno.land/x/denodb/mod.ts';
import db from '../db.ts';

export default class Members extends Model {
  static table = 'members';
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    name: DATA_TYPES.STRING,
    email: DATA_TYPES.STRING,
    phoneNumber: DATA_TYPES.STRING
  }
}

db.link([Members]);