import React from 'react'
import {
    Modal,
    List
} from 'antd'
import LoadinCenter from '../../../common/LoadingCenter'
// import { report } from 'process'
const rStatus = {
    'PENDING': 'Đang mở',
    'APPROVED': "Đã duyệt"
}

type CType = {
    visible: boolean
    onCancel: () => void
    onOk: (report: string) => void
    reports?: Record<string,any>[] | []
    loading: boolean
}

const AvailableReportModal: React.FC<CType> = ({
    visible,
    onCancel,
    onOk,
    reports = [],
    loading
}) => {
    return (
        <Modal
            title="Chuyển hồ sơ vào báo cáo 1?"
            visible={visible}
            onCancel={onCancel}
            onOk={() => null}
        >
            {loading && (
                <LoadinCenter />
            )}
            {reports?.length > 0 ? (
                <List
                    dataSource={reports}
                    renderItem={(item) => (
                        <List.Item key={item._id} style={{ cursor: 'pointer'}} onClick={() => onOk(item._id)}>
                            <List.Item.Meta
                                title={`${item.name} - (${item.hangbang})`}
                                description={item.desc}
                            />
                            <div style={{textAlign: 'center'}}>
                                <p>
                                    <strong>
                                        {item.stdCount || 0}
                                    </strong>
                                </p>
                                <p>
                                    {rStatus[item.status as keyof Object]}
                                </p>
                            </div>
                        </List.Item>
                    )}
                />
            ) : <span>Không tìm thấy báo cáo phù hợp</span>}
        </Modal>
    )
}
export default AvailableReportModal