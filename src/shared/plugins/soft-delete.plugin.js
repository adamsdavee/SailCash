module.exports = function softDeletePlugin(schema) {
   /**
    * Adds deletedAt to the schema.
    */
   schema.add({
      deletedAt: {
         type: Date,
         default: null,
         index: true,
      },
   })

   /**
    * Automatically exclude soft-deleted documents.
    */
   schema.pre(/^find/, function (next) {
      this.where({
         deletedAt: null,
      })

      next()
   })

   /**
    * Soft delete instance method.
    */
   schema.methods.softDelete = async function () {
      this.deletedAt = new Date()

      return this.save()
   }

   /**
    * Restore instance method.
    */
   schema.methods.restore = async function () {
      this.deletedAt = null

      return this.save()
   }
}

/// Then do that in the mongoose model folder

// const softDeletePlugin = require("../../../shared/plugins/softDelete.plugin");

// bankAccountSchema.plugin(softDeletePlugin);
