import MenuCV from './menuCV';
import { UploadFileOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { v4 } from 'uuid';
import { storage } from '~/firebase';
import Loading from '~/components/loading';

import * as attachmentsService from '~/service/attachmentsService';

function UploadAttachments() {
    const [isLoading, setIsLoading] = useState(false);
    const [attachment, setAttachment] = useState({
        name: '',
        url: '',
        file: null,
    });
    return (
        <div className="container mx-auto mt-[100px]">
            {isLoading && <Loading />}
            <MenuCV tab={'upload'}></MenuCV>
            <div className="border p-4 mt-8 bg-white rounded-lg w-full flex justify-center items-center">
                <div className="px-4 py-6 w-[50%]">
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

                        <button
                            className="flex justify-center items-center px-4 py-2 bg-sky-600 text-white my-4 rounded-lg"
                            onClick={async () => {
                                const candidate = JSON.parse(localStorage.getItem('user'));
                                setIsLoading(true);
                                let url = null;
                                if (attachment?.file) {
                                    const imageRef = ref(storage, `files/${attachment?.file.name + v4()}`);
                                    const snapshot = await uploadBytes(imageRef, attachment?.file);
                                    url = await getDownloadURL(snapshot.ref);
                                    const res = await attachmentsService.create(candidate?.userId, {
                                        ...attachment,
                                        url: url,
                                    });
                                    if (res?.success) {
                                        alert('Tải chứng chỉ thành công');
                                    }
                                }
                                setIsLoading(false);
                            }}
                        >
                            <UploadFileOutlined />
                            Tải chứng chỉ lên
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadAttachments;
