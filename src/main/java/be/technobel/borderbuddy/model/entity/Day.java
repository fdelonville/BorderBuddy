package be.technobel.borderbuddy.model.entity;

import be.technobel.borderbuddy.model.Type;
import be.technobel.borderbuddy.model.Status;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="day_id")
    private Long id;

    @Column(name= "day-date", nullable = false)
    private LocalDate dayDate;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "day-of-month")
    private Month month;

    @ManyToOne
    @JoinColumn(name= "covered-by-document")
    private Document document;

    @ManyToOne
    @JoinColumn(name = "day-of-employee")
    private Employee employee;

}
