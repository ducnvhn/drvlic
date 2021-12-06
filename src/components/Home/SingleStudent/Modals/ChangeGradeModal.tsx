import React from 'react'
import {
    Modal,
    Select,
    Form,
    message,
    List
} from 'antd'
import {
    Link
} from 'react-router-dom'
import hangbangs from '../../../common/HangBang'

const { Option } = Select

type MType = {
    visible: boolean
    onCancel: () => void
    onOk: (ycdh: string) => void
    students: Record<string,any>[]
}

const ChangeGradeModal:React.FC<MType> = ({
    visible,
    onCancel,
    onOk,
    students
}) => {
    const [form] = Form.useForm()
    const [loading, toggleLoading] = React.useState(false)
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            title="Đổi hạng bằng"
            onOk={async() => {
                toggleLoading(true)
                const {hangmoi} = form.getFieldsValue()
                // if(student.hangbang === hangmoi) {
                //     toggleLoading(false)
                //     message.warning(`Hồ sơ đang ở hạng ${hangmoi} - không có gì thay đổi`)
                //     onCancel()
                // }
                await onOk(hangmoi)
                toggleLoading(false)
                onCancel()
            }}
            okButtonProps={{
                loading
            }}
        >
            <p>Đổi hạng bằng cho học viên</p>
            <List
                dataSource={students}
                itemLayout="horizontal"
                renderItem={(item: any) => {
                    return (
                        <List.Item key={item._id} actions={[item.hangbang]}>
                            <List.Item.Meta
                                title={<Link to={`/std/${item.randomId}`}>{item.ten}</Link>}
                                description={`Mã hồ sơ: ${item.randomId}`}
                            />
                        </List.Item>
                    )
                }}
            />
            <Form form={form}>
                <Form.Item name="hangmoi" label="Chọn hạng bằng mới">
                    <Select>
                        {Object.keys(hangbangs).map(k => (
                            <Option key={k} value={k}>{`${k} - ${hangbangs[k as keyof Object]}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ChangeGradeModal