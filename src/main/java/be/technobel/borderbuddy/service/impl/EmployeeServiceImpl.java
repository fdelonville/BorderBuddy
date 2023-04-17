package be.technobel.borderbuddy.service.impl;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.dto.EmployeeDTO;
import be.technobel.borderbuddy.model.entity.Employee;
import be.technobel.borderbuddy.model.form.RegisterForm;
import be.technobel.borderbuddy.repository.EmployeeRepository;
import be.technobel.borderbuddy.service.interfaces.EmployeeService;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDTO getOne(Long id) {
        return EmployeeDTO.toDto(this.employeeRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    @Override
    public void create(RegisterForm form) {
        Employee employee = form.toEntity();
        employeeRepository.save(employee);
    }
}
