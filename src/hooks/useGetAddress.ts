import {LatLng} from 'react-native-maps';
import Config from 'react-native-config'; // 이렇게 수정
import {useState, useEffect} from 'react';
import axios from 'axios';

function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${Config.GOOGLE_MAPS_API_KEY}&language=ko`;
        const {data} = await axios.get(url);
        const address =
          data.results && data.results.length > 0
            ? data.results[0].formatted_address
            : `위도: ${latitude.toFixed(4)}, 경도: ${longitude.toFixed(4)}`;

        setResult(address);
      } catch (error) {
        setResult('주소를 알 수 없습니다.');
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
