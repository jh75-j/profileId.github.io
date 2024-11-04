(function($) {
	// jQuery의 $를 사용하여 코드 실행
	
	var $window = $(window), // 현재 윈도우 객체를 jQuery 객체로 저장
			$body = $('body'), // body 요소를 jQuery 객체로 저장
			$header = $('#header'), // ID가 'header'인 요소를 jQuery 객체로 저장
			$all = $body.add($header); // body와 header를 하나의 jQuery 객체로 결합

	// 브레이크포인트 설정
	breakpoints({
			xxlarge: [ '1681px',  '1920px' ], // xxlarge 화면 크기
			xlarge:  [ '1281px',  '1680px' ], // xlarge 화면 크기
			large:   [ '1001px',  '1280px' ], // large 화면 크기
			medium:  [ '737px',   '1000px' ], // medium 화면 크기
			small:   [ '481px',   '736px'  ], // small 화면 크기
			xsmall:  [ null,      '480px'  ]  // xsmall 화면 크기
	});

	// 모바일 브라우저 감지
	if (browser.mobile) {
			$body.addClass('is-touch'); // 모바일 브라우저일 경우 'is-touch' 클래스 추가
	} else {
			// 'small' 이하일 경우 'is-touch' 클래스 추가
			breakpoints.on('<=small', function() {
					$body.addClass('is-touch');
			});
			// 'small' 초과일 경우 'is-touch' 클래스 제거
			breakpoints.on('>small', function() {
					$body.removeClass('is-touch');
			});
	}

	// Internet Explorer에서의 특수 처리
	if (browser.name == 'ie') {
			var $main = $('.main.fullscreen'), // 전체 화면인 main 요소 선택
					IEResizeTimeout; // 타임아웃 변수 선언

			// IE에서 리사이즈 이벤트 처리
			$window.on('resize.ie-flexbox-fix', function() {
					clearTimeout(IEResizeTimeout); // 이전 타임아웃 정리
					IEResizeTimeout = setTimeout(function() {
							var wh = $window.height(); // 윈도우 높이 저장
							$main.each(function() {
									var $this = $(this); // 현재 요소 jQuery 객체로 저장
									$this.css('height', ''); // 높이 초기화
									if ($this.height() <= wh) // 요소 높이가 윈도우 높이 이하일 경우
											$this.css('height', (wh - 50) + 'px'); // 높이를 윈도우 높이 - 50px로 설정
							});
					});
			})
			.triggerHandler('resize.ie-flexbox-fix'); // 리사이즈 이벤트 강제 발생
	}

	// 갤러리 설정
	$window.on('load', function() {
			var $gallery = $('.gallery'); // 갤러리 요소 선택
			$gallery.poptrox({ // poptrox 플러그인 초기화
					baseZIndex: 10001, // 기본 z-index 설정
					useBodyOverflow: false, // body 오버플로우 사용 안 함
					usePopupEasyClose: false, // 팝업 쉽게 닫기 사용 안 함
					overlayColor: '#1f2328', // 오버레이 색상 설정
					overlayOpacity: 0.65, // 오버레이 투명도 설정
					usePopupDefaultStyling: false, // 기본 스타일 사용 안 함
					usePopupCaption: true, // 캡션 사용
					popupLoaderText: '', // 로더 텍스트 비워둠
					windowMargin: 50, // 윈도우 여백 설정
					usePopupNav: true // 팝업 내비게이션 사용
			});

			// 작은 화면에서 갤러리 여백 조정
			breakpoints.on('>small', function() {
					$gallery.each(function() {
							$(this)[0]._poptrox.windowMargin = 50; // 큰 화면에서 여백 50px
					});
			});

			breakpoints.on('<=small', function() {
					$gallery.each(function() {
							$(this)[0]._poptrox.windowMargin = 5; // 작은 화면에서 여백 5px
					});
			});
	});

	// 섹션 전환 설정
	if (browser.canUse('transition')) { // CSS transition 지원 여부 확인
			var on = function() {
					// 갤러리에 대한 스크롤 이벤트 설정
					$('.gallery').scrollex({
							top: '30vh', // 상단 기준
							bottom: '30vh', // 하단 기준
							delay: 50, // 딜레이 설정
							initialize: function() { $(this).addClass('inactive'); }, // 초기화 시 비활성화
							terminate: function() { $(this).removeClass('inactive'); }, // 종료 시 활성화
							enter: function() { $(this).removeClass('inactive'); }, // 진입 시 활성화
							leave: function() { $(this).addClass('inactive'); } // 이탈 시 비활성화
					});

					// 일반 섹션에 대한 스크롤 이벤트 설정
					$('.main.style1').scrollex({
							mode: 'middle', // 중앙 기준 모드 설정
							delay: 100, // 딜레이 설정
							initialize: function() { $(this).addClass('inactive'); },
							terminate: function() { $(this).removeClass('inactive'); },
							enter: function() { $(this).removeClass('inactive'); },
							leave: function() { $(this).addClass('inactive'); }
					});

					$('.main.style2').scrollex({
							mode: 'middle',
							delay: 100,
							initialize: function() { $(this).addClass('inactive'); },
							terminate: function() { $(this).removeClass('inactive'); },
							enter: function() { $(this).removeClass('inactive'); },
							leave: function() { $(this).addClass('inactive'); }
					});

					// 연락처 섹션에 대한 스크롤 이벤트 설정
					$('#contact').scrollex({
							top: '50%', // 중앙 기준
							delay: 50,
							initialize: function() { $(this).addClass('inactive'); },
							terminate: function() { $(this).removeClass('inactive'); },
							enter: function() { $(this).removeClass('inactive'); },
							leave: function() { $(this).addClass('inactive'); }
					});
			};

			var off = function() {
					// 스크롤 이벤트 해제
					$('.gallery').unscrollex();
					$('.main.style1').unscrollex();
					$('.main.style2').unscrollex();
					$('#contact').unscrollex();
			};

			// 작은 화면에서는 이벤트 해제
			breakpoints.on('<=small', off);
			breakpoints.on('>small', on); // 큰 화면에서는 이벤트 설정
	}

	// 이벤트 설정
	var resizeTimeout, resizeScrollTimeout; // 타임아웃 변수 선언
	$window.on('resize', function() {
			$body.addClass('is-resizing'); // 리사이즈 중 클래스 추가
			clearTimeout(resizeTimeout); // 이전 타임아웃 정리
			resizeTimeout = setTimeout(function() {
					// 스크롤링 링크에 대한 설정
					$('a[href^="#"]').scrolly({
							speed: 1500, // 스크롤 속도 설정
							offset: $header.outerHeight() - 1 // 헤더 높이에 따른 오프셋 설정
					});

					setTimeout(function() {
							$body.removeClass('is-resizing'); // 리사이즈 종료 클래스 제거
							$window.trigger('scroll'); // 스크롤 이벤트 강제 발생
					}, 0);
			}, 100); // 100ms 후 실행
	})
	.on('load', function() {
			$window.trigger('resize'); // 페이지 로드 시 리사이즈 이벤트 발생
	});

})(jQuery); // jQuery를 사용하여 즉시 실행 함수 종료
