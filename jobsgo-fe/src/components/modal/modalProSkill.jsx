import SaveIcon from '@mui/icons-material/Save';
import { TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import * as proSkillService from '~/service/proSkillService';

const filter = createFilterOptions();

function ModalProSkill({ setShowModalProSkill, setResume, resume, keyModal }) {
    const [listProSkill, setListProSkills] = useState([]);
    const [value, setValue] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            const proSkill = resume.listResumeProSkill.find((proSkill) => proSkill.keyProSkill === keyModal);
            return {
                title: proSkill.proSkillName,
                id: proSkill.proSkillId,
            };
        }
        return null;
    });
    const [year, setYear] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            return Number.parseFloat(
                resume.listResumeProSkill.find((proSkill) => proSkill.keyProSkill === keyModal)?.yearExperience,
            );
        }
        return '';
    });

    useEffect(() => {
        const getAllProSkill = async () => {
            const res = await proSkillService.getAllProSkill();
            if (res?.success) {
                setListProSkills(res?.data);
            }
        };
        getAllProSkill();
    }, []);
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalProSkill(false)}
        >
            <div className="p-4 mt-8 bg-white rounded-lg min-w[40%]" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">Kỹ năng chuyên môn</h2>
                <div className="border px-4 py-6 grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <p className="text-sky-600 mb-2">
                            Kỹ năng chuyên môn <span className="text-red-600">*</span>
                        </p>
                        <Autocomplete
                            size="small"
                            value={value}
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    setValue({
                                        title: newValue,
                                    });
                                } else if (newValue && newValue.inputValue) {
                                    // Create a new value from the user input
                                    setValue({
                                        title: newValue.inputValue,
                                    });
                                } else {
                                    setValue(newValue);
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                const { inputValue } = params;
                                // Suggest the creation of a new value
                                const isExisting = options.some((option) => inputValue === option.title);
                                if (inputValue !== '' && !isExisting) {
                                    filtered.push({
                                        inputValue,
                                        title: `Add "${inputValue}"`,
                                    });
                                }

                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={listProSkill.map((proSkill) => ({
                                title: proSkill.name,
                                id: proSkill.id,
                            }))}
                            getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                // Add "xxx" option created dynamically
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                // Regular option
                                return option.title;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                            freeSolo
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div className="col-span-1">
                        <p className="text-sky-600 mb-2">
                            Số năm kinh nghiệm <span className="text-red-600">*</span>
                        </p>
                        <input
                            value={year}
                            type="number"
                            placeholder="Số năm kinh nghiệm"
                            className="outline-none border rounded-md p-2"
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={() => {
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeProSkill: resumePrev.listResumeProSkill.map((proSkill) => {
                                    if (proSkill.keyProSkill === keyModal) {
                                        return {
                                            keyProSkill: keyModal,
                                            id: proSkill?.id,
                                            yearExperience: year,
                                            proSkillName: value?.title || value,
                                            proSkillId: value?.id,
                                        };
                                    } else {
                                        return proSkill;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeProSkill: [
                                    ...resumePrev.listResumeProSkill,
                                    {
                                        keyProSkill: resumePrev.listResumeProSkill.length,
                                        yearExperience: year,
                                        proSkillName: value?.title || value,
                                        proSkillId: value?.id,
                                    },
                                ],
                            }));
                        }
                        setShowModalProSkill(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalProSkill;
