package sut.sut_fix.entity;

import lombok.*;
import javax.persistence.*;
import java.time.*;
import java.util.Optional;

import javax.validation.constraints.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Customer {
    @Id
    @SequenceGenerator(name = "customer_seq", sequenceName = "customer_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_seq")
    @Column(name = "Customer_ID", unique = true)
    @NotNull(message = "cusId Null")
    private Long cusId;

    private String customerUid;

    private String customerIDs;

    private String customerName;

    private String customerPhone;

    private String customerImg;

    private String customerEmail;

    private String customerGender;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "majorId")
    private Major major;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituteId")
    private Institute institute;

}