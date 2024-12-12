const Invoice = new schema({
  loggedIn: String,
  name: String,
  mobile: String,
  address: String,
  city: String,
  zip: Number,
  state: Number,
  country: Number,
  prefered: Boolean,
});

module.exports = Invoice;
