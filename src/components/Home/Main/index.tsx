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
import {
    ArrowLeftOutlined,
    CalendarFilled,
    CalendarOutlined,
    CalendarTwoTone,
    CheckOutlined,
    CheckSquareFilled,
    DollarOutlined,
    EllipsisOutlined,
    FilterOutlined,
    OrderedListOutlined,
    PlusOutlined,
    ReloadOutlined,
    RetweetOutlined
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
    REQUEST_RESERVE,
    CONFIRM_WITHDRAW,
    CONFIRM_RESERVE_BC1,
    REQUEST_TO_RETURN,
    MOVE_TO_R1,
    REQUEST_CONFIRM_P_2,
    CONFIRM_PAYMENT_TWO,
    MARK_COMPLETED,
    REQUEST_RESERVE_RESULT,
    CONFIRM_RESERVE_RESULT,
    REQUEST_RETURN_RESULT
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
    const [moveR1] = useMutation(MOVE_TO_R1, { refetchQueries: [LOAD_STUDENTS] })
    const [requestConfirmP] = useMutation(REQUEST_CONFIRM_PAYMENT, { refetchQueries: [LOAD_STUDENTS]})
    const [confirmP] = useMutation(CONFIRM_PAYMENT, { refetchQueries: [LOAD_STUDENTS]})
    const [requestWD] = useMutation(REQUEST_WITHDRAW, { refetchQueries: [LOAD_STUDENTS]})
    const [requestRSV] = useMutation(REQUEST_RESERVE, { refetchQueries: [LOAD_STUDENTS]})
    const [cfWithdraw] = useMutation(CONFIRM_WITHDRAW, { refetchQueries: [LOAD_STUDENTS]})
    const [cfReserv] = useMutation(CONFIRM_RESERVE_BC1, { refetchQueries: [LOAD_STUDENTS]})
    const [requestReturn] = useMutation(REQUEST_TO_RETURN, { refetchQueries: [LOAD_STUDENTS]})
    const [requestConfirmP2] = useMutation(REQUEST_CONFIRM_P_2, { refetchQueries: [LOAD_STUDENTS]})
    const [confirmP2] = useMutation(CONFIRM_PAYMENT_TWO, { refetchQueries: [LOAD_STUDENTS]})
    const [markComplete] = useMutation(MARK_COMPLETED, { refetchQueries: [LOAD_STUDENTS] })
    const [requestReserveResult] = useMutation(REQUEST_RESERVE_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    const [confirmReserveResult] = useMutation(CONFIRM_RESERVE_RESULT, { refetchQueries: [LOAD_STUDENTS] })
    const [requestReturnResult] = useMutation(REQUEST_RETURN_RESULT, { refetchQueries: [LOAD_STUDENTS] })


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

    const onMove = async (report: string) => {

        await moveR1({
            variables: {
                report,
                students: selected
            }
        })
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
    const menu = () => {
        if (user.role === 'TEACHER') {
            return (
                <Menu theme="dark">
                    <Menu.Item icon={<PlusOutlined />} key="t1" onClick={() => toggleCreateDrw(!createDrw)}>
                        Thêm hồ sơ
                    </Menu.Item>
                    <Menu.Item icon={<CheckOutlined />} key="t2" onClick={() => doAction(requestConfirmP)}>
                        Yêu cầu XNTT đợt 1
                    </Menu.Item>
                    <Menu.Item icon={<ArrowLeftOutlined />} key="t4" onClick={() => doAction(requestWD)}>
                        Yêu cầu rút hồ sơ
                    </Menu.Item>
                    <Menu.Item icon={<CalendarOutlined />} key="t3" onClick={() => doActionWithConfirm(requestRSV, 'Yêu cầu bảo lưu', 'Bạn có muốn bảo lưu hồ sơ này không?')}>
                        Yêu cầu bảo lưu
                    </Menu.Item>
                    <Menu.Item icon={<RetweetOutlined />} key="t5" onClick={() => doAction(requestReturn)}>
                        Yêu cầu quay lại học
                    </Menu.Item>
                    <Menu.Item icon={<CheckOutlined />} key="t5" onClick={() => doAction(requestConfirmP2)}>
                        Yêu cầu XNTT đợt 2
                    </Menu.Item>
                    <Menu.Item icon={<CalendarFilled />} key="t5" onClick={() => doAction(requestReserveResult)}>
                        Yêu cầu bảo lưu thi
                    </Menu.Item>
                    <Menu.Item icon={<ReloadOutlined />} key="t5" onClick={() => doAction(requestReturnResult)}>
                        Yêu cầu quay lại thi
                    </Menu.Item>
                </Menu>
            )
        }
        if (user.role === 'ADMIN' || user.role === 'MANAGER') {
            return (
                <Menu theme="dark">
                    <Menu.Item icon={<ArrowLeftOutlined />} key="_a1" onClick={() => doAction(cfWithdraw)}>
                        Xác nhận rút hồ sơ
                    </Menu.Item>
                    <Menu.Item icon={<CalendarOutlined />} key="_a2" onClick={() => doAction(cfReserv)}>
                        Xác nhận bảo lưu
                    </Menu.Item>
                    <Menu.Item icon={<CheckSquareFilled />} key="_a3" onClick={() => doAction(markComplete)}>
                        Đánh dấu hoàn thành khóa học
                    </Menu.Item>
                    <Menu.Item icon={<CalendarTwoTone />} key="_a4" onClick={() => doAction(confirmReserveResult)}>
                        Xác nhận bảo lưu thi
                    </Menu.Item>
                </Menu>
            )
        }
        if (user.role === 'FINANCE') {
            return (
                <Menu theme="dark">
                    <Menu.Item icon={<DollarOutlined />} key="_f1" onClick={() => doAction(confirmP)}>
                        Xác nhận thanh toán đợt 1
                    </Menu.Item>
                    <Menu.Item icon={<CheckOutlined />} key="_f1" onClick={() => doAction(confirmP2)}>
                        Xác nhận thanh toán đợt 2
                    </Menu.Item>
                </Menu>
            )
        }
        return (
            <Menu></Menu>
        )
    }

    let extras = []
    if (selected.length > 0 && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
        extras.push(
            <Button danger key="_addBatch" onClick={() => toggleReportModal(true)} shape="round">
                <OrderedListOutlined />
                BC1
            </Button>
        )
    }
    extras = extras.concat([
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
    ])
    
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
                onMove={onMove}
                visible={reportModal}
                onCancel={() => toggleReportModal(false)}
                onOk={() => toggleReportModal(false)}
            />
        </div>
    )
}

export default TLandingPage