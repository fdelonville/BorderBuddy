package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);
}
