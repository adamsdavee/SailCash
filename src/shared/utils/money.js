const Decimal = require("decimal.js")

Decimal.set({
   precision: 40,
   rounding: Decimal.ROUND_HALF_UP,
})

class Money {
   static add(a, b) {
      return new Decimal(a).plus(new Decimal(b)).toString()
   }

   static subtract(a, b) {
      return new Decimal(a).minus(new Decimal(b)).toString()
   }

   static greaterThan(a, b) {
      return new Decimal(a).greaterThan(new Decimal(b))
   }

   static greaterThanOrEqual(a, b) {
      return new Decimal(a).greaterThanOrEqualTo(new Decimal(b))
   }

   static lessThan(a, b) {
      return new Decimal(a).lessThan(new Decimal(b))
   }

   static equals(a, b) {
      return new Decimal(a).equals(new Decimal(b))
   }

   static isNegative(a) {
      return new Decimal(a).isNegative()
   }

   static isZero(a) {
      return new Decimal(a).isZero()
   }
}

module.exports = Money
