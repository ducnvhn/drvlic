import React from 'react'
import {
    Modal,
    Form,
    Input,
    Select
} from 'antd'
import status from '../../../../common/StudentStatus'

type CType = {
    visible: boolean
    onCancel: () => void
    onOk: () => void,
    filter: Record<string,any>
    setFilter: (filter: Record<string,any>) => void
}


const grades = [
    'A1',
    'A2',
    'B1',
    'B2',
    'C',
    'D',
    'E',
    'F'
]

const FilterModal: React.FC<CType> = ({
    visible,
    onCancel,
    onOk,
    filter,
    setFilter
}) => {
    const [form] = Form.useForm()
    form.setFieldsValue(filter)

    const onOkPress = () => {
        setFilter({
            ...form.getFieldsValue()
        })
        onCancel()
    }

    return (
        <Modal
            title="Lọc hồ sơ"
            visible={visible}
            onCancel={onCancel}
            onOk={onOkPress}
        >
            <Form form={form} onFinish={onOkPress} labelCol={{ span: 6 }} wrapperCol={{span: 18}} >
                <Form.Item label="Mã hồ sơ" name="randomId">
                    <Input />
                </Form.Item>
                <Form.Item name="ten" label="Tên học viên">
                    <Input />
                </Form.Item>
                <Form.Item name="mobile" label="Số điện thoại">
                    <Input />
                </Form.Item>
                <Form.Item name="hangbang" label="Hạng bằng lái">
                    <Select>
                        {grades.map(g=> (
                            <Select.Option key={g} value={g}>{g}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="trangthai" label="Trạng thái hồ sơ">
                    <Select>
                        {Object.keys(status).map((state) => (
                            <Select.Option key={state} value={state}>{status[state]}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default FilterModal