//global 변수(전역변수)
const API_KEY = "fde08f1f8c894518a0d1aa99ddddfead";
let newsList = []; /*news는 array에 있음(뉴스를 가지고 있고 news를 만들거임)*/
const menus = document.querySelectorAll(".menus button");  //여러개를 한번에 가져와야 해서 query로
console.log("menu",menus)  //확인용
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event))
);
//url의 내용을 바꾸기 위해 let 자료형
//누나 api
let url = new URL(`https://sugyeong-times.netlify.app//top-headlines?apiKey=${API_KEY}`);
//news api
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

let totalResult = 0;
//임의로 정해줌
let page = 1;
const pageSize = 10; //10개씩 1page
const groupSize = 5; //5개의 page씩 1group


//url 인스턴스 생성 함수(반복 코드)
const getNews = async () => {
  try {
  const response = await fetch(url);

  const data = await response.json();
  if(response.status === 200){
    if(data.articles.length == 0){
      throw new Error("No result for this search!");
    }
    newsList = data.articles;
    render();  
    paginationRender();
  }else{
    throw new Error(data.message); //console창에 data에 message 값

  } 
  }catch(error){
    errorRender(error.message);
  }
  
}; 



const getLatestNews = async () => {
  //최신 뉴스 들고 오는 코드(함수를 담은 변수)
  //누나 api
  url = new URL(`https://sugyeong-times.netlify.app//top-headlines?apiKey=${API_KEY}`);
  //news api
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)

  getNews();

};

//getNewsByCategory함수
const getNewsByCategory = async (event)=>{
  const category = event.target.textContent.toLowerCase(); 
  console.log("category", category);
  //뉴스 가져오기(url필요)
  //누나api
  url = new URL(`https://sugyeong-times.netlify.app//top-headlines?category=${category}&apiKey=${API_KEY}`)
  //news api
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)

  
  getNews();

};

const getNewsByKeyword=async()=>{
  const keyword = document.getElementById("search-input").value;  //검색어 들고오기
  console.log("keyword",keyword);  //확인용
  //누나 api
  url = new URL(`https://sugyeong-times.netlify.app//top-headlines?q=${keyword}&apiKey=${API_KEY}`)
  //news api
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)

  getNews();

};

/*render함수는 newsList가 확정이 되어야 사용가능*/
const render = () => {
  /*뉴스를 그려주는 함수:render*/
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news"> 
    <div class="col-lg-4">  
    <img class="news-img-size"
    src="${
      news.urlToImage ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
    }" />
    </div>
    <div class="col-lg-8"> 
        <h2>${news.title}</h2>  
        <p> ${
          news.description == null || news.description == ""
            ? "내용없음"
            : news.description.length > 200
            ? news.description.substring(0, 200) + "..."
            : news.description
        }
        </p>
        <div>
        ${news.author || "no source"}  ${moment(
            news.publishedAt
         ).fromNow()}
        </div>
    </div>
<div>`
    )
    .join(
      ""
    ); /*List(array)에 있는 news를 하나씩 들고 왔음=>map이 끝나면 newsHTML에 결과물 넣음*/ /*어떤 내용(여러개의 news)을 보여줄지*/
  console.log("html", newsHTML);

  document.getElementById("news-board").innerHTML = newsHTML; /*news HTML을 Id인 section에 보여주는 코드*/
};

//error message를 보여주는 함수
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
  </div>`
  //news를 보여주는 곳 = error message 보여주는 곳
  document.getElementById("news-board").innerHTML = errorHTML;
};

//pagination함수
const paginationRender = () =>{
  //정하는 값

  //totalResult
  //page
  //pageSize
  //totalPage
  //groupSize: 한 그룹의 페이지 수 

  //pageGroup: 현재 속한 그룹
  const pageGroup = Math.ceil(page/groupSize);
  //lastPage
  const lastPage = groupSize*pageGroup;
  //firstPage
  const firstPage = lastPage-(groupSize-1);

  //부트스트랩의 pagination
  let paginationHTML=``;

  for(i=firstPage;i<=lastPage;i++){
    paginationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`
  }

  document.querySelector(".pagination").innerHTML=paginationHTML
}

getLatestNews();

//1.버튼들에 클릭 이벤트 주기
//2.카테고리 별 뉴스 가져오기
//3.그 뉴스를 보여주기
