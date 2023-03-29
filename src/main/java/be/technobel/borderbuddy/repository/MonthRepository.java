package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Month;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthRepository extends JpaRepository<Month, Long> {
}
