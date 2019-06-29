package sut.sut_fix.controller;

import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import sut.sut_fix.entity.*;
import sut.sut_fix.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Controller {
    @Autowired
    private HistoryRepository historyRepository;
    private RepairRepository repairRepository;
    private CustomerRepository customerRepository;
    private CaseRepairRepository caseRepairRepository;
    private MajorRepository majorRepository;
    private InstituteRepository instituteRepository;
    private ManageRepository manageRepository;
    private SuccessfulRepairRepository successfulRepairRepository;
    private TechnicRepository technicRepository;

    public Controller(RepairRepository repairRepository, CustomerRepository customerRepository,
            HistoryRepository historyRepository,
            CaseRepairRepository caseRepairRepository, MajorRepository majorRepository,
            InstituteRepository instituteRepository, ManageRepository manageRepository,
            SuccessfulRepairRepository successfulRepairRepository, TechnicRepository technicRepository) {
        this.repairRepository = repairRepository;
        this.customerRepository = customerRepository;
        this.caseRepairRepository = caseRepairRepository;
        this.historyRepository = historyRepository;
        this.majorRepository = majorRepository;
        this.instituteRepository = instituteRepository;
        this.manageRepository = manageRepository;
        this.successfulRepairRepository = successfulRepairRepository;
        this.technicRepository = technicRepository;
    }

/*======================================== img */

    /*
     * ====================================== Status
     * ========================================
     */
    @GetMapping("/statusRepair/{Uid}")
    public Collection<Repair> statusRepair(@PathVariable String Uid) {
        return repairRepository.findAll().stream()
                .filter((s) -> "Wait the process".equals(s.getRepairStatus())
                        && Uid.equals(s.getCustomer().getCustomerUid()))
                .collect(Collectors.toList());
    }

    @GetMapping("/statusManage/{Uid}")
    public Collection<Manage> statusManage(@PathVariable String Uid) {
        return manageRepository.findAll().stream()
                .filter((s) -> "Repairing".equals(s.getRepair().getRepairStatus())
                        && Uid.equals(s.getRepair().getCustomer().getCustomerUid()))
                .collect(Collectors.toList());
    }

    @GetMapping("/statusSuccessfulRepair/{Uid}")
    public Collection<SuccessfulRepair> statusSuccessfulRepair(@PathVariable String Uid) {
        return successfulRepairRepository.findAll().stream()
                .filter((s) -> "SuccessfullyRepair".equals(s.getManage().getRepair().getRepairStatus())
                        && Uid.equals(s.getManage().getRepair().getCustomer().getCustomerUid()))
                .collect(Collectors.toList());
    }

    @PutMapping("/upstatushistory/{successfulRepairid}")
    SuccessfulRepair replaceSuccessful(SuccessfulRepair SuccessfulRepair2, @PathVariable Long successfulRepairid) {

        return successfulRepairRepository.findById(successfulRepairid).map(successful -> {

            successful.getManage().getRepair().setRepairStatus("Successfully");

            return successfulRepairRepository.save(successful);

        }).orElseGet(() -> {
            SuccessfulRepair2.setSuccessfulRepairId(successfulRepairid);
            return successfulRepairRepository.save(SuccessfulRepair2);
        });
    }

    /*
     * ====================================== history
     * ========================================
     */
    @GetMapping("/history")
    public Collection<History> history() {
        return historyRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("/history/{Uid}")
    public Collection<History> history(@PathVariable String Uid) {
        return historyRepository.findAll().stream()
                .filter((s) -> "Successfully"
                        .equals(s.getSuccessfulRepair().getManage().getRepair().getRepairStatus())
                        && Uid.equals(s.getSuccessfulRepair().getManage().getRepair().getCustomer().getCustomerUid())
                        && "ยังไม่มีการแนะนำการซ่อม".equals(s.getHistoryComment()))
                .collect(Collectors.toList());
    }
    @GetMapping("/historyPoint/{Uid}")
    public Collection<History> history2(@PathVariable String Uid) {
        return historyRepository.findAll().stream()
                .filter((s) -> "Successfully"
                        .equals(s.getSuccessfulRepair().getManage().getRepair().getRepairStatus())
                        && Uid.equals(s.getSuccessfulRepair().getManage().getRepair().getCustomer().getCustomerUid())
                        )
                .collect(Collectors.toList());
    }

    @PostMapping("/newhistory/{successful}")
    public History newhistory(@PathVariable Long successful) {

        History newhistory = new History();

        Long i;
        for (i = 1L; i < 9999L; i++) {
            if (historyRepository.findByHistoryId(i) == null) {
                newhistory.setHistoryNumber("H" + i);
                break;
            }
        }

        newhistory.setHistoryComment("ยังไม่มีการแนะนำการซ่อม");
        newhistory.setPoint(0);

        Date datere = new Date();
        newhistory.setHistoryDate(datere);

        SuccessfulRepair successfulRepairIDs = successfulRepairRepository.findBySuccessfulRepairId(successful);
        newhistory.setSuccessfulRepair(successfulRepairIDs);

        return historyRepository.save(newhistory);
    }

    @PutMapping("/uphistory/{historyId}/{historyComment}/{point}")
    History replaceHistory(History History2, @PathVariable Long historyId, @PathVariable String historyComment,
            @PathVariable Integer point) {

        return historyRepository.findById(historyId).map(history -> {
            history.setHistoryComment(historyComment);
            history.setPoint(point);

            return historyRepository.save(history);

        }).orElseGet(() -> {
            History2.setHistoryId(historyId);
            return historyRepository.save(History2);
        });
    }

    /*
     * ====================================== repair
     * ========================================
     */

    @GetMapping("/allstatusRepair/")
    public Collection<Repair> statusRepair() {
        return repairRepository.findAll().stream()
                .filter((s) -> "Wait the process".equals(s.getRepairStatus()))
                .collect(Collectors.toList());
    }

    @GetMapping("/repair")
    public Collection<Repair> repair() {
        return repairRepository.findAll().stream().collect(Collectors.toList());
    }
    @PostMapping("/repair/{comment}/{image}/{customer}/{caseRepair}")
    public Repair newRepair(@PathVariable String comment, @PathVariable String image, @PathVariable String customer,
            @PathVariable Long caseRepair) {
        Repair newRepair = new Repair();

        Long i;
        for (i = 1L; i < 9999L; i++) {
            if (repairRepository.findByRepairId(i) == null) {
                newRepair.setRepairNumber("R" + i);
                break;
            }
        }
        newRepair.setRepairStatus("Wait the process");
        newRepair.setComment(comment);
        newRepair.setRepairImage(image);

        Date datere = new Date();
        newRepair.setRepairDate(datere);

        Customer customerid = customerRepository.findByCustomerUid(customer);
        newRepair.setCustomer(customerid);

        CaseRepair repairName = caseRepairRepository.findByCaseRepairId(caseRepair);
        newRepair.setCaseRepair(repairName);

        return repairRepository.save(newRepair);
    }
    /*
     * ====================================== Case Repair
     * ========================================
     */
    @GetMapping("/caseRepair")
    public Collection<CaseRepair> caseRepair() {
        return caseRepairRepository.findAll().stream().collect(Collectors.toList());
    }

    /*
     * ====================================== customer
     * ========================================
     */

    @PutMapping("/putCustomer/{cusId}/{customerUid}/{customerIDs}/{customerName}/{customerPhone}/{customerImg}/{customerEmail}/{customerGender}/{majorId}/{instituteId}")
    Customer putCustomer(Customer customer2, @PathVariable Long cusId, @PathVariable String customerUid,
            @PathVariable String customerIDs, @PathVariable String customerName, @PathVariable String customerPhone,
            @PathVariable String customerImg, @PathVariable String customerEmail, @PathVariable String customerGender,
            @PathVariable Long majorId, @PathVariable Long instituteId) {

        return customerRepository.findById(cusId).map(customer -> {

            customer.setCustomerIDs(customerIDs);
            customer.setCustomerName(customerName);
            customer.setCustomerPhone(customerPhone);
            customer.setCustomerImg(customerImg);
            customer.setCustomerEmail(customerEmail);
            customer.setCustomerGender(customerGender);

            Major majorId1 = majorRepository.findByMajorId(majorId);
            customer.setMajor(majorId1);
    
            Institute instituteId1 = instituteRepository.findByInstituteId(instituteId);
            customer.setInstitute(instituteId1);

            return customerRepository.save(customer);

        }).orElseGet(() -> {
            customer2.setCusId(cusId);
            customer2.setCustomerUid(customerUid);
            return customerRepository.save(customer2);
        });
    }

    @PostMapping("/addcustomer/{customerUid}/{customerIDs}/{customerName}/{customerPhone}/{customerImg}/{customerEmail}/{customerGender}/{majorId}/{instituteId}")
    public Customer addcustomer(@PathVariable String customerUid, @PathVariable String customerIDs,
            @PathVariable String customerName, @PathVariable String customerPhone, @PathVariable String customerImg,
            @PathVariable String customerEmail, @PathVariable String customerGender, @PathVariable Long majorId,
            @PathVariable Long instituteId) {

        Customer addcustomer = new Customer();

        Long i;
        for (i = 1L; i < 9999L; i++) {
            if (customerRepository.findByCusId(i) == null) {
                addcustomer.setCusId(i);
                break;
            }
        }

        addcustomer.setCustomerUid(customerUid);
        addcustomer.setCustomerIDs(customerIDs);
        addcustomer.setCustomerName(customerName);
        addcustomer.setCustomerPhone(customerPhone);
        addcustomer.setCustomerImg(customerImg);
        addcustomer.setCustomerEmail(customerEmail);
        addcustomer.setCustomerGender(customerGender);

        Major majorId1 = majorRepository.findByMajorId(majorId);
        addcustomer.setMajor(majorId1);

        Institute instituteId1 = instituteRepository.findByInstituteId(instituteId);
        addcustomer.setInstitute(instituteId1);

        return customerRepository.save(addcustomer);
    }

    @GetMapping("/customer")
    public Collection<Customer> customer() {
        return customerRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("/customer/{Uid}")
    public Collection<Customer> customer(@PathVariable String Uid) {
        return customerRepository.findAll().stream().filter((s) -> Uid.equals(s.getCustomerUid()))
                .collect(Collectors.toList());

    }

    @PostMapping("/customer/{customerName}/{customerUid}/{customerImg}/{customerEmail}")
    public Customer newCustomer(@PathVariable String customerName, @PathVariable String customerUid,
            @PathVariable String customerImg, @PathVariable String customerEmail) {
        Customer newCustomer = new Customer();

        newCustomer.setCustomerName(customerName);
        newCustomer.setCustomerUid(customerUid);
        newCustomer.setCustomerImg(customerImg);
        newCustomer.setCustomerEmail(customerEmail);

        return customerRepository.save(newCustomer);
    }

    /*
     * ====================================== Major
     * ========================================
     */
    @GetMapping("/major")
    public Collection<Major> major() {
        return majorRepository.findAll().stream().collect(Collectors.toList());
    }

    /*
     * ====================================== Institute
     * ========================================
     */
    @GetMapping("/institute")
    public Collection<Institute> institute() {
        return instituteRepository.findAll().stream().collect(Collectors.toList());
    }

    /* ====================================== Technic ======================================== */
    @GetMapping("/technic")
    public Collection<Technic> technic() {
        return technicRepository.findAll().stream().collect(Collectors.toList());
    }

    @GetMapping("/technicPointss/{id}")
    public Collection<History> history3(@PathVariable Long id) {
                return historyRepository.findAll().stream()
                .filter((s) -> id.equals(s.getSuccessfulRepair().getManage().getTechnic().getTechnicId()))
                .collect(Collectors.toList());
   
    }


    @PostMapping("/technic/{technicNumber}/{technicName}/{technicPhone}/{major}/{institute}")
    public Technic newTechnic(@PathVariable String technicNumber, @PathVariable String technicName,
            @PathVariable String technicPhone, @PathVariable String major, @PathVariable String institute) {
        Technic newTechnic = new Technic();

        newTechnic.setTechnicNumber(technicNumber);
        newTechnic.setTechnicName(technicName);
        newTechnic.setTechnicPhone(technicPhone);

        Major majors = majorRepository.findByMajorName(major);
        newTechnic.setMajor(majors);

        Institute institutes = instituteRepository.findByInstituteName(institute);
        newTechnic.setInstitute(institutes);

        return technicRepository.save(newTechnic);
    }

    
@PutMapping("/upTec/{technicNumber}/{technicName}/{technicPhone}/{major}/{institute}/{technicid}")
Technic upTec(Technic tec2, @PathVariable String technicNumber, @PathVariable String technicName,
@PathVariable String technicPhone, @PathVariable Long major, @PathVariable Long institute,@PathVariable Long technicid) {

        return technicRepository.findById(technicid).map(technic -> {
            technic.setTechnicNumber(technicNumber);
            technic.setTechnicName(technicName);
            technic.setTechnicPhone(technicPhone);

            Major majors = majorRepository.findByMajorId(major);
            technic.setMajor(majors);
            Institute institutes = instituteRepository.findByInstituteId(institute);
            technic.setInstitute(institutes);

            return technicRepository.save(technic);

        }).orElseGet(() -> {
            tec2.setTechnicId(technicid);
            return technicRepository.save(tec2);
        });
    }


/* ============================================= ManageAll =============================================== */

@GetMapping("/allstatusManage/")
public Collection<Manage> statusManage() {
    return manageRepository.findAll().stream()
            .filter((s) -> "Repairing".equals(s.getRepair().getRepairStatus()))
            .collect(Collectors.toList());
}

@GetMapping("/manageManage/{tecId}/{reId}")
    public Collection<Manage> manageManage(@PathVariable Long tecId,@PathVariable Long reId) {
        return manageRepository.findAll().stream()
                .filter((s) -> "Repairing".equals(s.getRepair().getRepairStatus())
                        && tecId.equals(s.getTechnic().getTechnicId())
                        && reId.equals(s.getRepair().getRepairId())
                        )
                .collect(Collectors.toList());
    }

@GetMapping("/getManage")
public Collection<Manage> getManage() {
    return manageRepository.findAll().stream()
            .filter((s) -> "Repairing".equals(s.getRepair().getRepairStatus()))
            .collect(Collectors.toList());
}

    
@PostMapping("/newManage/{repairId}/{technicId}")
public Manage newManage(@PathVariable long repairId, @PathVariable long technicId) {
    Manage newManage = new Manage();
    Long i;
    for (i = 1L; i < 9999L; i++) {
        if (manageRepository.findByManageId(i) == null) {
            newManage.setManageIDs("M" + i);
            break;
        }
    }
    

    Repair repairIds = repairRepository.findByRepairId(repairId);
    newManage.setRepair(repairIds);
    
    Technic technicIds = technicRepository.findByTechnicId(technicId);
    newManage.setTechnic(technicIds);

    Date datere = new Date();
    newManage.setManageDate(datere);
 
    return manageRepository.save(newManage);
}

@PutMapping("/putManage2/{repairs}")
Repair manageupdate2(Repair repair2, @PathVariable Long repairs) {

        return repairRepository.findById(repairs).map(manages -> {
            manages.setRepairStatus("Repairing");

            return repairRepository.save(manages);

        }).orElseGet(() -> {
            repair2.setRepairId(repairs);
            return repairRepository.save(repair2);
        });
    }

  /*   ============================= SuccessfullyRepair ============= */

  @GetMapping("/allstatusSuccessfulRepair/")
  public Collection<SuccessfulRepair> statusSuccessfulRepair() {
      return successfulRepairRepository.findAll().stream()
              .filter((s) -> "SuccessfullyRepair".equals(s.getManage().getRepair().getRepairStatus()))
              .collect(Collectors.toList());
  }

  
@PostMapping("/newSuccessfullyRepair/{manageId}/{caseFromTec}/{meeting}")
public SuccessfulRepair newSuccessfullyRepair(@PathVariable long manageId,@PathVariable String caseFromTec,@PathVariable String meeting) {
    SuccessfulRepair newSuccessfullyRepair = new SuccessfulRepair();
    Long i;
    for (i = 1L; i < 9999L; i++) {
        if (successfulRepairRepository.findBySuccessfulRepairId(i) == null) {
            newSuccessfullyRepair.setSuccessfulRepairIDs("S" + i);
            break;
        }
    }
    
    newSuccessfullyRepair.setMeeting(meeting);
    newSuccessfullyRepair.setCaseFromTec(caseFromTec);

    Manage manage = manageRepository.findByManageId(manageId);
    newSuccessfullyRepair.setManage(manage);

    Date datere = new Date();
    newSuccessfullyRepair.setSuccessfulRepairDate(datere);
 
    return successfulRepairRepository.save(newSuccessfullyRepair);
}

    @PutMapping("/putManage/{manage}")
    Manage manageupdate1(Manage manage2,@PathVariable Long manage) {
    
            return manageRepository.findById(manage).map(manages -> {
                manages.getRepair().setRepairStatus("SuccessfullyRepair");
    
                return manageRepository.save(manages);
    
            }).orElseGet(() -> {
                manage2.setManageId(manage);
                return manageRepository.save(manage2);
            });
        }



    
    
}