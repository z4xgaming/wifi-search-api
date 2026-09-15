export default async function handler(req, res) {
  // CORS हेडर जोड़ें ताकि किसी भी ऐप/क्लाइंट से रिक्वेस्ट आ सके
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // प्रीफ्लाइट (OPTIONS) रिक्वेस्ट को हैंडल करें
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // केवल POST रिक्वेस्ट स्वीकार करें
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} Not Allowed. Use POST.` 
    });
  }

  try {
    const { deviceId, wifiNetworks, timestamp } = req.body;

    // डेटा वैलिडेट करें
    if (!wifiNetworks || !Array.isArray(wifiNetworks)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid data format. 'wifiNetworks' array is required." 
      });
    }

    // यहाँ कंसोल पर डेटा प्रिंट होगा (आप चाहें तो इसे डेटाबेस में सेव कर सकते हैं)
    console.log(`[Wi-Fi Data Received] Device ID: ${deviceId || 'Unknown'}`);
    console.log(`Total Networks: ${wifiNetworks.length}`);

    return res.status(200).json({
      success: true,
      message: "Wi-Fi scan data successfully received and processed by Vercel API.",
      totalNetworksFound: wifiNetworks.length,
      receivedAt: timestamp || new Date().toISOString(),
      data: wifiNetworks
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: "Internal Server Error", 
      details: error.message 
    });
  }
}
