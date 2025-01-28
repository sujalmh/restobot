import React, { useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';

const QRScan = () => {
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate(); // Hook to handle redirection

  const codeReader = new BrowserMultiFormatReader();

  const startScanning = async () => {
    try {
      setIsScanning(true);
      // Get the user's camera and start scanning
      const videoElement = document.getElementById('video');
      const devices = await codeReader.listVideoInputDevices();
      const selectedDevice = devices[0]; // Choose the first available device

      if (selectedDevice) {
        await codeReader.decodeFromVideoDevice(selectedDevice.deviceId, videoElement, (result, error) => {
          if (result) {
            setScannedResult(result.text); // Update state with scanned result
            navigate(`/restaurant/info/${result.text}`);
            codeReader.reset(); // Stop scanning after the result is found
          }
          if (error) {
            console.error('Error scanning QR code:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  // Stop scanning when the component is unmounted or scanning is stopped
  useEffect(() => {
    return () => {
      if (isScanning) {
        codeReader.reset();
        setIsScanning(false);
      }
    };
  }, [isScanning]);

  return (
    <div className="h-screen flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-3xl font-bold text-white mb-6">Scan QR Code</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Scan Start Button */}
        <button
          onClick={startScanning}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
        >
          {isScanning ? 'Scanning...' : 'Start Scanning'}
        </button>

        {/* Video Feed */}
        <div className="my-6">
          <video
            id="video"
            width="100%"
            height="auto"
            className="border-2 border-gray-300 rounded-md"
            style={{ maxWidth: '100%' }}
          />
        </div>

        {/* Scanned Result */}
        {scannedResult && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md">
            <p className="font-semibold">Scanned Result:</p>
            <p className="text-lg">{scannedResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScan;
