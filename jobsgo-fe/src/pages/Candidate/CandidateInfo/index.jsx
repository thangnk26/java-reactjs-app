import Info from '~/components/candidate/info';
import CandidateLayout from '~/layout/candidateLayout';

function CandidateInfo() {
    return (
        <CandidateLayout>
            <Info className={'mt-[80px] container mx-auto'} />
        </CandidateLayout>
    );
}

export default CandidateInfo;
