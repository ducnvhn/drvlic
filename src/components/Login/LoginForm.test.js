import React from 'react'
import {
  screen,
  render,
  cleanup,
  waitFor,
  fireEvent
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing';
import LoginForm from './LoginForm'
import {
  gql
} from '@apollo/client'
import wait from 'waait'

 const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        role
        email
        name
        expDate
      }
      token
      tokenExpiration
    }
  }
`

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        email: 'ducnv@gmail.com',
        password: '12345'
      }
    },
    result: {
      data: {
        login: {
          user: {
            _id: 'some id',
            role: 'shopowner',
            email: 'ducnv@gmail.com',
            name: 'ducnv',
            expDate: 'someday'
          },
          token: 'abcxyz',
          tokenExpiration: 'someotherday'
        }
      },
      error: new Error('something went wrong')
    }
  }
]

afterEach(cleanup)
// basic test, just to render the form.
test('render login form with all needed components', () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginForm />
    </MockedProvider>
  )
  // console.log(comp)
  const comp = getByText('Đăng nhập')
  expect(comp).toBeInTheDocument()
  // email input
  expect(screen.getByPlaceholderText(/Số điện thoại hoặc email/i)).toBeInTheDocument()
  // password input
  expect(screen.getByPlaceholderText(/mật khẩu/i)).toBeInTheDocument()
  // login button
  expect(screen.getByText('Đăng Nhập')).toBeInTheDocument()
})

// should change the state to loading....
test('change to loading state when button is clicked', async () => {
   render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginForm />
    </MockedProvider>
  )
  // await wait(0)
  expect(screen.getByTestId('login')).toBeInTheDocument()
  fireEvent.click(screen.getByTestId('login'))
  const loadingComp = await screen.findByTestId('loadingicon')
  expect(loadingComp).toBeInTheDocument()
  // expect(screen.findByText('...loading')).toBeInTheDocument()
  // await waitFor(() => {
  //   expect(screen.queryByText('...loading')).not.toBeInTheDocument()
  // })
})

// to show error message if something went wrong...
test('to show error message when failed', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginForm />
    </MockedProvider>
  )
  // await wait(0)
  fireEvent.click(screen.getByTestId('login'))
  // await wait(0)
  await waitFor(() => {
    expect(screen.queryByText(/vui lòng kiểm tra lại/i)).toBeInTheDocument()
  })
})