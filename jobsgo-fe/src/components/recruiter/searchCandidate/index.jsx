import { People, Search } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import ListCandidate from '../listCandidate';
import BtnCreateJob from '../btnCreateJob';
import { degrees, typePositions } from '~/data/constants';
import { useEffect, useState } from 'react';
import * as resumeService from '~/service/resumeService';
// import * as careerService from '~/service/careerService';
import * as languageService from '~/service/languageService';
import * as proSkillService from '~/service/proSkillService';

function SearchCandidate({ className, title, tab }) {
    // const [listCareer, setListCareer] = useState([]);
    const [listProSkill, setListProSkill] = useState([]);
    const [listLanguage, setListLanguage] = useState([]);
    const [search, setSearch] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const searchJob = (value, name) => {
        setSearch((state) => ({ ...state, [name]: value }));
    };
    const resultSearch = async () => {
        console.log(search);
        let data = await resumeService.searchCandidate(
            search.position,
            search.specialized?.label,
            search.language?.label,
            search.degree,
        );
        setDataSearch(data.data);
    };

    useEffect(() => {
        const getData = async () => {
            // const resCareer = await careerService.getAllCareer();
            // if (resCareer?.success) {
            //     setListCareer(
            //         resCareer.data.map((career) => ({
            //             label: career.name,
            //             id: career.id,
            //         })),
            //     );
            // }

            const resLanguage = await languageService.getAllLanguage();
            if (resLanguage?.success) {
                setListLanguage(
                    resLanguage.data.map((language) => ({
                        label: language.name,
                        id: language.id,
                    })),
                );
            }
            const resProSkill = await proSkillService.getAllProSkill();
            if (resProSkill?.success) {
                setListProSkill(
                    resProSkill.data.map((proSkill) => ({
                        label: proSkill.name,
                        id: proSkill.id,
                    })),
                );
            }
        };
        getData();
    }, []);
    console.log(dataSearch);
    return (
        <div className={className}>
            <BtnCreateJob />
            <div className="p-4 border-t">
                <h2 className="text-base uppercase font-semibold mb-4">Bộ lọc ứng viên</h2>
                {/* <input
                    type="text"
                    name='jobname'
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="w-full mb-2 p-2 outline-none border rounded-lg"
                /> */}
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="font-semibold mb-1">Vị trí tuyển dụng</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={typePositions}
                            size="small"
                            onChange={(e, value) => searchJob(value, 'position')}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn vị trí tuyển dụng" />}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Kỹ năng chuyên môn</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={listProSkill}
                            size="small"
                            onChange={(e, value) => searchJob(value, 'specialized')}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn kỹ năng chuyên môn" />}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Ngôn ngữ</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={listLanguage}
                            size="small"
                            onChange={(e, value) => searchJob(value, 'language')}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn ngôn ngữ" />}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Bằng cấp</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={degrees}
                            size="small"
                            onChange={(e, value) => searchJob(value, 'degree')}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn bằng cấp" />}
                        />
                    </div>
                </div>

                <div>
                    <button
                        onClick={resultSearch}
                        className=" my-4 flex justify-center items-center px-2 py-1 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-800"
                    >
                        <Search className="mr-1" /> Tìm ứng viên
                    </button>
                </div>

                <div className="flex items-center border-y py-2 pl-4 font-semibold bg-black/5">
                    <People className="mr-1" /> {title}
                </div>

                <div>
                    <ListCandidate type="search" tab={tab} listResume={dataSearch}></ListCandidate>
                </div>
            </div>
        </div>
    );
}

export default SearchCandidate;
