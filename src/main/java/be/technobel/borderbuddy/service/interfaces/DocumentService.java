package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.DocumentDTO;

import java.time.LocalDate;

public interface DocumentService {
    void create(LocalDate startDate, LocalDate endDate, String fileURL);
    DocumentDTO getOne(Long id);
}
