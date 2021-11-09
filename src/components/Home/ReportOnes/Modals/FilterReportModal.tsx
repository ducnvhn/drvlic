import React from 'react'
import {
    Modal,
    Form,
    Input,
    Select
} from 'antd'
import hangbang from '../../../common/HangBang'

const { Option } = Select
const trangthais = {
    'PENDING': 'Đang chờ phê duyệt',
    'APPROVED': 'Đã phê duyệt'
}

type ReportFilterModalType = {
    visible: boolean,
    onCancel: () => void
    onOk: (filter: Record<string,any>) => void
    filter: Record<string, any>
}

const ReportFileterModal:React.FC<ReportFilterModalType> = ({
    visible,
    onCancel,
    onOk,
    filter
}) => {
    const [form] = Form.useForm()
    form.setFieldsValue(filter)
    const onConfirm = () => {
        onOk(form.getFieldsValue())
        onCancel()
    }
    return (
        <Modal
            title="Lọc báo cáo"
            visible={visible}
            onCancel={onCancel}
            onOk={onConfirm}
        >
            <Form form={form} labelCol={{ span: 6}} wrapperCol={{ span: 18}}>
                <Form.Item label="Tên báo cáo" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Chú thích" name="desc">
                    <Input />
                </Form.Item>
                <Form.Item label="Hạng bằng" name="hangbang">
                    <Select>
                        {Object.keys(hangbang).map(hb => (
                            <Option value={hb} key={hb}>{`${hb} - ${hangbang[hb as keyof Object]}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Trạng thái" name="status">
                    <Select>
                        {Object.keys(trangthais).map(hb => (
                            <Option value={hb} key={hb}>{trangthais[hb as keyof Object]}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ReportFileterModal