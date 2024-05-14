import FormManagerCandidate from '~/components/recruiter/formManagerCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function CandidateSelected() {
    return (
        <RecruiterLayout tab={'selected'}>
            <FormManagerCandidate tab={'selected'} title={'Danh sách ứng viên đã được chọn'}></FormManagerCandidate>
        </RecruiterLayout>
    );
}

export default CandidateSelected;
