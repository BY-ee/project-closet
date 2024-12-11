package com.project.dto;

import com.project.domain.detail.ItemInquiry;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInquiryDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long itemDetailId;
    private String content;
    private ItemInquiry.InquiryType inquiryType;
    private ItemInquiry.AnswerStatus answerStatus  = ItemInquiry.AnswerStatus.Pending;
    private ItemInquiry.Status status= ItemInquiry.Status.active;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
