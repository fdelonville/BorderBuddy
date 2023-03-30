package be.technobel.borderbuddy.controller;

import be.technobel.borderbuddy.model.dto.MonthDTO;
import be.technobel.borderbuddy.service.interfaces.MonthService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")
@RequestMapping("api/month")
public class MonthController {

    private final MonthService monthService;

    public MonthController(MonthService monthService) {
        this.monthService = monthService;
    }

//    @GetMapping("/{id:[0-9]+}")
//    public MonthDTO displayMonthByID(@PathVariable long id){
//        return monthService.getOne(id);
//    }

    @GetMapping("/current")
    public MonthDTO displayCurrentMonth(){
        return monthService.getOne(LocalDate.now().withDayOfMonth(1));
    }

    @GetMapping("/new")
    public void newMonth(){
        monthService.create(LocalDate.now().withDayOfMonth(1));
    }
}
