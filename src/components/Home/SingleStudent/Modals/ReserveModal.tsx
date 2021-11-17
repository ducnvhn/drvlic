import React from 'react'
import {
    Modal,
} from 'antd'

type CType = {
    visible: boolean
    onCancel: () => void
    onOk: () => void
}

const ReserveModal: React.FC<CType> = ({
    visible,
    onCancel,
    onOk
}) => {
    
    return (
        <Modal
            title="Gửi yêu cầu rút hồ sơ?!"
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
        >
            <p>
                Gửi yêu cầu rút hồ sơ tới bộ phận đào tạo. Phòng đào tạo sẽ phê duyệt việc rút hồ sơ và hoàn tiền.
                Bạn có thật sự muốn rút hồ sơ này?
            </p>
        </Modal>
    )
}

export default ReserveModal
