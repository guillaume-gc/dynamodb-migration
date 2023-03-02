import { transformItem } from '../../src/operation/transformItem'

describe('Transform Item function', () => {
  it('should set a value to a new value when transformation type is "set_to"', () => {
    // Given
    const transformationType = 'set_to'
    const baseValue = '1'
    const newValue = '2'

    // When
    const transformedItem = transformItem(
      transformationType,
      baseValue,
      newValue,
    )

    // Then
    expect(transformedItem).toEqual(newValue)
  })

  it('should set a non number value to number when transformation type is "to_number"', () => {
    // Given
    const transformationType = 'to_number'
    const baseValue = '1'
    const newValue = 1

    // When
    const transformedItem = transformItem(
      transformationType,
      baseValue,
      newValue,
    )

    // Then
    expect(transformedItem).toEqual(newValue)
  })

  it('should set a value to undefined when transformation type is "set_undefined"', () => {
    // Given
    const transformationType = 'set_undefined'
    const baseValue = '1'
    const newValue = undefined

    // When
    const transformedItem = transformItem(
      transformationType,
      baseValue,
      newValue,
    )

    // Then
    expect(transformedItem).toEqual(newValue)
  })
})
