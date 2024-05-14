import { Button } from '@mui/material';
import AdminLayout from '~/layout/adminLayout';
import * as careerService from '~/service/careerService';
import * as languageService from '~/service/languageService';
import * as proSkillService from '~/service/proSkillService';
import * as softSkillService from '~/service/softSkillService';
import { useEffect, useState } from 'react';
function ModalChange({ type, updateId, onModal, onCloseModal, data, select, careerId }) {
    console.log(careerId);
    const [inputs, setInputs] = useState({
        name: data,
    });
    const [career, setCareer] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const resCareer = await careerService.getAllCareer();
            if (resCareer?.success) {
                let careerName = resCareer.data.map((value) => ({
                    label: value.name,
                    id: value.id,
                }));
                setCareer(careerName);
            }
        };
        getData();
    }, []);
    if (onModal === false) {
        return null;
    }

    const handleInput = (e) => {
        let value = e.target.value;

        if (select === 'Kĩ năng') {
            let name = e.target.name;
            let value = e.target.value;

            setInputs({ ...inputs, [name]: value });
        } else {
            setInputs({ name: value });
        }
    };
    const handleSubmit = async () => {
        if (select === 'Ngôn ngữ' && type === 2) {
            const res = await languageService.updateLanguage(updateId, inputs);
            if (res.data?.success) {
                alert('Thay đổi gói thành công');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Chuyên ngành' && type === 2) {
            const res = await careerService.updateCareer(updateId, inputs);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Kĩ năng mềm' && type === 2) {
            const res = await softSkillService.updateSoftSkill(updateId, inputs);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Kĩ năng' && type === 2) {
            const res = await proSkillService.updateProSkill(updateId, inputs);
            console.log(res);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Ngôn ngữ' && type === 1) {
            const res = await languageService.createLanguage(inputs);
            if (res.data?.success) {
                alert('Thay đổi gói thành công');
                setInputs('');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Chuyên ngành' && type === 1) {
            const res = await careerService.createCareer(inputs);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                setInputs('');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Kĩ năng mềm' && type === 1) {
            const res = await softSkillService.createSoftSkill(inputs);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                setInputs('');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        } else if (select === 'Kĩ năng' && type === 1) {
            const res = await proSkillService.createProSkill(inputs);
            if (res?.success) {
                alert('Thay đổi gói thành công');
                setInputs('');
                onCloseModal();
            } else {
                alert('Tạo gói thất bại');
            }
        }
    };
    return (
        <AdminLayout>
            <>
                <div className="fixed inset-0 flex items-center justify-center z-50 text-base">
                    <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={() => onCloseModal()}></div>
                    <div className="bg-white rounded-lg z-10 min-w-[50%]">
                        <h1 className="text-2xl p-4">{type === 1 ? `Thêm ${select}` : `Cập nhật ${select}`}</h1>
                        <div className="p-4">
                            <div className="flex flex-col gap-4">
                                <input
                                    name="name"
                                    className="w-full border py-1 px-2 outline-none focus:border-sky-500 focus:shadow-ssm shadow-sky-500"
                                    placeholder={`Nhập tên ${select}`}
                                    value={inputs.name}
                                    onChange={handleInput}
                                />
                                {select === 'Kĩ năng' && type === 1 ? (
                                    <select className="p-2 border outline-none" name="careerId" onChange={handleInput}>
                                        <option disabled value={0}>
                                            Chọn chuyên ngành
                                        </option>
                                        {career.map((value) => (
                                            <option value={value.id} key={value.id}>
                                                {value.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : select === 'Kĩ năng' && type === 2 ? (
                                    <select className="p-2 border outline-none" name="careerId" onChange={handleInput}>
                                        <option value={careerId?.career_id}>{careerId?.career_name}</option>
                                        {career.map((value) => (
                                            <option value={value.id} key={value.id}>
                                                {value.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : undefined}
                                <Button variant="contained" color="success" onClick={handleSubmit}>
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AdminLayout>
    );
}
export default ModalChange;
