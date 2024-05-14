import SaveIcon from '@mui/icons-material/Save';
import { Switch } from '@mui/material';
import { useState } from 'react';
import * as format from '~/utils/handleDate';

function ModalExp({ setShowModalExp, setResume, resume, keyModal }) {
    const [exp, setExp] = useState(() => {
        if (keyModal !== null || keyModal !== undefined) {
            return resume.listWorkExperience.find((exp) => exp.keyExp === keyModal);
        }
        return null;
    });
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalExp(false)}
        >
            <div className="p-4 bg-white rounded-lg min-w-[40%] mt-8" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">Kinh nghiệm làm việc</h2>
                <div className="border px-4 py-6 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sky-600 mb-2">
                            Tên công ty <span className="text-red-600">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Công ty đã làm việc"
                            className="outline-none border px-2 py-1 w-full"
                            value={exp?.nameCompany || ''}
                            onChange={(e) => setExp({ ...exp, nameCompany: e.target.value })}
                        />
                    </div>
                    <div>
                        <p className="text-sky-600 mb-2">
                            Chức danh <span className="text-red-600">*</span>
                        </p>
                        <input
                            type="text"
                            placeholder="Vị trí công việc"
                            className="w-full outline-none border px-2 py-1"
                            value={exp?.position || ''}
                            onChange={(e) => setExp({ ...exp, position: e.target.value })}
                        />
                    </div>
                    <div>
                        <p className="text-sky-600 mb-2">
                            Ngày bắt đầu <span className="text-red-600">*</span>
                        </p>
                        <input
                            type="date"
                            placeholder="Vị trí công việc"
                            className="w-full outline-none border px-2 py-1"
                            value={exp?.startDay ? format.formatDate(exp.startDay, 'yyyy-mm-dd') : ''}
                            onChange={(e) => setExp({ ...exp, startDay: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="text-sky-600 mb-2 flex items-center gap-4">
                            <div>
                                Ngày kết thúc <span className="text-red-600">*</span>
                            </div>
                            <div>
                                <label className="text-black ml-2">Đang làm việc tại đây</label>
                                <Switch
                                    checked={exp?.statusWork ? true : false}
                                    size="small"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setExp({ ...exp, endDay: null, statusWork: e.target.checked });
                                        } else {
                                            setExp({ ...exp, statusWork: e.target.checked });
                                        }
                                    }}
                                ></Switch>
                            </div>
                        </div>
                        <input
                            disabled={exp?.statusWork}
                            type="date"
                            className="w-full outline-none border px-2 py-1"
                            value={exp?.endDay ? format.formatDate(exp.endDay, 'yyyy-mm-dd') : ''}
                            onChange={(e) => setExp({ ...exp, endDay: e.target.value })}
                        />
                    </div>
                    <div className="col-span-2">
                        <p className="text-sky-600 mb-2">
                            Mô tả công việc <span className="text-red-600">*</span>
                        </p>
                        <textarea
                            placeholder="Thông tin bổ sung..."
                            className="w-full min-h-[100px] border p-2 outline-none"
                            value={exp?.description || ''}
                            onChange={(e) => setExp({ ...exp, description: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={() => {
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listWorkExperience: resumePrev.listWorkExperience.map((expOld) => {
                                    //Cập nhật
                                    if (expOld.keyExp === keyModal) {
                                        return {
                                            keyExp: keyModal,
                                            id: expOld?.id,
                                            nameCompany: exp.nameCompany,
                                            position: exp.position,
                                            statusWork: exp.statusWork,
                                            endDay: exp.endDay,
                                            startDay: exp.startDay,
                                            description: exp.description,
                                        };
                                    } else {
                                        return expOld;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listWorkExperience: [
                                    ...resumePrev.listWorkExperience,
                                    //Tạo mới
                                    {
                                        keyExp: resumePrev.listWorkExperience.length,
                                        nameCompany: exp.nameCompany,
                                        position: exp.position,
                                        statusWork: exp.statusWork,
                                        endDay: exp.endDay,
                                        startDay: exp.startDay,
                                        description: exp.description,
                                    },
                                ],
                            }));
                        }
                        setShowModalExp(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalExp;
