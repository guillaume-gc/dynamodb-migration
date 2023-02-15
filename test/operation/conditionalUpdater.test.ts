import { runConditionalUpdates } from '../../src/operation/conditionalUpdater'

describe('Condition Update Variable picker', () => {
  it('should run conditional update when attribute exists', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })

  it('should not run conditional update when attribute does not exist', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'hello',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '1',
      },
    ])
  })
})

describe('Is Condition Respected checker', () => {
  it('should run conditional update when condition is_null is valid', () => {
    // Given
    const items = [
      {
        value: null,
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_null',
          transformation: {
            type: 'set_to',
            value: '1',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '1',
      },
    ])
  })

  it('should run conditional update when condition is_non_empty_string is valid', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_non_empty_string',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })

  it('should run conditional update when no condition are being specified', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })

  it('should not run condition update when condition is_null is not valid (value is not null)', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_null',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '1',
      },
    ])
  })

  it('should not run condition update when condition is_non_empty_string is not valid (value is not a string)', () => {
    // Given
    const items = [
      {
        value: 1,
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_non_empty_string',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: 1,
      },
    ])
  })

  it('should not run condition update when condition is_non_empty_string is not valid (value is an empty string)', () => {
    // Given
    const items = [
      {
        value: '',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_non_empty_string',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '',
      },
    ])
  })

  it('should run condition update when condition is_empty_string is valid', () => {
    // Given
    const items = [
      {
        value: '',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_empty_string',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })

  it('should nor run condition update when condition is_empty_string is not valid (string is not empty)', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          condition: 'is_empty_string',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '1',
      },
    ])
  })
})

describe('Transformation Engine', () => {
  it('should apply to_number transformation when condition update description is valid', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          transformation: {
            type: 'to_number',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: 1,
      },
    ])
  })

  it('should apply set_to transformation when condition update description is valid', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          transformation: {
            type: 'set_to',
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })

  it('should apply set_undefined transformation when condition update description is valid', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const conditionUpdatesDesc = JSON.stringify({
      config: [
        {
          attributeName: 'value',
          transformation: {
            type: 'set_undefined',
          },
        },
      ],
    })

    // When
    const newItems = runConditionalUpdates(items, conditionUpdatesDesc)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: undefined,
      },
    ])
  })
})
