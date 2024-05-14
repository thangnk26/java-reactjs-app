import CustomSlider from '~/components/candidate/slider';
import Search from '~/components/candidate/search';
import { Button } from '@mui/material';
import ItemHomeSearch from '~/components/candidate/search/itemHomeSearch';
import { FileUploadOutlined, Add } from '@mui/icons-material';
import CandidateLayout from '~/layout/candidateLayout';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppProvider';
import { useContext } from 'react';
function Home() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    return (
        <CandidateLayout>
            <div className="bg-[#f6fafb] h-[210px] relative mb-8">
                <Search className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] w-[60%]"></Search>
                <h1 className="font-bold text-4xl text-center block absolute top-[50%] left-[50%] translate-x-[-50%] w-max">
                    JobsGO- Tìm việc làm mơ ước
                </h1>
            </div>
            <ItemHomeSearch></ItemHomeSearch>

            {/* Upload & Create CV */}
            <div className="flex justify-center">
                <div className="flex justify-center items-center gap-4 p-4 w-[60%]">
                    <div className="flex justify-center items-center gap-2 p-4 border border-[blue] w-[50%] rounded-lg">
                        <div>
                            <strong>Tải lên chứng chỉ</strong>
                            <p className="text-xs text-[#666] py-3">
                                Càng nhiều chứng chỉ trình độ càng cao!!! Tải ngay
                            </p>
                            <Button
                                variant="contained"
                                startIcon={<FileUploadOutlined />}
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault();
                                        if (window.confirm('Bạn cần đăng nhập để tải chứng chỉ')) {
                                            navigate('/login');
                                        }
                                    } else {
                                        navigate('/cv/upload');
                                    }
                                }}
                            >
                                Tải lên chứng chỉ
                            </Button>
                        </div>
                        <div className="w-[50%]">
                            <img src="https://jobsgo.vn/teks/img/jobsgo-ai-robot.svg?v=1.2" alt="Tai len CV" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2 p-4 border border-[blue] w-[50%] rounded-lg">
                        <div>
                            <strong>Tạo CV ấn tượng</strong>
                            <p className="text-xs text-[#666] py-3">
                                Tạo CV xin việc Online chuẩn, đẹp miễn phí với JobsGO
                            </p>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault();
                                        if (window.confirm('Bạn cần đăng nhập để tạo CV')) {
                                            navigate('/login');
                                        }
                                    } else {
                                        navigate('/cv/create');
                                    }
                                }}
                            >
                                Tạo CV ngay
                            </Button>
                        </div>
                        <div className="w-[50%]">
                            <img src="https://jobsgo.vn/teks/img/jobsgo-cv.svg?v=1.2" alt="Tao CV" />
                        </div>
                    </div>
                </div>
            </div>
            <CustomSlider type={'jobs-featured'} title={'Việc làm nổi bật'}></CustomSlider>
            <CustomSlider option={'company'} type={'company-featured'} title={'Công ty nổi bật'}></CustomSlider>
            {user && <CustomSlider type={'jobs-for-you'} title={'Việc dành cho bạn'}></CustomSlider>}
            <CustomSlider type={'jobs-new'} title={'Việc làm mới nhất'}></CustomSlider>
        </CandidateLayout>
    );
}

export default Home;
