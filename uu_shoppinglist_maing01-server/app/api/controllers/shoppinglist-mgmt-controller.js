"use strict";

const ShoppinglistMgmtAbl = require("../../abl/shoppinglist-mgmt-abl.js");

class ShoppinglistMgmtController {
  getAllLists(ucEnv) {
    return ShoppinglistMgmtAbl.getAllShoppingLists(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  getList(ucEnv) {
    return ShoppinglistMgmtAbl.getShoppingList(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  createList(ucEnv) {
    return ShoppinglistMgmtAbl.createShoppingList(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  deleteList(ucEnv) {
    return ShoppinglistMgmtAbl.removeShoppingList(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  updateList(ucEnv) {
    return ShoppinglistMgmtAbl.updateShoppingList(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  addShoppingItem(ucEnv) {
    return ShoppinglistMgmtAbl.addShoppingItem(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  modifyShoppingItem(ucEnv) {
    return ShoppinglistMgmtAbl.modifyShoppingItem(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }

  removeShoppingItem(ucEnv) {
    return ShoppinglistMgmtAbl.removeShoppingItem(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession())
  }
}

module.exports = new ShoppinglistMgmtController();
