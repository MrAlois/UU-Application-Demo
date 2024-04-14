"use strict";
const ShoppingListMainUseCaseError = require("./shoppinglist-main-use-case-error");

const ListCreate = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/create/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const ListDelete = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/delete/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DoesntExist: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}doesntExist`;
      this.message = "Provided listId cannot be found.";
    }
  }
};

const ListUpdate = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/update/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DoesntExist: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}doesntExist`;
      this.message = "Provided listId cannot be found.";
    }
  }
};

const ListItemCreate = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/item/add/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const ListItemDelete = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/item/remove/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DoesntExist: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}doesntExist`;
      this.message = "Provided listId cannot be found.";
    }
  }
};

const ListItemUpdate = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/item/modify/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DoesntExist: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListCreate.UC_CODE}doesntExist`;
      this.message = "Provided listId cannot be found.";
    }
  }
};

module.exports = {
  ListCreate, ListDelete, ListUpdate, ListItemCreate, ListItemDelete, ListItemUpdate
};
