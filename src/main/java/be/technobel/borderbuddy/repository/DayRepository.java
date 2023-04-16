package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Day;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DayRepository extends JpaRepository<Day,Long> {
    Optional<List<Day>> findAllByDayDateBetween(LocalDate startDate, LocalDate endDate);
}
