import { AttachFileOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalAttachmentCandidate from '~/components/modal/modalAttachmentCandidate';
import * as attachmentsService from '~/service/attachmentsService';

function ListAttachments() {
    const [listAttachment, setListAttachment] = useState([]);
    const [showModalAttachments, setShowModalAttachments] = useState(false);
    const [attachmentCurrent, setAttachmentCurrent] = useState();

    const handleDeleteById = async (attachment) => {
        if (window.confirm(`Bạn có chắc muốn xóa tệp ${attachment.name} không?`)) {
            attachmentsService.deleteById(attachment.id);
            setListAttachment((prev) => {
                return prev.filter((attachmentOld) => attachmentOld.id !== attachment.id);
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            const candidate = JSON.parse(localStorage.getItem('user'));
            const res = await attachmentsService.getAttachmentsByCandidateId(candidate.userId);
            if (res?.success) {
                setListAttachment(res.data);
            }
        };
        getData();
    }, []);

    return (
        <div className="my-[100px] border max-w-[70%] min-h-[50vh] m-auto">
            <h2 className="text-xl text-sky-700 p-2 font-bold">Danh sách chứng chỉ</h2>
            {showModalAttachments && (
                <ModalAttachmentCandidate
                    setListAttachment={setListAttachment}
                    attachmentOld={attachmentCurrent}
                    setShowModalAttachments={setShowModalAttachments}
                />
            )}
            {listAttachment?.map((attachment, index) => (
                <div key={index} className="relative mt-2">
                    <Link to={attachment?.url} className="border-b mx-2 py-2 flex justify-start items-center gap-4">
                        <AttachFileOutlined />
                        {attachment.name}
                    </Link>
                    <div className="absolute gap-2 bg-white top-0 right-0 flex pr-2">
                        <Button
                            className="p-2"
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() => {
                                setAttachmentCurrent(attachment);
                                setShowModalAttachments(true);
                            }}
                        >
                            Chỉnh sửa
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteById(attachment)}
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListAttachments;
