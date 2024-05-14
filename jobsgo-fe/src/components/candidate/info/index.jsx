import { SaveOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import * as userService from '~/service/userService';
import AvatarCandidate from '~/assets/images/candidate/avatar-candidate-male.jpg';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import { AppContext } from '~/context/AppProvider';
import Loading from '~/components/loading';

function Info({ className }) {
    const { setUser } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const [userInfo, setUserInfo] = useState({
        image: null,
        file: null,
        email: '',
        birthDay: '',
        fullName: '',
        phone: '',
        address: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
        github: '',
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let flag = true;
        if (!file) {
            flag = false;
            setUserInfo({ ...userInfo, image: null, file: null });
        } else {
            let img = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
            if (file.size > 1024 * 1024) {
                flag = false;
                alert('Kích thước file quá lớn');
                return;
            } else if (!img.includes(file.name.split('.').pop())) {
                flag = false;
                setUserInfo({ ...userInfo, image: null, file: null });
                alert('File phải thuộc định dạng png, jpg, jpeg');
                return;
            }
        }
        if (flag) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserInfo({ ...userInfo, image: reader.result, file: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        let dataUpdate = { ...userInfo, birthday: new Date(userInfo?.birthDay).toISOString().split('T')[0] };
        if (userInfo?.file) {
            const imageRef = ref(storage, `images/${userInfo?.file.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, userInfo?.file);
            const url = await getDownloadURL(snapshot.ref);
            dataUpdate = { ...userInfo, image: url };
        }
        const res = await userService.updateCandidate(dataUpdate);
        if (res?.success) {
            alert('Cập nhật thông tin thành công');
            setUser((prev) => ({ ...prev, image: dataUpdate.image }));
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
        setIsLoading(false);
    };

    const handleDeleteImage = () => {
        setUserInfo({ ...userInfo, image: null, file: null });
    };

    useEffect(() => {
        const getData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await userService.getUserById(user.userId);
            if (res?.success) {
                setUserInfo((userPrev) => ({
                    ...userPrev,
                    image: res.data.image,
                    email: res.data?.email,
                    birthDay: new Date(res.data?.birthDay).toISOString().split('T')[0],
                    fullName: res.data?.name,
                    phone: res.data?.phone,
                    address: res.data?.specificAddress,
                    facebook: res.data?.facebook,
                    twitter: res.data?.twitter,
                    linkedIn: res.data?.linkedIn,
                    github: res.data?.github,
                }));
            }
        };
        getData();
    }, []);
    return (
        <div className={className}>
            {isLoading && <Loading />}
            <div className="flex justify-center items-center p-4 bg-sky-700">
                <div className="w-[170px] h-[170px] relative group object-contain border rounded-full overflow-hidden">
                    <img src={userInfo?.image || AvatarCandidate} alt="avatar" />
                    <div className="text-sm bg-black/50 w-full h-full justify-center items-center gap-2 top-0 absolute hidden group-hover:flex">
                        <button className="border-none p-2 bg-red-700 text-white" onClick={handleDeleteImage}>
                            Xóa ảnh
                        </button>
                        <label
                            className="cursor-pointer justify-center items-center border border-none p-2 bg-green-700 text-white"
                            htmlFor="avatar"
                        >
                            Thêm ảnh
                        </label>
                    </div>
                    <input id="avatar" type="file" className="hidden" onChange={handleImageUpload} />
                </div>
            </div>

            <div className="p-4 border-b">
                <h2 className="font-bold uppercase mb-2">Thông tin cá nhân</h2>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Tên đăng nhập</span>
                    <input
                        type="text"
                        disabled
                        className="col-span-3 outline-none p-2 w-full cursor-not-allowed"
                        value={userInfo?.email || ''}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Họ và tên</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.fullName || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Ngày sinh</span>
                    <input
                        type="date"
                        className="outline-none p-2"
                        value={userInfo?.birthDay || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, birthDay: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Số điện thoại</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.phone || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Địa chỉ</span>
                    <div className="col-span-3 w-full">
                        <input
                            value={userInfo?.address || ''}
                            type="text"
                            placeholder="(Chưa có dữ liệu)"
                            className="outline-none p-2 w-full rounded-md text-base text-black"
                            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Facebook</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.facebook || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, facebook: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Twitter</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.twitter || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, twitter: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">LinkedIn</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.linkedIn || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, linkedIn: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-4 m-auto items-center">
                    <span className="col-span-1">Github</span>
                    <input
                        type="text"
                        placeholder="(Chưa có dữ liệu)"
                        className="col-span-3 outline-none p-2 w-full"
                        value={userInfo?.github || ''}
                        onChange={(e) => setUserInfo({ ...userInfo, github: e.target.value })}
                    />
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
