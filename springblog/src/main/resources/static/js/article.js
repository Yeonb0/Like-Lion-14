window.addEventListener('DOMContentLoaded', () => {
  const imageUrl = document.getElementById('image-url')?.value;
  if (imageUrl) {
    displayImagePreview(imageUrl);
  }
});

// 이미지 업로드 버튼
const imageUpload = document.getElementById('image-upload');
if (imageUpload) {
  imageUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then((response) => {
      if (!response.ok) {
        alert('이미지 업로드에 실패했습니다.');
        throw new Error();
      }
      return response.json();
    })
      .then((data) => {
        document.getElementById('image-url').value = data.imageUrl;
        displayImagePreview(data.imageUrl);
      })
      .catch((e) => console.error(e));
  });
}

function displayImagePreview(imageUrl) {
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-img');

  if (preview && previewImg && imageUrl) {
    previewImg.src = imageUrl;
    preview.style.display = 'block';
  }
}

// 이미지 제거 버튼
const removeImageButton = document.getElementById('remove-image-btn');
if (removeImageButton) {
  removeImageButton.addEventListener('click', () => {
    document.getElementById('image-url').value = '';
    document.getElementById('image-upload').value = '';
    document.getElementById('image-preview').style.display = 'none';
  });
}

const deleteButton = document.getElementById('delete-btn');

if (deleteButton) {
  deleteButton.addEventListener('click', event => {
    let id = document.getElementById('article-id').value;
    fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      alert('삭제가 완료되었습니다.');
      location.replace('/articles');
    })
  });
} 

// AI 썸네일 생성 버튼
// 1. id 가 ai-thumbnail-btn 인 요소 조회
const aiThumbnailButton = document.getElementById('ai-thumbnail-btn');
if (aiThumbnailButton) {
  aiThumbnailButton.addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 2. 제목, 내용이 비어있으면 경고창 띄우기
    if (!title.trim() && !content.trim()) {
      alert('제목이나 내용을 먼저 입력해주세요.');
      return;
    }

    // 3. 로딩 모달 표시
    const loadingDiv = document.getElementById('ai-thumbnail-loading');
    loadingDiv.style.display = 'block';
    aiThumbnailButton.disabled = true;

    // 4. AI 섬네일 생성 API 호출
    fetch('/api/ai-thumbnails', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        alert('썸네일 생성에 실패했습니다.');
        throw new Error();
      }
      return response.json();
    }).then((data) => {
      // 5. 이미지 URL 을 이미지 URL 입력란에 설정하고 미리보기 표시
      document.getElementById('image-url').value = data.imageUrl;
      displayImagePreview(data.imageUrl);
    }).finally(() => {
      loadingDiv.style.display = 'none';
      aiThumbnailButton.disabled = false;
    });
  });
}

// 수정 기능
// id 가 modify-btn 인 요소 조회
const modifyButton = document.getElementById('modify-btn');

if(modifyButton) {
  modifyButton.addEventListener('click', event => {
    let params = new URLSearchParams(location.search);
    let id = params.get('id');

    fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
      })
    })
    .then(() => {
      alert('수정이 완료되었습니다.');
      location.replace(`/articles/${id}`);
    });
  });
}

// 등록 기능
// id 가 create-btn 인 요소 조회
const createButton = document.getElementById('create-btn');

if (createButton) {

  // 클릭 이벤트 감지 시 생성 API 호출
  createButton.addEventListener('click', event => {
    fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        imageUrl: document.getElementById('image-url').value,
      }),
    })
    .then(() => {
      alert('등록이 완료되었습니다.');
      location.replace('/articles');
    });
  });
}

// 생성하기
// 1. id 가 ai-assist-btn 인 요소 조회
const aiAssistButton = document.getElementById('ai-assist-btn');

if (aiAssistButton) {
  // 2. 클릭 이벤트 감지 -> modal 띄우고 이전 제안 숨기기
  aiAssistButton.addEventListener('click', event => {
    $('#aiAssistModal').modal('show');
    document.getElementById('ai-suggestions').style.display = 'none';
    document.getElementById('ai-question').style.display = 'block';
  });
}

// 3. id 가 get-suggestions-btn 인 요소 조회 (modal 에 있는 버튼)
const getSuggestionsButton = document.getElementById('get-suggestions-btn');

