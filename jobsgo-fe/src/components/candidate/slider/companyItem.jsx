import { LocationOnOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AvatarRecruiter from '~/assets/images/recruiter/avatar-recruiter.png';

function CompanyItem({ company }) {
    return (
        <Link to={`/company/${company?.id}`} className="bg-white">
            <div className="py-2 p-1 flex flex-col justify-center items-center rounded-xl">
                <div className="w-[80px] h-[80px]">
                    <img src={company?.image || AvatarRecruiter} alt="avatar"></img>
                </div>
                <p className="p-1 font-semibold text-center line-clamp-2">{company?.name}</p>
                {company?.city && (
                    <div className="flex justify-end items-center">
                        <LocationOnOutlined fontSize="small"></LocationOnOutlined>
                        <p className="text-sm line-clamp-1">{company.city || 'Không xác định'}</p>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default CompanyItem;
