import React from 'react'
import {
    Space,
    Timeline,
    Typography
} from 'antd'
import moment from 'moment'
import {
    // ArrowRightOutlined,
    CheckCircleOutlined,
    // CheckCircleTwoTone,
    ClockCircleOutlined,
    // ClockCircleTwoTone,
    ExclamationCircleOutlined,
    // ExclamationCircleTwoTone,
    RightCircleOutlined
} from '@ant-design/icons'

const status = [
    'MOI_TAO',
    'DANG_TRONG_BC_1',
    'DANG_YC_DOI_CHO',
    'XAC_NHAN_BC_1',
    'DANG_TRONG_BC_2',
]

const redStatus = [
    'TRUOT_TN',
    'DA_RUT_HS',
    'DA_BO_HOC',
    'THI_TRUOT_LT',
    'THI_TRUOT_SH',
    'THI_TRUOT_DT',
]

const successStatus = [
    'DA_HOC_XONG',
    'HOAN_THANH',
    'CHO_VAO_BC_2',
]

const pendingSts = [
    'DANG_BAO_LUU_THI',
    'DANG_YC_QUAY_LAI_THI',
    'CHO_VAO_BC_1',
    'CHO_XAC_NHAN_TT1',
    'CHO_XN_HOAN_HUY_FN',
    'CHO_XN_HOAN_HUY_GD',
    'CHO_THI_TN',
    'CHO_XAC_NHAN_TT2',
    'CHO_XNTT_TL_LT',
    'CHO_XNTT_TL_SH',
    'CHO_XNTT_TL_DT',
]

const { Title } = Typography

type Ctype = {
    history: Record<string,any>[]
}

const StudentTimeline:React.FC<Ctype> = ({
    history
}) => {
    return (
        <Space direction="vertical" size="large" style={{width: '100%', marginTop: '3em'}}>
            <Title level={3} style={{ textAlign: 'center'}}>Lịch sử hồ sơ</Title>
            <Timeline mode="left">
                {history.map(h => {
                    let Icon
                    if (successStatus.indexOf(h.state) >= 0) {
                        Icon = <CheckCircleOutlined style={{color: 'green'}} />
                    }
                    if (status.indexOf(h.state) >= 0) {
                        Icon = <RightCircleOutlined style={{color: 'green'}} />
                    }
                    if (redStatus.indexOf(h.state) >= 0) {
                        Icon = <ExclamationCircleOutlined style={{color: 'red' }} />
                    }
                    if (pendingSts.indexOf(h.state) >= 0) {
                        Icon = <ClockCircleOutlined style={{ color: 'darkmagenta'}} />
                    }
                    return (
                        <Timeline.Item dot={Icon} key={h.date} label={moment(parseFloat(h.date)).format('DD/MM/YYYY')}>{h.reason}</Timeline.Item>
                    )
                })}
            </Timeline>
        </Space>
    )
}
export default StudentTimeline