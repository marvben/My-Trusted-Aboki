const replyButtons = document.querySelectorAll(".reply-button");
const commentUniqueId = document.querySelectorAll(".hiddenInput");
const postContainers = document.querySelectorAll(".post-container");
const postEditButton = document.querySelector(".postEditButton");
const editPostForm = document.querySelector(".editPostForm");
const cancelEditButton = document.querySelector(".cancelEditButton");

replyButtons.forEach((replyButton, i) => {
  replyButton.addEventListener("click", () => {
    replyButton.classList.add("hideReplyButton");

    const formContainer = document.querySelectorAll(".replyFormContainer")[i];
    const replyForm = document.createElement("div");

    replyForm.innerHTML = `
        <form action="/comment" method="post" class="editCommentReplyForm mt-3 bg-warning p-3 rounded">
            <input class="form-control mb-1" type="text" name="usernameOfCommentor" required placeholder="Username">
            <textarea class="form-control" rows="2" name="comment" placeholder="Comment:"></textarea>
            <input type="hidden" name="commentId" value=${
              commentUniqueId[i].value
            } >
            <button class="rounded btn btn-light mt-2 " type="submit">submit</button>
            <a class="rounded btn btn-primary mt-2 cancelSubmitButton${[
              i,
            ]}" >cancel</a>
        </form>`;

    formContainer.appendChild(replyForm);

    const cancelSubmitButton = document.querySelector(
      `.cancelSubmitButton${[i]}`
    );
    cancelSubmitButton.addEventListener("click", function () {
      formContainer.removeChild(replyForm);
      replyButton.classList.remove("hideReplyButton");
    });
  });
});

postEditButton.addEventListener("click", function () {
  editPostForm.style.display = "block";
  postEditButton.style.display = "none";
});

cancelEditButton.addEventListener("click", function () {
  editPostForm.style.display = "none";
  postEditButton.style.display = "block";
});
