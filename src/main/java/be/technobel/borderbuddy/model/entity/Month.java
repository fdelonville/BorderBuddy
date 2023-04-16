package be.technobel.borderbuddy.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Month {
    @Id
    @Column(name = "month_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start-date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end-date", nullable = false)
    private LocalDate endDate;

    @OneToMany(mappedBy = "month")
    private List<Day> days = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "month-of-employee")
    private Employee employee;

    public void addDay(Day day){
        days.add(day);
    }
}
