import Template1 from '../candidate/template/template1';
import Template2 from '../candidate/template/template2';
function ModalCVDetail({ resume, setShowModalDetailCV }) {
    console.log(resume);
    return (
        <div
            className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
            onClick={() => setShowModalDetailCV(false)}
        >
            <div className="bg-white -[80%] h-[calc(100vh-16px)] max-h-[1000px] mx-auto shadow-ssm max-w-[1200px] min-w-[900px] overflow-y-auto">
                {resume?.template === 1 ? (
                    <Template1 resume={resume}></Template1>
                ) : (
                    <Template2 resume={resume}></Template2>
                )}
            </div>
        </div>
        // <div
        //     className="bg-black/40 fixed top-0 right-0 left-0 bottom-0 flex justify-center items-start z-10"
        //     onClick={() => setShowModalDetailCV(false)}
        // >
        //     <div className="mt-4" onClick={(e) => e.stopPropagation()}>
        //         <div className="text-lg">
        //             <div className="bg-white w-[80%] h-[calc(100vh-16px)] max-h-[1000px] mx-auto shadow-ssm max-w-[1200px] min-w-[900px] overflow-y-auto">
        //                 <div
        //                     className="bg-cover bg-center bg-no-repeat"
        //                     style={{ backgroundImage: `url("${BackGroundTemplate1}")` }}
        //                 >
        //                     <div className="flex justify-start items-center">
        //                         <div className="p-16">
        //                             <div className="border-4 border-[#000] overflow-hidden rounded-lg w-[200px] h-[200px]">
        //                                 <img src={resume?.image || AvatarMale} alt="avatar" />
        //                             </div>
        //                         </div>
        //                         <div>
        //                             <h2 className="text-5xl mb-2">{resume?.name}</h2>
        //                             <h2 className="text-3xl">{resume?.positionApply}</h2>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className="grid grid-cols-10 gap-12 mt-8">
        //                     <div className="col-span-4 flex justify-end">
        //                         <div>
        //                             <div className="mb-12">
        //                                 <h2 className="text-3xl uppercase font-bold mb-4">Thông tin liên hệ</h2>
        //                                 <div className="mb-4">
        //                                     <p className="font-semibold mb-2 text-xl">Số điện thoại</p>
        //                                     <p>{resume?.phone}</p>
        //                                 </div>
        //                                 <div className="mb-4">
        //                                     <p className="font-semibold mb-2 text-xl">Email</p>
        //                                     <p>{resume?.email}</p>
        //                                 </div>
        //                                 <div className="mb-4">
        //                                     <p className="font-semibold mb-2 text-xl">Ngày sinh</p>
        //                                     <p>{handleDate.formatDate(resume?.birthday)}</p>
        //                                 </div>
        //                                 <div className="mb-4">
        //                                     <p className="font-semibold mb-2 text-xl">Địa chỉ</p>
        //                                     <p>{resume?.address}</p>
        //                                 </div>
        //                             </div>
        //                             <div className="mb-12">
        //                                 <h2 className="text-3xl uppercase font-bold mb-2">Kỹ năng</h2>
        //                                 <ul className="ml-4 mb-4">
        //                                     {resume?.listResumeProSkill.map((proSkill) => (
        //                                         <li key={proSkill.id} className="text-lg list-disc">
        //                                             {proSkill?.proSkillName} ({proSkill?.yearExperience} năm)
        //                                         </li>
        //                                     ))}
        //                                 </ul>
        //                             </div>
        //                             <div className="mb-12">
        //                                 <h2 className="text-3xl uppercase font-bold mb-4">Sở thích</h2>
        //                                 <ul className="ml-4 mb-8">
        //                                     {resume?.listResumeHobby?.map((hobby) => (
        //                                         <li key={hobby.id} className="text-lg list-disc">
        //                                             {hobby?.name}
        //                                         </li>
        //                                     ))}
        //                                 </ul>
        //                             </div>
        //                             <div className="mb-12">
        //                                 <h2 className="text-3xl uppercase font-bold mb-4">Kỹ năng mềm</h2>
        //                                 {resume?.listResumeSoftSkill?.map((softSkill) => (
        //                                     <div key={softSkill.id}>
        //                                         <p className="text-lg">{softSkill?.softSkillName}</p>
        //                                         <div className="flex justify-center items-center">
        //                                             <Slider
        //                                                 size="medium"
        //                                                 disabled
        //                                                 value={softSkill?.prowess}
        //                                                 aria-label="Disabled slider"
        //                                             />
        //                                             <span className="ml-2">({softSkill?.prowess}%)</span>
        //                                         </div>
        //                                     </div>
        //                                 ))}
        //                             </div>
        //                         </div>
        //                     </div>

        //                     <div className="col-span-6 pr-8">
        //                         <div className="mb-12">
        //                             <h2 className="text-3xl uppercase font-bold mb-4">Giới thiệu bản thân</h2>
        //                             <div className="mb-4">
        //                                 <p className="text-justify">{resume?.introduce}</p>
        //                             </div>
        //                         </div>
        //                         <div className="mb-12">
        //                             <h2 className="text-3xl uppercase font-bold mb-4">Mục tiêu nghề nghiệp</h2>
        //                             <div className="mb-4">
        //                                 <p className="text-justify">{resume?.careerGoals}</p>
        //                             </div>
        //                         </div>
        //                         <div className="mb-12">
        //                             <h2 className="text-3xl uppercase font-bold mb-4">Học vấn</h2>
        //                             {resume?.listResumeEducation?.map((education) => (
        //                                 <div key={education.id} className="mb-4">
        //                                     <p className="font-bold">{education?.nameSchool}</p>
        //                                     <p>Bằng cấp: {education?.degree}</p>
        //                                     <p>Chuyên ngành: {education?.majors}</p>
        //                                     <p>
        //                                         {education?.statusEducation
        //                                             ? `Tốt nghiệp năm ${education?.graduationYear}`
        //                                             : 'Đang học tại đây'}
        //                                     </p>
        //                                     <p>{education?.description}</p>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                         <div className="mb-12">
        //                             <h2 className="text-3xl uppercase font-bold mb-4">Kinh nghiệm làm việc</h2>

        //                             {resume?.listWorkExperience?.map((workExp) => (
        //                                 <div key={workExp.id} className="mb-4">
        //                                     <p className="font-bold">{workExp?.nameCompany}</p>
        //                                     <p>
        //                                         Thời gian: {handleDate.formatDate(workExp?.startDay)} đến{' '}
        //                                         {workExp?.statusWork ? 'nay' : handleDate.formatDate(workExp?.endDay)}
        //                                     </p>
        //                                     <p>Vị trí: {workExp?.position}</p>
        //                                     <p>{workExp?.description}</p>
        //                                 </div>
        //                             ))}
        //                         </div>
        //                         {/* <div className="mb-12">
        //                         <h2 className="text-3xl uppercase font-bold mb-4">Hoạt động</h2>
        //                         <div className="mb-4">
        //                             <p className="font-bold">Ngày hội tuyển dụng IT (9/4/2023 - 9/4/2023)</p>
        //                             <p>Diễn giả/ cố vấn kĩ thuật</p>
        //                             <p>Trả lời câu hỏi về vị trí cũng như tổ chức người tham dự quan tâm</p>
        //                         </div>
        //                     </div>
        //                     <div className="mb-12">
        //                         <h2 className="text-3xl uppercase font-bold mb-4">Giải thưởng</h2>
        //                         <div className="mb-4">
        //                             <p className="font-bold">Nhân viên xuất sắc FPT năm 2023</p>
        //                         </div>
        //                     </div>
        //                     <div className="mb-12">
        //                         <h2 className="text-3xl uppercase font-bold mb-4">Chứng chỉ</h2>
        //                         <div className="mb-4">
        //                             <p className="font-bold">Chứng chỉ IELTS 7.0 (2023)</p>
        //                         </div>
        //                     </div> */}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default ModalCVDetail;
