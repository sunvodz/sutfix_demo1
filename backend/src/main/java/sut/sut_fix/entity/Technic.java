package sut.sut_fix.entity;

import lombok.*;
import javax.persistence.*;
import java.time.*;
import java.util.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Technic {
    @Id
    @SequenceGenerator(name = "technic_seq", sequenceName = "technic_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "technic_seq")
    @Column(name = "Technic_ID", unique = true)
    @NotNull(message = "technicId Null")
    private Long technicId;

    private String technicNumber;

    private String technicName;

    private String technicPhone;
    

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "majorId")
    private Major major;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituteId")
    private Institute institute;

}