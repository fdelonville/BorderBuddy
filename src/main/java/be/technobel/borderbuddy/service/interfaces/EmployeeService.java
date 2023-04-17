package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.EmployeeDTO;
import be.technobel.borderbuddy.model.form.RegisterForm;
import org.springframework.stereotype.Service;


public interface EmployeeService {
    EmployeeDTO getOne(String login);

    void create(RegisterForm form);
}
