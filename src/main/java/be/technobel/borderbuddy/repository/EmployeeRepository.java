package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
