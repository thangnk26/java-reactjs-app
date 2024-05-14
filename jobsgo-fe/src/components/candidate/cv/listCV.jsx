import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import MenuCV from './menuCV';
import { Link } from 'react-router-dom';
import Template1CV from '~/assets/images/candidate/template-1-cv.png';
import Template2CV from '~/assets/images/candidate/template2.png';

import * as resumeService from '~/service/resumeService';
import { useEffect, useState } from 'react';

const handleChangePublic = async (id, value) => {
    await resumeService.changeIsPublic(id, value);
};

function ListCV() {
    const [listResume, setListResume] = useState([]);

    const handleDelete = async (id) => {
        const res = await resumeService.deleteById(id);
        if (res?.success) {
            setListResume(listResume.filter((resume) => resume.resumeId !== id));
            alert('Xóa thành công');
        } else {
            alert('Xóa thất bại');
        }
    };

    useEffect(() => {
        const getListResume = async () => {
            const res = await resumeService.getAllByCandidateID();
            if (res?.success) {
                console.log(res.data);
                setListResume(res.data);
            }
        };
        getListResume();
    }, []);

    return (
        <div>
            <div className="container mx-auto mt-[100px]">
                <MenuCV tab={'viewCV'}></MenuCV>
                <h2 className="text-lg font-bold my-8 border bg-black/5 p-2">Quản lý CV</h2>

                <div className="grid grid-cols-2 gap-4">
                    {listResume?.map((resume) => (
                        <div key={resume.resumeId} className="p-2 border rounded-lg flex justify-start items-center">
                            <Link
                                to={`/cv/view/${resume.resumeId}/template/${resume.template}`}
                                className="max-w-[100px] mr-4"
                            >
                                <img
                                    src={resume.template === 1 ? Template1CV : resume.template === 2 ? Template2CV : ''}
                                    alt="cv"
                                />
                            </Link>
                            <div>
                                <p className="font-bold">{resume.positionApply}</p>
                                <p className="my-2">Mẫu CV 1</p>
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/cv/update/${resume.resumeId}`}
                                        className="p-1 border rounded-lg flex items-center justify-center px-2 hover:bg-gray-100"
                                    >
                                        <EditOutlined fontSize="small" className="mr-1" />
                                        Chỉnh sửa
                                    </Link>
                                    <button
                                        className="p-1 border rounded-lg flex items-center justify-center px-2 hover:bg-gray-100"
                                        onClick={() => handleDelete(resume?.resumeId)}
                                    >
                                        <DeleteOutline className="mr-1" />
                                        Xóa
                                    </button>
                                    <select
                                        onChange={(e) => {
                                            handleChangePublic(resume?.resumeId, e.target.value);
                                        }}
                                        defaultValue={resume?.public}
                                        className="border outline-none p-1 rounded-lg"
                                    >
                                        <option value={true}>Public</option>
                                        <option value={false}>Private</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListCV;
