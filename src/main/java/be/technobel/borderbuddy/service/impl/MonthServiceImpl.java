package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.dto.MonthDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Employee;
import be.technobel.borderbuddy.model.entity.Month;
import be.technobel.borderbuddy.repository.EmployeeRepository;
import be.technobel.borderbuddy.repository.MonthRepository;
import be.technobel.borderbuddy.service.interfaces.DayService;
import be.technobel.borderbuddy.service.interfaces.MonthService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MonthServiceImpl implements MonthService {

    private final MonthRepository monthRepository;

    private final DayService dayService;

    private final EmployeeRepository employeeRepository;

    public MonthServiceImpl(MonthRepository monthRepository, DayService dayService, EmployeeRepository employeeRepository) {
        this.monthRepository = monthRepository;
        this.dayService = dayService;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void create(LocalDate startDate, String login) {

        Employee employee = employeeRepository.findByLogin(login).orElseThrow(NotFoundException::new);

        if(monthRepository.findByStartDateAndEmployee(startDate,employee).isEmpty()) {

            Month month = new Month();
            month.setStartDate(startDate);
            month.setEndDate(startDate.plusDays(startDate.lengthOfMonth()-1));
            month.setEmployee(employee);
            monthRepository.save(month);
            for (int i = 0; i < startDate.lengthOfMonth(); i++) {
                Day day = dayService.create(startDate.plusDays(i), month, employee);
                month.addDay(day);
            }
            monthRepository.save(month);
        }
    }

    @Override
    public MonthDTO getOne(LocalDate startDate, String login) {
        Employee employee = employeeRepository.findByLogin(login).orElseThrow(NotFoundException::new);
        Month month = monthRepository.findByStartDateAndEmployee(startDate,employee).orElseThrow(NotFoundException::new);
        return MonthDTO.toDto(month);
    }
}
