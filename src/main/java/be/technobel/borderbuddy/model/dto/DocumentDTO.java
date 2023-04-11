package be.technobel.borderbuddy.model.dto;

import be.technobel.borderbuddy.model.entity.Day;
import be.technobel.borderbuddy.model.entity.Document;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class DocumentDTO {
    private final Long id;

    private final String fileURL;

    private final LocalDate startDate;

    private final LocalDate endDate;

    private final List<DayDTO> daysCovered;

    public static DocumentDTO toDto(Document document){
        if( document == null )
            return null;

        return new DocumentDTO(
                document.getId(),
                document.getFileURL(),
                document.getStartDate(),
                document.getEndDate(),
                document.getDaysCovered().stream().map(DayDTO::toDto).toList()
        );
    }
}
