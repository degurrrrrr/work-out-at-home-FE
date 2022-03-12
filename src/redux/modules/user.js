import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import instance from '../../shared/Request';
import { LoginWithKakao, logoutWithKakao } from '../../components/KakaoLogin';
import axios from 'axios';
import { Buffer } from 'buffer';
import jwt_decode from 'jwt-decode';

const GET_NICKNAME = 'GET_NICKNAME';
const SET_WEEKLY_GOAL = 'SET_WEEKLY_GOAL';

const getNickname = createAction(GET_NICKNAME, (nickname) => ({ nickname }));
const setWeeklyGoal = createAction(SET_WEEKLY_GOAL, (selectGoal) => ({ selectGoal }));

const initialState = {
  // nickname: '',
  nickname: 'User의 Initial값',
};

const userInfoChangeFB = (nickname, selectGoal) => {
  return function (dispatch, getState, { history }) {
    const access_token = localStorage.getItem('isLogin');
    axios
      .patch(
        'http://3.39.58.56:4000/users',
        {
          nickName: nickname,
          weeklyGoal: selectGoal + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        const myToken = jwt_decode(access_token);

        dispatch(getNickname(nickname));
        dispatch(setWeeklyGoal(selectGoal + 1));
        // 토큰값 업데이트를 위한 로그아웃 후 재로그인
        localStorage.removeItem('isLogin');
        LoginWithKakao();

        axios
          .post('http://3.39.58.56:4000/users/auth', {
            nickName: nickname,
            snsId: myToken.id,
          })
          .then((res) => {
            dispatch(getNickname(myToken.nickName));
            window.alert('회원 정보가 변경되었습니다');
          })
          .catch((error) => {
            alert('카카오 로그인 에러', error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export default handleActions(
  {
    [GET_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.nickname = action.payload.nickname;
        // console.log(action.payload.nickname); //찍힘
      }),
    [SET_WEEKLY_GOAL]: (state, action) =>
      produce(state, (draft) => {
        draft.selectGoal = action.payload.selectGoal;
      }),
  },
  initialState
);

const actionCreators = {
  getNickname,
  userInfoChangeFB,
};

export { actionCreators };
