var arr;

function removeDuplicates(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

function removeNoLink(arr) {
  return arr.filter(v => v.roleLink)
}

copy(removeNoLink(arr))