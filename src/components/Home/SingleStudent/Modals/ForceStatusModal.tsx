import React from 'react'
import {
    Modal,
    Form,
    Select
} from 'antd'
import StudentStatus from '../../../common/StudentStatus'

const { Option } = Select

type MType = {
    visible: boolean
    onCancel: () => void
    onOk: (trangthai: string) => void
}

const ForceStatusModal:React.FC<MType> = ({
    visible,
    onCancel,
    onOk
}) => {
    const [form] = Form.useForm()
    const [working, toggleWorking] = React.useState(false)
    const onConfirm = async () => {
        const { trangthai } = form.getFieldsValue()
        toggleWorking(true)
        onOk(trangthai)
        toggleWorking(false)
    }
    return (
        <Modal
            title="Đặt lại trạng thái hồ sơ"
            visible={visible}
            onCancel={onCancel}
            onOk={onConfirm}
            okButtonProps={{
                loading: working
            }}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                <Form.Item label="Chuyển đến trạng thái" name="trangthai">
                    <Select>
                        {Object.keys(StudentStatus).map(k => (
                            <Option value={k}>{StudentStatus[k]}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ForceStatusModal