package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Month;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface MonthRepository extends JpaRepository<Month, Long> {

    Optional<Month> findByStartDate(LocalDate startDate);
}
