package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.EmployeeDTO;
import be.technobel.borderbuddy.model.form.RegisterForm;

public interface EmployeeService {
    EmployeeDTO getOne(Long id);

    void create(RegisterForm form);
}
