import React from 'react'
import {
    Modal,
    Form,
    Input,
    Select,
    message
} from 'antd'
import grades from '../../common/HangBang'

const { Option } = Select

type CType = {
    visible: boolean
    onCancel: () => void
    onOk: (r: Record<string,any>) => void
    type: string
}

const CreateReportModal:React.FC<CType> = ({
    visible,
    onCancel,
    onOk,
    type
}) => {
    const [form] = Form.useForm()
    const [creating, toggleCreating] = React.useState(false)

    const onCreate = async () => {
        toggleCreating(true)
        const report = form.getFieldsValue()
        console.log(report)
        if (!report.name || !report.hangbang) {
            message.error('Không thể tạo báo cáo do thiếu thông tin')
            onCancel()
        }
        toggleCreating(false)
        onOk(report)
    }
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={onCreate}
            title={`Tạo mới báo cáo mới - ${type === 'BC1' ? 'Báo cáo 1' : 'Báo cáo 2'}`}
            okButtonProps={{
                loading: creating
            }}
        >
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                <Form.Item label="Tên báo cáo" name="name" rules={[{ required: true, message: 'Bắt buộc phải có tên'}]}>
                    <Input placeholder="báo cáo một - ngày/tháng/năm" />
                </Form.Item>
                <Form.Item label="Hạng bằng" name="hangbang" rules={[{ required: true, message: 'Bắt buộc phải có hạng bằng lái'}]}>
                    <Select>
                        {Object.keys(grades).map(g => (
                            <Option key={g} value={g}>{`${g} -  ${grades[g as keyof Object]}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Ghi chú" name="desc">
                    <Input placeholder="Ghi chú & diễn giải" />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default CreateReportModal