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
public class CaseRepair {
    @Id 
    @SequenceGenerator(name="caseRepair_seq",sequenceName="caseRepair_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="caseRepair_seq")
    @Column(name="caseRepairId",unique = true, nullable = false)
    @NotNull(message = "caseRepairId Null")
    private Long caseRepairId;

    private String caseRepairName;

}