type UserInfomation = {
  email: string;
  password: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (values.password.length < 8 || values.password.length > 20) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요.';
  }
  // 영어, 숫자, 특수문자 포함 검증 추가
  if (
    !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(
      values.password,
    )
  ) {
    errors.password = '비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.';
  }

  return errors;
}

function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

function validateSignup(values: UserInfomation & {passwordConfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordConfirm: ''};

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지않습니다.';
  }

  return signupErrors;
}

function validateAddPost(values: {
  title: string;
  description?: string;
  date?: Date;
  color?: string;
  score?: number;
}) {
  const errors = {
    title: '',
    description: '',
    date: '',
    color: '',
    score: '',
  };

  if (values.title.trim() === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }
  if (values.description && values.description.length > 200) {
    errors.description = '내용은 200자 이내로 입력해주세요.';
  }

  return errors;
}

function validateEditProfile(values: {nickname: string}) {
  const errors = {
    nickname: '',
  };
  if (values.nickname.trim() === '') {
    errors.nickname = '닉네임을 입력해주세요.';
  }

  return errors;
}

export {validateLogin, validateSignup, validateAddPost, validateEditProfile};