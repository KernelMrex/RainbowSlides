export function immutablePop<ItemType>(array: Array<ItemType>): [ Array<ItemType>, ItemType | undefined ]
{
    const item: ItemType | undefined = array.slice(-1)[0]
    return [ array.slice(0, -1), item ? { ...item } : undefined ]
}

export function immutablePush<ItemType>(array: Array<ItemType>, item: ItemType | undefined): Array<ItemType>
{
    return item !== undefined ? [ ...array, item ] : [ ...array ]
}