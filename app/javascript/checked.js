function check() {
  const posts = document.getElementsByClassName("post");
  postsA = Array.from(posts);

  postsA.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    
    post.addEventListener("click",(e) => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();

      XHR.onload = () =>{
        // レスポンス受信したら起動する
        const item = XHR.response.post
        // JSON形式でレスポンスされてきたXHR、コントローラーで定義されたpost(postIdで指定していたupdateされたレコード)を変数itemに代入した
        if (item.checked === true) {
          //更新したレコードitemのカラムcheckedがtrueだったら〜付与する属性("data-check", "true")を、falseなら削除(一回押したこと前提)
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      XHR.onerror = () => {
        alert("Request failed");
      };

      e.preventDefault();

    });
   });
}

setInterval(check, 1000);


// XMLHttpRequestはサーバーにリクエストを送る意外になんかできないの？