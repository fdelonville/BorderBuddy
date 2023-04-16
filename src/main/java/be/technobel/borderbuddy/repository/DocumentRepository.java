package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Optional<List<Document>> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);
}
