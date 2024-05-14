import FormCV from '~/components/candidate/cv/formCV';
import CandidateLayout from '~/layout/candidateLayout';

function UpdateCV() {
    return (
        <CandidateLayout>
            <FormCV type={'update'}></FormCV>
        </CandidateLayout>
    );
}

export default UpdateCV;
