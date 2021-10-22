export const checkInput=(s)=>{
    let val=s;
    if(s){
      return Number(val)>=0?val:''
    }else{
      return s;
    }
  }