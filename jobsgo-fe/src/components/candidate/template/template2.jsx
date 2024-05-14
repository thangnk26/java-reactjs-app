import AvatarMale from '~/assets/images/candidate/avatar-candidate-male.jpg';
import { Link } from 'react-router-dom';
import * as format from '~/utils/handleDate';
import {
    AttachFileOutlined,
    Cake,
    Facebook,
    GitHub,
    LinkedIn,
    LocalPhone,
    LocationOn,
    Mail,
    Twitter,
} from '@mui/icons-material';
import SliderLine from '../slider/line';

function Template2({ resume, handleDownloadPdf, CVRef, id, template }) {
    console.log(resume);
    return (
        <div className="mt-8 flex justify-center items-end">
            <div className="shadow-ssm w-[210mm] min-h-[297mm]">
                <div ref={CVRef} className="bg-white p-4">
                    <div className="grid grid-cols-10 mb-8">
                        <div className="col-span-7 text-sm">
                            <div className="mb-3">
                                <h2 className="font-semibold text-4xl mb-1 text-green-700">{resume?.name}</h2>
                                <h2 className="text-2xl text-green-700">{resume?.positionApply}</h2>
                            </div>
                            <div className="grid grid-cols-2 items-start">
                                <div className="mb-2 flex justify-start items-start gap-2">
                                    <LocalPhone fontSize="small" />
                                    <p className="text-base">{resume?.phone}</p>
                                </div>
                                <div className="mb-2 flex justify-start items-center gap-2">
                                    <Mail fontSize="small" />
                                    <p className="text-base">{resume?.email}</p>
                                </div>
                                {resume?.facebook && (
                                    <div className="mb-2 flex justify-start items-center gap-2">
                                        <Facebook fontSize="small" />
                                        <p className="text-base">{resume?.facebook}</p>
                                    </div>
                                )}
                                {resume?.twitter && (
                                    <div className="mb-2 flex justify-start items-center gap-2">
                                        <Twitter fontSize="small" />
                                        <p className="text-base">{resume?.twitter}</p>
                                    </div>
                                )}
                                {resume?.linkedIn && (
                                    <div className="mb-2 flex justify-start items-center gap-2">
                                        <LinkedIn fontSize="small" />
                                        <p className="text-base">{resume?.linkedIn}</p>
                                    </div>
                                )}
                                {resume?.github && (
                                    <div className="mb-2 flex justify-start items-center gap-2">
                                        <GitHub fontSize="small" />
                                        <p className="text-base">{resume?.github}</p>
                                    </div>
                                )}
                                <div className="mb-2 flex justify-start items-center gap-2">
                                    <Cake fontSize="small" />
                                    <p className="text-base">{format.formatDate(resume?.birthday)}</p>
                                </div>
                                <div className="mb-2 flex justify-start items-start gap-2">
                                    <LocationOn />
                                    <p className="text-base">{resume?.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 items-end">
                            <div className="overflow-hidden rounded-lg w-[200px] h-[200px]">
                                <img
                                    className="w-full h-full object-contain"
                                    src={resume?.image || AvatarMale}
                                    alt="avatar"
                                />
                            </div>
                        </div>
                    </div>

                    {resume?.introduce && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                Giới thiệu bản thân
                            </h2>
                            <div>
                                <p className="text-justify text-lg">{resume?.introduce}</p>
                            </div>
                        </div>
                    )}

                    {resume?.careerGoals && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                Mục tiêu nghề nghiệp
                            </h2>
                            <div>
                                <p className="text-justify text-lg">{resume?.careerGoals}</p>
                            </div>
                        </div>
                    )}

                    {resume?.listResumeProSkill?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">Kỹ năng</h2>
                            <ul>
                                {resume?.listResumeProSkill.map((proSkill) => (
                                    <li key={proSkill.id} className="text-lg list-none">
                                        - {proSkill?.proSkillName} ({proSkill?.yearExperience} năm)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {resume?.listResumeEducation?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">Học vấn</h2>
                            {resume?.listResumeEducation?.map((education) => (
                                <div key={education.id} className="mb-1 text-lg grid grid-cols-3 gap-4">
                                    <p className="col-span-1 font-semibold">
                                        {education?.statusEducation
                                            ? `Tốt nghiệp năm ${education?.graduationYear}`
                                            : 'Đang học tại đây'}
                                    </p>
                                    <div className="col-span-2">
                                        <p className="font-bold">{education?.nameSchool}</p>
                                        <p>Bằng cấp: {education?.degree}</p>
                                        <p>Chuyên ngành: {education?.majors}</p>
                                        <p>{education?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {resume?.listWorkExperience?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="text-xl uppercase font-bold mb-1 text-green-700">Kinh nghiệm làm việc</h2>

                            {resume?.listWorkExperience?.map((workExp) => (
                                <div key={workExp.id} className="mb-1 text-lg grid grid-cols-3 gap-4">
                                    <p className="col-span-1 font-semibold">
                                        {format.formatDate(workExp?.startDay)}
                                        {' đến '}
                                        {workExp?.statusWork ? 'nay' : format.formatDate(workExp?.endDay)}
                                    </p>
                                    <div className="col-span-2">
                                        <p className="font-bold">{workExp?.nameCompany}</p>
                                        <p>Vị trí: {workExp?.position}</p>
                                        <p>{workExp?.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {resume?.listResumeProSkill?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">Kỹ năng</h2>
                            <ul>
                                {resume?.listResumeProSkill.map((proSkill) => (
                                    <li key={proSkill.id} className="text-lg list-none">
                                        - {proSkill?.proSkillName} ({proSkill?.yearExperience} năm)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {resume?.listResumeLanguage?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                Ngôn ngữ
                            </h2>
                            {resume?.listResumeLanguage?.map((language) => (
                                <div key={language.id}>
                                    <p className="text-lg">{language?.languageName}</p>
                                    <div className="flex justify-center items-center">
                                        <SliderLine color="green" value={language?.prowess || 0} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {resume?.listResumeSoftSkill?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                Kỹ năng mềm
                            </h2>
                            {resume?.listResumeSoftSkill?.map((softSkill) => (
                                <div key={softSkill.id}>
                                    <p className="text-lg">{softSkill?.softSkillName}</p>
                                    <div className="flex justify-center items-center">
                                        <SliderLine color="green" value={softSkill?.prowess || 0} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {resume?.listResumeHobby?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                Sở thích
                            </h2>
                            <ul className="mb-2">
                                {resume?.listResumeHobby?.map((hobby) => (
                                    <li key={hobby.id} className="text-lg list-none">
                                        - {hobby?.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {resume?.listAttachments?.length > 0 && (
                        <div className="mb-4">
                            <h2 className="border-b-2 pb-1 text-xl uppercase font-bold mb-1 text-green-700">
                                File đính kèm
                            </h2>

                            {resume?.listAttachments?.map((attachment) => (
                                <Link
                                    to={attachment?.url}
                                    key={attachment.id}
                                    className="mb-1 text-lg flex justify-start items-center"
                                >
                                    <AttachFileOutlined />
                                    <p>{attachment?.name}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Template2;
