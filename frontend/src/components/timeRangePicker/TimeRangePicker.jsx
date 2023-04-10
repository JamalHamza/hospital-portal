// import { TimePicker } from 'antd';
// import { useState } from 'react';

// function TimeRangePicker() {
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);

//   const handleStartTimeChange = (time, timeString) => {
//     setStartTime(timeString);
//     console.log(timeString);
//   };

//   const handleEndTimeChange = (time, timeString) => {
//     setEndTime(timeString);
//     console.log(timeString);
//   };

//   return (
//     <div>
//       <TimePicker.RangePicker
//         format='HH:mm'
//         value={[startTime, endTime]}
//         onChange={[handleStartTimeChange, handleEndTimeChange]}
//       />
//       {startTime && endTime && (
//         <p>
//           Selected time range: {startTime} - {endTime}
//         </p>
//       )}
//     </div>
//   );
// }

// export default TimeRangePicker;
