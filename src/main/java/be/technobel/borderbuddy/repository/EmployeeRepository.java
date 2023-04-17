package be.technobel.borderbuddy.repository;

import be.technobel.borderbuddy.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    public Optional<Employee> findByLogin(String login);
}