if (getSuggestionsButton) {
  // 4. 클릭 이벤트 감지 -> AI 제안 가져오기
  getSuggestionsButton.addEventListener('click', event => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const question = document.getElementById('ai-question').value;

    if (!question.trim()) {
      alert('고민되는 내용을 입력해주세요.');
      return;
    }

    document.getElementById('ai-loading').style.display = 'block';
    document.getElementById('ai-suggestions').style.display = 'none';

    const body = JSON.stringify({
      title: title,
      content: content,
      question: question,
    });

    fetch('/api/ai-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('ai-loading').style.display = 'none';
      const suggestionContent = document.getElementById('ai-suggestion-content');

      // 5. 응답이 오면 제안 뷰 표시
      let html = '';
      if (data.suggestions && data.suggestions.length > 0) {
        html += '<ul class="list-group">';
        data.suggestions.forEach((suggestion, index) => {
          html += `<li class="list-group-item suggestion-item" style="cursor: pointer;" data-suggestion="${suggestion.replace(/"/g, '&quot;')}"
          title="클릭하면 본문에 추가됩니다"> ${suggestion}
          <small class="text-muted float-right">클릭하여 추가</small>
          </li>`; ;
        });
        html += '</ul>';
      }
      suggestionContent.innerHTML = html;
      document.getElementById('ai-suggestions').style.display = 'block';
    })
    .catch(error => {
      document.getElementById('ai-loading').style.display = 'none';
      console.error('AI 제안 요청 실패:', error);
      alert('AI 제안을 가져오지 못했습니다. 잠시 후 다시 시도해주세요.');
    });
  });
}

// 6. 제안 선택을 누르면 현재 내용 끝에 제안을 추가
const suggestionContent = document.getElementById('ai-suggestion-content');
if (suggestionContent) {
  suggestionContent.addEventListener('click', function(e) {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
      const suggestion = suggestionItem.getAttribute('data-suggestion');
      const contentTextarea = document.getElementById('content');

      const currentContent = contentTextarea.value;
      const separator = currentContent && !currentContent.endsWith('\n') ? '\n\n' : '';

      contentTextarea.value = currentContent + separator + suggestion;

      $('#aiAssistModal').modal('hide');
      contentTextarea.focus();
    }
  });
}

// 생성 기능
const createButton = document.getElementById('create-btn');

if (createButton) {
  // 등록 버튼을 클릭하면 /api/articles 로 요청을 보냄
  createButton.addEventListener('click', event => {
    body = JSON.stringify({
      title: document.getElementById('title').value,
      imgUrl: document.getElementById('image-url').value,
      content: document.getElementById('content').value,
    })
    const success = () => {
      alert('등록 완료되었습니다.');
      location.replace('/articles');
    }
    const fail = () => {
      alert('등록 실패했습니다.');
      location.replace('/articles');
    }

    httpRequest('POST', '/api/articles', body, success, fail)
  });
}

// 쿠키를 가져오는 함수
const getCookey = (key) => {
  var result = null;
  var cookie = document.cookie.split(';');
  cookie.some((item) => {
    item = item.replace(' ', '');

    var dic = item.split('=');

    if (key === dic[0]) {
      result = dic[1];
      return true;
    }
  });
  return result;
}

// HTTP 요청을 보내는 함수
const httpRequest = (method, url, body, success, fail) => {
  fetch(url, {
    method: method,
    headers: {
      // 로컬 스토리지에서 액세스 토큰 값을 가져와 헤더에 추가
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: body,
  }).then((response) => {
    if (response.status === 401 && refreshToken) {
      fetch("/api/token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          "Content-Type": "application/json"
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        // 재발급이 성공하면 로컬 스토리지 값을 새로운 액세스 토큰으로 교체
        localStorage.setItem("access_token", result.accessToken);
        httpRequest(method, url, body, success, fail);
      })
      .catch((error) => fail());
    } else {
      return fail();
    }
  })
};

// 삭제 기능
const deleteButton = document.getElementById('delete-btn');

if (deleteButton) {
  deleteButton.addEventListener('click', event => {
    let id = document.getElementById('article-id').value;
    const success = () => {
      alert('삭제가 완료되었습니다.');
      location.replace('/articles');
    };

    const fail = () => {
      alert('삭제 실패했습니다.');
      location.replace('/articles');
    };

    httpRequest('DELETE', `/api/articles/${id}`, null, success, fail)
  });
}

// 수정 기능
const modifyButton = document.getElementById('modify-btn');

if(modifyButton) {
  modifyButton.addEventListener('click', event => {
    let params = new URLSearchParams(location.search);
    let id = params.get('id');

    const body = JSON.stringify({
      title: document.getElementById('title').value,
      imageUrl: document.getElementById('image-url').value,
      content: document.getElementById('content').value,
    });

    const success = () => {
      alert('수정 완료되었습니다.');
      location.replace(`/articles/${id}`);
    };

    const fail = () => {
      alert('수정 실패했습니다.');
      location.replace(`/articles/${id}`);
    };

    httpRequest('PUT', `/api/articles/${id}`, body, success, fail)
  });
}

// 로그아웃 기능
const logoutButton = document.getElementById('logout-btn');

if (logoutButton) {
  logoutButton.addEventListener('click', event => {
    const success = () => {
      // 로컬 스토리지에 저장된 액세스 토큰 삭제
      localStorage.removeItem('access_token');

      // 쿠키에 저장된 리프레시 토큰 삭제
      deleteCookie('refresh_token');
      location.replace('/login');
    };

    const fail = () => {
      alert('로그아웃 실패했습니다.');
    };

    httpRequest('POST', '/api/logout', null, success, fail)
  });
}