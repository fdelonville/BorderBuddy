package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Month;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface MonthRepository extends JpaRepository<Month, Long> {

    Month findByStartDate(LocalDate startDate);
}
