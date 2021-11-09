import React from 'react'
import {
    PageHeader,
    Button,
    // Dropdown,
    Menu,
    Modal,
    Dropdown
} from 'antd'
import {
    // EllipsisOutlined,
    DollarCircleOutlined,
    UsergroupAddOutlined,
    CalendarOutlined,
    DeleteOutlined,
    CloseOutlined,
    RollbackOutlined,
    DollarOutlined,
    EllipsisOutlined,
    CheckOutlined,
    CheckCircleFilled,
    DeleteTwoTone,
    CalendarTwoTone,
    ReloadOutlined
} from '@ant-design/icons'
import {
    useHistory
} from 'react-router-dom'
import ReserveModal from './Modals/ReserveModal'
import AvailableReportModal from './Modals/ReportListModal'
// import { Moment } from 'moment'

type CType = {
    student: any
    role: string
    deleteStudent: (student: string) => void
    moveToR1: (students: string[], report: string) => void
    reports: Record<string,any>[] | []
    loadingReport: boolean
    doAction: (action: string, students: string[]) => void
}


const Header:React.FC<CType> = ({
    student,
    role,
    moveToR1,
    deleteStudent,
    reports,
    loadingReport,
    doAction
}) => {
    const [reportModal, toggleReportModal] = React.useState(false)
    const [reservModal, toggleReservModal] = React.useState(false)
    const [deleteModal, toggleDeleteModdal] = React.useState(false)
    const [rModal, toggleRModal] = React.useState(false)
    const [acceptRsvModal, toggleAcceptRsvModal] = React.useState(false)

    const history = useHistory()
    const createMenu = () => {
        const { trangthai, _id } = student
        const items = []
        // teacher actions
        if (role === 'TEACHER') {
            if (trangthai === 'MOI_TAO') {
                items.push(<Menu.Item disabled={trangthai !== 'MOI_TAO'} key="T_1" icon={<DollarCircleOutlined />} onClick={() => doAction('requestConfirmPayment',[_id])}>Yêu cầu xác nhận thanh toán đợt 1</Menu.Item>)
            }
            if (trangthai === 'CHO_VAO_BC_1') {
                items.push(<Menu.Item key="T_j2" onClick={() => toggleReservModal(true)} icon={<UsergroupAddOutlined />}>Yêu cầu rút hồ sơ</Menu.Item>)
            }
            if (trangthai === 'YEU_CAU_RUT_HS') {
                items.push(<Menu.Item key="T_3" onClick={() => doAction('cancelWithdraw',[_id])} icon={<CalendarOutlined />}>Hủy yêu cầu rút hồ sơ</Menu.Item>)
            }
            if (trangthai === 'DANG_TRONG_BC_1' || trangthai === 'XAC_NHAN_BC_1') {
                items.push(<Menu.Item key="T_4" onClick={() => confirmReservBC1([_id])} icon={<CalendarOutlined />}>Yêu cầu bảo lưu</Menu.Item>)
            }
            if (trangthai === 'XAC_NHAN_BC_1') {
                items.push(<Menu.Item key="T_5" onClick={() => console.log([_id])} icon={<DollarOutlined />}>Yêu cầu XN thanh toán HP2</Menu.Item>)
            }
            
            if (trangthai === 'DANG_BAO_LUU_HOC') {
                items.push(<Menu.Item key="T_6" onClick={() => doAction('requestReturn',[_id])} icon={<RollbackOutlined />}>Yêu cầu quay lại học</Menu.Item>)
            }
            if (trangthai === 'YEU_CAU_BAO_LUU_HOC') {
                items.push(<Menu.Item key="T_7" onClick={() => doAction('cancelReserve',[_id])} icon={<CloseOutlined />}>Hủy yêu cầu bảo lưu</Menu.Item>)
            }
            if (trangthai === 'DA_HOC_XONG') {
                items.push(<Menu.Item key="T_8" onClick={() => doAction('requestConfirmP2',[_id])} icon={<CloseOutlined />}>Yêu cầu XNTT đợt 2</Menu.Item>)
            }
            if (trangthai === 'DA_HOC_XONG' || trangthai === 'CHO_XAC_NHAN_TT2' || trangthai === 'CHO_VAO_BC_2') {
                items.push(<Menu.Item key="T_9" onClick={() => doAction('requestReserveResult', [_id])} icon={<CalendarOutlined />}>Yêu cầu bảo lưu thi</Menu.Item>)
            }
            if (trangthai === 'YEU_CAU_BAO_LUU_THI') {
                items.push(<Menu.Item key="T_9" onClick={() => doAction('cancelReserveResult', [_id])} icon={<DeleteTwoTone />}>Hủy Yêu cầu bảo lưu thi</Menu.Item>)
            }
            if (trangthai === 'DANG_BAO_LUU_THI') {
                items.push(<Menu.Item key="T_10" onClick={() => doAction('requestReturnResult', [_id])} icon={<ReloadOutlined />}>Yêu cầu quay lại thi</Menu.Item>)
            }
        }
        // finance actions - 
        if (role === 'FINANCE') {
            if (trangthai === 'CHO_XAC_NHAN_TT1') {
                items.push(<Menu.Item key="F_confirmP1" icon={<CheckOutlined />} onClick={() => doAction('confirmPayment',[_id])}>Xác nhận thanh toán đợt 1</Menu.Item>)
            }
            if (trangthai === 'CHO_XAC_NHAN_TT2') {
                items.push(<Menu.Item key="F_confirmP2" icon={<CheckCircleFilled />} onClick={() => doAction('confirmPaymentTwo',[_id])}>Xác nhận thanh toán đợt 2</Menu.Item>)
            }
        }
        // admin actions--
        if (role === 'ADMIN') {
            if (trangthai ==='CHO_VAO_BC_1') {
                items.push(<Menu.Item key="A_priorJoin" onClick={() => toggleReportModal(true)} icon={<UsergroupAddOutlined />}>Chuyển vào báo cáo 1</Menu.Item>)
            }
            if (trangthai ==='YEU_CAU_RUT_HS') {
                items.push(<Menu.Item key="A_ycruths" onClick={() => doAction('confirmWithdraw',[_id])}>Chấp nhận Rút hồ sơ</Menu.Item>)
            }
            if (trangthai === 'DA_RUT_HS') {
                items.push(<Menu.Item icon={<DeleteOutlined />} key="A_Daruths" onClick={() => confirmDelete(_id)}>Xóa hồ sơ</Menu.Item>)
            }
            if (trangthai === 'YEU_CAU_BAO_LUU_HOC') {
                items.push(<Menu.Item icon={<DeleteOutlined />} key="A_YCBL" onClick={() => onConfirmRequestResrv([_id])}>Xác nhận bảo lưu</Menu.Item>)
            }
            // if (trangthai === 'YEU_CAU_BAO_LUU_HOC') {
            //     items.push(<Menu.Item icon={<DeleteOutlined />} key="A_YCBL" onClick={() => onConfirmRequestResrv([_id])}>Xác nhận bảo lưu</Menu.Item>)
            // }
            if (trangthai === 'XAC_NHAN_BC_1') {
                items.push(<Menu.Item icon={<CheckOutlined />} key="A_XNHX" onClick={() => doAction('markCompleted',[_id])}>Đánh dấu hoàn thành học</Menu.Item>)
            }
            if (trangthai === 'YEU_CAU_BAO_LUU_THI') {
                items.push(<Menu.Item icon={<CalendarTwoTone />} key="A_XNBL2" onClick={() => doAction('confirmReserveResult',[_id])}>Xác nhận bảo lưu thi</Menu.Item>)
            }
        }
        const menu = (
            <Dropdown
                trigger={['click']}
                overlay={(
                    <Menu theme="dark">
                        {items}
                    </Menu>
            )}>
                <Button type="primary" shape="round">
                    <EllipsisOutlined />
                </Button>
            </Dropdown>
            
        ) 
        return menu
    }
    const confirmReserv = async () => {
        await doAction('requestWithdraw',[student._id])
        // console.log(enddate.toDate())
        toggleReservModal(false)
    }

    const confirmDelete = async (student: string) => {
        Modal.confirm({
            onCancel: () => toggleDeleteModdal(false),
            visible: deleteModal,
            onOk: async () => deleteStudent(student),
            title: 'Bạn có thật sự muốn xóa hồ sơ này?',
        })
    }

    const confirmMoveToR1 = async (report: string) => {
        await moveToR1([student._id], report)
        toggleReportModal(false)
    }

    const confirmReservBC1 = async (students: string[]) => {
        Modal.confirm({
            visible: rModal,
            onCancel: () => toggleRModal(false),
            onOk: async () => {
                await doAction('requestReserve',students)
            },
            title: 'Bạn có muốn bảo lưu hồ sơ này?'
        })
    }

    const onConfirmRequestResrv = async (students: string[]) => {
        Modal.confirm({
            visible: acceptRsvModal,
            onCancel: () => toggleAcceptRsvModal(false),
            onOk: async () => doAction('confirmReserve',students),
            title: "Xác nhận yêu cầu bảo lưu học viên của giáo viên"
        })
    }
    
    return (
        <div>
            <PageHeader
                title="Thông tin hồ sơ"
                subTitle={student.randomId}
                extra={createMenu()}
                onBack={() => history.goBack()}
            />
            <AvailableReportModal
                loading={loadingReport}
                reports={reports}
                visible={reportModal}
                onCancel={() => toggleReportModal(false)}
                onOk={(report: string) => confirmMoveToR1(report)}
            />
            <ReserveModal
                visible={reservModal}
                onCancel={() => toggleReservModal(false)}
                onOk={confirmReserv}
            />
        </div>
    )
}

export default Header
