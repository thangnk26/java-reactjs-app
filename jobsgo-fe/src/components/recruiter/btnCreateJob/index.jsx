import { NoteAddOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function BtnCreateJob() {
    return (
        <div className="flex justify-end items-center">
            <Link
                to={'/recruiter/jobs/create'}
                className="flex items-center justify-center p-2 bg-orange-500 font-bold hover:bg-orange-700 text-white mx-4 my-2 rounded-lg"
            >
                <NoteAddOutlined fontSize="small" className="mr-1" />
                Đăng tin tuyển dụng mới
            </Link>
        </div>
    );
}

export default BtnCreateJob;
