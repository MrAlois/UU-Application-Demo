const MONGO_ID_STRING = string(12)

const getShoppingListDtoInType = shape({
  listId: MONGO_ID_STRING.isRequired()
})

const createShoppingListDtoInType = shape({
  name: string(3, 64).isRequired(),
  description: string(3, 255),
  ownerId: string(12).isRequired(),
  memberIds: array(
    MONGO_ID_STRING.isRequired()
  )
});

const deleteShoppingListDtoInType = shape({
  listId: MONGO_ID_STRING.isRequired()
})

const updateShoppingListDtoInType = shape ({
  listId: MONGO_ID_STRING.isRequired(),
  name: string(3, 64).isRequired(),
  description: string(3, 255),
  ownerId: MONGO_ID_STRING.isRequired(),
  memberIds: array(
    MONGO_ID_STRING.isRequired()
  )
})

const addShoppingItemDtoInType = shape ({
  listId: MONGO_ID_STRING.isRequired(),
  name: string(3, 64).isRequired(),
  completed: boolean().isRequired()
})

const updateShoppingItemDtoInType = shape ({
  listId: MONGO_ID_STRING.isRequired(),
  itemId: MONGO_ID_STRING.isRequired(),
  name: string(3, 64).isRequired(),
  completed: boolean().isRequired()
})

const removeShoppingItemDtoInType = shape ({
  listId: MONGO_ID_STRING.isRequired(),
  itemId: MONGO_ID_STRING.isRequired(),
})
