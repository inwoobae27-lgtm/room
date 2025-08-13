document.addEventListener('DOMContentLoaded', () => {
    // 클릭 가능한 오브젝트와 모달 요소 가져오기
    const clickableObjects = {
        'flag-obj': 'flag-modal',
        'chalkboard-obj': 'chalkboard-modal',
        'tv-obj': 'tv-modal',
        'desk-obj': 'desk-modal',
        'door-obj': 'door-modal'
    };
    
    const modalContainer = document.getElementById('modal-container');
    const closeButtons = document.querySelectorAll('.close-btn');
    const hintButtons = document.querySelectorAll('.hint-btn');
    const collectedHintsDisplay = document.getElementById('collected-hints');
    const escapeBtn = document.getElementById('escape-btn');
    const passwordInput = document.getElementById('password-input');

    let foundHints = new Set();

    // 획득한 힌트 표시 업데이트 함수
    function updateHintsDisplay() {
        if (foundHints.size === 0) {
            collectedHintsDisplay.textContent = '아직 힌트가 없습니다.';
        } else {
            // Set을 Array로 변환 후 정렬하여 순서가 항상 같도록 함
            const hintsArray = Array.from(foundHints).sort();
            collectedHintsDisplay.textContent = hintsArray.join(' ');
        }
    }

    // 모달 열기 함수
    function openModal(modalId) {
        modalContainer.classList.remove('hidden');
        document.getElementById(modalId).classList.remove('hidden');
    }

    // 모달 닫기 함수
    function closeModal() {
        modalContainer.classList.add('hidden');
        // 모든 모달을 숨김 처리
        document.querySelectorAll('.modal-content').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // 오브젝트 클릭 이벤트 리스너
    for (const [objId, modalId] of Object.entries(clickableObjects)) {
        const obj = document.getElementById(objId);
        if (obj) {
            obj.addEventListener('click', () => openModal(modalId));
        }
    }

    // 닫기 버튼 이벤트 리스너
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // 힌트 확인 버튼 이벤트 리스너
    hintButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const hint = e.target.getAttribute('data-hint');
            alert(`숫자 힌트 '${hint}'를 획득했습니다!`);
            foundHints.add(hint);
            updateHintsDisplay();
            closeModal();
        });
    });

    // 탈출 버튼 이벤트 리스너
    escapeBtn.addEventListener('click', () => {
        if (passwordInput.value === '0815') {
            alert('🎉 탈출 성공! 축하합니다! 🎉');
            closeModal();
        } else {
            alert('비밀번호가 틀렸습니다. 다시 시도해보세요.');
            passwordInput.value = '';
        }
    });

    // 모달 외부 클릭 시 닫기
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // 초기 힌트 표시
    updateHintsDisplay();
});