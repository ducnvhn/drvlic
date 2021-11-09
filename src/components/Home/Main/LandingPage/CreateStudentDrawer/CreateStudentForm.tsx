import React from 'react'
import {
    Form,
    Input,
    DatePicker,
    Upload,
    ConfigProvider,
    Button,
    Space,
    message,
    Select
} from 'antd'
import ImgCrop from 'antd-img-crop'
import {
    gql,
    useMutation
} from '@apollo/client'
import viVN from 'antd/lib/locale/vi_VN'
import moment from 'moment'
import hangbangs from '../../../../common/HangBang'

const {Option} = Select

const UPLOAD_AVATAR = gql`
    mutation uploadAvatar($file: Upload!) {
        uploadAvatar(file: $file) {
            url
        }
    }
`

const fLayout = {
    wrapperCol: { span: 18 },
    labelCol: { span: 6 }
}
interface CTypes {
    createStudent: (data: any) => void
    close: () => void
}
const CreateStudentForm: React.FC<CTypes> = ({
    createStudent,
    close
}) => {
    const [form] = Form.useForm()
    const [imgList, setImgList] = React.useState([])
    const [cmt1, setCmt1] = React.useState([])
    const [cmt2, setCmt2] = React.useState([])
    const [uploadFile] = useMutation(UPLOAD_AVATAR)
    const [creating, setCreating] = React.useState(false)
    const onAvatarChange = (key: string, { file, fileList: newImgsList }: any) =>  {
        if (key === 'anh34') {
            setImgList(newImgsList)
        }
        if (key === 'cmt1') {
            setCmt1(newImgsList)
        }
        if (key === 'cmt2') {
            setCmt2(newImgsList)
        }
    }
    const onPreview = async (file:any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow:any = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const customUpload = async (field:string, { file, onSuccess }: any) => {
        await uploadFile({
            variables: {
                file
            }
        })
        .then(res => {
            if (!res || !res.data) {
                message.error('Không tải lên được hình ảnh')
            }
            // console.log(res)
            const oldData = form.getFieldsValue()
            oldData[field] = res.data.uploadAvatar.url
            form.setFieldsValue(oldData)
            console.log(oldData)
        })
        onSuccess('ok')
    }
    const create = async () => {
        setCreating(true)
        try {
            const data = form.getFieldsValue()
            console.log(data)
            await createStudent({
                ...data,
                ngaysinh: moment(data.ngaysinh).toDate()
            })
        } catch (e) {
            message.error('Đã có lỗi trong quá trình xử lý, vui lòng thử lại sau')
        }
        setCreating(false)
        form.setFieldsValue({})
        close()
    }
    return (
        <ConfigProvider locale={viVN}>
            <Form form={form} {...fLayout}>
                <Form.Item rules={[
                    {
                        required: true,
                        message: "Bắt buộc phải có"
                    }
                ]} name="ten" label="Họ và tên học viên">
                    <Input />
                </Form.Item>
                <Form.Item name="ngaysinh" label="Ngày tháng năm sinh" rules={[{required: true, message: "Bắt buộc phải có"}]}>
                    <DatePicker
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày tháng năm sinh"
                    />
                </Form.Item>
                <Form.Item name="quequan" label="Quê Quán" rules={[{ required: true, message: 'Trường bắt buộc' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Upload Ảnh">
                    <Space align="center" size="large">
                        <div style={{ display: "block", textAlign: 'center'}}>
                            <p>Ảnh thẻ 3x4</p>
                            <ImgCrop
                                modalTitle="căn chỉnh ảnh"
                                aspect={3 / 4}
                            >
                                <Upload
                                    customRequest={(data) => customUpload('anh34', data)}
                                    maxCount={1}
                                    listType="picture-card"
                                    fileList={imgList}
                                    onChange={(data) => onAvatarChange('anh34', data)}
                                    onPreview={onPreview}
                                    >
                                    {imgList.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </div>
                        <div style={{ display: "block", textAlign: 'center'}}>
                            <p>Ảnh mặt trước CMT</p>
                            <ImgCrop
                                modalTitle="căn chỉnh ảnh"
                                aspect={5 / 3}
                                >
                                <Upload
                                    customRequest={(data) => customUpload('cmt1', data)}
                                    maxCount={2}
                                    listType="picture-card"
                                    fileList={cmt1}
                                    onChange={(data) => onAvatarChange('cmt1', data)}
                                    onPreview={onPreview}
                                    >
                                    {cmt1.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </div>
                        <div style={{ display: "block", textAlign: 'center'}}>
                            <p>Ảnh mặt sau CMT</p>
                            <ImgCrop
                                modalTitle="căn chỉnh ảnh"
                                aspect={5 / 3}
                            >
                                <Upload
                                    customRequest={(data) => customUpload('cmt2', data)}
                                    maxCount={1}
                                    listType="picture-card"
                                    fileList={cmt2}
                                    onChange={(data) => onAvatarChange('cmt2', data)}
                                    onPreview={onPreview}
                                >
                                    {cmt2.length < 1 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </div>
                    </Space>
                </Form.Item>
                <Form.Item hidden name="anh34" label="Ảnh 3 x 4" rules={[{ required: true, message: 'Phải có một ảnh 3x4'}]} />
                <Form.Item hidden name="cmt1" label="Ảnh CMT/CCCD mặt trước" rules={[{ required: true, message: 'Phải có một ảnh' }]} />
                <Form.Item hidden name="cmt2" label="Ảnh CMT/CCCD mặt sau" rules={[{ required: true, message: 'Phải có một ảnh' }]} />
                <Form.Item label="Hạng bằng lái" name="hangbang">
                    <Select>
                        {Object.keys(hangbangs).map(k => (
                            <Option value={k} key={k}>{`${k} - ${hangbangs[k as keyof Object]}`}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="mobile" label="Số Điện thoại">
                    <Input />
                </Form.Item>
                <Space>
                    <Button shape="round" loading={creating} onClick={() => create()} type="primary">Tạo hồ sơ</Button>
                    <Button shape="round" onClick={() => close()}>Hủy</Button>
                </Space>
            </Form>
        </ConfigProvider>
    )
}
export default CreateStudentForm