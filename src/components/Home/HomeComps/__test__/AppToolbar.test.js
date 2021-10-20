import React from 'react'
import {
  render,
  screen
} from '@testing-library/react'
import AppToolbar from '../AppToolbar'
import AuthProvider from '../../../../context/AuthenticationContext'

test('AppToolbar is rendered correctly', async () => {
  const comp = render(
    <AuthProvider value={{getUser: () => null}}>
      <AppToolbar />
    </AuthProvider>
  )
  const { getByText } = comp
  expect(getByText(/e-pharma/i)).toBeInTheDocument()
  expect(screen.queryByTestId('menuicon')).toBeInTheDocument()
  expect(screen.queryByTestId('accounticon')).toBeInTheDocument()
  expect(comp).toMatchSnapshot()
})