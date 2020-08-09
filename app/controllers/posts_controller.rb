class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")

  end

  def create  
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    # params[:id]、メモIdが来るのでそのIdに対応するPostレコードをpostに代入、取得
    if post.checked then
      # 取得したpostのレコードの中にcheckedカラムがあるのでそこのtrueかfalseあるのでtrueなら
      post.update(checked: false)
      # 既読していれば「既読を解除するためにfalseへ変更」updateするcheckedがtrueなら
    else
      post.update(checked: true)
      # 既読していなければ「既読にするためtrueへ変更」updateする。checkedがfalseかnullなら
    end
    
    item = Post.find(params[:id])
    # 上記で更新したレコードを再び変数itemで代入取得し直し
    render json: {post: item}
    # JSON形式で中で使う変数postにupdateしたレコードが入ってるitemを代入する。checked.jsに返却している。
  end
end