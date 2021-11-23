import React from 'react'
import {
    Modal,
    Form,
    Input,
    message
} from 'antd'

type MType = {
    visible: boolean
    onCancel: () => void
    onOk: (amount: number) => void,
    title: string
    confirm: Record<string,any>
    command: string|null
    selected: string[]
}

const CPModal:React.FC<MType> = ({
    visible,
    onCancel,
    onOk,
    title,
    confirm,
    command,
    selected
}) => {
    const [form] = Form.useForm()
    const [working, toggleWorking] = React.useState(false)
    const onConfirm = async () => {
        try {
            toggleWorking(true)
            const { amount } = form.getFieldsValue()
            if (!amount) {
                console.log('no amount confirmed')
                throw new Error('không thể xác nhận thanh toán')
            }
            // await onOk(parseFloat(amount))
            if (!command || !selected || (selected.length === 0)) {
                console.log('command not found')
                throw new Error('Không rõ lệnh')
            } else {
                confirm[command]({
                    variables: {
                        students: selected,
                        amount: parseFloat(amount)
                    }
                })
            }

        } catch (error) {
            message.error('không thể xác nhận thanh toán')
        }
        toggleWorking(false)
        onCancel()
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={onConfirm}
            title={title}
            okButtonProps={{ loading: working }}
        >
            <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                <Form.Item label="Số tiền xác nhận" name="amount" rules={[{ required: true, message: "Vui lòng nhập số tiền xác nhận"}]}>
                    <Input type="number" addonBefore={<span>VNĐ</span>} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default CPModal