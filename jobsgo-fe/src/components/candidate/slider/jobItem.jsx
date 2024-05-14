import { LocationOnOutlined, AccessTime, AttachMoney, StarOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import * as format from '~/utils/handleDate';
import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';
function JobItem({ job, className }) {
    const classes = className ? className : '';
    return (
        <Link
            to={`/jobs/${job?.id}`}
            className={`p-2 flex items-center justify-between gap-4 bg-white mx-1 my-2 border rounded-md ${classes}`}
        >
            <div className="w-[100px] h-[100px] overflow-hidden rounded-full object-contain border">
                <img src={job?.recruiter?.image || AvatarRecruiter} alt="avatar" />
            </div>
            <div className="flex-1">
                <p className="text-red-600 font-semibold line-clamp-1">{job?.title}</p>
                <p className="text-sm py-1 line-clamp-1">{job?.recruiter?.name}</p>

                <div className="flex items-center flex-wrap gap-2 pb-2">
                    <div className="border flex items-center p-1">
                        <LocationOnOutlined fontSize="small"></LocationOnOutlined>
                        <span className="text-xs">{job?.city}</span>
                    </div>
                    <div className="border flex items-center p-1">
                        <AccessTime fontSize="small"></AccessTime>
                        <span className="text-xs">{format.formatDate(job?.expiredAt)}</span>
                    </div>
                    <div className="border flex items-center p-1">
                        <AttachMoney fontSize="small"></AttachMoney>
                        <span className="text-xs">
                            {job?.statusSalary ? (
                                <p>Thỏa thuận</p>
                            ) : (
                                <p>
                                    {job?.salaryFrom} - {job?.salaryTo} triệu
                                </p>
                            )}
                        </span>
                    </div>
                    <div className="border flex items-center p-1">
                        <StarOutline fontSize="small"></StarOutline>
                        <span className="text-xs">{job?.natureOfWork}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default JobItem;
