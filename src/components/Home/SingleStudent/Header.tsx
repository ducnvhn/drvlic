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
    ExclamationCircleOutlined ,
    // DollarOutlined,
    EllipsisOutlined,
    CheckOutlined,
    CheckCircleFilled,
    DeleteTwoTone,
    // CalendarTwoTone,
    ReloadOutlined,
    OrderedListOutlined,
    RetweetOutlined,
    InfoCircleOutlined,
    // CaretRightFilled,
    CaretLeftFilled,
    PoundOutlined,
    SwapOutlined,
    FieldTimeOutlined,
    ArrowUpOutlined,
    UserSwitchOutlined,
    WarningOutlined
} from '@ant-design/icons'
import {
    useHistory
} from 'react-router-dom'
import ReserveModal from './Modals/ReserveModal'
import AvailableReportModal from './Modals/ReportListModal'
import Report2Modal from '../Main/Modals/ReportOneModal'
import SwapModal from './Modals/SwapModal'
import {
    LOAD_B_REPORTS,
    // ADM_CONFIRM_SWAP
} from '../../common/ClientQueries'
import ForceStatusModal from './Modals/ForceStatusModal'
import {
    useMutation
} from '@apollo/client'
import {
    LOAD_SINGLE_STD,
    CONFIRM_PAYMENT,
    CONFIRM_PAYMENT_TWO,
    ADM_CONFIRM_RETEST_FEE,
    CONFIRM_WITHDRAW,
    T_REQUEST_CHANGE_GRADE
} from '../../common/ClientQueries'
import CPModal from '../Main/Modals/ConfirmPaymentModal'
import RefundModal from '../Main/Modals/RefundList'
import ChangeGradeModal from './Modals/ChangeGradeModal'
// import { Moment } from 'moment'

type CType = {
    student: any
    role: string
    deleteStudent: (student: string) => void
    moveToR1: (students: string[], report: string) => void
    reports: Record<string,any>[] | []
    loadingReport: boolean
    doAction: (action: string, students: string[]) => void
    movetoR2: (students: string[], report: string) => void
    confirmAction: (action: string, students: string[], modalTitle: string, modalContent: string) => void
    markFailed: (students: string[], reason: string) => void
    changeStatus: (students: string[], reason: string) => void
}


