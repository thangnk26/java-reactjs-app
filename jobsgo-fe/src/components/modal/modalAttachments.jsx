import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import Loading from '../loading';
function ModalAttachments({ setShowModalAttachments, setResume, resume, keyModal }) {
    const [loading, setLoading] = useState(false);
    const [attachment, setAttachment] = useState(() => {
        if (keyModal !== null && keyModal !== undefined) {
            return {
                ...resume.listAttachments.find((attachment) => attachment.keyAttachment === keyModal),
                file: null,
            };
        }
        return {
            file: null,
        };
    });
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalAttachments(false)}
        >
            {loading && <Loading />}
            <div className="p-4 mt-8 bg-white rounded-lg min-w-[50%]" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold uppercase my-4">File đính kèm</h2>
                <div className="border px-4 py-6">
                    <div>
                        <p className="text-sky-600 mb-2">
                            Tên file <span className="text-red-600">*</span>
                        </p>
                        <input
                            className="outline-none border p-2 w-full mb-4"
                            value={attachment?.name || ''}
                            onChange={(e) => setAttachment({ ...attachment, name: e.target.value })}
                        ></input>
                        <p className="text-sky-600 mb-2">
                            File <span className="text-red-600">*</span>
                        </p>
                        <input
                            className="outline-none border p-2 w-full"
                            type="file"
                            onChange={(e) => setAttachment({ ...attachment, file: e.target.files[0] })}
                        ></input>
                    </div>
                </div>

                <button
                    className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                    onClick={async () => {
                        setLoading(true);
                        let url = null;
                        if (attachment?.file) {
                            const imageRef = ref(storage, `files/${attachment?.file.name + v4()}`);
                            const snapshot = await uploadBytes(imageRef, attachment?.file);
                            url = await getDownloadURL(snapshot.ref);
                        }
                        if (keyModal !== null && keyModal !== undefined) {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listAttachments: resumePrev.listAttachments.map((attachmentOld) => {
                                    if (attachmentOld.keyAttachment === keyModal) {
                                        return {
                                            keyAttachment: keyModal,
                                            name: attachment?.name,
                                            url: url || attachment?.url || null,
                                            id: attachment?.id,
                                        };
                                    } else {
                                        return attachmentOld;
                                    }
                                }),
                            }));
                        } else {
                            setResume((resumePrev) => ({
                                ...resumePrev,
                                listAttachments: [
                                    ...resumePrev.listAttachments,
                                    {
                                        keyAttachment: resumePrev.listAttachments.length,
                                        name: attachment.name,
                                        url: url || attachment?.url || null,
                                    },
                                ],
                            }));
                        }
                        setLoading(false);
                        setShowModalAttachments(false);
                    }}
                >
                    <SaveIcon />
                    Lưu lại
                </button>
            </div>
        </div>
    );
}

export default ModalAttachments;
