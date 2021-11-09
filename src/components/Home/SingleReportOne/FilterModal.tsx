import React from 'react'
import {
    Modal,
    Form,
    Input
} from 'antd'

type ModalType = {
    visible: boolean
    onCancel: () => void
    onOk: (filter: Record<string,any>) => void
}

const FilterModal: React.FC<ModalType> = ({
    visible,
    onCancel,
    onOk,
}) => {
    const [form] = Form.useForm()
    const [loading, toggleLoading] = React.useState(false)
    
    const changeFilter = async () => {
        toggleLoading(true)
        await onOk(form.getFieldsValue())
        toggleLoading(false)
        onCancel()
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={changeFilter}
            title="Lọc hồ sơ"
            okButtonProps={{
                loading
            }}
        >
            <Form form={form} labelCol={{span: 6}} wrapperCol={{span:18}}>
                <Form.Item label="Mã hồ sơ" name="randomId">
                    <Input />
                </Form.Item>
                <Form.Item label="Tên học viên" name="ten">
                    <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="mobile">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FilterModal