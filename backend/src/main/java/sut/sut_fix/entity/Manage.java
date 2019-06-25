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
public class Manage {
    @Id 
    @SequenceGenerator(name="manage_seq",sequenceName="manage_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="manage_seq")
    @Column(name="manageId",unique = true, nullable = false)
    @NotNull(message = "manageId Null")
    private Long manageId;

    private String manageIDs;


    @JsonFormat(pattern = "yyyy-MM-dd : HH-mm" ,timezone = "GMT+7")
    private Date manageDate;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Repair.class)
    @JoinColumn(name = "repair", insertable = true)
    private Repair repair;

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Technic.class)
    @JoinColumn(name = "technic", insertable = true)
    private Technic technic;


}