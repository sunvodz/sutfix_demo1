package sut.sut_fix.entity;

import lombok.*;
import javax.persistence.*;
import java.time.*;
import javax.validation.constraints.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Institute {
    @Id
    @SequenceGenerator(name = "institute_seq", sequenceName = "institute_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "institute_seq")
    @Column(name = "Institute_ID", unique = true)
    private Long instituteId;

    private String instituteName;

}