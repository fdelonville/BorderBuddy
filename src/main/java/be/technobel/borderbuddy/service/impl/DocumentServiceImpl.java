package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.model.dto.DocumentDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Document;
import be.technobel.borderbuddy.repository.DayRepository;
import be.technobel.borderbuddy.repository.DocumentRepository;
import be.technobel.borderbuddy.service.interfaces.DocumentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final DayRepository dayRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository, DayRepository dayRepository) {
        this.documentRepository = documentRepository;
        this.dayRepository = dayRepository;
    }

    @Override
    public void create(LocalDate startDate, LocalDate endDate, String fileURL) {
        Document document = new Document();
        document.setStartDate(startDate);
        document.setEndDate(endDate);
        document.setFileURL(fileURL);
        List<Day> days = dayRepository.findAllByDayDateBetween(startDate, endDate);
        document.setDaysCovered(days);
        documentRepository.save(document);
    }

    @Override
    public DocumentDTO getOne(Long id) {
        return null;
    }
}
