package com.project.controller.mypage;

import com.project.dto.CustomUserDetails;
import com.project.dto.OrderDetailHistoryDeliveryDTO;
import com.project.dto.ResponseDTO;
import com.project.service.MypageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
public class MypageOrderController {
    private final MypageService mypageService;

    // 마이페이지 - 주문내역조회
    @GetMapping("/order")
    public ResponseEntity<ResponseDTO<List<OrderDetailHistoryDeliveryDTO>>> getOrdersByUserId(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        long userId = userDetails.getId();

        try {
            // 서비스 호출
            List<OrderDetailHistoryDeliveryDTO> orders = mypageService.getOrdersByUserId(userId);

            // 성공 응답 생성
            ResponseDTO<List<OrderDetailHistoryDeliveryDTO>> response = ResponseDTO.<List<OrderDetailHistoryDeliveryDTO>>builder()
                    .status("success")
                    .message("주문 내역 조회 성공")
                    .data(orders)
                    .build();

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // 에러 응답 생성
            ResponseDTO<List<OrderDetailHistoryDeliveryDTO>> response = ResponseDTO.<List<OrderDetailHistoryDeliveryDTO>>builder()
                    .status("error")
                    .message("주문 내역 조회 실패")
                    .error(e.getMessage())
                    .build();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
