// Prices include 18% GST, rounded to the nearest rupee.
module.exports.withGst = (products) => products.map((p) => ({ ...p, price: Math.round(p.price * 1.18) }));
