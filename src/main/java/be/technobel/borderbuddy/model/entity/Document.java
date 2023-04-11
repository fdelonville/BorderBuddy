package be.technobel.borderbuddy.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="document_id")
    private Long id;

    private String fileURL;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToMany(mappedBy = "document")
    private List<Day> daysCovered = new ArrayList<>();

}
