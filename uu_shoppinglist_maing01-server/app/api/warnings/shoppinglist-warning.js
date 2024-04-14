const Errors= require("../errors/shoppinglist-error.js");

const Warnings = {
  General: {
    UnsupportedKeys: {
      code: `${Errors.ListCreate.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
