export const splitArrayIntoChunks = <T extends any[]>(
  inputArray: T,
  chunkSize: number,
): T[] => {
  if (chunkSize < 1) {
    return []
  }

  return inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
}
