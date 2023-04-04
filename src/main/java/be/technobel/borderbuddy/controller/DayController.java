package be.technobel.borderbuddy.controller;

import be.technobel.borderbuddy.model.form.AssignTypeForm;
import be.technobel.borderbuddy.service.interfaces.DayService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/day")
public class DayController {
    private final DayService dayService;

    public DayController(DayService dayService) {
        this.dayService = dayService;
    }

    @GetMapping("/types")
    public List<String> getTypes(){
        return dayService.getAllTypes();
    }

    @PostMapping("/assign")
    public void assignType(@RequestBody @Valid AssignTypeForm form){
        dayService.setDayRangeType(form.getStartDate(),form.getEndDate(), form.getType());
    }

}
