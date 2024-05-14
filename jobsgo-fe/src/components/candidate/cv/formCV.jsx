import { Add, AttachFileOutlined } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import ModalEducation from '~/components/modal/modalEducation';
import ModalExp from '~/components/modal/modalExp';
import ModalProSkill from '~/components/modal/modalProSkill';
import MenuCV from './menuCV';
import ModalLanguage from '~/components/modal/modalLanguage';
import ModalSoftSkill from '~/components/modal/modalSoftSkill';
import ModalHobby from '~/components/modal/modalHobby';
import AvatarMale from '~/assets/images/candidate/avatar-candidate-male.jpg';
import { Autocomplete, Button, TextField } from '@mui/material';
import { typePositions } from '~/data/constants';
import * as format from '~/utils/handleDate';
import * as resumeService from '~/service/resumeService';
import * as userService from '~/service/userService';
import * as attachmentsService from '~/service/attachmentsService';

import { AppContext } from '~/context/AppProvider';
import { Link, useParams } from 'react-router-dom';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import ModalAttachments from '~/components/modal/modalAttachments';
import SliderLine from '../slider/line';
import Loading from '~/components/loading';

import { addValidatorOnBlur, removeValidatorOnInput, validatorMultiple, errorClass } from '~/utils/validator';

function FormCV({ tab, type }) {
    const sidebarRef = useRef([]);
    const inputsRef = useRef([]);
    const messageErrorRef = useRef([]);
    const { user } = useContext(AppContext);
    const { id } = useParams();

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

    const [showModalProSkill, setShowModalProSkill] = useState(false);
    const [showModalExp, setShowModalExp] = useState(false);
    const [showModalEducation, setShowModalEducation] = useState(false);
    const [showModalLanguage, setShowModalLanguage] = useState(false);
    const [showModalSoftSkill, setShowModalSoftSkill] = useState(false);
    const [showModalHobby, setShowModalHobby] = useState(false);
    const [showModalAttachments, setShowModalAttachments] = useState(false);

    const [keyModal, setKeyModal] = useState(null);

    const [resume, setResume] = useState({
        file: null,
        name: '',
        image: '',
        birthday: '',
        typePosition: '',
        positionApply: '',
        phone: '',
        email: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
        github: '',
        address: '',
        currentSalary: '',
        desiredSalary: '',
        introduce: '',
        careerGoals: '',
        candidateId: user?.userId,
        status: 0,
        listResumeProSkill: [],
        listWorkExperience: [],
        listResumeEducation: [],
        listResumeLanguage: [],
        listResumeSoftSkill: [],
        listResumeHobby: [],
        listAttachments: [],
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        let flag = true;
        if (!file) {
            flag = false;
            setResume({ ...resume, image: null, file: null });
        } else {
            let img = ['png', 'jpg', 'jpeg', 'PNG', 'JPG'];
            if (file.size > 1024 * 1024) {
                flag = false;
                alert('Kích thước file quá lớn');
                return;
            } else if (!img.includes(file.name.split('.').pop())) {
                flag = false;
                setResume({ ...resume, image: null, file: null });
                alert('File phải thuộc định dạng png, jpg, jpeg');
                return;
            }
        }
        if (flag) {
            const reader = new FileReader();
            reader.onload = () => {
                setResume({ ...resume, image: reader.result, file: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setResume({ ...resume, image: null, file: null });
        setUserInfo({ ...userInfo, image: null, file: null });
    };

    const handleSubmit = async (resume, id) => {
        if (
            validatorMultiple([
                {
                    inputRef: inputsRef.current[0],
                    messageErrorRef: messageErrorRef.current[0],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[1],
                    messageErrorRef: messageErrorRef.current[1],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[2],
                    messageErrorRef: messageErrorRef.current[2],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[3],
                    messageErrorRef: messageErrorRef.current[3],
                    rules: ['required', 'phone'],
                },
                {
                    inputRef: inputsRef.current[4],
                    messageErrorRef: messageErrorRef.current[4],
                    rules: ['required', 'email'],
                },
                {
                    inputRef: inputsRef.current[5],
                    messageErrorRef: messageErrorRef.current[5],
                    rules: ['required'],
                },
                {
                    inputRef: inputsRef.current[6],
                    messageErrorRef: messageErrorRef.current[6],
                    rules: ['required'],
                },
            ])
        ) {
            if (!resume?.typePosition) {
                // e.target.classList.add(...errorClass);
                document.getElementById('errorTyPositionCV').innerHTML = 'Không được để trống trường này';
                document.getElementById('errorTyPositionCV').style.opacity = 1;
                return;
            }
            if (resume.listResumeProSkill.length > 0) {
                setIsLoading(true);
                let dataCreate = {
                    ...resume,
                    image: resume.image || userInfo.image || null,
                    name: resume.name || userInfo.fullName || null,
                    phone: resume.phone || userInfo.phone || null,
                    email: resume.email || userInfo.email || null,
                    facebook: resume.facebook || userInfo.facebook || null,
                    twitter: resume.twitter || userInfo.twitter || null,
                    linkedIn: resume.linkedIn || userInfo.linkedIn || null,
                    github: resume.github || userInfo.github || null,
                    address: resume.address || userInfo.address || null,
                    candidateId: user?.userId,
                    birthday: resume?.birthday
                        ? new Date(resume.birthday).toISOString().split('T')[0]
                        : userInfo.birthDay
                        ? new Date(userInfo.birthDay).toISOString().split('T')[0]
                        : null,
                    currentSalary: Number.parseFloat(resume.currentSalary),
                    desiredSalary: Number.parseFloat(resume.desiredSalary),
                    listResumeEducation: resume.listResumeEducation.map((education) => ({
                        ...education,
                        graduationYear: Number.parseInt(education.graduationYear),
                        statusEducation: education?.statusEducation ? true : false,
                    })),
                    listResumeProSkill: resume.listResumeProSkill.map((proSkill) => ({
                        ...proSkill,
                        yearExperience: Number.parseInt(proSkill.yearExperience),
                    })),
                    listWorkExperience: resume.listWorkExperience.map((workExperience) => ({
                        ...workExperience,
                        startDay: new Date(workExperience.startDay).toISOString().split('T')[0],
                        endDay: new Date(workExperience.endDay).toISOString().split('T')[0],
                        statusWork: workExperience?.statusWork ? true : false,
                    })),
                };

                let dataUpdate = {
                    ...resume,
                    // image: resume.image || userInfo.image || null,
                    // name: resume.name || userInfo.fullName || null,
                    // phone: resume.phone || userInfo.phone || null,
                    // email: resume.email || userInfo.email || null,
                    // facebook: resume.facebook || userInfo.facebook || null,
                    // twitter: resume.twitter || userInfo.twitter || null,
                    // linkedIn: resume.linkedIn || userInfo.linkedIn || null,
                    // github: resume.github || userInfo.github || null,
                    // address: resume.address || userInfo.address || null,
                    candidateId: user?.userId,
                    birthday: resume?.birthday
                        ? new Date(resume.birthday).toISOString().split('T')[0]
                        : userInfo.birthDay
                        ? new Date(userInfo.birthDay).toISOString().split('T')[0]
                        : null,
                    currentSalary: Number.parseFloat(resume.currentSalary),
                    desiredSalary: Number.parseFloat(resume.desiredSalary),
                    listResumeEducation: resume.listResumeEducation.map((education) => ({
                        ...education,
                        graduationYear: Number.parseInt(education.graduationYear),
                        statusEducation: education?.statusEducation ? true : false,
                    })),
                    listResumeProSkill: resume.listResumeProSkill.map((proSkill) => ({
                        ...proSkill,
                        yearExperience: Number.parseInt(proSkill.yearExperience),
                    })),
                    listWorkExperience: resume.listWorkExperience.map((workExperience) => ({
                        ...workExperience,
                        startDay: new Date(workExperience.startDay).toISOString().split('T')[0],
                        endDay: new Date(workExperience.endDay).toISOString().split('T')[0],
                        statusWork: workExperience?.statusWork ? true : false,
                    })),
                };
                console.log(dataCreate);

                if (resume?.file) {
                    const imageRef = ref(storage, `images/${resume?.file.name + v4()}`);
                    const snapshot = await uploadBytes(imageRef, resume?.file);
                    const url = await getDownloadURL(snapshot.ref);
                    dataCreate = { ...dataCreate, image: url };
                    dataUpdate = { ...dataUpdate, image: url };
                }

                if (type === 'create') {
                    const res = await resumeService.create(dataCreate);
                    if (res?.success) {
                        alert('Tạo CV thành công');
                    } else {
                        alert('Tạo CV thất bại');
                    }
                } else {
                    const res = await resumeService.update(dataUpdate, id);
                    if (res?.success) {
                        alert('Cập nhật CV thành công');
                    } else {
                        alert('Cập nhật CV thất bại');
                    }
                }
                setIsLoading(false);
            } else {
                alert('Vui lòng nhập đầy thông tin bắt buộc');
            }
        } else {
            document.getElementById('errorProSkillCV').innerHTML = 'Không được để trống mục này';
            document.getElementById('errorProSkillCV').style.opacity = 1;
            if (!resume?.typePosition) {
                // e.target.classList.add(...errorClass);
                document.getElementById('errorTyPositionCV').innerHTML = 'Không được để trống trường này';
                document.getElementById('errorTyPositionCV').style.opacity = 1;
            }
            alert('Vui lòng nhập đầy thông tin bắt buộc');
        }
    };

    useEffect(() => {
        const getResume = async () => {
            const res = await resumeService.getResumeById(id);
            if (res?.success) {
                console.log(res.data.birthday);
                setResume({
                    ...res.data,
                    birthday: new Date(res.data.birthday).toISOString().split('T')[0],
                    listResumeProSkill: res.data.listResumeProSkill.map((proSkill, index) => ({
                        ...proSkill,
                        keyProSkill: index,
                    })),
                    listResumeEducation: res.data.listResumeEducation.map((education, index) => ({
                        ...education,
                        keyEducation: index,
                    })),
                    listWorkExperience: res.data.listWorkExperience.map((workExp, index) => ({
                        ...workExp,
                        keyExp: index,
                    })),
                    listResumeLanguage: res.data.listResumeLanguage.map((language, index) => ({
                        ...language,
                        keyLanguage: index,
                    })),
                    listResumeSoftSkill: res.data.listResumeSoftSkill.map((softSkill, index) => ({
                        ...softSkill,
                        keySoftSkill: index,
                    })),
                    listResumeHobby: res.data.listResumeHobby.map((hobby, index) => ({
                        ...hobby,
                        keyHobby: index,
                    })),
                    listAttachments: res.data?.listAttachments?.map((attachment, index) => ({
                        ...attachment,
                        keyAttachment: index,
                    })),
                });
            }
        };
        const getCandidate = async () => {
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
        const getAttachmentsByCandidateId = async () => {
            const candidate = JSON.parse(localStorage.getItem('user'));
            const res = await attachmentsService.getAttachmentsByCandidateId(candidate.userId);
            if (res?.success) {
                setResume((prev) => ({
                    ...prev,
                    listAttachments: res.data.map((attachment, index) => ({
                        ...attachment,
                        keyAttachment: index,
                    })),
                }));
            }
        };
        if (type === 'create') {
            getAttachmentsByCandidateId();
            getCandidate();
        }
        if (type === 'update') {
            getResume();
        }
    }, [id, type]);

    //validate
    useEffect(() => {
        addValidatorOnBlur([
            {
                inputRef: inputsRef.current[0],
                messageErrorRef: messageErrorRef.current[0],
                rules: ['required'],
            },
            {
                inputRef: inputsRef.current[1],
                messageErrorRef: messageErrorRef.current[1],
                rules: ['required'],
            },
            {
                inputRef: inputsRef.current[2],
                messageErrorRef: messageErrorRef.current[2],
                rules: ['required'],
            },
            {
                inputRef: inputsRef.current[3],
                messageErrorRef: messageErrorRef.current[3],
                rules: ['required', 'phone'],
            },
            {
                inputRef: inputsRef.current[4],
                messageErrorRef: messageErrorRef.current[4],
                rules: ['required', 'email'],
            },
            {
                inputRef: inputsRef.current[5],
                messageErrorRef: messageErrorRef.current[5],
                rules: ['required'],
            },
            {
                inputRef: inputsRef.current[6],
                messageErrorRef: messageErrorRef.current[6],
                rules: ['required'],
            },
        ]);
        removeValidatorOnInput(inputsRef.current, messageErrorRef.current);
    }, [inputsRef.current.length, messageErrorRef.current.length]);
    return (
        <div className="container mx-auto mt-[100px]">
            {isLoading && <Loading />}
            <MenuCV tab={tab}></MenuCV>

            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="border rounded p-2">
                    <div
                        onClick={() =>
                            sidebarRef.current[0].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                        className="px-2 py-1 border mt-1 block"
                    >
                        <h2 className="text-xl font-semibold">1. Thông tin cơ bản</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[1].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">2. Giới thiệu bản thân</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[2].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">3. Mục tiêu nghề nghiệp</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[3].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">4. Kỹ năng chuyển môn</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[4].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">5. Kinh nghiệm làm việc</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[5].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">6. Quá trình học tập</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[6].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">7. Ngôn ngữ thành thạo</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[7].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">8. Kỹ năng mềm</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[8].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">9. Sở thích</h2>
                    </div>
                    <div
                        className="px-2 py-1 border mt-1 block"
                        onClick={() =>
                            sidebarRef.current[9].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            })
                        }
                    >
                        <h2 className="text-xl font-semibold">10. File đính kèm</h2>
                    </div>
                </div>

                <div className="col-span-2">
                    <div className="flex justify-start items-center border p-4">
                        <div id="info" className="w-[170px] h-[170px] relative group overflow-hidden object-contain">
                            <img
                                className="w-full h-full object-contain"
                                src={resume?.image || userInfo?.image || AvatarMale}
                                alt="avatar"
                            />
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
                        <div className="ml-4 text-[#333] flex-1">
                            <div className="flex">
                                <strong className="w-max mr-2">
                                    Họ tên <span className="text-red-500">*</span> :
                                </strong>
                                <input
                                    ref={(el) => (inputsRef.current[0] = el)}
                                    type="text"
                                    placeholder="(Chưa có dữ liệu)"
                                    className="outline-none flex-1"
                                    value={resume?.name || userInfo?.fullName || ''}
                                    onChange={(e) => {
                                        setResume({ ...resume, name: e.target.value });
                                        if (userInfo.fullName) {
                                            setUserInfo({ ...userInfo, fullName: null });
                                        }
                                    }}
                                />
                                <span
                                    className="text-sm text-red-600 font-semibold opacity-0"
                                    ref={(el) => (messageErrorRef.current[0] = el)}
                                >
                                    error
                                </span>
                            </div>
                            <div>
                                <strong>
                                    Ngày sinh <span className="text-red-500">*</span> :{' '}
                                </strong>
                                <input
                                    ref={(el) => (inputsRef.current[1] = el)}
                                    type="date"
                                    className="outline-none p-2"
                                    value={resume?.birthday || userInfo?.birthDay || ''}
                                    onChange={(e) => {
                                        setResume({ ...resume, birthday: e.target.value });
                                        if (userInfo.birthDay) {
                                            setUserInfo({ ...userInfo, birthDay: null });
                                        }
                                    }}
                                />
                                <span
                                    className="text-sm text-red-600 font-semibold opacity-0"
                                    ref={(el) => (messageErrorRef.current[1] = el)}
                                >
                                    error
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <strong>
                                    Loại vị trí <span className="text-red-500">*</span> :{' '}
                                </strong>
                                <Autocomplete
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '0',
                                            padding: '0',
                                        },
                                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                            // borderColor: 'transparent',
                                        },
                                    }}
                                    className="bg-white rounded-md flex-1"
                                    disablePortal
                                    popupIcon={''}
                                    options={typePositions}
                                    size="small"
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="(Chưa có dữ liệu)"
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                    value={resume?.typePosition ? resume?.typePosition : null}
                                    onChange={(e, value) => {
                                        setResume({ ...resume, typePosition: value });
                                        e.target.classList.remove(...errorClass);
                                        document.getElementById('errorTyPositionCV').style.opacity = 0;
                                    }}
                                    onInput={(e) => {
                                        e.target.classList.remove(...errorClass);
                                        document.getElementById('errorTyPositionCV').style.opacity = 0;
                                    }}
                                    onBlur={(e) => {
                                        console.log(e.target.value);
                                        if (!e.target.value || e.target.value.trim().length === 0) {
                                            e.target.classList.add(...errorClass);
                                            document.getElementById('errorTyPositionCV').innerHTML =
                                                'Không được để trống trường này';
                                            document.getElementById('errorTyPositionCV').style.opacity = 1;
                                        }
                                    }}
                                />
                                <span id="errorTyPositionCV" className="text-sm text-red-600 font-semibold opacity-0">
                                    error
                                </span>
                            </div>
                            <div className="flex">
                                <strong className="w-max mr-2">
                                    Vị trí ứng tuyển <span className="text-red-500">*</span> :{' '}
                                </strong>
                                <input
                                    ref={(el) => (inputsRef.current[2] = el)}
                                    type="text"
                                    placeholder="(Chưa có dữ liệu)"
                                    className="outline-none flex-1"
                                    value={resume?.positionApply}
                                    onChange={(e) => setResume({ ...resume, positionApply: e.target.value })}
                                />
                                <span
                                    className="text-sm text-red-600 font-semibold opacity-0"
                                    ref={(el) => (messageErrorRef.current[2] = el)}
                                >
                                    error
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[0] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <h3 className="uppercase text-lg text-sky-600 font-semibold">thông tin cơ bản</h3>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">
                                Số điện thoại <span className="text-red-500">*</span> :{' '}
                            </strong>
                            <input
                                ref={(el) => (inputsRef.current[3] = el)}
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.phone || userInfo?.phone || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, phone: e.target.value });
                                    if (userInfo.phone) {
                                        setUserInfo({ ...userInfo, phone: null });
                                    }
                                }}
                            />
                            <span
                                className="text-sm text-red-600 font-semibold opacity-0"
                                ref={(el) => (messageErrorRef.current[3] = el)}
                            >
                                error
                            </span>
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">
                                Email <span className="text-red-500">*</span> :{' '}
                            </strong>
                            <input
                                ref={(el) => (inputsRef.current[4] = el)}
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.email || userInfo?.email || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, email: e.target.value });
                                    if (userInfo.email) {
                                        setUserInfo({ ...userInfo, email: null });
                                    }
                                }}
                            />
                            <span
                                className="text-sm text-red-600 font-semibold opacity-0"
                                ref={(el) => (messageErrorRef.current[4] = el)}
                            >
                                error
                            </span>
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">Facebook: </strong>
                            <input
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.facebook || userInfo?.facebook || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, facebook: e.target.value });
                                    if (userInfo.facebook) {
                                        setUserInfo({ ...userInfo, facebook: null });
                                    }
                                }}
                            />
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">LinkedIn: </strong>
                            <input
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.linkedIn || userInfo?.linkedIn || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, linkedIn: e.target.value });
                                    if (userInfo.linkedIn) {
                                        setUserInfo({ ...userInfo, linkedIn: null });
                                    }
                                }}
                            />
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">Twitter: </strong>
                            <input
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.twitter || userInfo?.twitter || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, twitter: e.target.value });
                                    if (userInfo.twitter) {
                                        setUserInfo({ ...userInfo, twitter: null });
                                    }
                                }}
                            />
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">Github: </strong>
                            <input
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.github || userInfo?.github || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, github: e.target.value });
                                    setUserInfo({ ...userInfo, github: null });
                                }}
                            />
                        </div>
                        <div className="my-2 flex gap-2">
                            <strong className="w-max">Chỗ ở hiện tại: </strong>
                            <input
                                type="text"
                                placeholder="(Chưa có dữ liệu)"
                                className="outline-none flex-1"
                                value={resume?.address || userInfo?.address || ''}
                                onChange={(e) => {
                                    setResume({ ...resume, address: e.target.value });
                                    setUserInfo({ ...userInfo, address: null });
                                }}
                            />
                        </div>
                        <div className="my-2 flex justify-start items-center gap-2">
                            <strong className="w-max">Mức lương hiện tại: </strong>
                            <input
                                className="outline-none p-2 text-center border-b"
                                type="number"
                                placeholder="(Chưa có dữ liệu)"
                                value={resume?.currentSalary}
                                onChange={(e) => setResume({ ...resume, currentSalary: e.target.value })}
                            />
                            <p>(triệu VNĐ)</p>
                        </div>
                        <div className="my-2 flex justify-start items-center gap-2">
                            <strong className="w-max">Mức lương mong muốn: </strong>
                            <input
                                className="outline-none border-b p-2 text-center"
                                type="number"
                                placeholder="(Chưa có dữ liệu)"
                                value={resume?.desiredSalary}
                                onChange={(e) => setResume({ ...resume, desiredSalary: e.target.value })}
                            />
                            <p>(triệu VNĐ)</p>
                        </div>
                    </div>

                    {/* ////////////// Giới thiệu bản thân*/}
                    <div
                        ref={(el) => (sidebarRef.current[1] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <h3 className="uppercase text-lg text-sky-600 font-semibold">
                            Giới thiệu bản thân <span className="text-red-500">*</span>
                        </h3>
                        <textarea
                            ref={(el) => (inputsRef.current[5] = el)}
                            placeholder="(Chưa có dữ liệu)"
                            className="w-full outline-none border p-2 mt-4 min-h-[100px]"
                            value={resume?.introduce}
                            onChange={(e) => setResume({ ...resume, introduce: e.target.value })}
                        ></textarea>
                        <span
                            className="text-sm text-red-600 font-semibold opacity-0"
                            ref={(el) => (messageErrorRef.current[5] = el)}
                        >
                            error
                        </span>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[2] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <h3 className="uppercase text-lg text-sky-600 font-semibold">
                            Mục tiêu nghề nghiệp <span className="text-red-500">*</span>
                        </h3>
                        <textarea
                            ref={(el) => (inputsRef.current[6] = el)}
                            placeholder="(Chưa có dữ liệu)"
                            className="w-full outline-none border p-2 mt-4 min-h-[100px]"
                            value={resume?.careerGoals}
                            onChange={(e) => setResume({ ...resume, careerGoals: e.target.value })}
                        ></textarea>
                        <span
                            className="text-sm text-red-600 font-semibold opacity-0"
                            ref={(el) => (messageErrorRef.current[6] = el)}
                        >
                            error
                        </span>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[3] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="uppercase text-lg text-sky-600 font-semibold">
                                    Kĩ năng chuyên môn <span className="text-red-500">*</span>
                                </h3>
                                <span id="errorProSkillCV" className="text-sm text-red-600 font-semibold opacity-0">
                                    error
                                </span>
                            </div>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalProSkill(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm kĩ năng chuyên môn
                            </button>
                        </div>
                        <ul className="pl-4">
                            {resume.listResumeProSkill.map((proSkill, index) => (
                                <div key={index} className="group relative mt-2 border-b py-2">
                                    <li>{`${proSkill.proSkillName} (${proSkill.yearExperience} NĂM)`}</li>
                                    <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                        <Button
                                            className="p-2"
                                            size="small"
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                setKeyModal(index);
                                                setShowModalProSkill(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setResume({
                                                    ...resume,
                                                    listResumeProSkill: resume.listResumeProSkill
                                                        .filter((proSkill) => proSkill.keyProSkill !== index)
                                                        .map((proSkill) => {
                                                            if (proSkill.keyProSkill > index) {
                                                                return {
                                                                    ...proSkill,
                                                                    keyProSkill: proSkill.keyProSkill - 1,
                                                                };
                                                            }
                                                            return proSkill;
                                                        }),
                                                });
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[4] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div ref={(el) => (sidebarRef.current[4] = el)} className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">Kinh nghiệm làm việc</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalExp(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm mới kinh nghiệm làm việc
                            </button>
                        </div>
                        <div>
                            {resume.listWorkExperience.map((exp, index) => (
                                <div key={index} className="group relative mt-2">
                                    <div className="border-b pb-2">
                                        <p className="font-bold">{`${exp.nameCompany} (${format.formatDate(
                                            exp.startDay,
                                        )} đến ${exp.statusWork ? 'nay' : format.formatDate(exp.endDay)})`}</p>
                                        <p>Vị trí: {exp.position}</p>
                                        <p>Mô tả: {exp.description}</p>
                                    </div>
                                    <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                        <Button
                                            className="p-2"
                                            size="small"
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                setKeyModal(index);
                                                setShowModalExp(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setResume({
                                                    ...resume,
                                                    listWorkExperience: resume.listWorkExperience
                                                        .filter((exp) => exp.keyExp !== index)
                                                        .map((exp) => {
                                                            if (exp.keyExp > index) {
                                                                return {
                                                                    ...exp,
                                                                    keyExp: exp.keyExp - 1,
                                                                };
                                                            }
                                                            return exp;
                                                        }),
                                                });
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        ref={(el) => (sidebarRef.current[5] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">Quá trình học tập</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalEducation(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm kĩ mới quá trình học tập
                            </button>
                        </div>
                        <div>
                            {resume.listResumeEducation.map((education, index) => (
                                <div key={index} className="group relative mt-2">
                                    <div className="py-4 border-b">
                                        <p className="font-bold">{education.nameSchool}</p>
                                        <p>Chuyên ngành: {education.majors}</p>
                                        <p>Bằng cấp: {education.degree}</p>
                                        {education.statusEducation ? (
                                            <p>Đang học tại đây</p>
                                        ) : (
                                            <p>Năm tốt nghiệp: {education.graduationYear}</p>
                                        )}
                                        <p>Mô tả: {education.description}</p>
                                    </div>
                                    <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                        <Button
                                            className="p-2"
                                            size="small"
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                setKeyModal(index);
                                                setShowModalEducation(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setResume({
                                                    ...resume,
                                                    listResumeEducation: resume.listResumeEducation
                                                        .filter((education) => education.keyEducation !== index)
                                                        .map((education) => {
                                                            if (education.keyEducation > index) {
                                                                return {
                                                                    ...education,
                                                                    keyEducation: education.keyEducation - 1,
                                                                };
                                                            }
                                                            return education;
                                                        }),
                                                });
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[6] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">Ngôn ngữ thành thạo</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalLanguage(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm kĩ mới ngôn ngữ thành thạo
                            </button>
                        </div>
                        <div>
                            <div>
                                {resume.listResumeLanguage.map((language, index) => (
                                    <div key={index} className="group relative mt-2">
                                        <div className="flex justify-start items-center">
                                            <p className="text-base font-semibold my-1">{language.languageName}</p>
                                        </div>
                                        <SliderLine value={language?.prowess || 0} />
                                        <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                            <Button
                                                className="p-2"
                                                size="small"
                                                variant="outlined"
                                                color="success"
                                                onClick={() => {
                                                    setKeyModal(index);
                                                    setShowModalLanguage(true);
                                                }}
                                            >
                                                Chỉnh sửa
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    setResume({
                                                        ...resume,
                                                        listResumeLanguage: resume.listResumeLanguage
                                                            .filter((language) => language.keyLanguage !== index)
                                                            .map((language) => {
                                                                if (language.keyLanguage > index) {
                                                                    return {
                                                                        ...language,
                                                                        keyLanguage: language.keyLanguage - 1,
                                                                    };
                                                                }
                                                                return language;
                                                            }),
                                                    });
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[7] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">Kỹ năng mềm</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalSoftSkill(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm kĩ mới kỹ nẵng mềm
                            </button>
                        </div>
                        <div>
                            {resume.listResumeSoftSkill.map((softSkill, index) => (
                                <div key={index} className="group relative mt-2">
                                    <div className="flex justify-start items-center">
                                        <p className="text-base font-semibold my-1">{softSkill.softSkillName}</p>
                                    </div>

                                    <SliderLine value={softSkill?.prowess || 0} />
                                    <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                        <Button
                                            className="p-2"
                                            size="small"
                                            variant="outlined"
                                            color="success"
                                            onClick={() => {
                                                setKeyModal(index);
                                                setShowModalSoftSkill(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                setResume({
                                                    ...resume,
                                                    listResumeSoftSkill: resume.listResumeSoftSkill
                                                        .filter((softSkill) => softSkill.keySoftSkill !== index)
                                                        .map((softSkill) => {
                                                            if (softSkill.keySoftSkill > index) {
                                                                return {
                                                                    ...softSkill,
                                                                    keySoftSkill: softSkill.keySoftSkill - 1,
                                                                };
                                                            }
                                                            return softSkill;
                                                        }),
                                                });
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[8] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">Sở thích</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalHobby(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm mới sở thích
                            </button>
                        </div>
                        <div>
                            <ul className="pl-2">
                                {resume.listResumeHobby.map((hobby, index) => (
                                    <div key={index} className="group relative mt-2">
                                        <li className="border-b py-2">{hobby.name}</li>
                                        <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                            <Button
                                                className="p-2"
                                                size="small"
                                                variant="outlined"
                                                color="success"
                                                onClick={() => {
                                                    setKeyModal(index);
                                                    setShowModalHobby(true);
                                                }}
                                            >
                                                Chỉnh sửa
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    setResume({
                                                        ...resume,
                                                        listResumeHobby: resume.listResumeHobby
                                                            .filter((hobby) => hobby.keyHobby !== index)
                                                            .map((hobby) => {
                                                                if (hobby.keyHobby > index) {
                                                                    return {
                                                                        ...hobby,
                                                                        keyProSkill: hobby.keyHobby - 1,
                                                                    };
                                                                }
                                                                return hobby;
                                                            }),
                                                    });
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div
                        ref={(el) => (sidebarRef.current[9] = el)}
                        className="border p-4 text-[#333] mt-4 scroll-mt-24"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="uppercase text-lg text-sky-600 font-semibold">File đính kèm</h3>
                            <button
                                className="flex justify-center items-center px-1 py-2 border border-sky-400 text-sky-700"
                                onClick={() => {
                                    setKeyModal(null);
                                    setShowModalAttachments(true);
                                }}
                            >
                                <Add fontSize="small" />
                                Thêm file đính kèm
                            </button>
                        </div>
                        <div>
                            <ul className="pl-2">
                                {resume.listAttachments?.map((attachment, index) => (
                                    <div key={index} className="group relative mt-2">
                                        <Link
                                            to={attachment?.url}
                                            className="border-b py-2 flex justify-start items-center gap-4"
                                        >
                                            <AttachFileOutlined />
                                            {attachment.name}
                                        </Link>
                                        <div className="hidden absolute gap-2 bg-white top-0 right-0 group-hover:flex">
                                            <Button
                                                className="p-2"
                                                size="small"
                                                variant="outlined"
                                                color="success"
                                                onClick={() => {
                                                    setKeyModal(index);
                                                    setShowModalAttachments(true);
                                                }}
                                            >
                                                Chỉnh sửa
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => {
                                                    setResume({
                                                        ...resume,
                                                        listAttachments: resume.listAttachments
                                                            .filter((attachment) => attachment.keyAttachments !== index)
                                                            .map((attachment) => {
                                                                if (attachment.keyAttachments > index) {
                                                                    return {
                                                                        ...attachment,
                                                                        keyProSkill: attachment.keyAttachments - 1,
                                                                    };
                                                                }
                                                                return attachment;
                                                            }),
                                                    });
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button Create/Update */}
            <div className="py-4 flex justify-center">
                {type === 'create' ? (
                    <Button size="large" variant="contained" onClick={() => handleSubmit(resume, -1)}>
                        Tạo CV ngay
                    </Button>
                ) : (
                    <Button size="large" variant="contained" onClick={() => handleSubmit(resume, id)}>
                        Cập nhật CV
                    </Button>
                )}
            </div>
            {showModalProSkill && (
                <ModalProSkill
                    setShowModalProSkill={setShowModalProSkill}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
            {showModalExp && (
                <ModalExp keyModal={keyModal} setShowModalExp={setShowModalExp} setResume={setResume} resume={resume} />
            )}
            {showModalEducation && (
                <ModalEducation
                    setShowModalEducation={setShowModalEducation}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
            {showModalLanguage && (
                <ModalLanguage
                    setShowModalLanguage={setShowModalLanguage}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
            {showModalSoftSkill && (
                <ModalSoftSkill
                    setShowModalSoftSkill={setShowModalSoftSkill}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
            {showModalHobby && (
                <ModalHobby
                    setShowModalHobby={setShowModalHobby}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
            {showModalAttachments && (
                <ModalAttachments
                    setShowModalAttachments={setShowModalAttachments}
                    keyModal={keyModal}
                    setResume={setResume}
                    resume={resume}
                />
            )}
        </div>
    );
}

export default FormCV;
