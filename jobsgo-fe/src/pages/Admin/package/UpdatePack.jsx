import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import * as adminService from '~/service/admin/adminService';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import AdminLayout from '~/layout/adminLayout';
function UpdatePack({ updateId, onModal, onCloseModal }) {
    const [inputs, setInputs] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await adminService.getPackageById(updateId);
                setInputs(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [updateId]);
    if (onModal === false) {
        return null;
    }
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    };
    const handleSubmit = async () => {
        const res = await adminService.updatePackage(updateId, inputs);
        if (res?.success) {
            alert('Thay đổi gói thành công');
            onCloseModal();
        } else {
            alert('Tạo gói thất bại');
        }
    };
    return (
        <AdminLayout>
            <>
                <div className="fixed inset-0 flex items-center justify-center z-50 text-base">
                    <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={() => onCloseModal()}></div>
                    <div className="bg-white rounded-lg z-10">
                        <h1 className="text-2xl" style={{ marginLeft: 30, marginTop: 30 }}>
                            Chỉnh sửa gói
                        </h1>
                        <div className="p-4">
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            name="name"
                                            id="outlined-multiline-flexible"
                                            label="Tên gói"
                                            value={inputs.name}
                                            multiline
                                            maxRows={4}
                                            onChange={handleInput}
                                        />
                                        <TextField
                                            id="standard-textarea"
                                            label="Giảm giá"
                                            placeholder="Placeholder"
                                            name="discount"
                                            multiline
                                            value={inputs.discount}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="Thời gian "
                                            multiline
                                            name="duration"
                                            maxRows={4}
                                            value={inputs.duration}
                                            onChange={handleInput}
                                        />

                                        <TextField
                                            id="standard-textarea"
                                            label="Giá gói"
                                            placeholder="Placeholder"
                                            name="price"
                                            multiline
                                            value={inputs.price}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Mô tả gói"
                                            multiline
                                            rows={4}
                                            name="description"
                                            style={{ width: '96%' }}
                                            value={inputs.description}
                                            onChange={handleInput}
                                        />
                                    </div>
                                </Box>
                                <Box
                                    className="flex justify-end"
                                    component="span"
                                    style={{ marginBottom: 10, marginRight: 16 }}
                                >
                                    <Button variant="contained" color="success" onClick={handleSubmit}>
                                        Cập nhật
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}
export default UpdatePack;
