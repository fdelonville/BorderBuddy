package be.technobel.borderbuddy.model.dto;

import be.technobel.borderbuddy.model.entity.Month;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class MonthDTO {

    private final Long id;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Set<DayDTO> days;

    public static MonthDTO toDto(Month month){
        if( month == null )
            return null;

        return new MonthDTO(
                month.getId(),
                month.getStartDate(),
                month.getEndDate(),
                month.getDays().stream().map(DayDTO::toDto).collect(Collectors.toSet())
        );
    }
}
