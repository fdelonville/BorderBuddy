package be.technobel.borderbuddy.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
public class Employee {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "employee")
    private Set<Day> days = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    private Set<Month> months = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    private Set<Document> documents = new HashSet<>();

}
