const boardCategoryNo = $("#boardCategoryNo").val();
const searchBtn = $("#searchBtn");
const statePageNum = history.state.pageNum; // 현재 pageNum 상태 확인
const typeState = history.state.type;
const keywordState = history.state.keyword;
//keyword 랑 저장하기 위해서
$("#type").val(typeState || "t");
$("#keyword").val(keywordState);

let url = "";
switch (boardCategoryNo) {
    case 1:
        url = "/freeBoard";
        break;
    case 2:
        url = "/multiMedia";
        break;
    case 3:
        url = "/football";
        break;
    case 4:
        url = "/notice";
        break;
    //ToDo 보드 카테고리 추가시 추가
}

//정보 가져오는 function
function loadList(criteriaModel) {
    $.get("/board/infoList", criteriaModel, (result) => {
        //페이징처리 위해서 갯수 가져오는 ajax
        $.get("/board/totalCnt", criteriaModel, (totalCnt) => {
            let str = "";
            for (let i = 0; i < result.length; i++) {
                const timestamp = new Date(result[i].createDt);
                const month = timestamp.getMonth() + 1;
                const date = timestamp.getDate();
                let inputIcon = getUserIcon(result[i].userNo);

                if (result[i].notice === true) {
                    str += "<tr>\n" +
                        "            <td class='text-left text-gray text-center bold'><h5><span class='badge badge-danger'>공지</span> <a class='boardLink text-danger' onclick='' id='" + result[i].boardNo + "'>" + result[i].title + "</a>" + "</h5></td>\n" +
                        "            <td class='row'><div style='display: block; margin-right: auto; margin-left: auto'>" + inputIcon + result[i].writer + "</div></td>\n" +
                        "            <td>" + timestamp.getFullYear() + "-" + calendar(month, 2) + "-" + calendar(date, 2) + "</td>\n" +
                        "            <td>" + result[i].hit + "</td>\n" +
                        "            <td>" + result[i].good + "</td>\n" +
                        "        </tr>"

                } else {
                    str += "        <tr>\n" +
                        "            <td class=\"text-left text-gray\"><a class='boardLink text-dark' onclick='' id='" + result[i].boardNo + "'>" + result[i].title + "</a>" + " [" + result[i].replyCnt + "]" + "</td>\n" +
                        "            <td class='row'><div style='display: block; margin-right: auto; margin-left: auto'>" + inputIcon + result[i].writer + "</div></td>\n" +
                        "            <td>" + timestamp.getFullYear() + "-" + calendar(month, 2) + "-" + calendar(date, 2) + "</td>\n" +
                        "            <td>" + result[i].hit + "</td>\n" +
                        "            <td>" + result[i].good + "</td>\n" +
                        "        </tr>"
                }
            }
            $("#list").html(str);

            const pageNum = criteriaModel.pageNum;
            if (pageNum === -1) {
                pageMaker(1, totalCnt);
            } else {
                pageMaker(pageNum, totalCnt)
            }

            $(".boardLink").click(function () {
                const getBoardId = $(this).closest("a").attr('id');
                $.get("/read?lang=" + getCookie('APPLICATION_LOCALE'), {
                    boardNo: getBoardId,
                    boardCategoryNo: boardCategoryNo
                }, (result) => {
                    $(".boardContent").html(result);
                    history.pushState({
                        data: "/read",
                        boardNo: getBoardId,
                        boardCategoryNo: boardCategoryNo
                    }, null, '/read?lang=' + getCookie('APPLICATION_LOCALE') + '&boardNo=' + getBoardId);
                })
            });
        });
    })
}


function pageAction(i) {
    const criteriaModel = {
        type: $("#type").val(),
        keyword: $("#keyword").val(),
        boardCategoryNo: boardCategoryNo,
        pageNum: i
    };
    loadList(criteriaModel);

    history.pushState({
        data: url,
        boardCategoryNo: criteriaModel.boardCategoryNo,
        type: criteriaModel.type,
        keyword: criteriaModel.keyword,
        pageNum: i
    }, null, url + "?lang=" + getCookie('APPLICATION_LOCALE') + "&type=" + criteriaModel.type + "&keyword=" + criteriaModel.keyword + "&pageNum=" + i);
}

searchBtn.click(function () {
    const criteriaModel = {
        type: $("#type").val(),
        keyword: $("#keyword").val(),
        boardCategoryNo: boardCategoryNo,
        pageNum: 1
    };
    loadList(criteriaModel);
    history.pushState({
        data: url,
        boardCategoryNo: criteriaModel.boardCategoryNo,
        type: criteriaModel.type,
        keyword: criteriaModel.keyword,
        pageNum: criteriaModel.pageNum
    }, null, url + "?lang=" + getCookie('APPLICATION_LOCALE') + "&type=" + criteriaModel.type + "&keyword=" + criteriaModel.keyword + "&pageNum=" + criteriaModel.pageNum);
});

//페이지 로딩시 초기값 가져오기 위해서
let criteriaModel = {
    type: typeState,
    keyword: keywordState,
    boardCategoryNo: boardCategoryNo,
    pageNum: statePageNum || -1
};
//페이지 로딩시 작동
loadList(criteriaModel);

