package com.project.controller.mypage;

import com.project.dto.CustomUserDetails;
import com.project.dto.ResponseDTO;
import com.project.dto.UserItemInquiryDTO;
import com.project.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
@Slf4j
public class MypageInquiryController {
    private final MypageService mypageService;

    // 마이페이지 - 내 문의내역 조회
    @GetMapping("/inquiries")
    public ResponseEntity<ResponseDTO<Page<UserItemInquiryDTO>>> getInquiriesByUser(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Long userId = userDetails.getId();
        Pageable pageable = PageRequest.of(page, size);

        Page<UserItemInquiryDTO> dtoPage = mypageService.getInquiriesByUser(userId, pageable);

        ResponseDTO<Page<UserItemInquiryDTO>> response = ResponseDTO.<Page<UserItemInquiryDTO>>builder()
                .status("success")
                .data(dtoPage)
                .build();

        return ResponseEntity.ok(response);
    }
}
