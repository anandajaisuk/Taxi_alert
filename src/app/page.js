import Link from "next/link";
import Navbarhome from "./components/Navbarhome";
import TradingViewWidget from "./components/TradingViewWidget";

export default function Home() {
  return (
    <div>
      <Navbarhome />
      <div className="grid grid-cols-12 mx-8">
        <div className="m-8 flex flex-col justify-between col-span-6">
          <div className="space-y-6">
            <div className="text-6xl">Taxi alert ซิ่ง</div>
            <div className="text-xl">
              เปลี่ยนเป็นเทรดเดอร์ระดับมืออาชีพด้วยสัญญาณที่มีประสิทธิภาพ
              ความรู้และกลยุทธ์ที่จะทำให้คุณได้กำไรจาก Forex Binary Option
            </div>
          </div>
          <Link href="register">
            <button className=" text-center text-white bg-black w-40 h-14 rounded-full text-xl hover:scale-110 duration-200">
              ทดลองใช้
            </button>
          </Link>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-5 bg-green rounded-xl relative overflow-visible">
          <div className="aspect-square w-full h-full relative">
            <img
              src="taxi1.png"
              alt="Taxi"
              className="absolute left-0 top-1/2 transform -translate-x-1/3 -translate-y-[44%] h-[80%] w-auto max-w-none object-contain hover:scale-110 duration-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mx-8 mt-10 mb-10 gap-8">
        <div className="col-span-4 bg-yellow-light aspect-square rounded-xl relative">
          <div className="ml-8 mt-8 text-4xl">Taxi alert ซิ่ง</div>
          <div className="mx-8 mt-3">
            ทำกำไรได้อย่างมั่นคงด้วยสัญญาณการเทรดที่แม่นยำ
            ประสบการณ์การเทรดที่น่าทึ่งทุกวัน
          </div>
          <img
            src="money.jpg"
            className="absolute bottom-0 left-0 w-full h-auto rounded-b-xl"
            alt="Money"
          ></img>
        </div>

        <div className=" col-span-8 bg-[#141823] rounded-xl">
          <TradingViewWidget pair="OANDA:EURUSD"></TradingViewWidget>
        </div>
      </div>
    </div>
  );
}
