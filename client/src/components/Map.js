// import React, { memo, useEffect, useState } from "react";
// import GoogleMapReact from "google-map-react";
// import { FaLocationDot } from "react-icons/fa6";
// import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

// const Position = ({ icon }) => <div>{icon}</div>;

// const Map = ({ address }) => {
//   const [coords, setCoords] = useState({}); //tọa độ
//   useEffect(() => {
//     const getCoords = async () => {
//       const results = await geocodeByAddress(address);
//       const latLng = await getLatLng(results[0]);
//       setCoords(latLng);
//     };
//     if (address) {
//       getCoords();
//     } else {
//       navigator.geolocation.getCurrentPosition((e) => {
//         console.log("e: ", e);
//       });
//     }
//   }, [address]);

//   return (
//     <div className="h-[300px] w-full relative">
//       {address && (
//         <div className="absolute rounded-md top-[8px] left-[8px] z-50 max-w-[200px] bg-white shadow-md p-4 text-xs">
//           {address}
//         </div>
//       )}
//       <GoogleMapReact
//         // bootstrapURLKeys={{ key: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY" }}
//         // defaultCenter={coords}
//         // center={coords}
//         defaultZoom={11}
//       >
//         {/* <Position
//           lat={coords?.lat}
//           lng={coords?.lng}
//           icon={<FaLocationDot color="red" size={24} />}
//         /> */}
//       </GoogleMapReact>
//     </div>
//   );
// };

// export default memo(Map);
