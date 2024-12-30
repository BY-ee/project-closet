package com.project.controller.mypage;

import com.project.domain.Users;
import com.project.dto.CustomUserDetails;
import com.project.dto.ResponseDTO;
import com.project.dto.UserDTO;
import com.project.dto.UserGradeDTO;
import com.project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
@Slf4j
public class MypageInfoController {
    private final UserService userService;

    // 비밀번호 변경
    @PutMapping("/password")
    public ResponseEntity<ResponseDTO<Void>> updatePasswordById(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        String newPwd = userDTO.getPassword(); // UserDTO에서 비밀번호 추출
        Long userId = userDetails.getId();

        // 비밀번호 변경 로직 수행
        userService.changePwd(userId, newPwd);

        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("비밀번호가 성공적으로 변경되었습니다.")
                .data(null) // 변경된 비밀번호와 같은 데이터는 응답으로 줄 필요 없으므로 null
                .build();

        return ResponseEntity.ok(response);
    }

    // 신체 정보 수정
    @PutMapping("/body")
    public ResponseEntity<ResponseDTO<Void>> changeBodyInfoById(
            @RequestBody UserDTO userDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getId();
        userService.changeBodyInfo(userId, userDTO);


        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("신체 정보가 저장되었습니다.")
                .data(null) // 변경된 비밀번호와 같은 데이터는 응답으로 줄 필요 없으므로 null
                .build();


        return ResponseEntity.ok(response);
    }

    // 계정 정보 수정
    @PutMapping("/info")
    public ResponseEntity<ResponseDTO<Void>> changeAddInfoById(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                               @RequestBody UserDTO userDTO) {
        long userId = userDetails.getId();
        userService.changeAddInfo(userId, userDTO);

        // 응답 반환
        ResponseDTO<Void> response = ResponseDTO.<Void>builder()
                .status("success")
                .message("추가 정보가 저장되었습니다.")
                .data(null)
                .build();

        return ResponseEntity.ok(response);
    }

    // 등급, 적립율 조회
    @GetMapping("/grade")
    public ResponseEntity<ResponseDTO<UserGradeDTO>> findGradeByUserId(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId();

        // 서비스에서 UserGradeDTO 반환
        UserGradeDTO userGradeDTO = userService.findGradeByUserId(userId);

        // ResponseDTO 생성
        ResponseDTO<UserGradeDTO> response = ResponseDTO.<UserGradeDTO>builder()
                .status("success")
                .data(userGradeDTO) // UserGradeDTO 객체를 data에 설정
                .build();

        return ResponseEntity.ok(response); // ResponseEntity로 반환
    }

    // 마이페이지 - 프로필 조회
    @GetMapping("/profile-image")
    public ResponseEntity<Resource> getProfileImage(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Users user = userDetails.getUser();
        String fileName = user.getProfileImage();

        if (fileName == null || fileName.isEmpty()) {
            fileName = "basic-image.png"; // 기본 이미지 파일 이름
        }

        try {
            // 서비스에서 파일 경로 가져오기
            Path imagePath = userService.getProfileImagePath(fileName);

            // 이미지 파일을 리소스로 변환
            Resource imageResource = new UrlResource(imagePath.toUri());

            if (!imageResource.exists() || !imageResource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // MIME 타입 감지 및 기본값 설정
            String mimeType;
            try {
                mimeType = Files.probeContentType(imagePath);
                if (mimeType == null) {
                    mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // 기본 MIME 타입
                }
            } catch (IOException e) {
                mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE; // 예외 발생 시 기본 MIME 타입
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .contentType(MediaType.parseMediaType(mimeType)) // 감지된 MIME 타입 설정
                    .body(imageResource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 프로필 이미지 업로드
    @PostMapping("/profile-image")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getId(); // 인증된 사용자 ID 가져오기

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일이 비어 있습니다.");
        }

        try {
            // 파일 저장 및 이름 반환
            String newFileName = userService.saveProfileImage(file, userId);

            // 사용자 프로필 이미지 이름 업데이트
            userService.updateProfileImage(userId, newFileName);

            return ResponseEntity.ok(newFileName); // 새 파일 이름 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body("파일 업로드 실패: " + e.getMessage());
        }
    }
}
