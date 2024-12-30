// Hooks
import { useEffect, useState } from 'react';

// CSS
import styles from './ReservationModal.module.css';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

// Components
import Calendar from 'react-calendar';
import moment from 'moment';
import { call } from '../../../api/auth/ApiService';
import ReservationTime from '../../../components/features/styling/ReservationTime';

const ReservationModal = ({ isOpen, setIsOpen, coordiId, user }) => {
  const [value, onChange] = useState(
    // 초기 상태를 다음날로 지정
    new Date().getTime() + 1000 * 60 * 60 * 24
  );
  const [select, setSelect] = useState(9); // 선택 시간
  // const [mark, setMark] = useState([]); // 예약일자 상태
  const mark = ['2024-12-23', '2024-12-26'];

  // 스타일링 예약 함수
  async function reserveStyling() {
    // 캘린더에서 지정한 날짜 + 시간을 변수에 저장
    const date = new Date(value);
    date.setHours(select, 0, 0, 0);

    // 로컬 시간으로 ISO 8601 형식 문자열 생성
    const pad = (num) => String(num).padStart(2, '0'); // 숫자 두 자리로 패딩
    const localDateTime = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}.${String(date.getMilliseconds()).padStart(3, '0')}`;

    console.log(localDateTime);

    // reservation 테이블에 저장할 데이터를 객체에 저장
    const reservation = {
      userId: user.id,
      coordiId: coordiId,
      reservationDate: localDateTime,
    };
    console.log(reservation);

    // 서버에 예약 데이터 전송
    try {
      const data = await call(`/styling`, 'POST', reservation);
      console.log('서버 반환 데이터:', data);

      alert(data.message);
      setIsOpen(false);
      setSelect(9);
    } catch (error) {
      console.error('API 호출 실패:', error);

      // 서버에서 전송한 status에 따른 예외 처리
      if (error.status === 500) {
        alert('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      } else {
        alert(error.message || '알 수 없는 오류가 발생했습니다.');
      }
    }
  }

  // Modal의 상태 변경마다 실행
  useEffect(() => {
    // 캘린더 초기화
    const initializeCalendar = () => {
      onChange(new Date().getTime() + 1000 * 60 * 60 * 24);
    };

    // 스크롤 최상단으로 이동
    const resetScrollPosition = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };

    // 스크롤 비활성화
    const disableScroll = () => {
      document.querySelector('html').setAttribute('style', 'overflow: hidden');
    };

    // 스크롤 활성화
    const enableScroll = () => {
      document.querySelector('html').removeAttribute('style');
    };

    // 각 함수 캡슐화
    if (isOpen) {
      initializeCalendar();
      resetScrollPosition();
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isOpen]);

  // 날짜를 변경할 때마다 시간을 9시로 초기화
  useEffect(() => {
    setSelect(9);
  }, [value]);

  // 예약이 불가한 날짜를 선택할 시 예외 처리
  useEffect(() => {
    if (value < new Date()) {
      alert('현재 날짜보다 이전 날짜를 선택할 수 없습니다.');
      onChange(new Date().getTime() + 1000 * 60 * 60 * 24);
    }
  }, [value]);

  return (
    isOpen && (
      <div className={styles.container}>
        <div className={`${styles['calendar-container']}`}>
          <h3 className={styles['calendar-title']}>스타일링 예약</h3>

          <Calendar
            value={value}
            onChange={onChange}
            formatDay={(locale, date) => moment(date).format('DD')}
            showNeighboringMonth={false}
            tileContent={({ date, view }) => {
              // 날짜 타일에 컨텐츠 추가하기 (html 태그)
              // 추가할 html 태그를 변수 초기화
              let html = [];
              // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
              if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                html.push(<div className={styles.dot}></div>);
              }
              // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
              return (
                <div
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    transform: 'translateX(150%)',
                  }}
                >
                  {html}
                </div>
              );
            }}
          />

          <div style={{ width: '80%', margin: '0 auto' }}>
            <ReservationTime select={select} setSelect={setSelect} />
          </div>

          <div className="d-flex justify-content-center gap-4 m-b-20">
            <div
              className={`flex-c-m stext-106 cl6 size-104 bor4 pointer ${styles['b-r-10']} ${styles['btn-blue']} trans-04 m-t-30`}
              onClick={() => {
                reserveStyling();
              }}
            >
              예약
            </div>

            <div
              className={`flex-c-m stext-106 cl6 size-104 bor4 pointer ${styles['b-r-10']} ${styles['btn-red']} trans-04 m-t-30`}
              onClick={() => {
                setIsOpen(false);
                setSelect(9);
              }}
            >
              취소
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ReservationModal;
