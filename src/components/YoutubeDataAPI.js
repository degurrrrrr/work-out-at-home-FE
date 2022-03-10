// import { changePlayTime } from "./TimeFunction";
// 입력받은 받은 링크가 유튜브 영상의 정해진 형식과 맞는지 판단해서
// 맞으면 유튜브 영상 고유 VideoId를 반환 아니면 false를 반환
export function _parserVideoId(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
  // false 반환되면 유튜브 링크를 확인해달라고 알림띄우기
}

// VideoId를 받아서 유튜브dataAPI를 통해 제목,썸네일,영상길이 받아오기
export async function _getVideoInfo(videoId) {
  const YOUTUBE_API_KEY = ["AIzaSyBzJ8fyqKFczsxsaXaAz8bH2wgFtSXf1no"];
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`;
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  let res = await fetch(url, options);
  let resOk = res && res.ok;
  if (resOk) {
    const resData = await res.json();
    const title = resData.items[0].snippet.title;
    const thumbnail = resData.items[0].snippet.thumbnails.high.url;
    let { duration } = resData.items[0].contentDetails;
    console.log(duration);
    duration = changePlayTime(duration);
    return { title, thumbnail, duration }; //객체로 전달
  }
}

//유튜브 data Api에서 받은 PT(1H)((1)4)M((1)2)S형식을 플레이타임을 (HH:)(M)M:(S)S형식으로 변경
function changePlayTime(given) {
  let given_cut = given.split("T")[1];
  let hour = "";
  let minute = "";
  let second = "";
  let result = "";

  if (given_cut.includes("H")) {
    hour = given_cut.split("H")[0];
    given_cut = given_cut.split("H")[1];
    result = result + hour + ":";
  }
  if (given_cut.includes("M")) {
    let M = given_cut.indexOf("M");
    minute = given_cut.split("M")[0];
    given_cut = given_cut.split("M")[1];
    if (Number(minute) < 10) {
      minute = "0" + minute;
    }
    result = result + minute + ":";
  } else {
    result = result + "00" + ":";
  }
  if (given_cut.includes("S")) {
    second = given_cut.split("S")[0];
    if (Number(second) < 10) {
      second = "0" + second;
    }
    result = result + second;
  } else {
    result = result + "00";
  }
  return result;
}
