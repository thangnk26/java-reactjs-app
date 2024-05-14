package dev.thangnk.jobsgobe.repository.user;

import dev.thangnk.jobsgobe.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    @Query(value = "select u from UserEntity u where u.role = 'ADMIN'")
    Optional<UserEntity> findAdmin();

    @Query(value = "select u from UserEntity u where (u.name ilike %:keyword% or u.shortName ilike %:keyword% or u.city ilike %:keyword% or u.districts ilike %:keyword% or u.wards ilike %:keyword% or u.specificAddress ilike %:keyword%) and u.role='RECRUITER' and u.isLock=false")
    List<UserEntity> searchRecruiter(String keyword);
}
