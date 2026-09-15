export default async function handler(req, res) {
  // CORS हेडर
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. अगर यूजर GET रिक्वेस्ट भेज रहा है और SSID सर्च कर रहा है
  if (req.method === 'GET') {
    const { ssid } = req.query;

    if (!ssid) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Wi-Fi name to search. Example: /api/wifi-receiver?ssid=oppo_ak"
      });
    }

    // यहाँ आप डेटाबेस से उस Wi-Fi की डिटेल्स ढूंढ सकते हैं
    // अभी के लिए यह एक डमी रिस्पॉन्स देगा
    return res.status(200).json({
      success: true,
      query: ssid,
      wifiDetails: {
        ssid: ssid,
        status: "Available / Mock Data Found",
        signalStrength: "-65 dBm",
        security: "WPA2",
        lastScanned: new Date().toISOString()
      }
    });
  }

  // 2. अगर कोई डिवाइस डेटा सेव करने के लिए POST रिक्वेस्ट भेज रहा है
  if (req.method === 'POST') {
    const { deviceId, wifiNetworks } = req.body;
    return res.status(200).json({
      success: true,
      message: "Wi-Fi scan data saved successfully.",
      totalReceived: wifiNetworks ? wifiNetworks.length : 0
    });
  }

  return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
