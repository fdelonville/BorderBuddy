package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Document;
import be.technobel.borderbuddy.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<List<Document>> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);
    Optional<List<Document>> findAllByStartDateBetweenAndEmployee(LocalDate startDate, LocalDate endDate, Employee employee);

    Optional<Document> findByIdAndEmployee(Long id, Employee employee);
}
