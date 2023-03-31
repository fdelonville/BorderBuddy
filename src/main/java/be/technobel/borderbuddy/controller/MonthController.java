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

    @GetMapping("/current")
    public MonthDTO displayCurrentMonth(){
        return monthService.getOne(LocalDate.now().withDayOfMonth(1));
    }

    @GetMapping("/display")
    public MonthDTO displayByDate(@RequestParam LocalDate date){
        return monthService.getOne(date.withDayOfMonth(1));
    }

    @GetMapping("/new-month")
    public void newMonth(@RequestParam LocalDate date){
        monthService.create(date.withDayOfMonth(1));
    }

    @GetMapping("/new-period")
    public void newPeriod(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate){
        do{
            monthService.create(startDate.withDayOfMonth(1));
            startDate = startDate.plusMonths(1);
        }while (startDate.isBefore(endDate));
    }
}
