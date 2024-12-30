package com.project.controller.mypage;

import com.project.dto.CustomUserDetails;
import com.project.dto.ResponseDTO;
import com.project.dto.UserReservationDTO;
import com.project.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
@Slf4j
public class MypageStylingController {
    private final MypageService mypageService;

    // 마이페이지 - 나의 예약 목록
    @GetMapping("/styling")
    public ResponseEntity<ResponseDTO<List<UserReservationDTO>>> getMyReservation (
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId(); // 인증된 사용자 ID 가져오기

        // Service에서 예약 리스트 조회
        List<UserReservationDTO> reservations = mypageService.getReservationsByUserId(userId);

        // ResponseDTO 생성
        ResponseDTO<List<UserReservationDTO>> responseDTO = ResponseDTO.<List<UserReservationDTO>>builder()
                .status("success")
                .message("예약 목록 조회 성공")
                .data(reservations)
                .build();

        return ResponseEntity.ok(responseDTO);
    }
}
