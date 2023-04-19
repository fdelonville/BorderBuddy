package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.Status;
import be.technobel.borderbuddy.model.dto.DocumentDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Document;
import be.technobel.borderbuddy.model.entity.Employee;
import be.technobel.borderbuddy.repository.DayRepository;
import be.technobel.borderbuddy.repository.DocumentRepository;
import be.technobel.borderbuddy.repository.EmployeeRepository;
import be.technobel.borderbuddy.service.interfaces.DocumentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final DayRepository dayRepository;

    private final EmployeeRepository employeeRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository, DayRepository dayRepository, EmployeeRepository employeeRepository) {
        this.documentRepository = documentRepository;
        this.dayRepository = dayRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void create(LocalDate startDate, LocalDate endDate, String fileURL, String login) {
        Employee employee = employeeRepository.findByLogin(login).orElseThrow(NotFoundException::new);
        if(endDate==null)endDate = startDate;
        else if(endDate.isBefore(startDate)){
            LocalDate tempDate = startDate;
            startDate = endDate;
            endDate = tempDate;
        }
        Document document = new Document();
        document.setStartDate(startDate);
        document.setEndDate(endDate);
        document.setFileURL(fileURL);
        document.setEmployee(employee);
        documentRepository.save(document);
        List<Day> days = dayRepository.findAllByDayDateBetweenAndEmployee(startDate, endDate, employee).orElseThrow(NotFoundException::new);
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
    public DocumentDTO getOne(Long id, String login) {
        Employee employee = employeeRepository.findByLogin(login).orElseThrow(NotFoundException::new);
        return documentRepository.findByIdAndEmployee(id,employee).map(DocumentDTO::toDto).orElseThrow(NotFoundException::new);
    }

    @Override
    public List<DocumentDTO> getAllBetweenDates(LocalDate startDate, LocalDate endDate, String login) {
        Employee employee = employeeRepository.findByLogin(login).orElseThrow(NotFoundException::new);
        List<Document> list = documentRepository.findAllByStartDateBetweenAndEmployee(startDate,endDate,employee).orElseThrow(NotFoundException::new);
        return list.stream().map(DocumentDTO::toDto).toList();
    }
}
