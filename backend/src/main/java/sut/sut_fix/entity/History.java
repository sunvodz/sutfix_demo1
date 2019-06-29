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
public class History {
    @Id
    @SequenceGenerator(name = "history_seq", sequenceName = "history_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "history_seq")
    @Column(name = "History_ID", unique = true)
    @NotNull(message = "historyId Null")
    private Long historyId;

    private String historyNumber;

    private String historyComment;

    private Integer point;

    @JsonFormat(pattern = "yyyy-MM-dd : HH-mm" ,timezone = "GMT+7")
    private Date historyDate;
    
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = SuccessfulRepair.class)
    @JoinColumn(name = "successfulRepairIDs", insertable = true)
    private SuccessfulRepair successfulRepair;
}