import SaveIcon from '@mui/icons-material/Save';
import { Autocomplete, Slider, TextField, createFilterOptions } from '@mui/material';
import { useEffect, useState } from 'react';
import * as languageService from '~/service/languageService';

const filter = createFilterOptions();

function ModalLanguage({ setShowModalLanguage, setResume, resume, keyModal }) {
    const [listLanguage, setListLanguage] = useState([]);
    const [value, setValue] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            const language = resume.listResumeLanguage.find((language) => language.keyLanguage === keyModal);
            return {
                title: language.languageName,
                id: language.languageId,
            };
        }
        return null;
    });

    const [prowess, setProwess] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            return Number.parseInt(
                resume.listResumeLanguage.find((language) => language.keyLanguage === keyModal)?.prowess,
            );
        }
        return null;
    });

    useEffect(() => {
        const getAllLanguage = async () => {
            const res = await languageService.getAllLanguage();
            if (res?.success) {
                setListLanguage(res?.data);
            }
        };
        getAllLanguage();
    }, []);
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalLanguage(false)}
        >
            <div className="p-4 mt-8 bg-white rounded-lg min-w-[30%]" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">Ngôn ngữ thành thạo</h2>
                <div className="border px-4 py-6 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sky-600 mb-2">
                            Ngôn ngữ thành thạo <span className="text-red-600">*</span>
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
                            options={listLanguage.map((language) => ({
                                title: language.name,
                                id: language.id,
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
                        <p className="text-sky-600">
                            Độ thành thạo ngôn ngữ <span className="text-red-600">*</span>
                        </p>
                        <p className="text-gray-500">(Độ thành thạo từ 0% đến 100%)</p>
                        <Slider
                            onChange={(e, value) => setProwess(value)}
                            value={prowess ? prowess : 0}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                            step={10}
                        />
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={() => {
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeLanguage: resumePrev.listResumeLanguage.map((languageOld) => {
                                    if (languageOld.keyLanguage === keyModal) {
                                        return {
                                            keyLanguage: keyModal,
                                            id: languageOld?.id,
                                            prowess: prowess,
                                            languageName: value?.title || value,
                                            languageId: value?.id,
                                        };
                                    } else {
                                        return languageOld;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeLanguage: [
                                    ...resumePrev.listResumeLanguage,
                                    {
                                        keyLanguage: resumePrev.listResumeLanguage.length,
                                        prowess: prowess,
                                        languageName: value?.title || value,
                                        languageId: value?.id,
                                    },
                                ],
                            }));
                        }
                        setShowModalLanguage(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalLanguage;
