package be.technobel.borderbuddy.controller;

import be.technobel.borderbuddy.exception.NotFoundException;
import be.technobel.borderbuddy.model.entity.Employee;
import be.technobel.borderbuddy.model.form.AssignStatusForm;
import be.technobel.borderbuddy.model.form.AssignTypeForm;
import be.technobel.borderbuddy.repository.EmployeeRepository;
import be.technobel.borderbuddy.service.interfaces.DayService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.io.NotActiveException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/day")
public class DayController {
    private final DayService dayService;
    private final EmployeeRepository employeeRepository;

    public DayController(DayService dayService, EmployeeRepository employeeRepository) {
        this.dayService = dayService;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping("/types")
    public List<String> getTypes(){
        return dayService.getAllTypes();
    }

    @PostMapping("/assign-type")
    public void assignType(@RequestBody @Valid AssignTypeForm form){
        Employee employee = employeeRepository.findByLogin(form.getLogin()).orElseThrow(NotFoundException::new);
        dayService.setDayRangeType(form.getStartDate(),form.getEndDate(), form.getType(), employee);
    }

    @PostMapping("/assign-status")
    public void assignStatus(@RequestBody @Valid AssignStatusForm form){
        Employee employee = employeeRepository.findByLogin(form.getLogin()).orElseThrow(NotFoundException::new);
        dayService.setDayRangeStatus(form.getStartDate(),form.getEndDate(), form.getStatus(), employee);
    }

}
