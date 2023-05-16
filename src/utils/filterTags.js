export const filterTags = (items) => {
  const makeUniq = (arr) => [...new Set(arr)]
  return makeUniq(items.filter((obj) => obj !== ""))
}
