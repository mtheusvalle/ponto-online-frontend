import { useState } from "react";

export default function Data() {
  const [data, setData] = useState(new Date());

  setTimeout(() => {
    setData(new Date());
  }, 1000);

	let formatTime = (val) => {
		if(val < 10){
			return '0' + val;
		}else{
			return val;
		}
	}

  return (
		<div>
			<h1>{`${formatTime(data.getHours())}:${formatTime(data.getMinutes())}:${formatTime(data.getSeconds())}`}</h1>
		</div>
	)
}
