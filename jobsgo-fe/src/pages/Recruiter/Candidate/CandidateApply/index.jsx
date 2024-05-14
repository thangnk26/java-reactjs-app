import FormManagerCandidate from '~/components/recruiter/formManagerCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function CandidateApply() {
    return (
        <RecruiterLayout tab={'apply'}>
            <FormManagerCandidate tab={'apply'} title={'Danh sách ứng viên mới ứng tuyển'}></FormManagerCandidate>
        </RecruiterLayout>
    );
}

export default CandidateApply;
