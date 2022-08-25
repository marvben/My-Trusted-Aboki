const displayEditForms = document.querySelectorAll(".displayEditForm");
const hideEditForms = document.querySelectorAll(".hideEditForm");
const editForms = document.querySelectorAll(".editCommentReplyForm");
const editCommentReplyInputs = document.querySelectorAll(".editCommentReplyInput");
const commentTexts = document.querySelectorAll(".comment-text .text");





displayEditForms.forEach((displayEditForm, i)=>{
    displayEditForm.addEventListener("click", ()=>{
        editForms[i].style.display="block";
        editCommentReplyInputs[i].value = commentTexts[i].innerText ;
})
})


hideEditForms.forEach((hideEditForm, i)=>{
    hideEditForm.addEventListener("click", ()=>{
        editForms[i].style.display="none"
})
})