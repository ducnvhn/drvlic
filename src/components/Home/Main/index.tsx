import React from 'react'
import {
    Button,
    PageHeader,
    Tooltip,
    Menu,
    Dropdown,
    message,
    Modal
} from 'antd'
import {
    gql,
    useMutation,
    useLazyQuery,
} from '@apollo/client'
// import XLSX from 'xlsx'
import {
    // ArrowLeftOutlined,
    CaretLeftFilled,
    // ArrowRightOutlined,
    // CalendarFilled,
    // CalendarOutlined,
    // CalendarTwoTone,
    CheckCircleOutlined,
    CheckOutlined,
    // CheckSquareFilled,
    CheckSquareOutlined,
    DeleteOutlined,
    DollarOutlined,
    DownloadOutlined,
    EllipsisOutlined,
    // ExceptionOutlined,
    // ExclamationCircleOutlined,
    ExclamationOutlined,
    FilterOutlined,
    // InfoCircleOutlined,
    // LeftOutlined,
    OrderedListOutlined,
    PlusOutlined,
    PoundOutlined,
    ReloadOutlined,
    RetweetOutlined,
    RollbackOutlined,
    TransactionOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'
import {
    useAuth
} from '../../../context/AuthenticationContext'
import StudentDrawer from './LandingPage/CreateStudentDrawer'
import StudentList from './LandingPage/StudentList'
import FilterModal from './LandingPage/CreateStudentDrawer/FilterModal'
import ReportModal from './Modals/ReportOneModal'
import {
    REQUEST_CONFIRM_PAYMENT,
    CONFIRM_PAYMENT,
    REQUEST_WITHDRAW,
    CONFIRM_WITHDRAW,
    // CONFIRM_RESERVE_BC1,
    LOAD_A_REPORT,
    MOVE_TO_R1,
    REQUEST_CONFIRM_P_2,
    CONFIRM_PAYMENT_TWO,
    MARK_COMPLETED,
    // REQUEST_RESERVE_RESULT,
    // CONFIRM_RESERVE_RESULT,
    REQUEST_RETURN_RESULT,
    REJECT_WD_FN,
    CONFIRM_WD_GD,
    REJECT_WD_GD,
    MARK_GRAD,
    MARK_FAIL,
    MARK_FOR_RETEST,
    LOAD_B_REPORTS,
    MOVE_TO_R2,
    RESERVE_RESULT,
    ADMIN_CONFIRM_RETURN,
    ADMIN_MARK_FINISH,
    ADMIN_MARK_REMOVE,
    ADMIN_MARK_FINAL_FAIL,
    TEACHER_REQUEST_CONFIRM_RETEST_FEE,
    ADM_CONFIRM_RETEST_FEE
} from '../../common/ClientQueries'

const CREATE_STUDENT = gql`
    mutation CreateStudentMutation($student: StudentInput!) {
        createStudent(student: $student) {
            randomId
            created
            ten
            ngaysinh
            anh34
            hangbang
            quequan
            cmt1
            cmt2
            bangcap
            dondk
            giaykhamSK
            hopdongdaotao
            trangthai
            mobile
            baoluu {
                thoihan
                trangthai
            }
            kq1 {
                ngay
                lythuyet
                thuchanh
                duongtruong
            }
            kq2 {
                ngay
                lythuyet
                thuchanh
                duongtruong
            }
            createdBy
        }
    }
`
const LOAD_STUDENTS = gql`
    query LoadStudents($filter: FilterInput, $page: Int, $limit: Int) {
        loadStudents(filter: $filter, page: $page, limit: $limit) {
            total
            students {
                _id
                randomId
                created
                ten
                ngaysinh
                anh34
                hangbang
                quequan
                cmt1
                cmt2
                bangcap
                dondk
                giaykhamSK
                hopdongdaotao
                trangthai
                mobile
                baocao1 {
                    name
                    _id
                }
                baocao2 {
                    name
                    _id
                }
                baoluu {
                    thoihan
                    trangthai
                }
                kq1 {
                    ngay
                    lythuyet
                    thuchanh
                    duongtruong
                }
                kq2 {
                    ngay
                    lythuyet
                    thuchanh
                    duongtruong
                }
                createdBy
            }
        }
    }
`

const TLandingPage = () => {
    const { getUser } = useAuth()
    const user = getUser()
    const pageSize=50
    const [createDrw, toggleCreateDrw] = React.useState(false)
    const [createStudent] = useMutation(CREATE_STUDENT, { refetchQueries: [LOAD_STUDENTS]})
    const [loadStudents, { loading: loadingStudents, data: students = { loadStudents: [] } }] = useLazyQuery(LOAD_STUDENTS, { fetchPolicy: 'network-only' })
    const [filterModal, toggleFilterModal] = React.useState(false)
    const [reportModal, toggleReportModal] = React.useState(false)
    const [bc2Modal, toggleBC2Modal] = React.useState(false)
    const [moveR1] = useMutation(MOVE_TO_R1, { refetchQueries: [LOAD_STUDENTS] })
    const [moveR2] = useMutation(MOVE_TO_R2, { refetchQueries: [LOAD_STUDENTS] })
    const [requestConfirmP] = useMutation(REQUEST_CONFIRM_PAYMENT, { refetchQueries: [LOAD_STUDENTS]})
    const [confirmP] = useMutation(CONFIRM_PAYMENT, { refetchQueries: [LOAD_STUDENTS]})
    const [requestWD] = useMutation(REQUEST_WITHDRAW, { refetchQueries: [LOAD_STUDENTS]})
    // const [requestRSV] = useMutation(REQUEST_RESERVE, { refetchQueries: [LOAD_STUDENTS]})
    const [cfWithdraw] = useMutation(CONFIRM_WITHDRAW, { refetchQueries: [LOAD_STUDENTS]})
    // const [cfReserv] = useMutation(CONFIRM_RESERVE_BC1, { refetchQueries: [LOAD_STUDENTS]})
    // const [requestReturn] = useMutation(REQUEST_TO_RETURN, { refetchQueries: [LOAD_STUDENTS]})
    const [requestConfirmP2] = useMutation(REQUEST_CONFIRM_P_2, { refetchQueries: [LOAD_STUDENTS]})
    const [confirmP2] = useMutation(CONFIRM_PAYMENT_TWO, { refetchQueries: [LOAD_STUDENTS]})
    const [markComplete] = useMutation(MARK_COMPLETED, { refetchQueries: [LOAD_STUDENTS] })
    // const [requestReserveResult] = useMutation(REQUEST_RESERVE_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    // const [confirmReserveResult] = useMutation(CONFIRM_RESERVE_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    const [requestReturnResult] = useMutation(REQUEST_RETURN_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    const [rejectWDFN] = useMutation(REJECT_WD_FN, { refetchQueries: [LOAD_STUDENTS] })
    const [acceptWDGD] = useMutation(CONFIRM_WD_GD, { refetchQueries: [LOAD_STUDENTS] })
    const [rejectWDGD] = useMutation(REJECT_WD_GD, { refetchQueries: [LOAD_STUDENTS] })
    const [markGrad] = useMutation(MARK_GRAD, { refetchQueries: [LOAD_STUDENTS] })
    const [markFail] = useMutation(MARK_FAIL, { refetchQueries: [LOAD_STUDENTS] })
    const [markforretest] = useMutation(MARK_FOR_RETEST, { refetchQueries: [LOAD_STUDENTS] })
    const [reserveResult] = useMutation(RESERVE_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    const [admConfirmReturn] = useMutation(ADMIN_CONFIRM_RETURN, { refetchQueries: [LOAD_STUDENTS] })
    const [admMarkFinish] = useMutation(ADMIN_MARK_FINISH, { refetchQueries: [LOAD_STUDENTS] })
    const [admMarkRemove] = useMutation(ADMIN_MARK_REMOVE, { refetchQueries: [LOAD_STUDENTS] })
    const [admMarkFinalFail] = useMutation(ADMIN_MARK_FINAL_FAIL, { refetchQueries: [LOAD_STUDENTS] })
    const [tRequestCRF] = useMutation(TEACHER_REQUEST_CONFIRM_RETEST_FEE, { refetchQueries: [LOAD_STUDENTS] })
    const [admCFRF] = useMutation(ADM_CONFIRM_RETEST_FEE, { refetchQueries: [LOAD_STUDENTS] })
    // const [exportList, { loading: exporting }] = useLazyQuery(LOAD_STUDENTS, { fetchPolicy: 'network-only', onCompleted: (data) => console.log(data) })

    const [filter, setFilter] = React.useState<Record<string,any>>({
        ten: null,
        mobile: null,
        hangbang: null,
        randomId: null,
        trangthai: null
    })
    const [currentPage, setCurrentPage] = React.useState(1)
    const [selected, setSelected] = React.useState<string[]>([])
    const [working, toggleWorking] = React.useState(false)
    const [withdrawModal, toggleWDRModal] = React.useState(false)

    React.useEffect(() => {
        const load = async () => {
            await loadStudents({
                variables: {
                    filter,
                    page: currentPage,
                    limit: pageSize
                }
            })
        }
        load()
    }, [loadStudents, filter, currentPage])
    
    const createStd = async (student: any) => {
        await createStudent({
            variables: {
                student
            }
        })
            // .then(() => loadStudents())
    }
    
    const notFilterEmpty = () => {
        const matchingKey = Object.keys(filter).find(k => filter[k] !== null)
        return Boolean(matchingKey)
    }
    // console.log(notFilterEmpty())
    const onFilterClick = () => {
        if (notFilterEmpty()) {
            // console.log('filter is not empty')
            setFilter({
                ten: null,
                mobile: null,
                hangbang: null,
                randomId: null,
                trangthai: null
            })
            console.log(filter)
        } else {
            toggleFilterModal(!filterModal)
        }
    }

    const rowSelection = {
        onChange: (keys: any) => setSelected(keys),
        selectedRowKeys: selected
    }

    const onMove = async (report: string, type: string) => {
        if (type === 'BC1') {
            await moveR1({
                variables: {
                    report,
                    students: selected
                }
            })
        } else {
            await moveR2({
                variables: {
                    report,
                    students: selected
                }
            })
        }
        setSelected([])
    }

    const doActionWithConfirm = async (command: any, modalTitle: string, msg:string) => {
        if (!selected || selected.length === 0) {
            message.error('Chọn hồ sơ muốn bảo lưu trước khi thực hiện thao tác')
            return
        }
        try {
            Modal.confirm({
                visible: withdrawModal,
                title: modalTitle,
                content: msg,
                onCancel: () => toggleWDRModal(false),
                onOk: async () => {
                    toggleWorking(true)
                    await command({
                        variables: {
                            students: selected
                        }
                    })
                    setSelected([])
                    toggleWorking(false)
                },
                okButtonProps: {
                    loading: working
                }
            })
        } catch (e) {
            message.error('Đã có lỗi xẩy ra trong quá trình thực hiện - vui lòng kiểm tra lại')
        }
    }

    const doAction = async (command: any ) => {
        if (!selected || selected.length === 0) {
            message.error('Chọn hồ sơ trước khi thực hiện thao tác', 100)
            return
        }
        try {
            toggleWorking(true)
            await command({
                variables: {
                    students: selected
                }
            })
            setSelected([])
            toggleWorking(false)
        } catch (e) {
            message.error('Đã có lỗi xẩy ra trong quá trình thực thi')
        }
    }

    const confirmFinalFail = async (reason: string) => {
        let content = 'Đánh dấu các hồ sơ đã chọn thi trượt'
        switch (reason) {
            case 'THI_TRUOT_LT':
                content += ` lý thuyết?`
                break;
            case 'THI_TRUOT_SH':
                content +=` Sa hình`
                break;
            case 'THI_TRUOT_DT':
                content += ` Đường trường`
                break;
            default:
                break;
        }
        try {
            Modal.confirm({
                visible: withdrawModal,
                onCancel: () => toggleWDRModal(false),
                onOk: async () => {
                    await admMarkFinalFail({
                        variables: {
                            students: selected,
                            reason
                        }
                    })
                    setSelected([])
                },
                title: 'Đánh dấu hồ sơ thi trượt',
                content
            })
        } catch (e) {
            message.error('Không thể thay đổi thông tin hồ sơ')
        }
    }

    const menu = () => {
        if (user.role === 'TEACHER') {
            return (
                <Menu theme="dark">
                    <Menu.Item icon={<PlusOutlined />} key="t1" onClick={() => toggleCreateDrw(!createDrw)}>
                        Thêm hồ sơ
                    </Menu.Item>
                    <Menu.SubMenu key="_bc" icon={<CaretLeftFilled />} title="Yêu cầu xác nhận thanh toán">
                        <Menu.Item icon={<DollarOutlined />} key="t2" onClick={() => doAction(requestConfirmP)}>
                            Yêu cầu XNTT đợt 1
                        </Menu.Item>
                        <Menu.Item icon={<PoundOutlined />} key="t5" onClick={() => doAction(requestConfirmP2)}>
                            Yêu cầu XNTT đợt 2
                        </Menu.Item>
                        <Menu.Item icon={<TransactionOutlined />} key="t6" onClick={() => doAction(tRequestCRF)}>
                            Yêu cầu XNTT thi lại
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item icon={<RollbackOutlined />} key="t4" onClick={() => doAction(requestWD)}>
                        Yêu cầu rút hồ sơ
                    </Menu.Item>
                    <Menu.Item icon={<ReloadOutlined />} key="t5" onClick={() => doAction(requestReturnResult)}>
                        Yêu cầu quay lại thi
                    </Menu.Item>
                </Menu>
            )
        }
        if (user.role === 'ADMIN') {
            return (
                <Menu theme="dark">
                    <Menu.SubMenu key="_bc" icon={<CaretLeftFilled />} title="Báo cáo ">
                        <Menu.Item icon={<OrderedListOutlined />} key="_a2" onClick={() => toggleReportModal(true)}>
                            Chuyển báo cáo 1
                        </Menu.Item>
                        <Menu.Item icon={<UnorderedListOutlined />} key="_a7" onClick={() => toggleBC2Modal(true)}>
                            Chuyển báo cáo 2
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="_course" icon={<CaretLeftFilled />} title="Khóa học">
                        <Menu.Item icon={<CheckOutlined />} key="_a3" onClick={() => doAction(markComplete)}>
                            Đánh dấu hoàn thành khóa học
                        </Menu.Item>
                        <Menu.Item icon={<DeleteOutlined />} key="_a3" onClick={() => doActionWithConfirm(admMarkRemove, 'Hủy Hồ sơ | bỏ học', 'Bạn có chắc muốn hủy các hồ sơ đã chọn?')}>
                            Hủy hồ sơ / bỏ học
                        </Menu.Item>
                        <Menu.Item icon={<CheckSquareOutlined />} key="_a4" onClick={() => doAction(markGrad)}>
                            Đánh dấu Đã tốt nghiệp
                        </Menu.Item>
                        <Menu.Item icon={<ExclamationOutlined />} key="_a5" onClick={() => doAction(markFail)}>
                            Đánh dấu trượt TN
                        </Menu.Item>
                        <Menu.Item icon={<RetweetOutlined />} key="_a6" onClick={() => doAction(markforretest)}>
                            Vào danh sách thi lại TN
                        </Menu.Item>

                        <Menu.Item icon={<UnorderedListOutlined />} key="_a7" onClick={() => doActionWithConfirm(reserveResult, 'Bảo lưu kết quả', 'Bạn có chắc muốn bảo lưu kết quả cho các hồ sơ đã chọn?')}>
                            Bảo lưu kết quả
                        </Menu.Item>
                        <Menu.Item icon={<ReloadOutlined />} key="_a7" onClick={() => doActionWithConfirm(admConfirmReturn, 'Xác nhận quay lại', 'Xác nhận cho các hồ sơ đang bảo lưu quay lại thi')}>
                            Xác nhận quay lại thi
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="_failed" icon={<CaretLeftFilled />} title="Thi trượt">
                        <Menu.Item key="1" onClick={() => confirmFinalFail('THI_TRUOT_LT')}>Thi trượt lý thuyết</Menu.Item>
                        <Menu.Item key="2" onClick={() => confirmFinalFail('THI_TRUOT_SH')}>Thi trượt Sa hình</Menu.Item>
                        <Menu.Item key="3" onClick={() => confirmFinalFail('THI_TRUOT_DT')}>Thi trượt đường trường</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item icon={<CheckCircleOutlined color="green" />} key="_a7" onClick={() => doActionWithConfirm(admMarkFinish, 'Xác nhận Hoàn thành', 'Xác nhận cho các hồ sơ đã chọn hoàn thành khóa học')}>
                        Xác nhận Hoàn thành
                    </Menu.Item>
                </Menu>
            )
        }
        if (user.role === 'FINANCE') {
            return (
                <Menu theme="dark">
                    <Menu.SubMenu key="_failed" icon={<CaretLeftFilled />} title="Xác nhận thanh toán">
                        <Menu.Item icon={<DollarOutlined />} key="_f1" onClick={() => doAction(confirmP)}>
                            Xác nhận thanh toán đợt 1
                        </Menu.Item>
                        <Menu.Item icon={<PoundOutlined />} key="_f2" onClick={() => doAction(confirmP2)}>
                            Xác nhận thanh toán đợt 2
                        </Menu.Item>
                        <Menu.Item icon={<CheckCircleOutlined />} key="_f3" onClick={() => doActionWithConfirm(admCFRF, 'Xác nhận Thanh toán', 'Xác nhận thanh toán thi lại cho hồ sơ thi trượt?')}>
                            Xác nhận thanh toán thi lại
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item icon={<CheckCircleOutlined />} key="_f4" onClick={() => doAction(cfWithdraw)}>
                        Chấp thuận rút HS
                    </Menu.Item>
                    <Menu.Item icon={<DeleteOutlined />} key="_f5" onClick={() => doAction(rejectWDFN)}>
                        Không chấp thuận rút HS
                    </Menu.Item>
                </Menu>
            )
        }
        if (user.role === 'MANAGER') {
            return (
                <Menu theme="dark">
                    <Menu.Item icon={<CheckCircleOutlined />} key="_m1" onClick={() => doAction(acceptWDGD)}>
                        Chấp thuận rút HS
                    </Menu.Item>
                    <Menu.Item icon={<DeleteOutlined />} key="_m2" onClick={() => doAction(rejectWDGD)}>
                        Không chấp thuận rút HS
                    </Menu.Item>
                </Menu>
            )
        }
        return (
            <Menu />
        )
    }

    // const onRequestComplete = (data:any) => {
    //     // console.log(data)
    //     if (data && data.loadStudents) {
    //         const { loadStudents: { students } } = data
    //         // console.log(students)
    //         const worksheet = XLSX.utils.json_to_sheet(students)
    //         const new_workbook = XLSX.utils.book_new()
    //         XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS")
    //         XLSX.writeFile(new_workbook, 'out.xlsx')
    //     }
    // }
    // const exportStds = async () => {
    //     // console.log('export to excel')
    //     try {
    //         await exportList({
    //             variables: {
    //                 filter,
    //                 page: 1,
    //                 limit: 10000
    //             },
    //         })
            
    //     } catch (e) {
    //         console.log(e)
    //         message.error('Không thể tải được dữ liệu')
    //     }
    // }

    const extras = [
        <Tooltip key="_filt" title={notFilterEmpty() ? 'Bỏ bộ lọc' : 'Lọc hồ sơ'}>
            <Button
                danger={notFilterEmpty() || false}
                onClick={() => onFilterClick()}
                key="_Filter"
                shape="round"
                type="text"
                >
                <FilterOutlined />
                {/* {notFilterEmpty() ? 'Bỏ bộ lọc' : 'Lọc hồ sơ'} */}
            </Button>
        </Tooltip>,
        <Tooltip title="Tải lại" key="_reload">
            <Button type="text" key="_reload" onClick={() => loadStudents({ variables: { filter, page: currentPage, limit: pageSize } })} shape="round">
                <ReloadOutlined />
            </Button>
        </Tooltip>,
        <Dropdown trigger={['click']} key="_options" overlay={menu}>
            <Tooltip title="Chức năng">
                <Button type="primary" icon={<EllipsisOutlined />} loading={working} />
            </Tooltip>
        </Dropdown>
    ]
    
    return (
        <div>
            <PageHeader
                title="Danh sách hồ sơ"
                extra={extras}
            />
            <StudentList
                rowSelection={rowSelection}
                students={students.loadStudents}
                loading={loadingStudents}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
            />
            <div>
                <StudentDrawer
                    visible={createDrw}
                    onClose={() => toggleCreateDrw(false)}
                    createStudent={createStd}
                />
            </div>
            <FilterModal
                filter={filter}
                setFilter={setFilter}
                visible={filterModal}
                onCancel={() => toggleFilterModal(false)}
                onOk={() => toggleFilterModal(false)}
            />
            <ReportModal
                dataKey="loadAReport"
                query={LOAD_A_REPORT}
                onMove={(report: string) => onMove(report, 'BC1')}
                visible={reportModal}
                onCancel={() => toggleReportModal(false)}
                onOk={() => toggleReportModal(false)}
                />
            <ReportModal
                dataKey="loadBreports"
                query={LOAD_B_REPORTS}
                onMove={(report: string) => onMove(report, 'BC2')}
                visible={bc2Modal}
                onCancel={() => toggleBC2Modal(false)}
                onOk={() => toggleBC2Modal(false)}
            />
        </div>
    )
}

export default TLandingPage