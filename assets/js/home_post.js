{
    // method to submit data for new post using ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM

    let newPostDom = (post) => {
        return $(`<li id = "post-${post._id}">
        <p>
            <small>
                <a class = "delete-post-button" href="/post/destroy/${post._id}">X</a>
            </small>

            ${post.content}
            <br>
            ${ post.user.name }
        </p>
        <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment" required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
    
            <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                </ul>
    
            </div>
    
        </div>
    </li>`)
    }


    // method to delete a post from DOM

    let deletePost = (deleteLink) => {
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post._id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createPost();
}