import { Button } from '@mui/material';
import CompanyItem from '../slider/companyItem';
import { useEffect, useState } from 'react';

import * as userService from '~/service/userService';

function ListCompany({ type = 'company' }) {
    const [listCompany, setListCompany] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async () => {
        const res = await userService.searchRecruiter(searchValue);
        if (res?.success) {
            setListCompany(res.data);
        }
    };
    useEffect(() => {
        const getData = async () => {
            if (type === 'featured') {
                const resListCompany = await userService.getAllRecruiterFeatured();
                if (resListCompany?.success) {
                    setListCompany(resListCompany?.data);
                }
            } else {
                const resListCompany = await userService.getAllRecruiter();
                if (resListCompany?.success) {
                    setListCompany(resListCompany?.data);
                }
            }
        };
        getData();
    }, [type]);
    return (
        <div className="mb-8">
            <div
                className="mt-[80px]"
                style={{ backgroundImage: 'url("https://jobsgo.vn/static/assets/img/1600x300-2.jpg")' }}
            >
                <div className="container m-auto py-8">
                    <h1 className="text-3xl text-white font-bold uppercase">
                        Rất nhiều công ty đang chờ bạn ứng tuyển
                    </h1>
                    <p className="text-white text-xl py-2">
                        Các công ty doanh nghiệp đang tuyển dụng, hàng ngàn công việc mỗi ngày
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            className="outline-none p-2 border rounded-md min-w-[500px]"
                            placeholder="Tên công ty, địa điểm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="contained" color="warning" onClick={handleSearch}>
                            Tìm kiếm công ty
                        </Button>
                    </div>
                </div>
            </div>
            <p className="uppercase p-2 font-semibold bg-slate-300 mt-8 container m-auto">
                {type === 'company' ? 'Danh sách công ty' : 'Danh sách công ty nổi bật'}
            </p>

            <div className="mt-8">
                <div className="grid grid-cols-5 gap-4 container m-auto">
                    {listCompany.length > 0 ? (
                        listCompany?.map((company) => (
                            <div key={company.id} className="border hover:shadow-ssm">
                                <CompanyItem company={company}></CompanyItem>
                            </div>
                        ))
                    ) : (
                        <h2 className="text-xl font-semibold">Không có công ty nào</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCompany;
