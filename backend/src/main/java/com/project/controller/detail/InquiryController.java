package com.project.controller.detail;

import com.project.dto.ItemInquiryDTO;
import com.project.dto.UserItemInquiryDTO;
import com.project.service.ItemInquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
@Slf4j
public class InquiryController {
    private final ItemInquiryService itemInquiryService;

    @GetMapping("/products/{productId}")
    public ResponseEntity<List<UserItemInquiryDTO>> getInquiries(@PathVariable("productId") Long productId) {
        List<UserItemInquiryDTO> inquiries = itemInquiryService.findAllByProductId(productId);
        return ResponseEntity.ok(inquiries); // JSON 형식으로 반환
    }

    @GetMapping("/products/{productId}/count")
    public Long getCountInquiries(@PathVariable("productId") Long productId) {
        return itemInquiryService.countInquiriesByItemId(productId);
    }

    @PostMapping
    public ResponseEntity<List<String>> saveInquiry(@RequestBody ItemInquiryDTO itemInquiryDTO) {
        itemInquiryService.saveInquiry(itemInquiryDTO);

        List<String> response = new ArrayList<>();
        response.add("status: success");
        response.add("message: Inquiry saved successfully.");
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/inactivation")
    public ResponseEntity<String> inactivateInquiry(@PathVariable Long id) {
        itemInquiryService.inactivateInquiry(id);
        return ResponseEntity.ok("상품 문의 비활성화가 완료 되었습니다");
    }

    @PatchMapping("/{id}/activation")
    public ResponseEntity<String> activateInquiry(@PathVariable Long id) {
        itemInquiryService.activateInquiry(id);
        return ResponseEntity.ok("상품 문의 활성화가 완료 되었습니다");
    }
}
