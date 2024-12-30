package com.project.controller.mypage;

import com.project.dto.CustomUserDetails;
import com.project.dto.ResponseDTO;
import com.project.dto.UserItemReviewDTO;
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
@RequestMapping("/api/mypage/reviews")
@RequiredArgsConstructor
@Slf4j
public class MypageReviewController {
    private final MypageService mypageService;

    // 마이페이지 - 나의 리뷰 조회
    @GetMapping
    public ResponseEntity<ResponseDTO<Page<UserItemReviewDTO>>> getMyReviews(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Long userId = userDetails.getId();
        Pageable pageable = PageRequest.of(page, size);

        Page<UserItemReviewDTO> dtoPage = mypageService.getMyReviews(userId, pageable);

        ResponseDTO<Page<UserItemReviewDTO>> response = ResponseDTO.<Page<UserItemReviewDTO>>builder()
                .status("success")
                .data(dtoPage)
                .build();

        return ResponseEntity.ok(response);
    }
}
