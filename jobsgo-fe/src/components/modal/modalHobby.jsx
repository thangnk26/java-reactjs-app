import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
function ModalHobby({ setShowModalHobby, setResume, resume, keyModal }) {
    const [hobby, setHobby] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            return resume.listResumeHobby.find((hobby) => hobby.keyHobby === keyModal);
        }
        return null;
    });
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalHobby(false)}
        >
            <div className="p-4 mt-8 bg-white rounded-lg min-w-[50%]" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">Sở thích</h2>
                <div className="border px-4 py-6">
                    <div>
                        <p className="text-sky-600 mb-2">
                            Sở thích <span className="text-red-600">*</span>
                        </p>
                        <textarea
                            className="outline-none border p-2 min-h-[100px] w-full"
                            value={hobby?.name || ''}
                            onChange={(e) => setHobby({ ...hobby, name: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={() => {
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeHobby: resumePrev.listResumeHobby.map((hobbyOld) => {
                                    if (hobbyOld.keyHobby === keyModal) {
                                        return {
                                            keyHobby: keyModal,
                                            name: hobby.name,
                                            id: hobby?.id,
                                        };
                                    } else {
                                        return hobbyOld;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listResumeHobby: [
                                    ...resumePrev.listResumeHobby,
                                    {
                                        keyHobby: resumePrev.listResumeHobby.length,
                                        name: hobby.name,
                                    },
                                ],
                            }));
                        }
                        setShowModalHobby(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalHobby;
