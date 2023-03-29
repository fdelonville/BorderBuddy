package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.MonthDTO;

import java.time.LocalDate;

public interface MonthService {
    void create(LocalDate startDate);
    MonthDTO getOne(Long id);
}
