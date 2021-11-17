import React from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd'
import {
    gql,
    useMutation
} from '@apollo/client'

const CHANGE_PWD = gql `
    mutation changePwd($currentPwd: String!, $newPwd: String!, $confirmNewPwd: String!) {
        changePwd(currentPwd: $currentPwd, newPwd: $newPwd, confirmNewPwd: $confirmNewPwd)
    }
`

const PasswordForm = () => {
    const [form] = Form.useForm()
    const [changePwd, { loading }] = useMutation(CHANGE_PWD)
    const onChange = async () => {
        const { currentPwd, newPwd, confirmNewPwd} = form.getFieldsValue()
        if (!currentPwd || !newPwd || !confirmNewPwd) {
            message.error('Vui lòng điền đầy đủ thông tin')
            return
        }
        try {
            await changePwd({
                variables: {
                    currentPwd,
                    newPwd,
                    confirmNewPwd
                }
            })
            message.success('Đổi mật khẩu thành công')
            form.resetFields()
        } catch (error) {
            message.error('Đã có lỗi xẩy ra, vui lòng kiểm tra thông tin')
            // return
        }
    }
    return (
        <Form form={form} labelCol={{span: 8}} wrapperCol={{ span: 16}}>
            <Form.Item label="Mật khẩu cũ" rules={[{required: true, message: 'Bắt buộc phải điền'}]} name="currentPwd">
                <Input.Password />
            </Form.Item>
            <Form.Item label="Mật khẩu mới" rules={[{required: true, message: 'Bắt buộc phải điền'}]} name="newPwd">
                <Input.Password />
            </Form.Item>
            <Form.Item label="Nhập lại mật khẩu mới" rules={[{required: true, message: 'Bắt buộc phải điền'}]} name="confirmNewPwd">
                <Input.Password />
            </Form.Item>
            <Button
                onClick={() => onChange()}
                type="primary"
                loading={loading}
            >
                Đổi mật khẩu
            </Button>
        </Form>
    )
}
export default PasswordForm