import MenuCV from './menuCV';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import * as resumeService from '~/service/resumeService';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Template2 from '../template/template2';
import Template1 from '../template/template1';
import { FileDownloadOutlined } from '@mui/icons-material';

function ViewDetailCV() {
    const { id, template } = useParams();
    const [resume, setResume] = useState();
    const CVRef = useRef();

    const handleDownloadPdf = () => {
        html2canvas(CVRef.current, {}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pageWidth = 210;
            const pageHeight = 297;
            // const height = (canvas.height * pageWidth) / canvas.width;

            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            pdf.save(`${resume?.name}-${resume?.positionApply}.pdf`);
        });
    };

    useEffect(() => {
        const getResume = async () => {
            const res = await resumeService.getResumeById(id);
            if (res?.success) {
                setResume(res.data);
            }
        };
        getResume();
    }, [id]);

    const template1 = (resume) => {
        return (
            <Template1
                template={template}
                resume={resume}
                handleDownloadPdf={handleDownloadPdf}
                CVRef={CVRef}
                id={id}
            />
        );
    };
    const template2 = (resume) => {
        return (
            <Template2
                template={template}
                resume={resume}
                handleDownloadPdf={handleDownloadPdf}
                CVRef={CVRef}
                id={id}
            />
        );
    };
    return (
        <div className="my-[100px] text-base">
            <div className="container mx-auto flex gap-4">
                <MenuCV template={template} tab={'viewDetailCV'} id={id} />
                <button
                    className={`outline-none flex items-center px-4 py-1 border border-sky-500 rounded-md uppercase font-semibold hover:bg-sky-700 hover:text-white`}
                    onClick={handleDownloadPdf}
                >
                    <FileDownloadOutlined className="mr-1" />
                    Tải xuống
                </button>
            </div>
            {template === '1' && template1(resume)}
            {template === '2' && template2(resume)}
        </div>
    );
}

export default ViewDetailCV;
