import { checkItemOperation } from '../../src/operation/checkItem.operation'

describe('Check Item function', () => {
  it('should return true when condition "is_null" is valid', () => {
    // Given
    const conditionType = 'is_null'
    const leftOperator = null

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeTruthy()
  })

  it('should return false when condition "is_null" is not valid', () => {
    // Given
    const conditionType = 'is_null'
    const leftOperator = 1

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeFalsy()
  })

  it('should return true when condition "is_non_empty_string" is valid', () => {
    // Given
    const conditionType = 'is_non_empty_string'
    const leftOperator = '1'

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeTruthy()
  })

  it('should return false when condition "is_non_empty_string" is not valid', () => {
    // Given
    const conditionType = 'is_non_empty_string'
    const leftOperator = ''

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeFalsy()
  })

  it('should return true when condition "is_empty_string" is valid', () => {
    // Given
    const conditionType = 'is_empty_string'
    const leftOperator = ''

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeTruthy()
  })

  it('should return false when condition "is_empty_string" is not valid', () => {
    // Given
    const conditionType = 'is_empty_string'
    const leftOperator = '1'

    // When
    const checkResult = checkItemOperation(conditionType, leftOperator)

    // Then
    expect(checkResult).toBeFalsy()
  })

  it('should return true when condition "is_greater_than" is valid', () => {
    // Given
    const conditionType = 'is_greater_than'
    const leftOperator = 2
    const rightOperator = 1

    // When
    const checkResult = checkItemOperation(
      conditionType,
      leftOperator,
      rightOperator,
    )

    // Then
    expect(checkResult).toBeTruthy()
  })

  it('should return false when condition "is_greater_than" is not valid', () => {
    // Given
    const conditionType = 'is_greater_than'
    const leftOperator = 1
    const rightOperator = 2

    // When
    const checkResult = checkItemOperation(
      conditionType,
      leftOperator,
      rightOperator,
    )

    // Then
    expect(checkResult).toBeFalsy()
  })
})
