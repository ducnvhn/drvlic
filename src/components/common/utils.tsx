export const notFilterEmpty = (filter: any) => {
    const matchingKey = Object.keys(filter).find(k => filter[k] !== null)
    return Boolean(matchingKey)
}
