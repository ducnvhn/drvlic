import React from 'react'
import {
    PageHeader,
    Row,
    Col
} from 'antd'
// import {
//     useAuth
// } from '../../../context/AuthenticationContext'
import PwdForm from './ChangePwdForm'

const Profile = () => {
    // const { getUser } = useAuth()
    // const user = getUser()
    return (
        <Row justify="center">
            <Col xs={24} sm={24} md={12} lg={8} style={{ textAlign: 'right'}}>
                <PageHeader title="Đổi mật khẩu" />
                <PwdForm />
            </Col>
        </Row>
    )
}
export default Profile