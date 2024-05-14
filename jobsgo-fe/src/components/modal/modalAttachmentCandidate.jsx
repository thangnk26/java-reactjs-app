import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import Loading from '../loading';

import * as attachmentsService from '~/service/attachmentsService';

function ModalAttachmentCandidate({ attachmentOld, setShowModalAttachments, setListAttachment }) {
    const [loading, setLoading] = useState(false);
    const [attachment, setAttachment] = useState(attachmentOld);
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
                        const res = await attachmentsService.update(attachment?.id, {
                            ...attachment,
                            url: url || attachment?.url,
                        });
                        if (res?.success) {
                            setListAttachment((prev) => {
                                return prev?.map((attachmentOld) => {
                                    if (attachmentOld.id === attachment.id) {
                                        console.log(attachment);
                                        return attachment;
                                    } else {
                                        return attachmentOld;
                                    }
                                });
                            });
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

export default ModalAttachmentCandidate;
