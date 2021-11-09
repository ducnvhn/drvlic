import React from 'react'
import {
    Modal,
    List,
    Button
} from 'antd'
import moment from 'moment'

type CType = {
    student: any
    visible: boolean
    onCancel: () => void
    onOk: () => void
    availableRooms: any[]
    addStd2Room: (student: string, room: string, priority: boolean) => void
    priority: boolean
}

const JoinRoomModal: React.FC<CType> = ({
    student,
    visible,
    onOk,
    onCancel,
    availableRooms,
    addStd2Room,
    priority
}) => {
    const [loading, toggleLoading] = React.useState(false)
    
    const join = async (room: string) => {
        toggleLoading(true)
        await addStd2Room(student._id, room, priority)
        toggleLoading(false)
        onCancel()
    }
    return (
        <Modal
            visible={visible}
            title="Xếp lớp"
            onCancel={onCancel}
            onOk={onOk}
            closable={false}
            footer={<Button onClick={onCancel} type="primary">Đóng</Button>}
        >
            <List
                dataSource={availableRooms}
                renderItem={(item: any, index: number) => {
                    return (
                        <List.Item
                            actions={[
                                <Button loading={loading} onClick={() => join(item._id)} key="_add" size="small">Đăng ký</Button>
                            ]}
                        >
                            <List.Item.Meta
                                key={item._id}
                                title={item.tenlop}
                                description={`SL:${item.students.length} / ${item.maxstudents}, Ngày bắt đầu: ${moment(parseFloat(item.startdate)).format('DD/MM/YYYY')}, Hạn dky: ${moment(parseFloat(item.deadline)).format('DD/MM/YYYY')}`}
                            />
                        </List.Item>
                    )
                }}
            />
        </Modal>
    )
}
export default JoinRoomModal