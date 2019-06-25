package sut.sut_fix.entity;

import lombok.*;
import javax.persistence.*;
import java.time.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Repair {
    @Id
    @SequenceGenerator(name = "repair_seq", sequenceName = "repair_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "repair_seq")
    @Column(name = "Repair_ID", unique = true)
    @NotNull(message = "repairId Null")
    private Long repairId;

    private String repairNumber;

    private String comment;

    private String repairStatus;

    private String repairImage;

    @JsonFormat(pattern = "yyyy-MM-dd : HH-mm" ,timezone = "GMT+7")
    private Date repairDate;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Customer.class)
    @JoinColumn(name = "cusId", insertable = true)
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = CaseRepair.class)
    @JoinColumn(name = "caseRepair", insertable = true)
    private CaseRepair caseRepair;

}