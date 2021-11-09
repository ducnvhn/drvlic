import React from 'react'
import {
    message,
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
    CANCEL_WITHDRAW_REQUEST,
    DELETE_STUDENT,
    MOVE_TO_R1,
    REQUEST_RESERVE,
    CANCEL_REQUEST_RESERV,
    CONFIRM_RESERVE_BC1,
    REQUEST_TO_RETURN,
    MARK_COMPLETED,
    REQUEST_CONFIRM_P_2,
    CONFIRM_PAYMENT_TWO,
    REQUEST_RESERVE_RESULT,
    CANCEL_RESERVE_RESULT,
    CONFIRM_RESERVE_RESULT,
    REQUEST_RETURN_RESULT
} from '../../common/ClientQueries'


type RouteParams = {
    id: string
}

const SingleStudent = () => {
    const { id } = useParams<RouteParams>()
    const history = useHistory()
    const { getUser } = useAuth()
    const user = getUser()
    const [loadStd, { loading, data, error}] = useLazyQuery(LOAD_SINGLE_STD)
    const [requestConfirmPayment] = useMutation(REQUEST_CONFIRM_PAYMENT, { refetchQueries: [LOAD_SINGLE_STD]})
    const [loadAReports, { data: reports = { loadAReport:[]}, loading: loadingReports }] = useLazyQuery(LOAD_A_REPORT)
    // const [prioJoin] = useMutation(PRIORITY_JOIN)
    // const [loadAroom, { data: availableRooms }] = useLazyQuery(LOAD_AVAILABLE_ROOM)
    const [confirmP] = useMutation(CONFIRM_PAYMENT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestWD] = useMutation(REQUEST_WITHDRAW, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmReserv] = useMutation(APPROVE_RESERV, { refetchQueries: [LOAD_SINGLE_STD] })
    const [cancelWithdraw] = useMutation(CANCEL_WITHDRAW_REQUEST, { refetchQueries: [LOAD_SINGLE_STD] })
    const [delStudent] = useMutation(DELETE_STUDENT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [mover1] = useMutation(MOVE_TO_R1, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestResrv] = useMutation(REQUEST_RESERVE, { refetchQueries: [LOAD_SINGLE_STD] })
    const [cancelRequestResrv] = useMutation(CANCEL_REQUEST_RESERV, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmRequestResrv] = useMutation(CONFIRM_RESERVE_BC1, { refetchQueries: [LOAD_SINGLE_STD] })
    const [reqReturn] = useMutation(REQUEST_TO_RETURN, { refetchQueries: [LOAD_SINGLE_STD] })
    const [markComplete] = useMutation(MARK_COMPLETED, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestConfirmP2] = useMutation(REQUEST_CONFIRM_P_2, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmPaymentTwo] = useMutation(CONFIRM_PAYMENT_TWO, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestReserveResult] = useMutation(REQUEST_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [cancelReserveResult] = useMutation(CANCEL_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [confirmReserveResult] = useMutation(CONFIRM_RESERVE_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    const [requestReturnResult] = useMutation(REQUEST_RETURN_RESULT, { refetchQueries: [LOAD_SINGLE_STD] })
    
    const commands:Record<string,any> = {
        'requestConfirmPayment': requestConfirmPayment,
        'confirmPayment': confirmP,
        'requestWithdraw': requestWD,
        'cancelWithdraw': cancelWithdraw,
        'confirmWithdraw': confirmReserv,
        'requestReserve': requestResrv,
        'cancelReserve': cancelRequestResrv,
        'confirmReserve': confirmRequestResrv,
        'requestReturn': reqReturn,
        'markCompleted': markComplete,
        'requestConfirmP2': requestConfirmP2,
        'confirmPaymentTwo': confirmPaymentTwo,
        'requestReserveResult': requestReserveResult,
        'cancelReserveResult': cancelReserveResult,
        'confirmReserveResult': confirmReserveResult,
        'requestReturnResult': requestReturnResult
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
        } catch (e) {
            message.error('Thao tác không thành công - vui lòng kiểm tra lại thông tin')
        }

    }
    if (!loading && !error && data) {
        return (
            <div>
                <Header
                    role={user.role}
                    student={data.loadSingleStd}
                    deleteStudent={deleteStudent}
                    moveToR1={moveToR1}
                    reports={reports.loadAReport.reports}
                    loadingReport={loadingReports}
                    doAction={doAction}
                />
                <div>
                    <BasicInfo
                        student={data.loadSingleStd}
                        role={user.role}
                    />
                </div>
            </div>
        )
    }
    return null
}
export default SingleStudent