package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.model.dto.MonthDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Month;
import be.technobel.borderbuddy.repository.MonthRepository;
import be.technobel.borderbuddy.service.interfaces.DayService;
import be.technobel.borderbuddy.service.interfaces.MonthService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MonthServiceImpl implements MonthService {

    private final MonthRepository monthRepository;

    private final DayService dayService;

    public MonthServiceImpl(MonthRepository monthRepository, DayService dayService) {
        this.monthRepository = monthRepository;
        this.dayService = dayService;
    }

    @Override
    public void create(LocalDate startDate) {
        Month month = new Month();
        month.setStartDate(startDate);
        month.setEndDate(startDate.plusDays(startDate.lengthOfMonth()-1));
        if(monthRepository.findByStartDate(startDate).isEmpty()) {
            monthRepository.save(month);
            for (int i = 0; i < startDate.lengthOfMonth(); i++) {
                Day day = dayService.create(startDate.plusDays(i), month);
                month.addDay(day);
            }
            monthRepository.save(month);
        }
    }

    @Override
    public MonthDTO getOne(LocalDate startDate) {
        Month month = monthRepository.findByStartDate(startDate).orElseThrow();
        return MonthDTO.toDto(month);
    }
}
