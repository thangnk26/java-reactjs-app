import FormManagerCandidate from '~/components/recruiter/formManagerCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function CandidateConsider() {
    return (
        <RecruiterLayout tab={'consider'}>
            <FormManagerCandidate tab={'consider'} title={'Danh sách ứng viên đang xem xét'}></FormManagerCandidate>
        </RecruiterLayout>
    );
}

export default CandidateConsider;
