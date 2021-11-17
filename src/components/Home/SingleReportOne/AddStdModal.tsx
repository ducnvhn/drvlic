import React from 'react'
import {
    List,
    Modal,
    Input,
    Form,
    Divider,
    // message
} from 'antd'
import {
    gql,
    // useMutation,
    useLazyQuery
} from '@apollo/client'
import { CheckOutlined, IdcardOutlined, MobileOutlined } from '@ant-design/icons'
import moment from 'moment'

type ModalType = {
    visible: boolean
    onCancel: () => void
    onOk: (stds: string[]) => void
    hangbang: string
    type: string
}

const SEARCH_STUDENTS_4_BC1 = gql`
    query searchStd4bc1($filter: FilterInput, $hangbang: String!) {
        searchStd4bc1(filter: $filter, hangbang: $hangbang) {
            _id
            randomId
            ten
            ngaysinh
            # anh34
            quequan
            # cmt1
            # cmt2
            # bangcap
            hangbang
            mobile
            # dondk
            # giaykhamSK
            # hopdongdaotao
            trangthai
            # baoluu
            # baocao1
            # kq1
            # kq2
            # createdBy
            # created
        }
    }
`


const AddStdModal:React.FC<ModalType> = ({
    visible,
    onCancel,
    onOk,
    type,
    hangbang
}) => {
    let searchTimeout:any = null
    const [searchStds, { data = { searchStd4bc1:[]}}] = useLazyQuery(SEARCH_STUDENTS_4_BC1, { fetchPolicy: 'network-only'})
    const [selected, setSelected] = React.useState<string[]>([])
    const [adding, toggleAdding] = React.useState(false)

    const onStudentClick = (student: string) => {
        const idx = selected.indexOf(student)
        if (idx >= 0) {
            setSelected(selected.filter(s => s!== student))
        } else {
            setSelected([student].concat(selected))
        }
    }

    const onKeywordChange:React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        searchTimeout = setTimeout(() => {
            const { value } = e.target
            const filter = {
                ten: value,
                mobile: value,
                randomId: value,
                trangthai: type === 'BC1' ? 'CHO_VAO_BC_1' : 'CHO_VAO_BC_2'
            }
            // if (value.length >=3) {
                searchStds({
                    variables: {
                        filter,
                        hangbang
                    }
                })
            // }
            // const page = 1
            // const limit = 20
        }, 700)
    }

    const add = async () => {
        toggleAdding(true)
        await onOk(selected)
        toggleAdding(false)
        onCancel()    
    }

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            onOk={() => add()}
            okButtonProps={{
                loading: adding
            }}
            title="Thêm hồ sơ vào BC 1"
        >
            <Form layout="vertical">
                <Form.Item label="Tìm kiếm hồ sơ">
                    <Input onChange={onKeywordChange} placeholder="Tìm theo tên/sdt/ mã HS" />
                </Form.Item>
            </Form>
            <Divider />
            {data.searchStd4bc1.length > 0 && <p>Chọn trong danh sách({selected.length})</p>}
            <List
                dataSource={data.searchStd4bc1}
                renderItem={(item:any) => (
                    <List.Item
                        style={{ cursor: 'pointer'}}
                        key={item._id}
                        onClick={() => onStudentClick(item._id)}
                        actions={selected.indexOf(item._id) >=0 ? [<CheckOutlined style={{ color: 'blue'}} />]: ['']}
                    >
                        <List.Item.Meta
                            title={`${item.ten} - ${item.randomId}`}
                            description={<p><MobileOutlined />{item.mobile}{` - `}<IdcardOutlined />{moment(parseFloat(item.ngaysinh)).format('DD/MM/YYYY')}</p>}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    )
}
export default AddStdModal