package be.technobel.borderbuddy.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
public class Month {
    @Id
    @Column(name = "month_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start-date")
    private LocalDate startDate;

    @Column(name = "end-date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "day-of-month")
    private Set<Day> days = new HashSet<>();
}
