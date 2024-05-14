import { AutoAwesomeMotionOutlined, Create, FileUpload, Update, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalTemplate from '~/components/modal/modalTemplate';

function MenuCV({ tab, id, template }) {
    const classActive = 'bg-sky-700 text-white';
    const [isShowTemplate, setIsShowTemplate] = useState(false);
    const handleShowTemplate = () => {
        setIsShowTemplate(true);
    };
    return (
        <div className="flex gap-4">
            {isShowTemplate && <ModalTemplate template={template} setIsShowTemplate={setIsShowTemplate} />}
            <Link
                to={'/cv/create'}
                className={`flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white ${
                    tab === 'create' ? classActive : ''
                }`}
            >
                <Create className="mr-1" fontSize="small" />
                Tạo CV
            </Link>
            <Link
                to={'/cv/upload'}
                className={`flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white ${
                    tab === 'upload' ? classActive : ''
                }`}
            >
                <FileUpload className="mr-1" fontSize="small" />
                Tải lên chứng chỉ
            </Link>
            <Link
                to={'/cv/view'}
                className={`flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white ${
                    tab === 'viewCV' ? classActive : ''
                }`}
            >
                <Visibility className="mr-1" fontSize="small" />
                Xem CV
            </Link>
            {tab === 'viewDetailCV' && (
                <Link
                    to={`/cv/update/${id}`}
                    className={`flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white`}
                >
                    <Update className="mr-1" fontSize="small" />
                    Chỉnh sửa CV
                </Link>
            )}
            {tab === 'viewDetailCV' && (
                <button
                    className={`outline-none flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white`}
                    onClick={handleShowTemplate}
                >
                    <AutoAwesomeMotionOutlined className="mr-1" fontSize="small" />
                    Mẫu CV
                </button>
            )}

            {/* <Link
                to={'cv/template'}
                className={`flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white ${
                    tab === 'templateCV' ? classActive : ''
                }`}
            >
                <List className="mr-1" fontSize="small" />
                Chọn mẫu CV
            </Link> */}
        </div>
    );
}

export default MenuCV;
