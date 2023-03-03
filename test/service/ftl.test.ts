import { applyFilterLogic, applyTransformLogic } from '../../src/service/ftl'
import {
  ConditionType,
  Filter,
  Transform,
  TransformationType,
} from '../../src/type/operation'

describe('FTL service transformation feature', () => {
  it('should apply transformation when no condition are being specified', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const transformLogic: Transform[] = [
      {
        attributeName: 'value',
        transformation: {
          type: 'set_to' as TransformationType,
          value: '2',
        },
      },
    ]

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
  it('should include element when it is meeting a filter condition', () => {
    // Given
    const items = [
      {
        value: '',
      },
    ]

    const filterLogic: Filter[] = [
      {
        attributeName: 'value',
        condition: {
          type: 'is_empty_string' as ConditionType,
        },
      },
    ]

    // When
    const newItems = applyFilterLogic(items, filterLogic)

    // Then
    expect(newItems).toStrictEqual([
      {
        value: '',
      },
    ])
  })

  it('should not include element when it is not meeting a filter condition', () => {
    // Given
    const items = [
      {
        value: '1',
      },
    ]

    const filterLogic: Filter[] = [
      {
        attributeName: 'value',
        condition: {
          type: 'is_empty_string' as ConditionType,
        },
      },
    ]

    // When
    const newItems = applyFilterLogic(items, filterLogic)

    // Then
    expect(newItems).toStrictEqual([])
  })
})
