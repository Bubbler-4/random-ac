const problemsDiv = document.querySelector('.container div div.col-md-7');
const queryHTML = `
<table class="table table-bordered">
    <thead>
        <tr><th style="width:90%;">쿼리</th><th style="width:10%;">개수</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><input type="text" class="form-control" id="random-ac-query"></td>
            <td><input type="text" class="form-control" id="random-ac-count"></td>
        </tr>
    </tbody>
</table>
`.trim().replace(/    |\n/g, '');
const parser = new DOMParser();
const queryDocument = parser.parseFromString(queryHTML, 'text/html');
const queryUiElement = queryDocument.body.firstChild;
problemsDiv.append(queryUiElement);

const queryElement = document.getElementById('random-ac-query');
const countElement = document.getElementById('random-ac-count');

function keyboardHandler(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        (async () => {
            const query = queryElement.value;
            const count = countElement.value;
            const problems = await browser.runtime.sendMessage({ query, count });
            problems.forEach(problem => {
                window.wrappedJSObject.problem_add(problem, 1);
            })
        })();
    }
}

queryElement.addEventListener('keyup', keyboardHandler);
countElement.addEventListener('keyup', keyboardHandler);
