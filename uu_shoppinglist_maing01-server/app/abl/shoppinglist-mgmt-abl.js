"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;

const { LoggerFactory } = require("uu_appg01_server").Logging;

const Errors = require("../api/errors/shoppinglist-error.js");
const Warnings = require("../api/warnings/shoppinglist-warning.js");

const logger = LoggerFactory.get("ShoppinglistMgmtAbl");

class ShoppinglistMgmtAbl {
  constructor() {
    this.validator = Validator.load();
  }

  async getAllShoppingLists(uri, dtoIn, session = {}) {
    return {...dtoIn}
  }

  async getShoppingList(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("getShoppingListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Errors.ListCreate.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async createShoppingList(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("createShoppingListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListCreate.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async removeShoppingList(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("deleteShoppingListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListDelete.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async updateShoppingList(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("updateShoppingListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListUpdate.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async addShoppingItem(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("addShoppingItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListItemCreate.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async modifyShoppingItem(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("updateShoppingItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListItemUpdate.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }

  async removeShoppingItem(uri, dtoIn, session = {}) {
    let uuAppErrorMap = {};

    const validationResult = this.validator.validate("removeShoppingItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.General.UnsupportedKeys.code,
      Errors.ListItemDelete.InvalidDtoIn
    );

    return {...dtoIn, uuAppErrorMap}
  }
}

module.exports = new ShoppinglistMgmtAbl();
