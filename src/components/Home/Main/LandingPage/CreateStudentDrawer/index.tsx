import React from 'react'
import {
    Drawer,
} from 'antd'
import CreateStudentForm from './CreateStudentForm'


interface CTypes {
    visible: boolean
    onClose: () => void
    createStudent: (data: any) => void
}
const StudentDrawer: React.FC<CTypes> = ({
    visible,
    onClose,
    createStudent
}) => {
    return (
        <Drawer
            visible={visible}
            onClose={onClose}
            width="700"
            title="Tạo Hồ Sơ mới"
        >
            <CreateStudentForm close={onClose} createStudent={createStudent} />
        </Drawer>
    )
}
export default StudentDrawer
