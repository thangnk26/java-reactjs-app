import SaveIcon from '@mui/icons-material/Save';
import { Autocomplete, Switch, TextField } from '@mui/material';
import { useState } from 'react';

import { degrees, graduationYears } from '~/data/constants';

function ModalEducation({ setShowModalEducation, keyModal, resume, setResume }) {
    const [education, setEducation] = useState(() => {
        if (keyModal !== null || keyModal !== undefined) {
            return resume.listResumeEducation.find((education) => education.keyEducation === keyModal);
        }
        return null;
    });
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalEducation(false)}
        >
            <div className="p-4 bg-white rounded-lg min-w-[40%] mt-8" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">Quá trình học tập</h2>
                <div className="border px-4 py-6 grid grid-cols-2 gap-4">
                    <div className="">
                        <p className="text-sky-600 mb-2">
                            Trường học <span className="text-red-600">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Tên trường học"
                            className="outline-none border px-2 py-1 w-full"
                            value={education?.nameSchool || ''}
                            onChange={(e) => setEducation({ ...education, nameSchool: e.target.value })}
                        />
                    </div>
                    <div className="">
                        <p className="text-sky-600 mb-2">
                            Chuyên ngành <span className="text-red-600">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Ngành học"
                            className="w-full outline-none border px-2 py-1"
                            value={education?.majors || ''}
                            onChange={(e) => setEducation({ ...education, majors: e.target.value })}
                        />
                    </div>
                    <div className="">
                        <p className="text-sky-600 mb-2">
                            Bằng cấp <span className="text-red-600">*</span>
                        </p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={degrees}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                            value={education?.degree || null}
                            onChange={(e, value) => setEducation({ ...education, degree: value })}
                        />
                    </div>
                    <div className="">
                        <div className="text-sky-600 mb-2 flex items-center gap-4">
                            <div>
                                Năm tốt nghiệp <span className="text-red-600">*</span>
                            </div>
                            <div>
                                <label htmlFor="status" className="text-black ml-2">
                                    Đang học tại đây
                                </label>
                                <Switch
                                    checked={education?.statusEducation ? true : false}
                                    size="small"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setEducation({
                                                ...education,
                                                graduationYear: null,
                                                statusEducation: e.target.checked,
                                            });
                                        } else {
                                            setEducation({ ...education, statusEducation: e.target.checked });
                                        }
                                    }}
                                ></Switch>
                            </div>
                        </div>
                        <Autocomplete
                            disabled={education?.statusEducation || false}
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={graduationYears}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn..." />}
                            value={education?.graduationYear || null}
                            onChange={(e, value) => setEducation({ ...education, graduationYear: value })}
                        />
                    </div>
                    <div className="col-span-2">
                        <p className="text-sky-600 mb-2">
                            Mô tả quá trình học tập <span className="text-red-600">*</span>
                        </p>
                        <textarea
                            placeholder="Thành tích nổi bật..."
                            className="w-full min-h-[100px] border p-2 outline-none"
                            value={education?.description || ''}
                            onChange={(e) => setEducation({ ...education, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={() => {
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeEducation: resumePrev.listResumeEducation.map((educationOld) => {
                                    //Cập nhật
                                    if (educationOld.keyEducation === keyModal) {
                                        return {
                                            keyEducation: keyModal,
                                            id: educationOld?.id,
                                            nameSchool: education.nameSchool,
                                            majors: education.majors,
                                            degree: education.degree,
                                            graduationYear: education.graduationYear,
                                            statusEducation: education.statusEducation,
                                            description: education.description,
                                        };
                                    } else {
                                        return educationOld;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeEducation: [
                                    ...resumePrev.listResumeEducation,
                                    //Tạo mới
                                    {
                                        keyEducation: resumePrev.listResumeEducation.length,
                                        nameSchool: education.nameSchool,
                                        majors: education.majors,
                                        degree: education.degree,
                                        graduationYear: education.graduationYear,
                                        statusEducation: education.statusEducation,
                                        description: education.description,
                                    },
                                ],
                            }));
                        }
                        setShowModalEducation(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalEducation;
