package be.technobel.borderbuddy.model.dto;

import be.technobel.borderbuddy.model.Status;
import be.technobel.borderbuddy.model.Type;
import be.technobel.borderbuddy.model.entity.Day;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class DayDTO implements Serializable {

    private final Long id;

    private final Type type;

    private final LocalDate dayDate;

    private final Status status;


    public static DayDTO toDto(Day day){

        if( day == null )
            return null;

        return new DayDTO(
                day.getId(),
                day.getType(),
                day.getDayDate(),
                day.getStatus()
        );
    }

}
