import React from 'react'
import {
    Modal,
    Form,
    Input,
    Select
} from 'antd'

type MType = {
    visible: boolean
    onCancel: () => void
    onOk: () => void
    createU: (user: Record<string,any>) => void
}

export const roles = {
    'TEACHER': 'Giáo viên',
    'ADMIN': 'Đào tạo',
    'FINANCE': 'Kế toán',
    'MANAGER': 'Quản lý - Giám đốc',
    'SUPER_ADMIN': 'Quạn trị hệ thống'
}
const { Option } = Select
const CreateUserModal:React.FC<MType> = ({
    visible,
    onCancel,
    onOk,
    createU
}) => {
    const [form] = Form.useForm()
    const [loading, toggleLoading] = React.useState(false)
    const createUser = async () => {
        toggleLoading(true)
        const data = form.getFieldsValue()
        await createU(data)
        toggleLoading(false)
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={createUser}
            title="Tạo người dùng mới"
            okButtonProps={{ loading }}
        >
            <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}}>
                <Form.Item label="Tên người dùng" name="name" rules={[{required: true, message: 'Thông tin bắt buộc'}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email/SDT" name="email" rules={[{ required: true, message: 'Thông tin bắt buộc' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Thông tin bắt buộc' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Nhập lại mật khẩu" name="confirmPassword" rules={[{ required: true, message: 'Thông tin bắt buộc' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Vai trò, chức năng" name="role" rules={[{ required: true, message: 'Thông tin bắt buộc' }]}>
                    <Select>
                        {Object.keys(roles).map(k => (
                            <Option key={k} value={k}>{roles[k as keyof Object]}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default CreateUserModal