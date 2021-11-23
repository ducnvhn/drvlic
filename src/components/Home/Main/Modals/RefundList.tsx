import React from 'react'
import {
    Modal,
    List
} from 'antd'
import {
    numberWithCommas
} from '../../../../Utils/math'

type MType = {
    students: Record<string,any>[]
    visible: boolean
    onCancel: () => void
    onOk:()=>any
}

const RefundModal:React.FC<MType> = ({
    visible,
    onCancel,
    students,
    onOk
}) => {
    // console.log(students)
    let total = 0
    return (
        <Modal
            title="Danh sách hoàn tiền - rút HS"
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                onOk()
                onCancel()
            }}
        >
            <List>
                {students.map(student => {
                    total += parseFloat(student.refund)
                    return (
                        <List.Item key="student._id" actions={[<span>{`-${numberWithCommas(student.refund)} VNĐ`}</span>]}>
                            <List.Item.Meta title={student.ten} />
                        </List.Item>
                    )
                })}
                <List.Item actions={[<strong>{`${numberWithCommas(total)} VNĐ`}</strong>]}>
                    <List.Item.Meta title={<strong>Tổng tiền hoàn</strong>} />
                </List.Item>
            </List>
        </Modal>
    )
}
export default RefundModal