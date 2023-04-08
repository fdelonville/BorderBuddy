package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.Type;
import be.technobel.borderbuddy.model.dto.DayDTO;
import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Month;
import java.time.LocalDate;
import java.util.List;

public interface DayService {
    List<DayDTO> getAllBetweenDates(LocalDate date1, LocalDate date2);
    List<DayDTO> getAllIncomplete();
    Day create(LocalDate date, Month month);
    List<String> getAllTypes();
    void setDayRangeType(LocalDate date1, LocalDate date2, Type type);
}
