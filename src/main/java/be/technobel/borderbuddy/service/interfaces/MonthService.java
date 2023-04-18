package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.MonthDTO;

import java.time.LocalDate;

public interface MonthService {
    void create(LocalDate startDate, String login);
    MonthDTO getOne(LocalDate startDate, String login);
}
