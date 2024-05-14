import FormManagerCandidate from '~/components/recruiter/formManagerCandidate';
import RecruiterLayout from '~/layout/recruiterLayout';

function CandidateFit() {
    return (
        <RecruiterLayout tab={'search'}>
            <FormManagerCandidate tab={'search'} title={'Danh sách ứng viên phù hợp'}></FormManagerCandidate>
        </RecruiterLayout>
    );
}

export default CandidateFit;
