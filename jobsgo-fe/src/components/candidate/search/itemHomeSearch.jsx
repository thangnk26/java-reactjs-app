import {
    LocationOnOutlined,
    CalculateOutlined,
    ComputerOutlined,
    Settings,
    LocalMallOutlined,
} from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
function ItemHomeSearch() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center pt-3 gap-2">
            <Link
                className="flex justify-center items-center bg-white rounded-lg border hover:bg-slate-200 px-2 py-1"
                onClick={(e) => {
                    e.preventDefault();
                    navigate({
                        pathname: '/jobs',
                        search: createSearchParams({
                            keyword: '',
                            address: 'Đà Nẵng',
                        }).toString(),
                    });
                }}
            >
                <LocationOnOutlined color="error" fontSize="small" className="text-[#ccc]"></LocationOnOutlined>
                <span className="text-[#666] text-[15px] w-max">Việc làm tại Đà Nẵng</span>
            </Link>
            <Link
                to={`/jobs/careers/2`}
                className="flex justify-center items-center bg-white rounded-lg border hover:bg-slate-200 px-2 py-1"
            >
                <LocalMallOutlined sx={{ color: pink[500] }} fontSize="small"></LocalMallOutlined>
                <span className="text-[#666] text-[15px] w-max">Kinh doanh</span>
            </Link>
            <Link
                to={`/jobs/careers/5`}
                className="flex justify-center items-center bg-white rounded-lg border hover:bg-slate-200 px-2 py-1"
            >
                <CalculateOutlined sx={{ color: 'yellow' }} fontSize="small"></CalculateOutlined>
                <span className="text-[#666] text-[15px] w-max">Kế toán</span>
            </Link>
            <Link
                to={`/jobs/careers/1`}
                className="flex justify-center items-center bg-white rounded-lg border hover:bg-slate-200 px-2 py-1"
            >
                <ComputerOutlined color="primary" fontSize="small"></ComputerOutlined>
                <span className="text-[#666] text-[15px] w-max">Công nghệ thông tin</span>
            </Link>
            <Link
                to={`/jobs/careers/6`}
                className="flex justify-center items-center bg-white rounded-lg border hover:bg-slate-200 px-2 py-1"
            >
                <Settings color="action" fontSize="small"></Settings>
                <span className="text-[#666] text-[15px] w-max">Kỹ thuật</span>
            </Link>
        </div>
    );
}

export default ItemHomeSearch;
