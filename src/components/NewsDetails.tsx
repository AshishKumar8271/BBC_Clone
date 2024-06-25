import CommentBox from "./CommentBox";


const NewsDetails = () => {
  const singleNews = JSON.parse(window.localStorage.getItem('news') as string);

  return (
    <section className="grid grid-cols-1 gap-10 md:grid-cols-2 p-4">
      {/* News Section */}
      <div>
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl ">{singleNews.title}</h1>
        <p className="my-3">{singleNews.description}</p>
        <img src={`${singleNews.urlToImage || "/bbc_news_logo.png"}`} onError={(e) => e.currentTarget.src = "/bbc_news_logo.png"} alt="" />
        <a href={singleNews.url} target="_blank" className="text-[rgb(0,64,255)] text-sm md:text-base">Read more on this article</a>
      </div>

      {/* comment Box */}
      <CommentBox news = {singleNews}/>
    </section>
  )
}

export default NewsDetails;