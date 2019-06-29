package sut.sut_fix.repository;
import sut.sut_fix.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
@EnableJpaRepositories
@CrossOrigin(origins = "http://localhost:3000")
@RepositoryRestResource
public interface MajorRepository extends JpaRepository<Major, Long> {
    Major findByMajorId(Long majorId);
    Major findByMajorName(String majorName);
}