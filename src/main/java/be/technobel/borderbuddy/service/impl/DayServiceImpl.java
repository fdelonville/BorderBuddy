package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.Status;
import be.technobel.borderbuddy.model.Type;
import be.technobel.borderbuddy.model.dto.DayDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Employee;
import be.technobel.borderbuddy.model.entity.Month;
import be.technobel.borderbuddy.repository.DayRepository;
import be.technobel.borderbuddy.service.interfaces.DayService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DayServiceImpl implements DayService {

    private final DayRepository dayRepository;

    public DayServiceImpl(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    @Override
    public Day create(LocalDate date, Month month, Employee employee) {
        Day day = new Day();
        day.setDayDate(date);
        day.setEmployee(employee);
        if(date.getDayOfWeek().equals(DayOfWeek.SATURDAY)||date.getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
            day.setStatus(Status.PUBLIC_HOLIDAY_OR_WEEKEND);
        }
        else day.setStatus(Status.PENDING);
        day.setMonth(month);
        dayRepository.save(day);
        return day;
    }

    @Override
    public List<String> getAllTypes() {
        return Arrays.stream(Type.values()).map(Enum::toString).toList();
    }

    public void processDates(LocalDate date1, LocalDate date2){
        if(date2 == null) date1 = date2;
        else if(date2.isBefore(date1)) {
            LocalDate date3 = date1;
            date1 = date2;
            date2 = date3;
        }
    }

    @Override
    public void setDayRangeType(LocalDate date1, LocalDate date2, Type type) {
        processDates(date1,date2);
        List<Day> dayList = dayRepository.findAllByDayDateBetween(date1, date2).orElseThrow(NotFoundException::new);
        dayList.forEach(day -> {
            if((day.getStatus()!= Status.VALID) && (day.getStatus() != Status.PUBLIC_HOLIDAY_OR_WEEKEND)){
                day.setType(type);
                day.setStatus(Status.TYPED);
                dayRepository.save(day);
            }
        });
    }

    @Override
    public void setDayRangeStatus(LocalDate date1, LocalDate date2, Status status) {
        processDates(date1,date2);
        List<Day> dayList = dayRepository.findAllByDayDateBetween(date1, date2).orElseThrow(NotFoundException::new);
        dayList.forEach(day -> {
            if((day.getStatus()!= Status.VALID)){
                day.setStatus(status);
                dayRepository.save(day);
            }
        });
    }
}
