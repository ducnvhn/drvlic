import React from 'react'
import {
  gql,
  useMutation,
} from '@apollo/client'
import {
  useAuth
} from '../../context/AuthenticationContext'
import {
  useHistory,
} from 'react-router-dom'
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  message
} from 'antd'
import './LoginForm.css'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        role
        email
        name
      }
      token
      tokenExpiration
    }
  }
`

const LoginForm = () => {
  const history = useHistory()
  const { setToken } = useAuth()
  // const [passwordVisible, togglePasswordVisible] = React.useState(false)
  const [login, { loading, error }] = useMutation(LOGIN)
  // const handleClickShowPassword = () => togglePasswordVisible(!passwordVisible)
  const [form] = Form.useForm()
  
  const onLogin = async (values: any) => {
    await login({
      variables: {
        ...values
      }
    })
    .then(res => {
      if (!res) {
        message.error('Vui long kiem tra lai sdt/mk')
      }
      if (error) {
        message.error('Đã có lỗi xẩy ra trong quá trình đăng nhập, vui lòng kiểm tra lại thông tin tài khoản')
      }
      const { data: { login: { token } } } = res
      setToken(token)
      history.push('/')
    })
    .catch(err => {
      message.error('Đã có lỗi xẩy ra trong quá trình đăng nhập, vui lòng kiểm tra lại thông tin tài khoản')
    })
  }
  return (
    <Row justify="center">
      <Col xs={24} sm={12} lg={6}>
        <Form onFinish={onLogin} className="loginForm" form={form} layout="vertical">
          <Form.Item label="Email/SDT" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
export default LoginForm