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
public class Status {
    @Id 
    @SequenceGenerator(name="status_seq",sequenceName="status_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="status_seq")
    @Column(name="statusId",unique = true, nullable = false)
    @NotNull(message = "statusId Null")
    private Long statusId;

    private String statusName;

}