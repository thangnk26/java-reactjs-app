import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import * as adminService from '~/service/admin/adminService';
import AdminLayout from '~/layout/adminLayout';
function CreatePack({ onModal, onCloseModal }) {
    const [inputs, setInputs] = useState('');
    if (onModal === false) {
        return null;
    }
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const res = await adminService.createPackage(inputs);
        console.log(res);
        if (res.success === true) {
            alert('Tạo gói thành công');
        } else {
            alert('Tạo gói thất bại');
        }
    };
    return (
        <AdminLayout>
            <>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={() => onCloseModal()}></div>
                    <div className="bg-white rounded-lg z-10">
                        <h1 className="text-xl" style={{ marginLeft: 30, marginTop: 30 }}>
                            Tạo gói người dùng
                        </h1>
                        <div className="p-4">
                            {/* <button className="float-right text-gray-500" onClick={() => offModal()}>
                                Đóng
                            </button> */}
                            <form onSubmit={handleSubmit}>
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
                                        {/* <TextField
                                            id="outlined-textarea"
                                            label="Hình ảnh"
                                            placeholder="Placeholder"
                                            name="image"
                                            multiline
                                            value={inputs.image}
                                            onChange={handleInput}
                                        /> */}
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
                                        <Select
                                            onChange={handleInput}
                                            name="typePackage"
                                            className="mt-4 ml-4"
                                            defaultValue="0"
                                            value={inputs.typePackage}
                                        >
                                            <MenuItem value="0">Chọn gói</MenuItem>
                                            <MenuItem value="1">Cơ bản</MenuItem>
                                            <MenuItem value="2">VIP</MenuItem>
                                        </Select>
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
                                    <button
                                        type="submit"
                                        style={{ marginLeft: 20, marginTop: 10, padding: '15px 40px' }}
                                        className="flex justify-end  text-sm text-purple-600 font-semibold rounded-full border border-purple-400 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                                    >
                                        Tạo
                                    </button>
                                </Box>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}
export default CreatePack;
