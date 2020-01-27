export const addItemToCommand = (commandItems, commandItemToAdd) => {
    const existingCommandItem = commandItems.find(
      commandItem => commandItem.name === commandItemToAdd.name
    );

    if(existingCommandItem){
      return commandItems.map(commandItem =>
        commandItem.name === commandItemToAdd.name ? {...commandItem, quantity:commandItem.quantity + 1 } : commandItem
      )
    }
    return [...commandItems, {...commandItemToAdd,quantity :1}]
}

export const deleteItemToCommand = (commandItems, commandItemToDelete) => {
  return commandItems.filter((item) => item.name !== commandItemToDelete)
}
