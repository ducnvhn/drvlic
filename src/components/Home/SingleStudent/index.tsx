import React from 'react'
import {
    message,
    Modal,
    Row,
    Col,
    Alert
} from 'antd'
import {
    // gql,
    useMutation,
    useLazyQuery,
    // ApolloError
} from '@apollo/client'
import {
    useParams,
    useHistory
} from 'react-router-dom'
import {
    useAuth
} from '../../../context/AuthenticationContext'
import Header from './Header'
import BasicInfo from './StudentInfo/Basic'
import {
    LOAD_A_REPORT,
    LOAD_SINGLE_STD,
    REQUEST_CONFIRM_PAYMENT,
    CONFIRM_PAYMENT,
    REQUEST_WITHDRAW,
    APPROVE_RESERV,
    REJECT_WD_FN,
    CANCEL_WITHDRAW_REQUEST,
    DELETE_STUDENT,
    MOVE_TO_R1,
    // REQUEST_RESERVE,
    CANCEL_REQUEST_RESERV,
    CONFIRM_RESERVE_BC1,
    // REQUEST_TO_RETURN,
    MARK_COMPLETED,
    REQUEST_CONFIRM_P_2,
    CONFIRM_PAYMENT_TWO,
    REQUEST_RESERVE_RESULT,
    CANCEL_RESERVE_RESULT,
    CONFIRM_RESERVE_RESULT,
    REQUEST_RETURN_RESULT,
    CONFIRM_WD_GD,
    REJECT_WD_GD,
    MARK_GRAD,
    MARK_FAIL,
    MARK_FOR_RETEST,
    MOVE_TO_R2,
    RESERVE_RESULT,
    ADMIN_CONFIRM_RETURN,
    ADMIN_MARK_FINISH,
    ADMIN_MARK_REMOVE,
    ADMIN_MARK_FINAL_FAIL,
    TEACHER_REQUEST_CONFIRM_RETEST_FEE,
    ADM_CONFIRM_RETEST_FEE,
    ADM_CONFIRM_SWAP,
    FORCE_STATUS,
    // T_REQUEST_CHANGE_GRADE,
    ADMIN_ACCEPT_CHANGE_GRADE,
    ADMIN_REJECT_CHANGE_GRADE,
    FN_ACCEPT_CHANGE_GRADE,
    FN_REJECT_CHANGE_GRADE,
    T_REQUEST_RETURN_FINAL_TEST,
    ADMIN_ACCEPT_RETURN_FINAL_TEST,
} from '../../common/ClientQueries'
import StudentTimeline from './StudentInfo/Timeline'


type RouteParams = {
    id: string
}

