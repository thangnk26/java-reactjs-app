import { Autocomplete, Button, TextField } from '@mui/material';
// import ListCandidate from '../listCandidate';
import { useEffect, useState } from 'react';
import * as careerService from '~/service/careerService';
import * as languageService from '~/service/languageService';
import * as proSkillService from '~/service/proSkillService';
import * as softSkillService from '~/service/softSkillService';
import ModalChange from '../modalChange';
const selects = ['Ngôn ngữ', 'Chuyên ngành', 'Kĩ năng', 'Kĩ năng mềm'];
function ChangeSetting({ className, title, tab }) {
    const [updateModal, setUpdateModal] = useState(false);
    const [language, setLanguage] = useState([]);
    const [career, setCareer] = useState([]);
    const [proSkill, setProSkill] = useState([]);
    const [softSkill, setSoftSkill] = useState([]);
    // const [selects, setSelects] = useState(['Ngôn ngữ', 'Chuyên ngành', 'Kĩ năng', 'Kĩ năng mềm']);
    const [search, setSearch] = useState({
        selects: 'Ngôn ngữ',
    });
    const [type, setType] = useState(null);
    const [id, setId] = useState(null);
    const [data, setData] = useState('');
    const [careerId, setCareerId] = useState(null);
    const searchJob = (value, name) => {
        setSearch((state) => ({ ...state, [name]: value }));
    };
    const getData = async () => {
        const resCareer = await careerService.getAllCareer();
        if (resCareer?.success) {
            let careerName = resCareer.data.map((value) => ({
                label: value.name,
                id: value.id,
            }));
            setCareer(careerName);
        }
        const resLanguage = await languageService.getAllLanguage();
        if (resLanguage?.success) {
            let languageName = resLanguage.data.map((value) => ({
                label: value.name,
                id: value.id,
            }));
            setLanguage(languageName);
        }

        const resProSkill = await proSkillService.getAllProSkill();
        if (resProSkill?.success) {
            console.log(resProSkill.data);
            let proSkillName = resProSkill.data.map((value) => ({
                label: value.name,
                id: value.id,
                career_name: value.career.name,
                career_id: value.career.id,
            }));
            setProSkill(proSkillName);
        }

        const resSoftSkil = await softSkillService.getAllSoftSkill();
        if (resSoftSkil?.success) {
            let softSkillName = resSoftSkil.data.map((value) => ({
                label: value.name,
                id: value.id,
            }));
            setSoftSkill(softSkillName);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    const handleUpdate = (id, label) => {
        setType(2);
        setId(id);
        setData(label);
        setUpdateModal(true);
    };
    const handleProSkill = (id, label, career_id, career_name) => {
        setType(2);
        setId(id);
        setData(label);
        setCareerId({ career_id: career_id, career_name: career_name });
        setUpdateModal(true);
    };
    const closeUpdateModal = () => {
        console.log('alo');
        getData();
        setUpdateModal(false);
    };
    const handleAdd = () => {
        setType(1);
        setUpdateModal(true);
        setData(null);
    };

    return (
        <div className={className}>
            <div className="p-4 border-t">
                <h2 className="text-base uppercase font-semibold mb-4">Cài đặt</h2>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <div className="flex">
                            <Autocomplete
                                className="bg-white rounded-md w-full"
                                disablePortal
                                options={selects}
                                size="small"
                                value={search.selects}
                                onChange={(e, value) => searchJob(value, 'selects')}
                                renderInput={(params) => (
                                    <TextField {...params} label="Lựa chọn" placeholder="Chọn..." />
                                )}
                            />
                            {search.selects != null ? (
                                <button
                                    onClick={handleAdd}
                                    className="bg-blue-500 hover:bg-blue-700 ml-2 text-white font-bold py-2 px-4 rounded"
                                >
                                    Thêm
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="flex items-center border-y py-2 pl-4 font-semibold bg-black/5">
                    <People className="mr-1" /> {title}
                </div> */}

                <div className="w-full flex justify-center">
                    {search == null ? (
                        <></>
                    ) : search.selects === 'Ngôn ngữ' ? (
                        <>
                            <table className="w-[60%] text-center mt-6">
                                <thead>
                                    <tr>
                                        <th className="w-[10%]">ID</th>
                                        <th className="w-[70%]">Tên</th>
                                        <th className="w-[20%]">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {language?.map((value) => (
                                        <tr key={value.id}>
                                            <td>{value.id}</td>
                                            <td>{value.label}</td>
                                            <td>
                                                <div className="flex ">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="warning"
                                                        onClick={() => handleUpdate(value.id, value.label)}
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : search.selects === 'Chuyên ngành' ? (
                        <>
                            <table className="w-[60%] text-center mt-6">
                                <thead>
                                    <tr>
                                        <th className="w-[10%]">ID</th>
                                        <th className="w-[70%]">Tên</th>
                                        <th className="w-[20%]">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {career?.map((value) => (
                                        <tr key={value.id}>
                                            <td>{value.id}</td>
                                            <td>{value.label}</td>
                                            <td>
                                                <div className="flex ">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="warning"
                                                        onClick={() => handleUpdate(value.id, value.label)}
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : search.selects === 'Kĩ năng' ? (
                        <>
                            <table className="w-[60%] text-center mt-6">
                                <thead>
                                    <tr>
                                        <th className="w-[10%]">ID</th>
                                        <th className="w-[40%]">Chuyên ngành</th>
                                        <th className="w-[30%]">Tên</th>
                                        <th className="w-[20%]">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proSkill?.map((value) => (
                                        <tr key={value.id}>
                                            <td>{value.id}</td>
                                            <td>{value.career_name}</td>
                                            <td>{value.label}</td>
                                            <td>
                                                <div className="flex ">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="warning"
                                                        onClick={() =>
                                                            handleProSkill(
                                                                value.id,
                                                                value.label,
                                                                value.career_id,
                                                                value.career_name,
                                                            )
                                                        }
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : search.selects === 'Kĩ năng mềm' ? (
                        <>
                            <table className="w-[60%] text-center mt-6">
                                <thead>
                                    <tr>
                                        <th className="w-[10%]">ID</th>
                                        <th className="w-[70%]">Tên</th>
                                        <th className="w-[20%]">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {softSkill?.map((value) => (
                                        <tr key={value.id}>
                                            <td>{value.id}</td>
                                            <td>{value.label}</td>
                                            <td>
                                                <div className="flex ">
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="warning"
                                                        onClick={() => handleUpdate(value.id, value.label)}
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <></>
                    )}
                    {updateModal && (
                        <ModalChange
                            updateId={id}
                            onCloseModal={closeUpdateModal}
                            data={data}
                            select={search.selects}
                            careerId={careerId}
                            type={type}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChangeSetting;
