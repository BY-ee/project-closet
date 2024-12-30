package com.project.controller.mypage;

import com.project.domain.Address;
import com.project.domain.Users;
import com.project.dto.CustomUserDetails;
import com.project.dto.ResponseDTO;
import com.project.dto.UserItemReviewDTO;
import com.project.service.MypageService;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mypage/addresses")
@RequiredArgsConstructor
@Slf4j
public class MypageAddressController {
    private final MypageService mypageService;

    // 회원의 모든 등록 배송지 조회
    @GetMapping
    public List<Address> findByUserId(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Users user = userDetails.getUser();
        long userId = user.getId();
        return mypageService.findByUserId(userId);
    }

    // 배송지 입력
    @PostMapping
    public ResponseEntity<ResponseDTO<?>> addAddress(@RequestBody Address address, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        try {
            // 주소 등록 서비스 호출
            mypageService.updateAddressByUserId(userId, address);

            // 성공 응답 반환
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .status("success")
                    .message("주소가 성공적으로 등록되었습니다!")
                    .data("주소가 등록되었습니다")
                    .build();
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // 논리적 에러 (예: 최대 주소 제한 초과)
            ResponseDTO<String> errorResponse = ResponseDTO.<String>builder()
                    .status("error")
                    .message(e.getMessage())
                    .build();
            return ResponseEntity.ok(errorResponse); // HTTP 200으로 에러 반환
        } catch (Exception e) {
            // 시스템 에러
            ResponseDTO<String> errorResponse = ResponseDTO.<String>builder()
                    .status("error")
                    .message("주소 등록 중 문제가 발생했습니다.")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // 대표 주소 변경
    @PutMapping("/{id}/default")
    public void switchRepresentativeAddress(@PathVariable("id") long addressId,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        long userId = userDetails.getId(); // 인증된 사용자의 userId 가져오기
        log.info("userDetails: {}", userId);
        mypageService.switchRepresentativeAddress(addressId, userId);
    }

    // 회원 주소 삭제
    @DeleteMapping("/{id}")
    public void deleteByUserId(@PathVariable("id") long id) {
        mypageService.deleteById(id);
    }
}




