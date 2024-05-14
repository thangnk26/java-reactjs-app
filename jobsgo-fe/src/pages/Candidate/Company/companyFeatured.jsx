import ListCompany from '~/components/candidate/listCompany';
import CandidateLayout from '~/layout/candidateLayout';
function CompanyFeatured() {
    return (
        <CandidateLayout>
            <ListCompany type="featured"></ListCompany>
        </CandidateLayout>
    );
}

export default CompanyFeatured;
