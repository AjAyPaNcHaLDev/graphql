// User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  birthDate: String,
  image: String,
  bloodGroup: String,
  height: Number,
  weight: Number,
  eyeColor: String,
  hair: {
    color: String,
    type: String,
  },
  ip: String,
  address: {
    address: String,
    city: String,
    state: String,
    stateCode: String,
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    country: String,
  },
  macAddress: String,
  university: String,
  bank: {
    cardExpire: String,
    cardNumber: String,
    cardType: String,
    currency: String,
    iban: String,
  },
  company: {
    department: String,
    name: String,
    title: String,
    address: {
      address: String,
      city: String,
      state: String,
      stateCode: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      country: String,
    },
  },
  ein: String,
  ssn: String,
  userAgent: String,
  crypto: {
    coin: String,
    wallet: String,
    network: String,
  },
  role: String,
});

module.exports = mongoose.model('User', UserSchema);
