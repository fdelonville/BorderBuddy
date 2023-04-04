package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.model.Status;
import be.technobel.borderbuddy.model.Type;
import be.technobel.borderbuddy.model.dto.DayDTO;
import be.technobel.borderbuddy.model.entity.Day;
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
    public List<DayDTO> getAllBetweenDates(LocalDate date1, LocalDate date2) {
        return null;
    }

    @Override
    public List<DayDTO> getAllIncomplete() {
        return null;
    }

    @Override
    public Day create(LocalDate date, Month month) {
        Day day = new Day();
        day.setDayDate(date);
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

    @Override
    public void setDayRangeType(LocalDate date1, LocalDate date2, String type) {
        if(date2.isAfter(date1)) {
            dayRepository.findAllByDayDateBetween(date1, date2).stream().map(day -> {
                if (!day.getStatus().equals(Status.VALID) && !day.getStatus().equals(Status.PUBLIC_HOLIDAY_OR_WEEKEND)) {
                    day.setType(Type.valueOf(type));
                    day.setStatus(Status.TYPED);
                    dayRepository.save(day);
                }
                return null;
            });
        }
        else throw(new RuntimeException());
    }
}
