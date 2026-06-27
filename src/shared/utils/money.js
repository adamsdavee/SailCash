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

   static isNegative(value) {
      return this.decimal(value).isNegative()
   }

   static isZero(value) {
      return this.decimal(value).isZero()
   }

   static absolute(value) {
      return this.decimal(value).abs().toString()
   }

   static hasEnough(balance, amount) {
      return this.greaterThanOrEqual(balance, amount)
   }

   static isPositive(amount) {
      return this.greaterThan(amount, "0")
   }

   static negate(amount) {
      return this.decimal(amount).negated().toString()
   }

   static zero() {
      return "0"
   }
}

module.exports = Money