const SingleStudent = () => {
    const { id } = useParams<RouteParams>()
    const history = useHistory()
    const { getUser } = useAuth()
    const user = getUser()
    const [confirmModal, toggleConfirmModal] = React.useState(false)
    const [loadStd, { loading, data, error}] = useLazyQuery(LOAD_SINGLE_STD)
    const [requestConfirmPayment] = useMutation(REQUEST_CONFIRM_PAYMENT, { refetchQueries: [LOAD_SINGLE_STD]})
    const [loadAReports, { data: reports = { loadAReport:[]}, loading: loadingReports }] = useLazyQuery(LOAD_A_REPORT)
    // const [prioJoin] = useMutation(PRIORITY_JOIN)
    // const [loadAroom, { data: availableRooms }] = useLazyQuery(LOAD_AVAILABLE_ROOM)
    const [confirmP] = useMutation(CONFIRM_PAYMENT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestWD] = useMutation(REQUEST_WITHDRAW, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmReserv] = useMutation(APPROVE_RESERV, { refetchQueries: [LOAD_SINGLE_STD] }) // finance action - do not remove
    const [cancelWithdraw] = useMutation(CANCEL_WITHDRAW_REQUEST, { refetchQueries: [LOAD_SINGLE_STD] })
    const [delStudent] = useMutation(DELETE_STUDENT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [mover1] = useMutation(MOVE_TO_R1, { refetchQueries: [LOAD_SINGLE_STD] })
    // const [requestResrv] = useMutation(REQUEST_RESERVE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [cancelRequestResrv] = useMutation(CANCEL_REQUEST_RESERV, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmRequestResrv] = useMutation(CONFIRM_RESERVE_BC1, { refetchQueries: [LOAD_SINGLE_STD] })
    // const [reqReturn] = useMutation(REQUEST_TO_RETURN, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markComplete] = useMutation(MARK_COMPLETED, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestConfirmP2] = useMutation(REQUEST_CONFIRM_P_2, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmPaymentTwo] = useMutation(CONFIRM_PAYMENT_TWO, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestReserveResult] = useMutation(REQUEST_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [cancelReserveResult] = useMutation(CANCEL_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmReserveResult] = useMutation(CONFIRM_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestReturnResult] = useMutation(REQUEST_RETURN_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [rejectWDFN] = useMutation(REJECT_WD_FN, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmWDGD] = useMutation(CONFIRM_WD_GD, { refetchQueries: [LOAD_SINGLE_STD] })
    const [rejectWDGD] = useMutation(REJECT_WD_GD, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markGrad] = useMutation(MARK_GRAD, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markFail] = useMutation(MARK_FAIL, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markForRetest] = useMutation(MARK_FOR_RETEST, { refetchQueries: [LOAD_SINGLE_STD] })
    const [movetoR2] = useMutation(MOVE_TO_R2, { refetchQueries: [LOAD_SINGLE_STD] })
    const [reservResult] = useMutation(RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmReturn] = useMutation(ADMIN_CONFIRM_RETURN, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markFinish] = useMutation(ADMIN_MARK_FINISH, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markRemove] = useMutation(ADMIN_MARK_REMOVE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [admMarkFFail] = useMutation(ADMIN_MARK_FINAL_FAIL, { refetchQueries: [LOAD_SINGLE_STD] })
    const [tRequestCRF] = useMutation(TEACHER_REQUEST_CONFIRM_RETEST_FEE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [fnConfirmRF] = useMutation(ADM_CONFIRM_RETEST_FEE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [admConfirmSwp] = useMutation(ADM_CONFIRM_SWAP, { refetchQueries: [LOAD_SINGLE_STD] })
    const [forceStatus] = useMutation(FORCE_STATUS, { refetchQueries: [LOAD_SINGLE_STD] })
    // const [tYCDH] = useMutation(T_REQUEST_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [admAcceptChgGrd] = useMutation(ADMIN_ACCEPT_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [admRejectChgGrd] = useMutation(ADMIN_REJECT_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [fnAcceptChgGrd] = useMutation(FN_ACCEPT_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [fnRejectChgGrd] = useMutation(FN_REJECT_CHANGE_GRADE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [tRequestRFinalTest] = useMutation(T_REQUEST_RETURN_FINAL_TEST, { refetchQueries: [LOAD_SINGLE_STD] })
    const [aAcceptRFinalTest] = useMutation(ADMIN_ACCEPT_RETURN_FINAL_TEST, { refetchQueries: [LOAD_SINGLE_STD] })
    
    const commands:Record<string,any> = {
        'requestConfirmPayment': requestConfirmPayment,
        'confirmPayment': confirmP,
        'requestWithdraw': requestWD,
        'cancelWithdraw': cancelWithdraw,
        'confirmWithdraw': confirmReserv,
        // 'requestReserve': requestResrv,
        'cancelReserve': cancelRequestResrv,
        'confirmReserve': confirmRequestResrv,
        // 'requestReturn': reqReturn,
        'markCompleted': markComplete,
        'requestConfirmP2': requestConfirmP2,
        'confirmPaymentTwo': confirmPaymentTwo,
        'requestReserveResult': requestReserveResult,
        'cancelReserveResult': cancelReserveResult,
        'confirmReserveResult': confirmReserveResult,
        'requestReturnResult': requestReturnResult,
        'rejectWDFN': rejectWDFN,
        'confirmWDGD':confirmWDGD,
        'rejectWDGD':rejectWDGD,
        'markGrad':markGrad,
        'markFail':markFail,
        'markForRetest':markForRetest,
        'movetoR2': movetoR2,
        'reservResult': reservResult,
        'confirmReturn': confirmReturn,
        'markFinish': markFinish,
        'markRemove': markRemove,
        'admMarkFFail': admMarkFFail,
        'tRequestCRF': tRequestCRF,
        'fnConfirmRF': fnConfirmRF,
        'admConfirmSwp': admConfirmSwp,
        'admAcceptChgGrd': admAcceptChgGrd,
        'admRejectChgGrd': admRejectChgGrd,
        'fnAcceptChgGrd': fnAcceptChgGrd,
        'fnRejectChgGrd': fnRejectChgGrd,
        'tRequestRFinalTest': tRequestRFinalTest,
        'aAcceptRFinalTest': aAcceptRFinalTest,
        // 'forceStatus': forceStatus
    }

    React.useEffect(() => {
        const load = async () => {
            await loadStd({
                variables: {
                    id
                }
            })
            if (user.role === 'ADMIN' || user.role === 'MANAGER') {
                await loadAReports({
                    variables: {
                        filter: {
                            status: 'PENDING',
                        },
                        page: 1,
                        limit: 10
                    }
                })
            }
        }
        load()
    }, [id, loadStd, loadAReports, user])


    const deleteStudent = async (student: string) => {
        await delStudent({
            variables: {
                student
            }
        })
        history.goBack()
    }

    const moveToR1 = async (students: string[], report: string) => {
        try {
            await mover1({
                variables: {
                    students,
                    report
                }
            })
            message.success('Chuyển vào BC 1 thành công')
        } catch (e) {
            message.error('Đã có lỗi xẩy ra trong quá trình chuyển BC1')
        }
    }

    const changeStatus = async (students: string[], trangthai: string) => {
        try {
            await forceStatus({
                variables: {
                    students,
                    trangthai
                }
            })
            message.success('Thay đổi trạng thái thành công')
        } catch (error) {
            message.error('Đã có lỗi xẩy ra - không thể thay đổi trạng thái hồ sơ')
        }
    }

    if (loading) {
        return <span>....loading</span>
    }

    const doAction = async (action: string, students: string[]) => {
        if (!students || students.length === 0) {
            message.error('Không thể thực hiện thao tác - thiếu thông tin hồ sơ')
        }
        try {
            commands[action as keyof Object]({
                variables: {
                    students
                }
            })
            // await action({
                // })
            message.success('Thành công')
        } catch (e) {
            message.error('Thao tác không thành công - vui lòng kiểm tra lại thông tin')
        }

    }

    const confirmAction = async(action: string, students: string[], modalTitle: string, modalContent: string) => {
        if (!students || students.length === 0) {
            message.error('Không thể thực hiện thao tác - thiếu thông tin hồ sơ')
        }
        try {
            Modal.confirm({
                title: modalTitle,
                content: modalContent,
                onCancel: () => toggleConfirmModal(false),
                visible: confirmModal,
                onOk: async () => {
                    commands[action as keyof Object]({
                        variables: {
                            students
                        }
                    })
                }
            })
            // await action({
            // })
        } catch (e) {
            message.error('Thao tác không thành công - vui lòng kiểm tra lại thông tin')
        }

    }

    const markFailed = async (students: string[], reason: string) => {
        try {
            await admMarkFFail({
                variables: {
                    students,
                    reason
                }
            })
            message.success('Đánh dấu thi trượt thành công')
        } catch (error) {
            message.error('Đã có lỗi xẩy ra, vui lòng kiểm tra lại thông tin')
        }
    }

    if (!loading && !error && data) {
        if (!data.loadSingleStd) {
            return (
                <Alert message="Không tìm thấy người dùng" type="error" />
            )
        }
        return (
            <div>
                <Header
                    markFailed={markFailed}
                    confirmAction={confirmAction}
                    role={user.role}
                    student={data.loadSingleStd}
                    deleteStudent={deleteStudent}
                    moveToR1={moveToR1}
                    reports={reports.loadAReport.reports}
                    loadingReport={loadingReports}
                    doAction={doAction}
                    movetoR2={async (students: string[], report: string) => {
                        await movetoR2({
                            variables: {
                                students,
                                report
                            }
                        })
                    }}
                    changeStatus={changeStatus}
                />
                <Row>
                    <Col sm={24} md={12}>
                        <BasicInfo
                            student={data.loadSingleStd}
                            role={user.role}
                        />
                    </Col>
                    <Col sm={24} md={12}>
                        <StudentTimeline history={data.loadSingleStd.history} />
                    </Col>
                    
                </Row>
            </div>
        )
    }
    return null
}
export default SingleStudent