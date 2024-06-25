'use client'
import { useState, useEffect } from 'react'
import Image from "next/image";
import TradingViewWidget from "../components/TradingViewWidget";
import axios from 'axios';

const TradeAlert = () => {
  const Stock = [
    {name : "ทั้งหมด" , tdv : "OANDA:EURUSD"},
    {name : "EURUSD" , tdv : "OANDA:EURUSD"},
    {name : "EURJPY" , tdv : "OANDA:EURJPY"},
    {name : "GBPUSD" , tdv : "OANDA:GBPUSD"},
    {name : "GBPJPY" , tdv : "OANDA:GBPJPY"},
    {name : "USDJPY" , tdv : "OANDA:USDJPY"},
    {name : "AUDCAD" , tdv : "OANDA:AUDCAD"},
    {name : "AUDUSD" , tdv : "OANDA:AUDUSD"},
    {name : "USDCAD" , tdv : "OANDA:USDCAD"},
    {name : "AUDJPY" , tdv : "OANDA:AUDJPY"},
    {name : "NZDUSD" , tdv : "OANDA:NZDUSD"},
    {name : "USDCHF" , tdv : "OANDA:USDCHF"},
  ];

  const [alerts, setAlerts] = useState([]);
  const [activePair, setActivePair] = useState('ทั้งหมด');
  const [activeTDV, setActiveTDV] = useState('OANDA:EURUSD');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/signal`);
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const handlePairClick = (pair, tdv) => {
    setActivePair(pair);
    setActiveTDV(tdv);
  };

  const filteredAlerts = activePair === 'ทั้งหมด' 
    ? alerts 
    : alerts.filter(alert => alert.Alert.includes(activePair));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit', 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {Stock.map((pair) => (
              <button
                key={pair.name}
                className={`px-5 py-2 rounded-md text-sm transition-colors duration-200 ${
                  pair.name === activePair
                    ? "bg-green-400"
                    : "bg-green-100 hover:bg-green-400"
                }`}
                onClick={() => handlePairClick(pair.name, pair.tdv)}
              >
                {pair.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <span className="text-xl font-light mb-2">แจ้งเตือนล่าสุด </span>
            <span className="text-sm font-light mb-2">
              (ใช้คำสั่งซื้อใน 5 - 10 นาที หลังแจ้งเตือน)
            </span>

            <div className="overflow-y-auto h-[450px] mt-3">
              <table className="w-full text-center text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="py-1 font-extralight text-gray-400">เวลาแจ้งเตือน</th>
                    <th className="py-1 font-extralight text-gray-400">สกุลเงิน</th>
                    <th className="py-1 font-extralight text-gray-400">คำสั่ง</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td className="py-1 w-1/3">{formatDate(alert.createdAt)} น.</td>
                      <td className="py-1">{alert.Alert.split(':')[1].trim()}</td>
                      <td className={`py-1 ${alert.Signal.toLowerCase().includes('buy') ? "text-green-500" : "text-red-500"}`}>
                        {alert.Signal.split(' ')[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{activePair}</h3>
              <div className="h-72">
                <TradingViewWidget key={activeTDV} pair={activeTDV} />
              </div>
            </div>

            <div className="bg-green-400 shadow-md rounded-lg p-4">
              <h3 className="text-lg bg-white text-black py-2 rounded-xl w-28 text-center">สถานะระบบ</h3>
              <Image
                src="/taxi2.png"
                alt="taxi"
                width={300}
                height={200}
                className="rounded-md mx-auto mb-10"
              />
              <button className="text-lg w-full bg-white text-black py-2 rounded-xl mt-2">การแจ้งเตือนปกติ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeAlert;