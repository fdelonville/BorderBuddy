package be.technobel.borderbuddy.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("api/file")
public class DocumentController {
    @PostMapping("/upload")
    public void newDoc(){

    }
}
