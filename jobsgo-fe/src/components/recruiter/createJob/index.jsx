import Select from 'react-select';
import { Autocomplete, Button, Switch, TextField } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '~/context/AppProvider';
import addressArray from '~/data/address.json';

import * as proSkillService from '~/service/proSkillService';
import * as careerService from '~/service/careerService';
import * as softSkillService from '~/service/softSkillService';
import * as languageService from '~/service/languageService';
import * as jobService from '~/service/jobService';
import * as usedPackageService from '~/service/usedPackageService';
import CustomQuill from '~/components/quill';
import { degrees, genders, typePositions, natureOfWorks } from '~/data/constants';
import BtnCreateJob from '../btnCreateJob';
import { useNavigate } from 'react-router-dom';

function CreateJob({ className }) {
    const { recruiter } = useContext(AppContext);
    const navigate = useNavigate();

    const cityArray = addressArray.map((city) => ({ label: city.name, value: city }));
    const [districtsArray, setDistrictsArray] = useState([]);
    const [wardsArray, setWardsArray] = useState([]);

    const [listProSkill, setListProSkill] = useState([]);
    const [listCareer, setListCareer] = useState([]);
    const [listSoftSkill, setListSoftSkill] = useState([]);
    const [listLanguage, setListLanguage] = useState([]);

    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    const [requiredExp, setRequiredExp] = useState(false);
    const [requiredSalary, setRequiredSalary] = useState(false);

    const [job, setJob] = useState({
        title: '',
        description: '',
        required: '',
        benefit: '',
        city: '',
        district: '',
        ward: '',
        specificAddress: '',
        phone: '',
        degree: '',
        typePosition: '',
        gender: 0,
        ageStart: 0,
        ageEnd: 0,
        numberYearExperienceStart: 0,
        numberYearExperienceEnd: 0,
        salaryFrom: 0,
        salaryTo: 0,
        natureOfWork: '',
        listCareer: [],
        listProSkill: [],
        listSoftSkill: [],
        listLanguage: [],
    });

    const handleChangeCity = (e, value) => {
        setCity(value);
        setJob({ ...job, city: value.label });
        setDistrict(null);
        setWard(null);
        setWardsArray([]);
        if (value) {
            setDistrictsArray(value?.value?.districts.map((district) => ({ label: district.name, value: district })));
        } else {
            setDistrictsArray([]);
        }
    };

    const handleChangeDistrict = (e, value) => {
        setDistrict(value);
        setJob({ ...job, district: value.label });
        setWard(null);
        if (value) {
            setWardsArray(value?.value?.wards.map((ward) => ({ label: ward.name, value: ward })));
        } else {
            setWardsArray([]);
        }
    };

    const handleChangeWard = (e, value) => {
        setWard(value);
        setJob({ ...job, ward: value.label });
    };

    const handleSubmit = async () => {
        const recruiterLocalStorage = JSON.parse(localStorage.getItem('user'));
        const resJob = await jobService.viewJobByRecruiterId(recruiterLocalStorage.userId);
        if (resJob?.success) {
            if (resJob.data.length >= 3) {
                const resUsedPackage = await usedPackageService.checkUsedPackage();
                if (resUsedPackage?.success) {
                    const dataCreate = {
                        ...job,
                        recruiterId: recruiter?.userId,
                        ageStart: Number.parseFloat(job.ageStart),
                        ageEnd: Number.parseFloat(job.ageEnd),
                        numberYearExperienceStart: Number.parseFloat(job.numberYearExperienceStart),
                        numberYearExperienceEnd: Number.parseFloat(job.numberYearExperienceEnd),
                        salaryFrom: Number.parseFloat(job.salaryFrom),
                        salaryTo: Number.parseFloat(job.salaryTo),
                    };
                    const res = await jobService.addJob(dataCreate);
                    console.log(dataCreate);
                    if (res?.success) {
                        alert('Tạo công việc mới thành công');
                    } else {
                        alert('Tạo công việc mới thất bại');
                    }
                } else {
                    alert('Bạn cần mua gói để tạo công việc');
                    navigate('/recruiter/buyPackage');
                }
            } else {
                const res = await jobService.addJob({
                    ...job,
                    recruiterId: recruiter?.userId,
                    ageStart: Number.parseFloat(job.ageStart),
                    ageEnd: Number.parseFloat(job.ageEnd),
                    numberYearExperienceStart: Number.parseFloat(job.numberYearExperienceStart),
                    numberYearExperienceEnd: Number.parseFloat(job.numberYearExperienceEnd),
                    salaryFrom: Number.parseFloat(job.salaryFrom),
                    salaryTo: Number.parseFloat(job.salaryTo),
                });
                console.log(res);
                if (res?.success) {
                    alert('Tạo công việc mới thành công');
                } else {
                    alert('Tạo công việc mới thất bại');
                }
            }
        }
    };

    //Get Data list career, proSkill, softSkill, language
    useEffect(() => {
        const getData = async () => {
            const resProSkill = await proSkillService.getAllProSkill();
            if (resProSkill?.success) {
                setListProSkill(
                    resProSkill.data.map((proSkill) => ({
                        label: proSkill.name,
                        value: proSkill.id,
                    })),
                );
            }
            const resSoftSkill = await softSkillService.getAllSoftSkill();
            if (resSoftSkill?.success) {
                setListSoftSkill(
                    resSoftSkill.data.map((softSkill) => ({
                        label: softSkill.name,
                        value: softSkill.id,
                    })),
                );
            }
            const resCareer = await careerService.getAllCareer();
            if (resCareer?.success) {
                setListCareer(
                    resCareer.data.map((career) => ({
                        label: career.name,
                        value: career.id,
                    })),
                );
            }

            const resLanguage = await languageService.getAllLanguage();
            if (resLanguage?.success) {
                setListLanguage(
                    resLanguage.data.map((language) => ({
                        label: language.name,
                        value: language.id,
                    })),
                );
            }
        };
        getData();
    }, []);

    return (
        <div className={className}>
            <BtnCreateJob />
            <div className="p-4 border-t">
                <h2 className="text-base font-semibold mb-12">Đăng tuyển việc làm mới</h2>
                <div className="w-[90%] mx-auto">
                    <div className="grid grid-cols-10 gap-4 mb-12">
                        <p className="font-semibold col-span-2 text-right">
                            Tiêu đề công việc <span className="text-red-500">*</span>
                        </p>
                        <input
                            value={job.title}
                            type="text"
                            className="outline-none border p-2 flex-1 rounded-md col-span-8"
                            onChange={(e) => setJob({ ...job, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-10 gap-4 mb-12">
                        <p className="font-semibold col-span-2 text-right">
                            Mô tả công việc <span className="text-red-500">*</span>
                        </p>
                        <div className="col-span-8">
                            <CustomQuill value={job.description} setJob={setJob} type="description" />
                        </div>
                    </div>
                    <div className="grid grid-cols-10 gap-4 mb-12">
                        <p className="font-semibold col-span-2 text-right">
                            Yêu cầu công việc <span className="text-red-500">*</span>
                        </p>
                        <div className="col-span-8">
                            <CustomQuill value={job.required} setJob={setJob} type="required" />
                        </div>
                    </div>
                    <div className="grid grid-cols-10 gap-4 mb-12">
                        <p className="font-semibold col-span-2 text-right">
                            Quyền lợi được hưởng <span className="text-red-500">*</span>
                        </p>
                        <div className="col-span-8">
                            <CustomQuill value={job.benefit} setJob={setJob} type="benefit" />
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="p-4">
                        <div>
                            <p className="font-semibold mb-2 uppercase">
                                Địa điểm làm việc <span className="text-red-500">*</span>
                            </p>

                            <div className="grid grid-cols-4 gap-2">
                                <input
                                    value={job.specificAddress}
                                    type="text"
                                    placeholder="Số nhà"
                                    className="outline-none border p-2 flex-1 rounded-md text-base text-black"
                                    onChange={(e) => setJob({ ...job, specificAddress: e.target.value })}
                                />
                                <Autocomplete
                                    value={city || null}
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={cityArray}
                                    size="small"
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="Chọn tỉnh, thành phố" />
                                    )}
                                    onChange={handleChangeCity}
                                    isOptionEqualToValue={(option, value) => option.label === value.label || !value}
                                />
                                <Autocomplete
                                    value={district || null}
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={districtsArray}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn quận, huyện" />}
                                    onChange={handleChangeDistrict}
                                    isOptionEqualToValue={(option, value) => option.label === value.label || !value}
                                />
                                <Autocomplete
                                    value={ward || null}
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={wardsArray}
                                    size="small"
                                    renderInput={(params) => (
                                        <TextField value={ward?.label} {...params} placeholder="Chọn xã, phường" />
                                    )}
                                    onChange={handleChangeWard}
                                    isOptionEqualToValue={(option, value) => option.label === value.label || !value}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 mt-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="font-semibold uppercase mb-2">
                                    SĐT nhà tuyển dụng <span className="text-red-500">*</span>
                                </p>
                                <input
                                    value={job.phone}
                                    type="text"
                                    className="outline-none border p-2 flex-1 rounded-md w-full"
                                    onChange={(e) => setJob({ ...job, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <p className="font-semibold uppercase mb-2">
                                    Bằng cấp tối thiểu <span className="text-red-500">*</span>
                                </p>
                                <Autocomplete
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={degrees}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                                    onChange={(e, value) => setJob({ ...job, degree: value })}
                                />
                            </div>
                            <div>
                                <p className="font-semibold uppercase mb-2">
                                    Loại chức vụ <span className="text-red-500">*</span>
                                </p>
                                <Autocomplete
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={typePositions}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                                    onChange={(e, value) => setJob({ ...job, typePosition: value })}
                                />
                            </div>
                            <div>
                                <p className="font-semibold mb-2 uppercase">
                                    Tính chất công việc <span className="text-red-500">*</span>
                                </p>
                                <Autocomplete
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={natureOfWorks}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                                    onChange={(e, value) => setJob({ ...job, natureOfWork: value })}
                                />
                            </div>
                            <div>
                                <p className="font-semibold uppercase mb-2">Yêu cầu giới tính</p>
                                <Autocomplete
                                    className="bg-white rounded-md w-full"
                                    disablePortal
                                    options={genders}
                                    size="small"
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                                    onChange={(e, value) => setJob({ ...job, gender: value.value })}
                                />
                            </div>
                            <div>
                                <p className="font-semibold uppercase mb-2">Yêu cầu độ tuổi</p>
                                <div className="flex justify-center items-center">
                                    <span>Từ</span>
                                    <input
                                        value={job.ageStart}
                                        type="number"
                                        className="w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, ageStart: e.target.value })}
                                    />
                                    <span className="mr-2">tuổi</span>
                                    <span>Đến</span>
                                    <input
                                        value={job.ageEnd}
                                        type="number"
                                        className="w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, ageEnd: e.target.value })}
                                    />
                                    <span>tuổi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 mt-4">
                        <div className="grid grid-cols-2 gap-16">
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold uppercase">
                                        Số năm kinh nghiệm <span className="text-red-500">*</span>
                                    </p>
                                    <div className="font-semibold">
                                        Không yêu cầu kinh nghiệm
                                        <Switch
                                            onChange={(e) => {
                                                setRequiredExp(e.target.checked);
                                                if (e.target.checked) {
                                                    setJob({
                                                        ...job,
                                                        numberYearExperienceStart: 0,
                                                        numberYearExperienceEnd: 0,
                                                    });
                                                }
                                            }}
                                        ></Switch>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center">
                                    <span>Từ</span>
                                    <input
                                        value={job.numberYearExperienceStart}
                                        disabled={requiredExp}
                                        type="number"
                                        className="disabled:cursor-not-allowed w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, numberYearExperienceStart: e.target.value })}
                                    />
                                    <span className="mr-2">năm</span>
                                    <span>Đến</span>
                                    <input
                                        value={job.numberYearExperienceEnd}
                                        disabled={requiredExp}
                                        type="number"
                                        className="disabled:cursor-not-allowed w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, numberYearExperienceEnd: e.target.value })}
                                    />
                                    <span>năm</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold uppercase">
                                        Mức lương (VNĐ) <span className="text-red-500">*</span>
                                    </p>
                                    <div className="font-semibold">
                                        Thỏa thuận
                                        <Switch
                                            onChange={(e) => {
                                                setRequiredSalary(e.target.checked);
                                                if (e.target.checked) {
                                                    setJob({ ...job, salaryFrom: 0, salaryTo: 0 });
                                                }
                                            }}
                                        ></Switch>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center">
                                    <span>Từ</span>
                                    <input
                                        value={job.salaryFrom}
                                        disabled={requiredSalary}
                                        type="number"
                                        className="disabled:cursor-not-allowed w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, salaryFrom: e.target.value })}
                                    />
                                    <span className="mr-2">triệu</span>
                                    <span>Đến</span>
                                    <input
                                        value={job.salaryTo}
                                        disabled={requiredSalary}
                                        type="number"
                                        className="disabled:cursor-not-allowed w-full outline-none border p-2 text-center mx-1 rounded-lg"
                                        onChange={(e) => setJob({ ...job, salaryTo: e.target.value })}
                                    />
                                    <span>triệu</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 mt-4">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="font-semibold mb-2 uppercase">
                                    Ngành nghề <span className="text-red-500">*</span>
                                </p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={listCareer}
                                    onChange={(selected) =>
                                        setJob({ ...job, listCareer: selected?.map((career) => career.value) })
                                    }
                                />
                            </div>
                            <div>
                                <p className="font-semibold mb-2 uppercase">
                                    Chuyên môn <span className="text-red-500">*</span>
                                </p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={listProSkill}
                                    onChange={(selected) =>
                                        setJob({ ...job, listProSkill: selected?.map((proSkill) => proSkill.value) })
                                    }
                                />
                            </div>
                            <div>
                                <p className="font-semibold mb-2 uppercase">
                                    Kỹ năng mềm <span className="text-red-500">*</span>
                                </p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={listSoftSkill}
                                    onChange={(selected) =>
                                        setJob({ ...job, listSoftSkill: selected?.map((softSkill) => softSkill.value) })
                                    }
                                />
                            </div>
                            <div>
                                <p className="font-semibold mb-2 uppercase">
                                    Ngôn ngữ <span className="text-red-500">*</span>
                                </p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={listLanguage}
                                    onChange={(selected) =>
                                        setJob({ ...job, listLanguage: selected?.map((language) => language.value) })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-4 mb-16">
                <Button size="large" variant="contained" onClick={handleSubmit}>
                    Tạo công việc
                </Button>
            </div>
        </div>
    );
}

export default CreateJob;
