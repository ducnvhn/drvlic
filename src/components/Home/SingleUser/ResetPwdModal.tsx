import React from 'react'
import {
    Modal,
    Form,
    Input
} from 'antd'

type MType = {
    visible: boolean
    onCancel: () => void
    onOk: (password: string, confirmPassword: string) => void
}

const ResetPwdModal:React.FC<MType> = ({
    visible,
    onCancel,
    onOk
}) => {
    const [form] = Form.useForm()
    const [loading, toggleLoading] = React.useState(false)
    const setPwd = async () => {
        toggleLoading(true)
        const {password, confirmPassword}  = form.getFieldsValue()
        await onOk(password, confirmPassword)
        toggleLoading(false)
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Đặt lại mật khẩu người dùng"
            okButtonProps={{ loading}}
            onOk={() => setPwd()}
        >
            <Form form={form} labelCol={{ span: 8}} wrapperCol={{ span: 16}}>
                <Form.Item label="Mật khẩu mới" name="password" rules={[{required: true, message: 'Bắt buộc phải có'}, {min: 6, message: 'Tối thiểu 6 ký tự'}]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Nhập lai Mật khẩu mới" name="confirmPassword" rules={[{required: true, message: 'Bắt buộc phải có'}, {min: 6, message: 'Tối thiểu 6 ký tự'}]}>
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ResetPwdModal