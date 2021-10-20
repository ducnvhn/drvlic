import React from 'react'
import {
  render,
  cleanup,
  screen
} from '@testing-library/react'
import Units from '../Units'
import Cat from '../Categories'

const units = [
  'viên',
  'lọ',
  'chai',
  'túi',
  'hộp',
  'vỉ'
]

test('Unit settings display correctly', () => {
  const UniComp = render(<Units units={units} />)
  expect(screen.getAllByText(/đơn vị/i).length).toBe(4)
  expect(screen.getAllByText('Thêm đơn vị mới').length).toBe(2)
  expect(screen.queryAllByTestId('unititem').length).toBe(6)
  expect(UniComp).toMatchSnapshot()
})

test('Categories settings display correctly', () => {
  const CatComp = render(<Cat categories={units} />)
  expect(screen.getAllByTestId('catitem').length).toBe(6)
  expect(CatComp).toMatchSnapshot()
})
