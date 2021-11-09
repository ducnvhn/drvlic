import {
    gql
} from '@apollo/client'

export const LOAD_SINGLE_STD = gql`
    query loadSingle($id: String!) {
        loadSingleStd(id: $id) {
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
    mutation confirmPayment($students: [String]!) {
        confirmPayment (students: $students) {
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
    mutation confirmWithdraw($students: [String]!) {
        confirmWithdraw(students: $students) {
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
    mutation confirmWithdraw($students: [String]!) {
        confirmWithdraw(students: $students) {
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
    mutation confirmPaymentTwo($students: [String]!) {
        confirmPaymentTwo(students: $students)
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