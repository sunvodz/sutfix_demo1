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
public class Major {
    @Id
    @SequenceGenerator(name = "major_seq", sequenceName = "major_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "major_seq")
    @Column(name = "Major_ID", unique = true)
    private Long majorId;

    private String majorName;
}
