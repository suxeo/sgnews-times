const API_KEY = "fde08f1f8c894518a0d1aa99ddddfead";
let newsList = []; /*news는 array에 있음(뉴스를 가지고 있고 news를 만들거임)*/
const menus = document.querySelectorAll(".menus button");  //여러개를 한번에 가져와야 해서 query로
console.log("menu",menus)  //확인용
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));

const getLatestNews = async () => {
  //최신 뉴스 들고 오는 코드(함수를 담은 변수)
  const url = new URL(
    `https://sugyeong-times.netlify.app//top-headlines?apiKey=http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?apiKey=${API_KEY}`)
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)
  // url이란 인스턴스 생성
  const response = await fetch(url); //url 호츌
  const data = await response.json(); //data는 body에 있고 body에서 json(파일 형식 중 하나)으로 뽑아와야함
  console.log("rrr", response); //확인
  newsList = data.articles; //data 받음=>newsList 확정
  render();
  console.log("ddd", newsList); //확인
};

//getNewsByCategory함수
const getNewsByCategory = async (event)=>{
  const category = event.target.textContent.toLowerCase(); 
  console.log("category", category);
  //뉴스 가져오기(url필요)
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`)
 
  const url = new URL(`https://sugyeong-times.netlify.app//top-headlines?apiKey=http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=${category}&apiKey=${API_KEY}`)
  const response = await fetch(url);
  const data = await response.json();
  console.log("DDD",data);
  newsList = data.articles;
  render()
};

const getNewsByKeyword=async()=>{
  const keyword = document.getElementById("search-input").value;  //검색어 들고오기
  console.log("keyword",keyword);  //확인용
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`)
  const url = new URL(`https://sugyeong-times.netlify.app//top-headlines?apiKey=http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}&apiKey=${API_KEY}`)

  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data",data);  //확인용
  newsList = data.articles;
  render();  //UI에 보여주는 함수: render()는 newsList를 만들어 준다
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

  document.getElementById("news-board").innerHTML =
    newsHTML; /*news HTML을 Id인 section에 보여주는 코드*/
};

getLatestNews();

//1.버튼들에 클릭 이벤트 주기
//2.카테고리 별 뉴스 가져오기
//3.그 뉴스를 보여주기
