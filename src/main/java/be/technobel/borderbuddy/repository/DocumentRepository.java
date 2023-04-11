package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
