import { SearchOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Search({ className }) {
    const [searchParams] = useSearchParams();
    const classes = className ? className : '';
    const navigate = useNavigate();
    const [search, setSearch] = useState({
        keyword: searchParams.get('keyword') || '',
        address: searchParams.get('address') || '',
    });
    const handleSearch = () => {
        navigate({
            pathname: '/jobs',
            search: createSearchParams({
                keyword: search.keyword,
                address: search.address,
            }).toString(),
        });
    };

    useEffect(() => {
        setSearch({
            keyword: searchParams.get('keyword') || '',
            address: searchParams.get('address') || '',
        });
    }, [searchParams]);
    return (
        <div className={classes}>
            <div className="bg-white shadow-ssm rounded-full flex justify-center items-center">
                <input
                    className="p-1 pl-4 outline-0 w-[50%] rounded-full"
                    type="text"
                    placeholder="Tên việc làm, công ty"
                    value={search.keyword}
                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                ></input>
                <div className="border h-[40px]"></div>
                <div className="w-[50%] flex">
                    <input
                        className="p-1 pl-4 outline-0 flex-[1]"
                        type="text"
                        placeholder="Địa điểm"
                        value={search.address}
                        onChange={(e) => setSearch({ ...search, address: e.target.value })}
                    ></input>
                    <button
                        className="font-bold px-4 py-2 bg-[#1167ad] text-white uppercase rounded-full m-1"
                        onClick={handleSearch}
                    >
                        <SearchOutlined />
                        Tìm việc
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
