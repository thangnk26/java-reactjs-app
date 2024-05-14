import CompanyDetail from '~/components/candidate/companyDetail';
import Search from '~/components/candidate/search';
import CandidateLayout from '~/layout/candidateLayout';

function CompanyDetailPage() {
    return (
        <CandidateLayout>
            <Search className="mt-[90px] container mx-auto border-[2px] border-sky-700 rounded-full"></Search>
            <CompanyDetail></CompanyDetail>
        </CandidateLayout>
    );
}

export default CompanyDetailPage;