const Header:React.FC<CType> = ({
    student,
    role,
    moveToR1,
    deleteStudent,
    reports,
    loadingReport,
    doAction,
    movetoR2,
    confirmAction,
    markFailed,
    changeStatus
}) => {
    const [reportModal, toggleReportModal] = React.useState(false)
    const [reservModal, toggleReservModal] = React.useState(false)
    const [deleteModal, toggleDeleteModdal] = React.useState(false)
    const [changeGradeModal, toggleChangeGradeModal] = React.useState(false)
    // const [rModal, toggleRModal] = React.useState(false)
    // const [acceptRsvModal, toggleAcceptRsvModal] = React.useState(false)
    const [r2Modal, toggleR2Modal] = React.useState(false)
    const [swapModal, toggleSwapModal] = React.useState(false)
    const [statusModal, toggleStatusModal] = React.useState(false)
    const [cpModal, toggleCPModal] = React.useState(false)
    const [refundModal, toggleRefundModal] = React.useState(false)
    const [confirmCMD, setConfirmCMD] = React.useState('')
    const [cpTitle, setCPTitle] = React.useState('')
    const [confirmP1] = useMutation(CONFIRM_PAYMENT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmP2] = useMutation(CONFIRM_PAYMENT_TWO, { refetchQueries: [LOAD_SINGLE_STD] })
    const [admCFRF] = useMutation(ADM_CONFIRM_RETEST_FEE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmWithdraw] = useMutation(CONFIRM_WITHDRAW, { refetchQueries: [LOAD_SINGLE_STD]})
    const [tRequestChangeGrade] = useMutation(T_REQUEST_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD]})
    const selected = [student._id]

    const history = useHistory()
    const createMenu = () => {
        const { trangthai, _id } = student
        const items = []
        // teacher actions
        if (role === 'TEACHER') {
            if (trangthai === 'MOI_TAO') {
                items.push(<Menu.Item disabled={trangthai !== 'MOI_TAO'} key="T_1" icon={<DollarCircleOutlined />} onClick={() => doAction('requestConfirmPayment',[_id])}>Yêu cầu XN thanh toán đợt 1</Menu.Item>)
                // items.push(<Menu.Item key="T_j2" onClick={() => toggleReservModal(true)} icon={<UsergroupAddOutlined />}>Yêu cầu rút hồ sơ</Menu.Item>)
            }
            if (trangthai === 'CHO_VAO_BC_1') {
                items.push(<Menu.Item key="T_j2" onClick={() => toggleReservModal(true)} icon={<UsergroupAddOutlined />}>Yêu cầu rút hồ sơ</Menu.Item>)
                items.push(<Menu.Item key="T_j12" onClick={() => toggleChangeGradeModal(true)} icon={<UserSwitchOutlined />}>Yêu cầu đổi hạng bằng</Menu.Item>)
            }
            if (trangthai === 'DANG_TRONG_BC_1') {
                // items.push(<Menu.Item key="T_4" onClick={() => confirmReservBC1([_id])} icon={<CalendarOutlined />}>Yêu cầu bảo lưu</Menu.Item>)
                items.push(<Menu.Item key="T_j2" onClick={() => toggleSwapModal(true)} icon={<SwapOutlined />}>Yêu cầu đổi chỗ</Menu.Item>)
            }
            if (trangthai === 'CHO_XN_HOAN_HUY_FN') {
                items.push(<Menu.Item key="T_3" onClick={() => doAction('cancelWithdraw',[_id])} icon={<CalendarOutlined />}>Hủy yêu cầu rút hồ sơ</Menu.Item>)
            }
            // if (trangthai === 'XAC_NHAN_BC_1') {
            //     items.push(<Menu.Item key="T_5" onClick={() => doAction('requestConfirmP2',[_id])} icon={<DollarOutlined />}>Yêu cầu XN thanh toán đợt 2</Menu.Item>)
            // }
            
            // if (trangthai === 'DANG_BAO_LUU_HOC') {
            //     // items.push(<Menu.Item key="T_6" onClick={() => doAction('requestReturn',[_id])} icon={<RollbackOutlined />}>Yêu cầu quay lại học</Menu.Item>)
            // }
            
            if (trangthai === 'DA_HOC_XONG') {
                items.push(<Menu.Item key="T_8" onClick={() => doAction('requestConfirmP2',[_id])} icon={<CloseOutlined />}>Yêu cầu XNTT đợt 2</Menu.Item>)
            }
            // if (trangthai === 'DA_HOC_XONG' || trangthai === 'CHO_XAC_NHAN_TT2' || trangthai === 'CHO_VAO_BC_2') {
            //     items.push(<Menu.Item key="T_9" onClick={() => doAction('requestReserveResult', [_id])} icon={<CalendarOutlined />}>Yêu cầu bảo lưu thi</Menu.Item>)
            // }
            if (trangthai === 'YEU_CAU_BAO_LUU_THI') {
                items.push(<Menu.Item key="T_9" onClick={() => doAction('cancelReserveResult', [_id])} icon={<DeleteTwoTone />}>Hủy Yêu cầu bảo lưu thi</Menu.Item>)
            }
            if (trangthai === 'DANG_BAO_LUU_THI') {
                items.push(<Menu.Item key="T_10" onClick={() => doAction('requestReturnResult', [_id])} icon={<ReloadOutlined />}>Yêu cầu quay lại thi</Menu.Item>)
            }
            if (trangthai === 'THI_TRUOT_LT' || trangthai === 'THI_TRUOT_SH' || trangthai === 'THI_TRUOT_DT') {
                items.push(<Menu.Item key="T_11" onClick={() => doAction('tRequestCRF',[_id])} icon={<PoundOutlined />}>Yêu cầu XNTT thi lại</Menu.Item>)
            }
            if (trangthai === 'DA_XNTT_THI_LAI') {
                items.push(<Menu.Item key="T_14" onClick={() => doAction('tRequestRFinalTest', [_id])} icon={<ReloadOutlined />}>Yêu cầu thi lại sát hạch</Menu.Item>)
            }

        }
        // finance actions - 
        if (role === 'FINANCE') {
            if (trangthai === 'CHO_XAC_NHAN_TT1') {
                // items.push(<Menu.Item key="F_confirmP1" icon={<CheckOutlined />} onClick={() => doAction('confirmPayment',[_id])}>Xác nhận thanh toán đợt 1</Menu.Item>)
                items.push(<Menu.Item key="F_confirmP1" icon={<CheckOutlined />} onClick={() => {
                    setCPTitle("Xác nhận thanh toán đợt một")
                    setConfirmCMD('paymentOne')
                    toggleCPModal(true)
                }}>Xác nhận thanh toán đợt 1</Menu.Item>)
            }
            if (trangthai === 'DAO_TAO_OK_DOI_HANG') {
                items.push(
                    <Menu.SubMenu key="f_hangbang" title="Hạng bằng" icon={<CaretLeftFilled />}>
                        <Menu.Item icon={<CheckOutlined />} onClick={() => doAction('fnAcceptChgGrd', [_id])}>
                            Đồng ý đổi hạng bằng
                        </Menu.Item>
                        <Menu.Item icon={<WarningOutlined />} onClick={() => doAction('fnRejectChgGrd', [_id])}>
                            KHÔNG đồng ý đổi hạng bằng
                        </Menu.Item>
                    </Menu.SubMenu>
                )
            }
            if (trangthai === 'CHO_XAC_NHAN_TT2') {
                // items.push(<Menu.Item key="F_confirmP2" icon={<CheckCircleFilled />} onClick={() => doAction('confirmPaymentTwo',[_id])}>Xác nhận thanh toán đợt 2</Menu.Item>)
                items.push(<Menu.Item key="F_confirmP2" icon={<CheckCircleFilled />} onClick={() => {
                    setCPTitle("Xác nhận thanh toán đợt hai")
                    setConfirmCMD('paymentTwo')
                    toggleCPModal(true)
                }}>Xác nhận thanh toán đợt 2</Menu.Item>)
            }
            if (trangthai === 'CHO_XN_HOAN_HUY_FN') {
                // items.push(<Menu.Item key="F_acceptwd" icon={<CheckCircleFilled />} onClick={() => doAction('confirmWithdraw',[_id])}>Chấp thuận rút HS</Menu.Item>)
                items.push(<Menu.Item key="F_acceptwd" icon={<CheckCircleFilled />} onClick={() => {
                    setCPTitle("Hoàn tiền rút hồ sơ")
                    setConfirmCMD('confirmWithdraw')
                    toggleCPModal(true)
                }}>Chấp thuận rút HS</Menu.Item>)
                items.push(<Menu.Item key="F_rjctwd" onClick={() => doAction('rejectWDFN',[_id])}>Không Chấp thuận rút HS</Menu.Item>)
            }
            if (trangthai === 'CHO_XNTT_TL_LT') {
                // items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => doAction('fnConfirmRF',[_id])}>Xác nhận phí thi lại lý thuyết</Menu.Item>)
                items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => {
                    setCPTitle("Xác nhận thanh toán thi lại lý thuyết")
                    setConfirmCMD('admCFRF')
                    toggleCPModal(true)
                }}>Xác nhận phí thi lại lý thuyết</Menu.Item>)
            }
            if (trangthai === 'CHO_XNTT_TL_SH') {
                // items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => doAction('fnConfirmRF',[_id])}>Xác nhận phí thi lại sa hình</Menu.Item>)
                items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => {
                    setCPTitle("Xác nhận thanh toán thi lại Sa hình")
                    setConfirmCMD('admCFRF')
                    toggleCPModal(true)
                }}>Xác nhận phí thi lại sa hình</Menu.Item>)
            }
            if (trangthai === 'CHO_XNTT_TL_DT') {
                // items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => doAction('fnConfirmRF',[_id])}>Xác nhận phí thi lại đường trường</Menu.Item>)
                items.push(<Menu.Item key="F_cfrf" icon={<CheckOutlined />} onClick={() => {
                    setCPTitle("Xác nhận thanh toán thi lại Đường trường")
                    setConfirmCMD('admCFRF')
                    toggleCPModal(true)
                }}>Xác nhận phí thi lại đường trường</Menu.Item>)
            }
        }
        // admin actions--
        if (role === 'ADMIN') {
            if (trangthai ==='CHO_VAO_BC_1') {
                items.push(<Menu.Item key="A_priorJoin" onClick={() => toggleReportModal(true)} icon={<UsergroupAddOutlined />}>Chuyển vào báo cáo 1</Menu.Item>)
            }
            if (trangthai === 'DANG_YC_DOI_HANG') {
                items.push(<Menu.Item key="A_acceptChgrd" onClick={() => doAction('admAcceptChgGrd', [_id])} icon={<UsergroupAddOutlined />}>Đồng ý đổi hạng bằng</Menu.Item>)
                items.push(<Menu.Item key="A_acceptChgrd" onClick={() => doAction('admRejectChgGrd', [_id])} icon={<WarningOutlined />}>KHÔNG đồng ý đổi hạng bằng</Menu.Item>)
                
            }
            if (trangthai === 'DA_RUT_HS') {
                items.push(<Menu.Item icon={<DeleteOutlined />} key="A_Daruths" onClick={() => confirmDelete(_id)}>Xóa hồ sơ</Menu.Item>)
            }
            if (trangthai === 'DANG_YC_DOI_CHO') {

                items.push(<Menu.Item icon={<SwapOutlined />} key="A_SWP" onClick={() => doAction('admConfirmSwp',[_id])}>Xác nhận đổi chỗ</Menu.Item>)
            }
            if (trangthai === 'XAC_NHAN_BC_1') {
                items.push(<Menu.Item icon={<CheckOutlined />} key="A_XNHX" onClick={() => doAction('markCompleted',[_id])}>Đánh dấu hoàn thành học</Menu.Item>)
            }
            if (trangthai === 'DA_HOC_XONG') {
                items.push(<Menu.Item icon={<DeleteOutlined />} key="A_XNBL2" onClick={() => confirmAction('markRemove', [_id], 'Huỷ hồ sơ / bỏ học', 'Bạn có chắc muốn hủy các hồ sơ đã chọn?')}>Hủy hồ sơ / bỏ học</Menu.Item>)
            }
            if (trangthai === 'CHO_THI_TN') {
                items.push(<Menu.Item icon={<CheckOutlined />} key="A_5" onClick={() => doAction('markGrad',[_id])}>Đánh dấu đã TN</Menu.Item>)
                items.push(<Menu.Item icon={<ExclamationCircleOutlined />} key="A_6" onClick={() => doAction('markFail',[_id])}>Đánh dấu TRƯỢT TN</Menu.Item>)
            }
            if (trangthai === 'TRUOT_TN') {
                items.push(<Menu.Item icon={<RetweetOutlined />} key="A_9" onClick={() => doAction('markForRetest',[_id])}>Vào danh sách thi lại TN</Menu.Item>)
            }
            if (trangthai === 'CHO_VAO_BC_2') {
                items.push(<Menu.Item icon={<OrderedListOutlined />} key="A_7" onClick={() => toggleR2Modal(true)}>Chuyển vào báo cáo 2</Menu.Item>)
            }
            if (trangthai === 'CHO_VAO_BC_2' || trangthai === 'DANG_TRONG_BC_2') {
                items.push(<Menu.Item icon={<CalendarOutlined />} key="A_81" onClick={() => confirmAction('reservResult',[_id], "Bảo lưu kết quả?", "Bạn có muốn bảo lưu kết quả của hồ sơ này không?")}>Bảo lưu kết quả</Menu.Item>)
            }
            if (trangthai === 'DANG_YC_QUAY_LAI_THI') {
                items.push(<Menu.Item icon={<ReloadOutlined />} key="A_82" onClick={() => confirmAction('confirmReturn',[_id], "Quay lại thi", "Bạn có muốn cho hồ sơ này quay lại thi?")}>Xác nhận quay lại thi</Menu.Item>)
            }
            if (trangthai === 'DANG_TRONG_BC_2') {
                items.push(<Menu.Item icon={<InfoCircleOutlined />} key="A_8" onClick={() => confirmAction('markFinish',[_id], "Hoàn thành khóa học", "Bạn có muốn đánh dấu hồ sơ này đã hoàn thành khóa học?")}>Hoàn thành khóa học</Menu.Item>)
                items.push(
                    <Menu.SubMenu key="_a10" title="Thi trượt" icon={<CaretLeftFilled />}>
                        <Menu.Item key="_a101" onClick={() => markFailed([_id], 'THI_TRUOT_LT')}>Thi trượt lý thuyết</Menu.Item>
                        <Menu.Item key="_a102" onClick={() => markFailed([_id], 'THI_TRUOT_SH')}>Thi trượt sa hình</Menu.Item>
                        <Menu.Item key="_a103" onClick={() => markFailed([_id], 'THI_TRUOT_DT')}>Thi trượt đường trường</Menu.Item>
                    </Menu.SubMenu>
                )
            }
            if (trangthai === 'DANG_YC_QUAY_LAI_THI_SH') {
                items.push(<Menu.Item icon={<CheckOutlined />} key="A_83" onClick={() => confirmAction('aAcceptRFinalTest',[_id], "Quay lại thi sát hạch", "Bạn có muốn cho hồ sơ này quay lại thi sát hạch?")}>Đồng ý quay lại thi sát hạch</Menu.Item>)
            }
        }
        if (role === 'MANAGER') {
            // items.push(<Menu.Item icon={<CheckOutlined />} key="_gd1" onClick={() => doAction('confirmWDGD',[_id])}>Chấp thuận rút HS</Menu.Item>)
            items.push(<Menu.Item icon={<CheckOutlined />} key="_gd1" onClick={() => {
                toggleRefundModal(true)
            }}>
                Chấp thuận rút HS
            </Menu.Item>)
            items.push(<Menu.Item icon={<DeleteOutlined />} key="_gd2" onClick={() => doAction('rejectWDGD',[_id])}>Không chấp thuận rút HS</Menu.Item>)
        }
        if (role === 'SUPER_ADMIN') {
            items.push(<Menu.Item icon={<FieldTimeOutlined />} key="_spa1" onClick={() => toggleStatusModal(true)}>Đặt lại trạng thái hồ sơ</Menu.Item>)
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

    const confirmMoveR2 = async (report: string) => {
        await movetoR2([student._id], report)
    }

    const switchStatus = async (trangthai: string) => {
        // const { _id } = student
        await changeStatus([student._id], trangthai)
        toggleStatusModal(false)
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
            <Report2Modal
                dataKey="loadBreports"
                query={LOAD_B_REPORTS}
                onMove={(report: string) => confirmMoveR2(report)}
                visible={r2Modal}
                onCancel={() => toggleR2Modal(false)}
                onOk={() => toggleR2Modal(false)}
            />
            <SwapModal
                student={student._id}
                visible={swapModal}
                onCancel={() => toggleSwapModal(false)}
                onOk={() => toggleSwapModal(false)}
            />
            <ForceStatusModal
                visible={statusModal}
                onCancel={()=>toggleStatusModal(false)}
                onOk={(trangthai: string) => switchStatus(trangthai)}
            />
            <CPModal
                visible={cpModal}
                onCancel={() => toggleCPModal(false)}
                onOk={() => toggleCPModal(false)}
                title={cpTitle}
                confirm={{
                    'paymentOne': confirmP1,
                    'paymentTwo': confirmP2,
                    'admCFRF': admCFRF,
                    'confirmWithdraw': confirmWithdraw
                }}
                command={confirmCMD}
                selected={selected}
            />
            <RefundModal
                visible={refundModal}
                onCancel={() => toggleRefundModal(false)}
                students={[student]}
                onOk={() => doAction('confirmWDGD', [student._id])}
            />
            <ChangeGradeModal
                visible={changeGradeModal}
                onCancel={() => toggleChangeGradeModal(false)}
                onOk={async(ycdh: string) => {
                    await tRequestChangeGrade({
                        variables: {
                            students: [student._id],
                            ycdh
                        }
                    })
                }}
                students={[student]}
            />
        </div>
    )
}

export default Header
