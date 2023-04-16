package be.technobel.borderbuddy.model.dto;
import be.technobel.borderbuddy.model.entity.Employee;
import lombok.Data;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class EmployeeDTO {

    private final Long id;

    private final String login;

    private final String password;

    private final String firstName;

    private final String lastName;

    private final String email;

    private final Set<DayDTO> days;

    private final Set<MonthDTO> months;

    private final Set<DocumentDTO> documents;

    public static EmployeeDTO toDto(Employee employee){
        if(employee == null) return null;
        return new EmployeeDTO(
                employee.getId(),
                employee.getLogin(),
                employee.getPassword(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDays().stream().map(DayDTO::toDto).collect(Collectors.toSet()),
                employee.getMonths().stream().map(MonthDTO::toDto).collect(Collectors.toSet()),
                employee.getDocuments().stream().map(DocumentDTO::toDto).collect(Collectors.toSet())
        );
    }

}
