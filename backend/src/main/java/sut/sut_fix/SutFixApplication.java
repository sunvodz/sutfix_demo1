package sut.sut_fix;

import sut.sut_fix.repository.*;
import sut.sut_fix.entity.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;
import java.util.stream.Stream;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "https://fixsut2019.firebaseapp.com")
@SpringBootApplication
public class SutFixApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SutFixApplication.class, args);
	}

	@Bean
	CharacterEncodingFilter characterEncodingFilter() {
		CharacterEncodingFilter filter = new CharacterEncodingFilter();
		filter.setEncoding("UTF-8");
		filter.setForceEncoding(true);
		return filter;
	}

	@Bean
	ApplicationRunner init(CustomerRepository customerRepository,
			HistoryRepository historyRepository, RepairRepository repairRepository,
			CaseRepairRepository caseRepairRepository, MajorRepository majorRepository,
			InstituteRepository instituteRepository, ManageRepository manageRepository,
			TechnicRepository technicRepository,SuccessfulRepairRepository successfulRepairRepository

	) {
		return args -> {

			Stream.of("None","สำนักวิชาวิทยาศาสตร์", "สำนักวิชาวิศวกรรมศาสตร์", "สำนักวิชาแพทยศาสตร์", "สำนักวิชาพยาบาลศาสตร์",
					"สำนักวิชาเทคโนโลยีสังคม", "สำนักวิชาเทคโนโลยีการเกษตร", "สำนักวิชาทันตแพทยศาสตร์",
					"สำนักวิชาสาธารณสุขศาสตร์").forEach(institutes -> {
						Institute institutebd = new Institute();
						institutebd.setInstituteName(institutes);
						instituteRepository.save(institutebd);
					});
					Institute Institute1 = instituteRepository.findByInstituteId(1L);
					Institute Institute2 = instituteRepository.findByInstituteId(2L);


			Stream.of("None","สาขาวิชาเคมี", "สาขาวิชาคณิตศาสตร์", "สาขาวิชาชีววิทยา", "สาขาวิชาฟิสิกส์",
					"สาขาวิชาการรับรู้จากระยะไกล", "สาขาวิชาเทคโนโลยีเลเซอร์และโฟตอนนิกส์", "สาขาวิชาจุลชีววิทยา",
					"สาขาวิชาชีวเคมี", "สาขาวิชาวิทยาศาสตร์การกีฬา", "สาขาวิชากายวิภาคศาสตร์", "สาขาวิชาสรีรวิทยา",
					"สาขาวิชาปรสิตวิทยา", "สาขาวิชาเภสัชวิทยา", "สาขาวิชาวิศวกรรมการผลิต", "สาขาวิชาวิศวกรรมเกษตร",
					"สาขาวิชาวิศวกรรมขนส่ง", "สาขาวิชาวิศวกรรมคอมพิวเตอร์", "สาขาวิชาวิศวกรรมเคมี",
					"สาขาวิชาวิศวกรรมเครื่องกล", "สาขาวิชาวิศวกรรมเซรามิก", "สาขาวิชาวิศวกรรมโทรคมนาคม",
					"สาขาวิชาวิศวกรรมพอลิเมอร์", "สาขาวิชาวิศวกรรมไฟฟ้า", "สาขาวิชาวิศวกรรมโยธา",
					"สาขาวิชาวิศวกรรมโลหการ", "สาขาวิชาวิศวกรรมสิ่งแวดล้อม", "สาขาวิชาวิศวกรรมอุตสาหการ",
					"สาขาวิชาเทคโนโลยีธรณี", "สาขาวิชาวิศวกรรมอิเล็กทรอนิกส์", "สาขาวิชาแพทย์ศาสตร์",
					"สำนักวิชาพยาบาลศาสตร์", "สาขาวิชาศึกษาทั่วไป", "สาขาวิชาภาษาต่างประเทศ",
					"สาขาวิชาเทคโนโลยีสารสนเทศ", "สาขาวิชาเทคโนโลยีการจัดการ", "สาขาวิชาเทคโนโลยีการผลิตพืช",
					"สาขาวิชาเทคโนโลยีการผลิตสัตว์", "สาขาวิชาเทคโนโลยีชีวภาพ", "สาขาวิชาเทคโนโลยีอาหาร","สาขาวิชาทันตแพทยศาสตร์",
					"สาขาวิชาอาชีวอนามัยและความปลอดภัย","สาขาวิชาอนามัยสิ่งแวดล้อม")
					.forEach(majors -> {
						Major majordb = new Major();
						majordb.setMajorName(majors);
						majorRepository.save(majordb);
					});
					Major Major1 = majorRepository.findByMajorId(1L);
					Major Major17 = majorRepository.findByMajorId(17L);
					Major Major18 = majorRepository.findByMajorId(18L);



			String dateB1 = "1997-04-20";
            String dateB2 = "1996-05-21";
            DateTimeFormatter lformatterb = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateB1c = LocalDate.parse(dateB1, lformatterb);
			LocalDate dateB2c = LocalDate.parse(dateB2, lformatterb);
			
			Customer customerdb1 = new Customer();
			customerdb1.setCusId(1L);
			// customerdb1.setCustomerIDs("B5917471");
			// customerdb1.setCustomerName("TungAo");
			customerdb1.setCustomerUid("3UvUYt0SxBauhaIlcfnPmgaU4Gv1");
			// // customerdb1.setCustomerBirthday(dateB1c);
			// customerdb1.setCustomerPhone("0861419833");
			// customerdb1.setCustomerImg("dghdghdghgdh");
			// customerdb1.setCustomerEmail("GG@GG.com");
			// customerdb1.setCustomerGender("Male");
			customerdb1.setInstitute(Institute1);
			customerdb1.setMajor(Major1);
			customerRepository.save(customerdb1);

			Customer customerdb2 = new Customer();
			customerdb2.setCusId(2L);
			// customerdb2.setCustomerIDs("B5917433");
			// customerdb2.setCustomerName("SunvoDz");
			customerdb2.setCustomerUid("1PE7yFLBvRbqiu6Y51wJruutHwY2");
			// // customerdb2.setCustomerBirthday(dateB2c);
			// customerdb2.setCustomerPhone("0987650021");
			// customerdb2.setCustomerImg("ukikuku");
			// customerdb2.setCustomerEmail("GG2@GG.com");
			// customerdb2.setCustomerGender("Male");
			customerdb2.setInstitute(Institute1);
			customerdb2.setMajor(Major1);
			customerRepository.save(customerdb2);

			// Customer customerdb3 = new Customer();
			// customerdb3.setCusId(3L);
			// customerdb3.setCustomerIDs("B5917440");
			// customerdb3.setCustomerName("Arm");
			// customerdb3.setCustomerUid("CbDLoe3eUXc5FZ7lvMeh8oe2ztZ2");
			// // customerdb3.setCustomerBirthday(dateB2c);
			// customerdb3.setCustomerPhone("0987650021");
			// customerdb3.setCustomerImg("ukikuku");
			// customerdb3.setCustomerEmail("GG2@GG.com");
			// customerdb3.setCustomerGender("Male");
			// customerdb3.setInstitute(Institute2);
			// customerdb3.setMajor(Major18);
			// customerRepository.save(customerdb3);

			// Customer customerdb4 = new Customer();
			// customerdb4.setCusId(4L);
			// customerdb4.setCustomerIDs("C4");
			// customerdb4.setCustomerName("GG");
			// customerdb4.setCustomerUid("123456");
			// // customerdb4.setCustomerBirthday(dateB2c);
			// customerdb4.setCustomerPhone("0987650021");
			// customerdb4.setCustomerImg("ukikuku");
			// customerdb4.setCustomerEmail("GG2@GG.com");
			// customerdb4.setCustomerGender("Male");
			// customerdb4.setInstitute(Institute2);
			// customerdb4.setMajor(Major18);
			// customerRepository.save(customerdb4);

			Customer c1 = customerRepository.findByCusId(1L);
			Customer c2 = customerRepository.findByCusId(2L);
			// Customer c3 = customerRepository.findByCusId(3L);
			// Customer c4 = customerRepository.findByCusId(4L);
			
			Stream.of("อาการ บูตเครื่องขึ้นมาแล้ว ทุกอย่างไม่ทำงานและเงียบสนิท", "อาการ บูตเครื่องแล้วจอมืด แต่ไฟ LED หน้าจอและไฟเคสติด", "อาการ ที่จอภาพแสดงข้อความผิดพลาดว่า HDD FAILURE", "อาการ เมื่อบูตเครื่องขึ้นมาแล้วมีสัญญาณเตือนดัง",
					"เครื่อง มักจะแฮงค์ ปิดเครื่องแล้วเปิดใหม่ ก็ใช้งานต่อได้อีกสักพักแล้วก็แฮงค์อีก ", "เครื่องแฮงค์หรือดับไปเอง หรือ Restart เอง ", "สีเพี้ยน",
					"ไฟเข้าสัญญานภาพมาแต่ภาพไม่ขึ้น ", "สีเลอะ", "ภาพเบลอ", "ลงโปรแกรมในการเรียน",
					"ลงWindows", "ลงMicrosoft Office", "เข้า Windows ไม่ได้", "ต้องตั้งเวลาใหม่ ทุกครั้งที่เปิดเครื่อง",
					"อุปกรณ์ต่างๆ ไม่ทำงาน", "โปรแกรมค้าง ปิดไม่ได้", " เครื่องแฮงค์เรียกคำสั่งต่าง ๆ มาใช้ไม่ได้",
					"ไอคอน show Desktop ที่ Task Bar หาย", "เครื่องฟ้องฮาร์ดดิสก์ Error", "Shut Down แล้วแฮงค์",
					"Harddisk หลัง Format แล้วไม่เต็มตามจำนวนที่ระบุไว้", "คอมพิวเตอร์ทำงานช้าลง", "ไฟล์ในเครื่องเพิ่มมากขึ้น")
					.forEach(CaseRepair -> {
						CaseRepair CaseRepairbd = new CaseRepair();
						CaseRepairbd.setCaseRepairName(CaseRepair);
						caseRepairRepository.save(CaseRepairbd);
					});
					CaseRepair CaseRepair1 = caseRepairRepository.findByCaseRepairId(1L);
					CaseRepair CaseRepair2 = caseRepairRepository.findByCaseRepairId(2L);
					CaseRepair CaseRepair3 = caseRepairRepository.findByCaseRepairId(3L);
					CaseRepair CaseRepair4 = caseRepairRepository.findByCaseRepairId(4L);
			/*		FileEntity f1 = new FileEntity();
					f1.setFileName("898989898989989.jpg");
					f1.setContentType("image/jpeg");
					f1.setData(null);
					fileEntityRepository.save(f1);
					FileEntity file1 = fileEntityRepository.findByIdImg(1L);	
			
			 Date rBD1R = new Date();
			Repair repair1 = new Repair();
			repair1.setRepairId(1L);
			repair1.setRepairNumber("R1");
			repair1.setComment("งงมากจ้า");
			repair1.setRepairDate(rBD1R);
			repair1.setCaseRepair(CaseRepair1);
			repair1.setCustomer(c1);
			repair1.setRepairStatus("Wait the process");
			repair1.setFileEntity(file1);
			repairRepository.save(repair1);

			Date rBD2R = new Date();
			Repair repair2 = new Repair();
			repair2.setRepairId(2L);
			repair2.setRepairNumber("R2");
			repair2.setComment("งงมากจ้า");
			repair2.setRepairDate(rBD2R);
			repair2.setCaseRepair(CaseRepair2);
			repair2.setCustomer(c2);
			repair2.setFileEntity(file1);
			repair2.setRepairStatus("Repairing");
			repairRepository.save(repair2);

			Date rBD3R = new Date();
			Repair repair3 = new Repair();
			repair3.setRepairId(3L);
			repair3.setRepairNumber("R3");
			repair3.setComment("งงมากจ้า");
			repair3.setRepairDate(rBD3R);
			repair3.setCaseRepair(CaseRepair3);
			repair3.setCustomer(c2);
			repair3.setFileEntity(file1);
			repair3.setRepairStatus("SuccessfullyRepair");
			repairRepository.save(repair3);

			Date rBD4R = new Date();
			Repair repair4 = new Repair();
			repair4.setRepairId(4L);
			repair4.setRepairNumber("R4");
			repair4.setComment("งงมากจ้า");
			repair4.setRepairDate(rBD4R);
			repair4.setCaseRepair(CaseRepair4);
			repair4.setCustomer(c2);
			repair4.setFileEntity(file1);
			repair4.setRepairStatus("Successfully");
			repairRepository.save(repair4);

			Repair r2 = repairRepository.findByRepairId(2L);
			Repair r3 = repairRepository.findByRepairId(3L);
			Repair r4 = repairRepository.findByRepairId(4L);

			Technic technic1 = new Technic();
			technic1.setTechnicId(1L);
			technic1.setInstitute(Institute2);
			technic1.setMajor(Major17);
			technic1.setTechnicName("นายตู่ อุ๊อิ๊");
			technic1.setTechnicNumber("Tec1");
			technic1.setTechnicPhone("0893456789");
			technicRepository.save(technic1);

			Technic t1 = technicRepository.findByTechnicId(1L);

			Manage manage1 = new Manage();
			manage1.setManageId(1L);
			manage1.setManageIDs("M1");
			manage1.setManageDate(rBD4R);
			manage1.setRepair(r2);
			manage1.setTechnic(t1);
			manageRepository.save(manage1);

			Manage manage2 = new Manage();
			manage2.setManageId(2L);
			manage2.setManageIDs("M2");
			manage2.setManageDate(rBD4R);
			manage2.setRepair(r3);
			manage2.setTechnic(t1);
			manageRepository.save(manage2);

			Manage manage3 = new Manage();
			manage3.setManageId(3L);
			manage3.setManageIDs("M3");
			manage3.setManageDate(rBD4R);
			manage3.setRepair(r4);
			manage3.setTechnic(t1);
			manageRepository.save(manage3);

			Manage ma2 = manageRepository.findByManageId(2L);
			Manage ma3 = manageRepository.findByManageId(3L);

			SuccessfulRepair sr1 = new SuccessfulRepair();
			sr1.setSuccessfulRepairId(1L);
			sr1.setSuccessfulRepairIDs("S1");
			sr1.setSuccessfulRepairDate(rBD4R);
			sr1.setManage(ma2);
			successfulRepairRepository.save(sr1);

			SuccessfulRepair sr2 = new SuccessfulRepair();
			sr2.setSuccessfulRepairId(2L);
			sr2.setSuccessfulRepairIDs("S2");
			sr2.setSuccessfulRepairDate(rBD4R);
			sr2.setManage(ma3);
			successfulRepairRepository.save(sr2);

			SuccessfulRepair sr = successfulRepairRepository.findBySuccessfulRepairId(2L);
			
			History history1 = new History();
			history1.setHistoryId(1L);
			history1.setHistoryNumber("H1");
			history1.setHistoryComment("เยี่ยมจริงๆ");
			history1.setHistoryDate(rBD4R);
			history1.setPoint("5");
			history1.setSuccessfulRepair(sr);
			historyRepository.save(history1); */

			System.out.println("\n Spring-Boot Complete");
		};
	}
}