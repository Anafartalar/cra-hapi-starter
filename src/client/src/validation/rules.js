import validator from 'validator';
import {dateToString} from 'utils/utils';


export const email=()=>{
  const message="Bu alana geçerli bir email adresi girmelisiniz.";
  const validate=(text)=>{
    return validator.isEmail(text.toString());
  };

  return {message,validate};
};

export const isAlphanumeric=()=>{
  const message="Bu alana sadece sayı ve harf girebilirsiniz.";
  const validate=(text)=>{
    return validator.isAlphanumeric(text.toString(),'tr-TR');
  };

  return {message,validate};
};

export const isEmpty=()=>{
  const message="Bu alan boş geçilemez.";
  const validate=(text)=>{
    return !validator.isEmpty(text.toString());
  };

  return {message,validate};
};

export const isLength=({min=1,max=30}={})=>{
  const message=`Bu alan en az ${min}, en fazla ${max} karakter olmalıdır.`;
  const validate=(text)=>{
    return validator.isLength(text.toString(),{min,max});
  };

  return {message,validate};
};

export const isIsoDate=()=>{
  const message=`Bu alan boş geçilemez. Seçim yapınız.`;
  const validate=(date)=>{
    return validator.isISO8601(dateToString(date));
  };

  return {message,validate};
};
