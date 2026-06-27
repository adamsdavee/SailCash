const Decimal = require("decimal.js")

Decimal.set({
   precision: 40,
   rounding: Decimal.ROUND_HALF_UP,
   toExpNeg: -100,
   toExpPos: 100,
})

class Money {
   static decimal(value) {
      return new Decimal(value || "0")
   }

   static zero() {
      return "0"
   }

   static add(a, b) {
      return this.decimal(a).plus(this.decimal(b)).toString()
   }

   static subtract(a, b) {
      return this.decimal(a).minus(this.decimal(b)).toString()
   }

   static multiply(a, b) {
      return this.decimal(a).times(this.decimal(b)).toString()
   }

   static divide(a, b) {
      return this.decimal(a).dividedBy(this.decimal(b)).toString()
   }

   static absolute(value) {
      return this.decimal(value).abs().toString()
   }

   static negate(value) {
      return this.decimal(value).negated().toString()
   }

   static compare(a, b) {
      return this.decimal(a).comparedTo(this.decimal(b))
   }

   static equals(a, b) {
      return this.compare(a, b) === 0
   }

   static greaterThan(a, b) {
      return this.compare(a, b) > 0
   }

   static greaterThanOrEqual(a, b) {
      return this.compare(a, b) >= 0
   }

   static lessThan(a, b) {
      return this.compare(a, b) < 0
   }

   static lessThanOrEqual(a, b) {
      return this.compare(a, b) <= 0
   }

   static isPositive(value) {
      return this.greaterThan(value, "0")
   }

   static isNegative(value) {
      return this.lessThan(value, "0")
   }

   static isZero(value) {
      return this.equals(value, "0")
   }

   static hasEnough(balance, amount) {
      return this.greaterThanOrEqual(balance, amount)
   }

   static min(a, b) {
      return this.lessThan(a, b) ? a : b
   }

   static max(a, b) {
      return this.greaterThan(a, b) ? a : b
   }
}

module.exports = Money
