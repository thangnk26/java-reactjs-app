import { useNavigate, useParams } from 'react-router-dom';
import Template1 from '~/assets/images/candidate/template-1-cv.png';
import Template2 from '~/assets/images/candidate/template2.png';
import * as resumeService from '~/service/resumeService';
function ModalTemplate({ setIsShowTemplate, template }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChangeTemplate = async (id, template) => {
        await resumeService.changeTemplate(id, template);
        navigate(`/cv/view/${id}/template/${template}`);
    };
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10"
            onClick={() => setIsShowTemplate(false)}
        >
            <div className="bg-white min-w-[50%] rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl p-2 font-bold text-sky-700">Chọn mẫu CV</h2>
                <div className="flex justify-center gap-4 p-8">
                    <div
                        className={`border-2 hover:border-green-700 ${template === '1' ? 'border-green-700' : ''}`}
                        onClick={() => handleChangeTemplate(id, 1)}
                    >
                        <div className="w-[200px] h-auto cursor-pointer border-2">
                            <img src={Template1} alt="template1" className="w-full h-full object-contain" />
                        </div>
                    </div>
                    <div
                        className={`border-2 hover:border-green-700 ${template === '2' ? 'border-green-700' : ''}`}
                        onClick={() => handleChangeTemplate(id, 2)}
                    >
                        <div className="w-[200px] h-auto cursor-pointer border-2">
                            <img src={Template2} alt="template1" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTemplate;
