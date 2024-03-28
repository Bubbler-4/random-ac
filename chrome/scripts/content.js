const QUERY_LENGTH_LIMIT = 512;
const PROBLEMS_COUNT_LIMIT = 50;

const problemsDiv = document.querySelector('.container div div.col-md-7');
const queryHTML = `
<div>
    <table class="table table-bordered">
        <thead>
            <tr><th style="width:90%;">쿼리</th><th style="width:10%;">개수</th></tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="text" class="form-control" id="random-ac-query" maxlength="${QUERY_LENGTH_LIMIT}"></td>
                <td><input type="text" class="form-control" id="random-ac-count" min="1" max="${PROBLEMS_COUNT_LIMIT}" required></td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:-10px;">쿼리와 문제 수를 입력하신 후, Enter 키를 눌러 주세요. 쿼리 작성법이 궁금하실 경우 <a href="https://solved.ac/search" target="__blank">이 페이지</a>를 참고해 주세요.</p>
    <p style="color:#a94442;" id="random-ac-error-message"></p>
</div>
`.trim().replace(/    |\n/g, '');
const parser = new DOMParser();
const queryDocument = parser.parseFromString(queryHTML, 'text/html');
const queryUiElement = queryDocument.body.firstChild;
problemsDiv.append(queryUiElement);

const queryElement = document.getElementById('random-ac-query');
const countElement = document.getElementById('random-ac-count');
const errorMessageElement = document.getElementById('random-ac-error-message');

function keyboardHandler(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const query = queryElement.value;
        const count = countElement.value;
        const numericCount = Number(count);

        if (query.length > QUERY_LENGTH_LIMIT) {
            errorMessageElement.innerText = `쿼리가 너무 깁니다. ${QUERY_LENGTH_LIMIT}자 이하로 입력해 주세요.`;
            queryElement.select();
            return;
        }

        if (count.trim() === '') {
            errorMessageElement.innerText = '개수를 입력해 주세요.';
            countElement.select();
            return;
        }

        if (isNaN(numericCount) || numericCount % 1 !== 0 || numericCount <= 0) {
            errorMessageElement.innerText = '추첨할 문제의 수는 양의 정수여야 합니다.';
            countElement.select();
            return;
        }

        if (count > PROBLEMS_COUNT_LIMIT) {
            errorMessageElement.innerText = `문제 수가 너무 많습니다. ${PROBLEMS_COUNT_LIMIT}문제 이하로 입력해 주세요.`;
            countElement.select();
            return;
        }

        (async () => {
            const { isSuccess, problems, errorMessage } = 
                await chrome.runtime.sendMessage({ query, count });

            errorMessageElement.innerText = isSuccess ? '' : errorMessage;
        })();
    }
}

queryElement.addEventListener('keyup', keyboardHandler);
countElement.addEventListener('keyup', keyboardHandler);
