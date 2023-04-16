package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.Status;
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
        if(endDate.isBefore(startDate)){
            LocalDate tempDate = startDate;
            startDate = endDate;
            endDate = tempDate;
        }
        Document document = new Document();
        document.setStartDate(startDate);
        document.setEndDate(endDate);
        document.setFileURL(fileURL);
        documentRepository.save(document);
        List<Day> days = dayRepository.findAllByDayDateBetween(startDate, endDate).orElseThrow(NotFoundException::new);
        days.forEach(day -> {
            if(day.getStatus()!=Status.PUBLIC_HOLIDAY_OR_WEEKEND) {
                day.setStatus(Status.VALID);
                day.setDocument(document);
                dayRepository.save(day);
            }
        });
        document.setDaysCovered(days);
        documentRepository.save(document);
    }

    @Override
    public DocumentDTO getOne(Long id) {
        return documentRepository.findById(id).map(DocumentDTO::toDto).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<DocumentDTO> getAllBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<Document> list = documentRepository.findAllByStartDateBetween(startDate,endDate).orElseThrow(NotFoundException::new);
        return list.stream().map(DocumentDTO::toDto).toList();
    }
}
