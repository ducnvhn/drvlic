import React from 'react'
import {
  screen,
  render,
  cleanup
} from '@testing-library/react'
import Drawer from '../Drawer'

afterEach(cleanup)

test('drawer render all menu items', async () => {
  render(
    <Drawer />
  )
  expect(screen.getByText(/Trang chủ/i)).toBeInTheDocument()
  expect(screen.getByText(/cửa hàng/i)).toBeInTheDocument()
  expect(screen.getByText(/nhân viên/i)).toBeInTheDocument()
  expect(screen.getByText(/sản phẩm/i)).toBeInTheDocument()
  expect(screen.getByText(/kho hàng/i)).toBeInTheDocument()
  expect(screen.getByText(/thiết lập/i)).toBeInTheDocument()
})
test('match drawer snap', () => {
  render(
    <Drawer />
  )
  // expect(screen.getByTestId('appdrw')).toMatchSnapshot()
})
