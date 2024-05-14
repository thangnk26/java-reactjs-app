import FormManagerJob from '~/components/recruiter/formManagerJob';
import RecruiterLayout from '~/layout/recruiterLayout';

function JobPause() {
    return (
        <RecruiterLayout tab={'pause'}>
            <FormManagerJob tab={'pause'} title={'Việc làm đã tạm dừng'}></FormManagerJob>
        </RecruiterLayout>
    );
}

export default JobPause;
