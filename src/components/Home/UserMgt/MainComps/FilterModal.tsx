import React from 'react'
import {
    Modal,
    Form,
    Input,
    Select
} from 'antd'
import {
    roles
} from './CreateUserModal'

const { Option } = Select

type MType = {
    visible: boolean
    onCancel: () => void
    onOk?: () => void
    filter?: Record<string,any>
    setFilter: (filter: Record<string,any>) => void
}

const FilterModal:React.FC<MType> =({
    visible,
    onCancel,
    onOk,
    filter,
    setFilter
}) => {
    const [form] = Form.useForm()
    const confirmFilter = () => {
        setFilter(form.getFieldsValue())
        onCancel()
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={confirmFilter}
            title="Tìm kiếm người dùng"
        >
            <Form form={form} labelCol={{ span: 6}} wrapperCol={{ span: 18}}>
                <Form.Item name="name" label="Tên người dùng">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email / SDT">
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Vai trò">
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

export default FilterModal