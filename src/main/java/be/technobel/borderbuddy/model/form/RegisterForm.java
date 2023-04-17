package be.technobel.borderbuddy.model.form;

import be.technobel.borderbuddy.model.entity.Employee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterForm {

    @NotBlank
    private final String login;

    @NotBlank
    private String password;

    @NotBlank
    private final String firstName;

    @NotBlank
    private final String lastName;

    @NotBlank
    private final String email;

    public Employee toEntity(){

        Employee employee = new Employee();

        employee.setLogin(this.login);
        employee.setPassword(this.password);
        employee.setFirstName(this.firstName);
        employee.setLastName(this.lastName);
        employee.setEmail(this.email);

        return employee;
    }
}
