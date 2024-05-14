import {
    CalendarMonthOutlined,
    CancelOutlined,
    // GroupOutlined,
    HowToRegOutlined,
    LockOutlined,
    LockPersonOutlined,
    MailOutline,
    PersonAddAlt1Outlined,
    PersonOffOutlined,
    PersonSearchOutlined,
    RemoveCircleOutline,
    TaskOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Sidebar({ className, tab }) {
    const classActive = 'text-sky-500 font-bold';
    return (
        <div className={className}>
            <div className="text-sm pl-4 min-h-[calc(100vh-50px)]">
                <div className="flex flex-col">
                    <h2 className="uppercase p-2 text-base font-semibold">Quản lí việc làm</h2>
                    <Link
                        to={'/recruiter/managerJobs/open'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'open' ? classActive : ''}`}
                    >
                        <TaskOutlined className="mr-1" /> Việc làm đang tuyển{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerJobs/pause'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'pause' ? classActive : ''}`}
                    >
                        <RemoveCircleOutline className="mr-1" /> Việc làm đã tạm dừng{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerJobs/expired'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'expired' ? classActive : ''}`}
                    >
                        <CalendarMonthOutlined className="mr-1" /> Việc làm đã hết hạn{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerJobs/pending'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'pending' ? classActive : ''}`}
                    >
                        <LockOutlined className="mr-1" /> Việc làm đang chờ duyệt{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerJobs/denied'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'jobDenied' ? classActive : ''}`}
                    >
                        <CancelOutlined className="mr-1" /> Việc làm bị từ chối{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                </div>
                <div className="flex flex-col mt-4">
                    <h2 className="uppercase p-2 text-base font-semibold">Quản lí ứng viên</h2>
                    <Link
                        to={'/recruiter/managerCandidate/apply'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'apply' ? classActive : ''}`}
                    >
                        <PersonAddAlt1Outlined className="mr-1" /> Hồ sơ mới ứng tuyển{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerCandidate/selected'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'selected' ? classActive : ''}`}
                    >
                        <HowToRegOutlined className="mr-1" /> Hồ sơ đã được chọn{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerCandidate/consider'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'consider' ? classActive : ''}`}
                    >
                        <LockPersonOutlined className="mr-1" /> Hồ sơ đang xem xét{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                    <Link
                        to={'/recruiter/managerCandidate/denied'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'denied' ? classActive : ''}`}
                    >
                        <PersonOffOutlined className="mr-1" /> Hồ sơ bị từ chối{' '}
                        {/* <strong className="text-red-500">(0)</strong> */}
                    </Link>
                </div>

                <div className="flex flex-col mt-4">
                    <h2 className="uppercase p-2 text-base font-semibold">Tiện ích</h2>
                    <Link
                        to={'/recruiter/search'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'search' ? classActive : ''}`}
                    >
                        <PersonSearchOutlined className="mr-1" /> Tìm kiếm ứng viên{' '}
                    </Link>
                    <Link
                        to={'/recruiter/email'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'mail' ? classActive : ''}`}
                    >
                        <MailOutline className="mr-1" />
                        Cấu hình email{' '}
                    </Link>
                    {/* <Link
                        to={'/recruiter/fit'}
                        className={`flex items-center p-1 hover:text-sky-500 ${tab === 'fit' ? classActive : ''}`}
                    >
                        <GroupOutlined className="mr-1" /> Xem ứng viên phù hợp{' '}
                    </Link> */}
                    {/* <Link
                        to={'/recruiter/infoCompany'}
                        className={`flex items-center p-1 hover:text-sky-500 ${
                            tab === 'infoCompany' ? classActive : ''
                        }`}
                    >
                        <TopicOutlined className="mr-1" /> Hiệu chỉnh hồ sơ công ty{' '}
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
