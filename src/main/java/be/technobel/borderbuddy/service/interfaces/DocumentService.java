package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.DocumentDTO;

import java.time.LocalDate;
import java.util.List;

public interface DocumentService {
    void create(LocalDate startDate, LocalDate endDate, String fileURL, String login);
    DocumentDTO getOne(Long id, String login);

    List<DocumentDTO> getAllBetweenDates(LocalDate startDate, LocalDate endDate, String login);
}
