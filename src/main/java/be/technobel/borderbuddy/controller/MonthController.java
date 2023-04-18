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

    @GetMapping("/display")
    public MonthDTO displayByDate(@RequestParam LocalDate date, @RequestParam String login){
        return monthService.getOne(date.withDayOfMonth(1),login);
    }

    @PostMapping("/new-month")
    public void newMonth(@RequestParam LocalDate date, @RequestParam String login){
        monthService.create(date.withDayOfMonth(1),login);
    }

    @PostMapping("/new-period")
    public void newPeriod(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam String login){
        do{
            monthService.create(startDate.withDayOfMonth(1),login);
            startDate = startDate.plusMonths(1);
        }while (startDate.isBefore(endDate));
    }
}
