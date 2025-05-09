const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const { GoogleGenAI } = require('@google/genai');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({
  apiKey: 'AIzaSyC5bMvjeTzYkLcTv-cTn3AblwtvZP4FzA0'
});


app.get('/', (req, res) => {
  res.send('✅ Gemini + Google Maps API 서버가 실행 중입니다.');
});

app.post('/analyze', async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat, lng 파라미터가 필요합니다.' });
  }

  const prompt = `위도 ${lat}, 경도 ${lng}에 위치한 지역이 농업에 적합한지 분석해줘. 토양, 기후, 지형 등을 고려해서 알려줘. 마지막으로 만약 농사에 적합하면 어떠한 과일이 잘 자라고 어떠한 최소가 잘 자라는지 설명해줘.`;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = result.text;
    res.json({ result: text });

  } catch (error) {
    console.error('Gemini API 오류:', error);
    res.status(500).json({ error: 'Gemini API 호출 실패' });
  }
});

app.get('/location', async (req, res) => {
  const { address, lat, lng } = req.query;

  try {
    if (address) {
      // 주소 → 위경도
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDIv9Q9oZrl2o1L2mrwWD89Eg8d36uo0YE`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        res.json({ lat: location.lat, lng: location.lng });
      } else {
        res.status(404).json({ error: '주소를 찾을 수 없습니다.' });
      }
    } else if (lat && lng) {
      // 위경도 → 주소
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDIv9Q9oZrl2o1L2mrwWD89Eg8d36uo0YE`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        res.json({ address });
      } else {
        res.status(404).json({ error: '주소를 찾을 수 없습니다.' });
      }
    } else {
      res.status(400).json({ error: 'address 또는 lat/lng 파라미터가 필요합니다.' });
    }
  } catch (error) {
    console.error("Google Maps API 오류:", error);
    res.status(500).json({ error: "서버 내부 오류" });
  }
});

const PORT = 3000;
const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const IP = getLocalIPAddress();

app.listen(PORT, () => {
  console.log(`🚀 서버가 실행 중입니다: http://${IP}:${PORT}`);
});
