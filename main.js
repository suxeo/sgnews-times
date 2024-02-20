const API_KEY='fde08f1f8c894518a0d1aa99ddddfead'
let news=[]
const getLatestNews = async()=>{ //최신 뉴스 들고 오는 코드(함수를 담은 변수)
    const url = new URL('https://sugyeong-times.netlify.app//top-headlines?apiKey=http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?apiKey=${API_KEY}');  //url이란 인스턴스 생성
    
    const response = await fetch(url);  //url 호츌
    const data = await response.json()  //data는 body에 있고 body에서 json(파일 형식 중 하나)으로 뽑아와야함
    console.log("rrr",response);  //확인
    news = data.articles;  //data 받음
    console.log("ddd",news);  //확인
};
getLatestNews();