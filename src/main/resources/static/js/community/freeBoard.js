$('#regBtn').click(() => {
    $(".content").load("/write?lang=" + getCookie('APPLICATION_LOCALE'), {boardCategoryNo: 1});
});