import { applyFilterLogic, applyTransformLogic } from '../../src/service/ftl'
import { ConditionType, TransformationType } from '../../src/type/operation'

describe('FTL service transformation feature', () => {
  it('should apply transformation when no condition are being specified', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const transformLogic = JSON.stringify({
      transforms: [
        {
          attributeName: 'value',
          transformation: {
            type: 'set_to' as TransformationType,
            value: '2',
          },
        },
      ],
    })

    // When
    const newItems = applyTransformLogic(items, transformLogic)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '2',
      },
    ])
  })
})

describe('FTL service filter feature', () => {
  it('should not include element when it is meeting a filter condition', () => {
    // Given
    const items = [
      {
        value: '',
      },
    ]

    const filterLogic = JSON.stringify({
      filters: [
        {
          attributeName: 'value',
          condition: {
            type: 'is_empty_string' as ConditionType,
          },
        },
      ],
    })

    // When
    const newItems = applyFilterLogic(items, filterLogic)

    // Then
    expect(newItems).toStrictEqual([])
  })

  it('should include element when it is not meeting a filter condition', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const filterLogic = JSON.stringify({
      filters: [
        {
          attributeName: 'value',
          condition: {
            type: 'is_empty_string' as ConditionType,
          },
        },
      ],
    })

    // When
    const newItems = applyFilterLogic(items, filterLogic)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '1',
      },
    ])
  })
})
