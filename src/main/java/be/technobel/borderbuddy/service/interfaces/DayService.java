package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.DayDTO;

import java.util.Date;
import java.util.List;

public interface DayService {
    List<DayDTO> getAllBetweenDates(Date date1, Date date2);
    List<DayDTO>getAllIncomplete();
    void create(Date date);
}
