import {
    gql
} from '@apollo/client'

export const LOAD_SINGLE_STD = gql`
    query loadSingle($id: String!) {
        loadSingleStd(id: $id) {
            _id
            cmnd
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
            refund
            history {
                state
                date
                reason
            }
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
`
export const REQUEST_CONFIRM_PAYMENT = gql`
    mutation requestConfirmPayment($students: [String]!) {
        requestConfirmPayment (students: $students) {
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
            baocao1 {
                name
                _id
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
export const CONFIRM_PAYMENT = gql`
    mutation confirmPayment($students: [String]!, $amount: Float) {
        confirmPayment (students: $students, amount: $amount) {
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
            baocao1 {
                name
                _id
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
export const REQUEST_WITHDRAW = gql`
    mutation requestWithdraw($students: [String]!) {
        requestWithdraw(students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const CONFIRM_WITHDRAW = gql`
    mutation confirmWithdraw($students: [String]!, $amount: Float) {
        confirmWithdraw(students: $students, amount: $amount) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const CANCEL_WITHDRAW_REQUEST = gql`
    mutation cancelWithDraw($students: [String]!) {
        cancelWithDraw(students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const DELETE_STUDENT = gql`
    mutation deleteStudent($student: String!) {
        deleteStudent(student: $student)
    }
`
export const MOVE_TO_R1 = gql`
    mutation moveToR1($students: [String], $report: String!) {
        moveToR1(students: $students, report: $report)
    }
`
export const REQUEST_RESERVE = gql`
    mutation requestResrv($students: [String]!) {
        requestResrv (students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const CANCEL_REQUEST_RESERV = gql`
    mutation cancelRequestResrv($students: [String]!) {
        cancelRequestResrv(students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const CONFIRM_RESERVE_BC1 = gql`
    mutation confirmReserveBC1($students: [String]!) {
        confirmReserveBC1(students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const REQUEST_TO_RETURN = gql`
    mutation requestToReturn($students: [String]!) {
        requestToReturn(students: $students) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const LOAD_A_REPORT = gql`
    query loadAReport($filter: ReportFilter, $page: Int, $limit: Int) {
        loadAReport(filter: $filter, page: $page, limit: $limit) {
            reports {
                _id
                hangbang
                name
                desc
                status
                createdBy {
                    name
                },
                stdCount
                created
            }
            total
        }
    }
`
export const APPROVE_RESERV = gql`
    mutation confirmWithdraw($students: [String]!, $amount: Float) {
        confirmWithdraw(students: $students, amount: $amount) {
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
            baoluu {
                thoihan
                trangthai
            }
            baocao1 {
                name
                _id
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
export const APPROVE_R1 = gql`
    mutation approveReport($report: String!) {
        approveReport(report: $report)
    }
`
export const REMOVE_FROM_REPORT = gql`
    mutation removeFromAttReport($students: [String], $report: String!) {
        removeFromAttReport(students: $students, report: $report)
    }
`

export const LOAD_SINGLE_REPORT = gql`
    query loadSingleAttReport($report: String!, $filter: FilterInput) {
        loadSingleAttReport(report: $report, filter: $filter) {
            report {
                _id
                hangbang
                name
                desc
                status
                createdBy {
                    name
                }
                created
            }
            students {
                _id
                randomId
                ten
                ngaysinh
                hangbang
                mobile
                trangthai
                # baoluu
                baocao1 {
                    name
                    _id
                }
            }
        }
    }
`

export const MARK_COMPLETED = gql `
    mutation markCompleted($students: [String]!) {
        markCompleted(students: $students)
    }
`

export const REQUEST_CONFIRM_P_2 = gql `
    mutation requestConfirmPaymentTwo($students: [String]!) {
        requestConfirmPaymentTwo(students: $students)
    }
`

export const CONFIRM_PAYMENT_TWO = gql `
    mutation confirmPaymentTwo($students: [String]!, $amount: Float) {
        confirmPaymentTwo(students: $students, amount: $amount)
    }
`

export const REQUEST_RESERVE_RESULT = gql `
    mutation requestReserveResult($students: [String]!) {
        requestReserveResult(students: $students)
    }
`
export const CANCEL_RESERVE_RESULT = gql `
    mutation cancelReserveResult($students: [String]!) {
        cancelReserveResult(students: $students)
    }
`
export const CREATE_A_REPORT = gql`
    mutation createAReport($report: ReportOneInput) {
        createAReport(report: $report) {
            _id
            hangbang
            name
            desc
            status
            created
            createdBy {
                name
            },
            stdCount
        }
    }
`
// const LOAD_A_REPORT = gql`
//     query loadAReport($filter: ReportFilter, $page: Int, $limit: Int) {
//         loadAReport(filter: $filter, page: $page, limit: $limit) {
//             reports {
//                 _id
//                 hangbang
//                 name
//                 desc
//                 status
//                 createdBy {
//                     name
//                 },
//                 stdCount
//                 created
//             }
//             total
//         }
//     }
// `

export const CONFIRM_RESERVE_RESULT = gql `
    mutation confirmReserveResult($students: [String]!) {
        confirmReserveResult(students: $students )
    }
`

export const REQUEST_RETURN_RESULT = gql `
    mutation requestReturnResult($students: [String]!) {
        requestReturnResult(students: $students )
    }
`
export const CREATE_BREPORT = gql `
    mutation createBreport($report: ReportOneInput!) {
        createBreport(report: $report) {
            _id
            hangbang
            name
            desc
            status
            createdBy {
                name
            }
            created
            stdCount
            approveDate
        }
    }
`
export const LOAD_B_REPORTS = gql `
    query loadBreports($filter: ReportFilter, $page: Int, $limit: Int) {
        loadBreports(filter: $filter, page: $page, limit: $limit) {
            reports {
                _id
                hangbang
                name
                desc
                status
                createdBy {
                    name
                }
                created
                stdCount
                approveDate
            }
            total
        }
    }
`
export const LOAD_SINGLE_B_REPORT = gql `
    query loadSingleBReport($report: String! $filter: FilterInput) {
        loadSingleBReport(report: $report, filter: $filter) {
             report {
                _id
                hangbang
                name
                desc
                status
                createdBy {
                    name
                }
                created
            }
            students {
                _id
                randomId
                ten
                ngaysinh
                hangbang
                mobile
                trangthai
                # baoluu
                baocao1 {
                    name
                    _id
                }
            }
        }
    }
`
export const MOVE_TO_R2 = gql`
    mutation moveToR2($students: [String], $report: String!) {
        moveToR2(students: $students, report: $report)
    }
`
export const APPROVE_B_REPORT = gql `
    mutation approveBReport($report: String!) {
        approveBReport(report: $report) {
                _id
                hangbang
                name
                desc
                status
                createdBy {
                    name
                }
                created
                stdCount
                approveDate
            }
        }
`
export const REJECT_WD_FN = gql `
    mutation rejectWithdrawFN($students: [String]!) {
        rejectWithdrawFN(students: $students)
    }
`
export const CONFIRM_WD_GD = gql `
    mutation confirmWithdrawGD($students: [String]!) {
        confirmWithdrawGD(students: $students)
    }
`
export const REJECT_WD_GD = gql `
    mutation rejectWithdrawGD($students: [String]!) {
        rejectWithdrawGD(students: $students)
    }
`
export const MARK_GRAD = gql `
    mutation markGrad($students: [String]!) {
        markGrad(students: $students)
    }
`
export const MARK_FAIL = gql `
    mutation markFail($students: [String]!) {
        markFail(students: $students)
    }
`
export const MARK_FOR_RETEST = gql `
    mutation markForReTest($students: [String]!) {
        markForReTest(students: $students)
    }
`
export const RESERVE_RESULT = gql `
    mutation adminReserveResult($students: [String]!) {
        adminReserveResult(students: $students)
    }
`
export const ADMIN_CONFIRM_RETURN = gql `
    mutation adminConfirmReturn($students: [String]!) {
        adminConfirmReturn(students: $students)
    }
`
export const ADMIN_MARK_FINISH = gql `
    mutation adminMarkFinish($students: [String]!) {
        adminMarkFinish(students: $students)
    }
`
export const ADMIN_MARK_REMOVE = gql `
    mutation adminMarkRemove($students: [String]!) {
        adminMarkRemove(students: $students)
    }
`
export const ADMIN_MARK_FINAL_FAIL = gql `
    mutation adminMarkFinalFail($students: [String]!, $reason: String!) {
        adminMarkFinalFail(students: $students, reason: $reason)
    }
`
export const TEACHER_REQUEST_CONFIRM_RETEST_FEE = gql`
    mutation requestConfirmRetestPayment($students: [String]!) {
        requestConfirmRetestPayment(students: $students)
    }
`

export const ADM_CONFIRM_RETEST_FEE = gql `
    mutation adminConfirmRetestFee($students: [String]!, $amount: Float) {
        adminConfirmRetestFee(students: $students, amount: $amount)
    }
`
export const T_REQUEST_SWAP = gql `
    mutation requestSwap($student: String!, $replacement: String!) {
        requestSwap(student: $student, replacement: $replacement) {
            _id
            randomId
            ten
            ngaysinh
            anh34
            quequan
            cmt1
            cmt2
            bangcap
            hangbang
            mobile
            dondk
            giaykhamSK
            hopdongdaotao
            trangthai
            ycdc {
                ten
                randomId
            }
            baoluu {
                trangthai
            }
            baocao1 {
                name
            }
            baocao2 {
                name
            }
        }
    }
`

export const ADM_CONFIRM_SWAP = gql `
    mutation adminConfirmSwap($students: [String]!) {
        adminConfirmSwap(students: $students) {
            _id
            randomId
            ten
            ngaysinh
            anh34
            quequan
            cmt1
            cmt2
            bangcap
            hangbang
            mobile
            dondk
            giaykhamSK
            hopdongdaotao
            trangthai
            ycdc {
                ten
                randomId
            }
            baoluu {
                trangthai
            }
            baocao1 {
                name
            }
            baocao2 {
                name
            }
        }
    }
`

export const FORCE_STATUS = gql `
    mutation setStatus($students: [String]!, $trangthai: String!) {
        setStatus(students: $students, trangthai: $trangthai)
    }
`
export const LOAD_RECORDS = gql `
    query loadRecords($filter: RecordFilter) {
        loadRecords(filter: $filter) {
            records {
                createdBy
                student {
                    ten
                    mobile
                    randomId
                }
                createdAt
                amount
                reason
            }
            totalRecords
            totalAmount
        }
    }
`
export const T_REQUEST_CHANGE_GRADE = gql `
    mutation tRequestChangeGrade($students: [String]!, $ycdh: String!) {
        tRequestChangeGrade(students: $students, ycdh: $ycdh)
    }
`
export const ADMIN_ACCEPT_CHANGE_GRADE = gql `
    mutation adminAcceptChangeGrade($students: [String]!) {
        adminAcceptChangeGrade(students: $students)
    }
`
export const ADMIN_REJECT_CHANGE_GRADE = gql `
    mutation adminRejectChangeGrade($students: [String]!) {
        adminRejectChangeGrade(students: $students)
    }
`
export const FN_ACCEPT_CHANGE_GRADE = gql `
    mutation fnAcceptChangeGrade($students: [String]!) {
        fnAcceptChangeGrade(students: $students)
    }
`
export const FN_REJECT_CHANGE_GRADE = gql `
    mutation fnRejectChangeGrade($students: [String]!) {
        fnRejectChangeGrade(students: $students)
    }
`
export const T_REQUEST_RETURN_FINAL_TEST = gql `
    mutation tRequestRetestFinal($students: [String]!) {
        tRequestRetestFinal(students: $students)
    }
`
export const ADMIN_ACCEPT_RETURN_FINAL_TEST = gql `
    mutation adminAcceptRetestFinal($students: [String]!) {
        adminAcceptRetestFinal(students: $students)
    }
`