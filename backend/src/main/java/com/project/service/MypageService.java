package com.project.service;

import com.project.domain.Address;
import com.project.domain.Reservation;
import com.project.dto.*;
import com.project.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class MypageService {

    private final AddressRepository addressRepository;
    private final ItemInquiryRepository itemInquiryRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final StylingRepository stylingRepository;
    private final OrderHistoryRepository orderHistoryRepository;

    // userId로 등록된 배송지 조회( 대표 배송지 + 일반 배송지)
    public List<Address> findByUserId(@RequestParam("userId") long userId) {
        return addressRepository.findByUserId(userId);
    }

    // address의 id 정보값으로 주소값 삭제
    public void deleteById(@PathVariable("id") long id) {
        addressRepository.deleteById(id);
    }

    // 대표 주소지 변경
    public void switchRepresentativeAddress(long addressId, long userId) {
        addressRepository.switchRepresentativeAddress(addressId, userId);
    }

    // 문의내역 조회
    public Page<UserItemInquiryDTO> getInquiriesByUser(Long userId, Pageable pageable) {
        return itemInquiryRepository.findByUsers_Id(userId, pageable);
    }

    // 리뷰 내역 조회
    public Page<UserItemReviewDTO> getMyReviews(Long userId, Pageable pageable) {
        return reviewRepository.getMyReviews(userId, pageable);
    }

    // 주소지 등록
    public void updateAddressByUserId(Long userId, Address address) {
        // 1. 주소 개수 확인 (기존 주소가 3개 이상이면 예외 처리)
        int addressCount = addressRepository.addresscountByUserId(userId); // 주소 개수 확인
        if (addressCount >= 3) {
            throw new RuntimeException("배송지는 최대 3개까지 등록할 수 있습니다. 기존 주소지를 삭제해주세요.");
        }

        // 2. 기존 주소 목록 조회
        List<Address> existingAddresses = addressRepository.findByUserId(userId);

        // 3. 기존 주소 중 대표 주소가 없다면, 새 주소를 대표 주소로 설정
        if (existingAddresses.stream().noneMatch(a -> a.isRepresent() == true)) {
            address.setRepresent(true);// 대표 주소로 설정
        } else {
            address.setRepresent(false); // 대표 주소가 이미 있으면 일반 주소로 설정
        }

        // 4. 새로운 주소 등록
        // Address 엔티티에 userId를 설정
        address.setUserId(userId);

        // Address 엔티티를 JPA 리포지토리를 통해 저장
        addressRepository.save(address);
    }


    public List<UserReservationDTO> getReservationsByUserId(Long userId) {

            // 예약 리스트 조회
            List<Reservation> reservations = stylingRepository.findAllByUserId(userId);

            // DTO로 변환
            return reservations.stream()
                    .map(reservation -> UserReservationDTO.builder()
                            .userId(reservation.getUser().getId()) // 예약한 사용자 ID
                            .reservationId(reservation.getId()) // 예약 ID
                            .coordiId(reservation.getCoordi() != null ? reservation.getCoordi().getId() : null) // 코디네이터 ID
                            .nickname(reservation.getCoordi() != null ? reservation.getCoordi().getNickname() : null) // 코디네이터 닉네임
                            .reservationDate(reservation.getReservationDate()) // 예약 날짜
                            .reservationStatus(reservation.getReservationStatus()) // 예약 상태
                            .build())
                    .toList();
        }

        public List<OrderDetailHistoryDeliveryDTO> getOrdersByUserId(Long userId) {
            return orderHistoryRepository.findOrdersByUserId(userId);
        }


}

