import FormCV from '~/components/candidate/cv/formCV';
import CandidateLayout from '~/layout/candidateLayout';

function CreateCV() {
    return (
        <CandidateLayout>
            <FormCV tab={'create'} type={'create'}></FormCV>
        </CandidateLayout>
    );
}

export default CreateCV;
