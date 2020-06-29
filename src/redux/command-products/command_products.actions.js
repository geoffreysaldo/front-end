export const addCommandProduct = product => ({
    type:'ADD_COMMAND_PRODUCT',
    payload: product
  })

export const deleteCommandProduct = product => ({
  type:'DELETE_COMMAND_PRODUCT',
  payload: product
})

export const removeCommandProduct = product => ({
  type:'REMOVE_COMMAND_PRODUCT',
  payload: product
})
