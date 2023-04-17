package be.technobel.borderbuddy.controller;

import be.technobel.borderbuddy.model.form.RegisterForm;
import be.technobel.borderbuddy.service.interfaces.EmployeeService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("*")
@RequestMapping("api")
public class RegisterController {
    private final EmployeeService employeeService;


    public RegisterController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/register")
    public void newEmployee(@RequestBody RegisterForm form){
        employeeService.create(form);
    }
}
