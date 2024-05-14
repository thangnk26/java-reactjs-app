import { BusinessCenter, CameraAlt, SaveOutlined } from '@mui/icons-material';
import BtnCreateJob from '../btnCreateJob';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import * as userService from '~/service/userService';
import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';
import addressArray from '~/data/address.json';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import { AppContext } from '~/context/AppProvider';

function Info({ className, title }) {
    const { setRecruiter } = useContext(AppContext);

    const cityArray = addressArray.map((city) => ({ label: city.name, value: city }));
    const [districtsArray, setDistrictsArray] = useState([]);
    const [wardsArray, setWardsArray] = useState([]);

    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    const handleChangeCity = (e, value) => {
        setCity(value);
        setRecruiterInfo({ ...recruiterInfo, city: value.label });
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
        setRecruiterInfo({ ...recruiterInfo, district: value.label });
        setWard(null);
        if (value) {
            setWardsArray(value?.value?.wards.map((ward) => ({ label: ward.name, value: ward })));
        } else {
            setWardsArray([]);
        }
    };

    const handleChangeWard = (e, value) => {
        setWard(value);
        setRecruiterInfo({ ...recruiterInfo, ward: value.label });
    };

    const [recruiterInfo, setRecruiterInfo] = useState({
        image: null,
        file: null,
        email: '',
        emailCompany: '',
        nameCompany: '',
        shortName: '',
        phone: '',
        specificAddress: '',
        ward: '',
        district: '',
        city: '',
        website: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
        description: '',
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let flag = true;
        if (!file) {
            flag = false;
            setRecruiterInfo({ ...recruiterInfo, image: null, file: null });
        } else {
            let img = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
            if (file.size > 1024 * 1024) {
                flag = false;
                alert('Kích thước file quá lớn');
                return;
            } else if (!img.includes(file.name.split('.').pop())) {
                flag = false;
                setRecruiterInfo({ ...recruiterInfo, image: null, file: null });
                alert('File phải thuộc định dạng png, jpg, jpeg');
                return;
            }
        }
        if (flag) {
            const reader = new FileReader();
            reader.onload = () => {
                setRecruiterInfo({ ...recruiterInfo, image: reader.result, file: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        let dataUpdate = { ...recruiterInfo };
        if (recruiterInfo?.file) {
            const imageRef = ref(storage, `images/${recruiterInfo?.file.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, recruiterInfo?.file);
            const url = await getDownloadURL(snapshot.ref);
            dataUpdate = { ...recruiterInfo, image: url };
        }
        const res = await userService.updateRecruiter(dataUpdate);
        if (res?.success) {
            alert('Cập nhật thông tin thành công');
            setRecruiter((prev) => ({ ...prev, image: dataUpdate.image }));
            const recruiterLocalStorage = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...recruiterLocalStorage,
                    image: dataUpdate.image,
                }),
            );
        } else {
            alert('Cập nhật thông tin thất bại');
        }
    };

    useEffect(() => {
        const getData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await userService.getUserById(user.userId);
            if (res?.success) {
                setRecruiterInfo({
                    image: res.data.image,
                    email: res.data?.email,
                    emailCompany: res.data?.emailCompany,
                    nameCompany: res.data?.name,
                    shortName: res.data?.shortName,
                    phone: res.data?.phone,
                    specificAddress: res.data?.specificAddress,
                    ward: res?.data?.wards,
                    district: res?.data?.districts,
                    city: res?.data?.city,
                    website: res.data?.website,
                    facebook: res.data?.facebook,
                    twitter: res.data?.twitter,
                    linkedIn: res.data?.linkedIn,
                    description: res.data?.description,
                });
            }
            const currentCity = cityArray.find((city) => city.label === res?.data?.city);
            setDistrictsArray(
                currentCity?.value?.districts.map((district) => ({ label: district.name, value: district })),
            );

            const currentDistrict = currentCity?.value?.districts
                ?.map((district) => ({ label: district.name, value: district }))
                ?.find((district) => district.label === res?.data?.districts);

            setWardsArray(currentDistrict?.value?.wards.map((ward) => ({ label: ward.name, value: ward })));
            const currentWard = currentDistrict?.value?.wards
                ?.map((ward) => ({ label: ward.name, value: ward }))
                ?.find((ward) => ward.label === res?.data?.wards);

            setCity(currentCity);
            setDistrict(currentDistrict);
            setWard(currentWard);
        };
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={className}>
            <BtnCreateJob />

            <div className="flex items-center border-y py-2 pl-4 font-semibold bg-black/5">
                <BusinessCenter className="mr-1" /> {title || ''}
            </div>

            <div className="flex justify-center items-center p-4 bg-sky-700">
                <div className="w-[170px] h-[170px] relative group object-contain border rounded-full overflow-hidden">
                    <img src={recruiterInfo?.image || AvatarRecruiter} alt="avatar" />
                    <label
                        className="cursor-pointer absolute bottom-0 left-[50%] translate-x-[-50%] bg-white w-[50px] h-[50px] rounded-full justify-center items-center border hidden group-hover:flex"
                        htmlFor="avatar"
                    >
                        <CameraAlt />
                    </label>
                    <input id="avatar" type="file" className="hidden" onChange={handleImageUpload} />
                </div>
            </div>

            <div className="p-4 border-b">
                <h2 className="font-bold uppercase mb-2">Thông tin cơ bản</h2>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Tên đăng nhập</span>
                    <input
                        type="text"
                        disabled
                        className="col-span-3 outline-none p-2 w-max cursor-not-allowed"
                        value={recruiterInfo?.email || ''}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Email công ty</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.emailCompany || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, emailCompany: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Tên công ty</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.nameCompany || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, nameCompany: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Tên viết tắt</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.shortName || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, shortName: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Số điện thoại</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.phone || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, phone: e.target.value })}
                    />
                </div>
            </div>
            <div className="p-4 border-b">
                <h2 className="font-bold uppercase mb-2">Thông tin thêm</h2>

                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Địa chỉ</span>
                    <div className="col-span-3 w-full">
                        <div className="grid grid-cols-4 gap-2">
                            <input
                                value={recruiterInfo?.specificAddress || ''}
                                type="text"
                                placeholder="Số nhà"
                                className="outline-none border p-2 flex-1 rounded-md text-base text-black"
                                onChange={(e) =>
                                    setRecruiterInfo({ ...recruiterInfo, specificAddress: e.target.value })
                                }
                            />
                            <Autocomplete
                                value={city || null}
                                className="bg-white rounded-md w-full"
                                disablePortal
                                options={cityArray}
                                size="small"
                                renderInput={(params) => <TextField {...params} placeholder="Chọn tỉnh, thành phố" />}
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
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Website</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.website || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, website: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Facebook</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.facebook || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, facebook: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Twitter</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.twitter || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, twitter: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">LinkedIn</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={recruiterInfo?.linkedIn || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, linkedIn: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Mô tả</span>
                    <textarea
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 p-2 outline-none border min-h-[100px] w-full"
                        value={recruiterInfo?.description || ''}
                        onChange={(e) => setRecruiterInfo({ ...recruiterInfo, description: e.target.value })}
                    ></textarea>
                </div>
            </div>

            <div className="p-4 mb-8">
                <Button startIcon={<SaveOutlined />} variant="contained" color="success" onClick={handleUpdate}>
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default Info;
