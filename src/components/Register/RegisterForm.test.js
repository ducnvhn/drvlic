import React from 'react'
import {
  cleanup,
  render,
  screen,
  // fireEvent
} from '@testing-library/react'
import RegisterForm, { REGISTER } from './RegisterForm'
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: REGISTER,
      variables: {
        name: '_',
        email: '_',
        password: '_',
        confirmPassword: '_'
      }
    },
    result: {
      data: {
        signup: {
          _id: '111',
          role:'OWNER',
          email: 'ducnv@gmail.com',
          name: 'ducnv',
          profile: {
            avatar: 'hello there.com'
          },
          expDate:'22/11/2222'
        }
      }
    }
  }
]
afterEach(cleanup)

test('Register form display all components correctly', () => {
  render (
    <MockedProvider mocks={mocks}>
      <RegisterForm />
    </MockedProvider>
  )
  expect(screen.queryByText(/Đăng Ký tài khoản/i)).toBeInTheDocument()
  expect(screen.getByTestId('rform')).toBeInTheDocument()
  expect(screen.getByTestId('rbutton')).toBeInTheDocument()
})

test('show circular progress on click', async () => {
  render (
    <MockedProvider mocks={[]}>
      <RegisterForm />
    </MockedProvider>
  )
  // const btn = screen.getByTestId('rbutton')
  // fireEvent.click(screen.getByTestId('rbutton'))
  // const ldingCir = await screen.findByTestId('loadingicon')
  expect(await screen.findByTestId('rcontainer')).toMatchSnapshot()
})