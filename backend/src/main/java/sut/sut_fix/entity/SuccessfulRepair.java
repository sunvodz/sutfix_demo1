package sut.sut_fix.entity;

import lombok.*;
import javax.persistence.*;
import java.time.*;
import javax.validation.constraints.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class SuccessfulRepair {
    @Id 
    @SequenceGenerator(name="successfulRepair_seq",sequenceName="successfulRepair_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="successfulRepair_seq")
    @Column(name="successfulRepairId",unique = true, nullable = false)
    
    private Long successfulRepairId;

    private String successfulRepairIDs;

    private String caseFromTec;

    private String meeting;

    @JsonFormat(pattern = "yyyy-MM-dd : HH-mm" ,timezone = "GMT+7")
    private Date successfulRepairDate;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Manage.class)
    @JoinColumn(name = "manage", insertable = true)
    private Manage manage;


}