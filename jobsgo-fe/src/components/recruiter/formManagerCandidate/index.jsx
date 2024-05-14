import { People, Search } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import ListCandidate from '../listCandidate';
import BtnCreateJob from '../btnCreateJob';
import { useEffect, useState } from 'react';

import * as applyService from '~/service/applyService';
import * as jobService from '~/service/jobService';
import * as proSkillService from '~/service/proSkillService';
import * as languageService from '~/service/languageService';

import { degrees, typePositions } from '~/data/constants';

function FormManagerCandidate({ className, title, tab }) {
    console.log(tab);
    const [listProSkill, setListProSkill] = useState([]);
    const [listLanguage, setListLanguage] = useState([]);

    const [listResume, setListResume] = useState([]);
    const [listResumeFilter, setListResumeFilter] = useState([]);
    const [searchValue, setSearchValue] = useState({
        position: '',
        proSkill: '',
        language: '',
        degree: '',
    });

    const handleOnChange = (value, name) => {
        setSearchValue((state) => ({ ...state, [name]: value }));
    };

    const handleFilter = () => {
        setListResumeFilter(
            listResume.filter(
                (resume) =>
                    resume.typePosition.includes(searchValue.position) &&
                    resume.listResumeProSkill.find((proSkill) =>
                        proSkill.proSkillName.includes(searchValue.proSkill),
                    ) &&
                    resume.listResumeLanguage.find((language) =>
                        language.languageName.includes(searchValue.language),
                    ) &&
                    resume.listResumeEducation.find((education) => education.degree.includes(searchValue.degree)),
            ),
        );
    };

    const [listJob, setListJob] = useState([]);

    const getAllResumeApplyByJobId = async (id) => {
        if (id) {
            setListResume(listResume.filter((resume) => resume.jobId === id));
            setListResumeFilter(listResume.filter((resume) => resume.jobId === id));
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            switch (tab) {
                case 'apply':
                    const resApply = await applyService.getAllResumeApply(user.userId);
                    if (resApply?.success) {
                        setListResume(resApply.data);
                        setListResumeFilter(resApply.data);
                    }
                    break;
                case 'selected':
                    const resSelected = await applyService.getAllResumeApprove(user.userId);
                    if (resSelected?.success) {
                        setListResume(resSelected.data);
                        setListResumeFilter(resSelected.data);
                    }
                    break;
                case 'consider':
                    const resConsider = await applyService.getAllResumeConsider(user.userId);
                    if (resConsider?.success) {
                        setListResume(resConsider.data);
                        setListResumeFilter(resConsider.data);
                    }
                    break;
                case 'denied':
                    const resDenied = await applyService.getAllResumeDenied(user.userId);
                    if (resDenied?.success) {
                        setListResume(resDenied.data);
                        setListResumeFilter(resDenied.data);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const resListJob = await jobService.viewJobByRecruiterId(user.userId);
                if (resListJob?.success) {
                    setListJob(resListJob.data);
                }

                const resProSkill = await proSkillService.getAllProSkill();
                if (resProSkill?.success) {
                    setListProSkill(resProSkill.data);
                }
                const resLanguage = await languageService.getAllLanguage();
                if (resLanguage?.success) {
                    setListLanguage(resLanguage.data);
                }
                switch (tab) {
                    case 'apply':
                        const resApply = await applyService.getAllResumeApply(user.userId);
                        if (resApply?.success) {
                            setListResume(resApply.data);
                            setListResumeFilter(resApply.data);
                        }
                        break;
                    case 'selected':
                        const resSelected = await applyService.getAllResumeApprove(user.userId);
                        if (resSelected?.success) {
                            setListResume(resSelected.data);
                            setListResumeFilter(resSelected.data);
                        }
                        break;
                    case 'consider':
                        const resConsider = await applyService.getAllResumeConsider(user.userId);
                        if (resConsider?.success) {
                            setListResume(resConsider.data);
                            setListResumeFilter(resConsider.data);
                        }
                        break;
                    case 'denied':
                        const resDenied = await applyService.getAllResumeDenied(user.userId);
                        if (resDenied?.success) {
                            setListResume(resDenied.data);
                            setListResumeFilter(resDenied.data);
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        getData();
    }, [tab]);
    return (
        <div className={className}>
            <BtnCreateJob />
            <div className="p-4 border-t">
                <h2 className="text-base uppercase font-semibold mb-4">Bộ lọc ứng viên</h2>

                <div className="mb-4">
                    <p className="font-semibold mb-1">Việc làm đang tuyển</p>
                    <Autocomplete
                        className="bg-white rounded-md w-full"
                        disablePortal
                        options={listJob.map((job) => {
                            return {
                                label: job.title,
                                value: job,
                            };
                        })}
                        size="small"
                        renderInput={(params) => <TextField {...params} placeholder="Chọn việc làm" />}
                        onChange={(e, value) => {
                            getAllResumeApplyByJobId(value?.value?.id);
                        }}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="font-semibold mb-1">Vị trí ứng tuyển</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={typePositions}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn vị trí ứng tuyển" />}
                            onChange={(e, value) => handleOnChange(value || '', 'position')}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Kỹ năng chuyên môn</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={listProSkill.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn kỹ năng chuyên môn" />}
                            onChange={(e, value) => handleOnChange(value?.label || '', 'proSkill')}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Ngôn ngữ</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={listLanguage.map((item) => ({
                                label: item.name,
                                value: item.id,
                            }))}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn ngôn ngữ" />}
                            onChange={(e, value) => handleOnChange(value?.label || '', 'language')}
                        />
                    </div>
                    <div>
                        <p className="font-semibold mb-1">Bằng cấp</p>
                        <Autocomplete
                            className="bg-white rounded-md w-full"
                            disablePortal
                            options={degrees}
                            size="small"
                            renderInput={(params) => <TextField {...params} placeholder="Chọn bằng cấp" />}
                            onChange={(e, value) => handleOnChange(value || '', 'degree')}
                        />
                    </div>
                </div>

                <div>
                    <button
                        className=" my-4 flex justify-center items-center px-2 py-1 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-800"
                        onClick={handleFilter}
                    >
                        <Search className="mr-1" /> Lọc ứng viên
                    </button>
                </div>

                <div className="flex items-center border-y py-2 pl-4 font-semibold bg-black/5">
                    <People className="mr-1" /> {title}
                </div>

                {listResumeFilter.length > 0 ? (
                    <div>
                        <ListCandidate
                            listResume={listResumeFilter}
                            setListResume={setListResumeFilter}
                            tab={tab}
                        ></ListCandidate>
                    </div>
                ) : (
                    <h2 className="text-xl py-4">Không có ứng viên</h2>
                )}
            </div>
        </div>
    );
}

export default FormManagerCandidate;
