export const CONFIG = {
  rounds: 20,
  scorePerRound: 100,
  bestKey: "dont-click-v2-best"
};

// รอบ = ข้อมูล ไม่ใช่ logic
// กติกาสำคัญ: ทุก round ต้องมี action ของผู้เล่นเป็นตัวทำให้ผ่าน
export const ROUNDS = [
  { id:1, type:"wait-then-click", title:"อย่ากดตอนนี้", message:"รอให้ปุ่มบอกก่อน แล้วค่อยกด", label:"รอ..." },
  { id:2, type:"correct-button", title:"เลือกให้ถูก", message:"กดปุ่มที่เขียนว่า «ปลอดภัย»", label:"เลือกดี ๆ" },
  { id:3, type:"fake-order", title:"อย่าเชื่อข้อความ", message:"ปุ่มที่เขียนว่า «กดฉัน» คือกับดัก", label:"เริ่มไม่น่าไว้ใจ" },
  { id:4, type:"moving", title:"จับให้ทัน", message:"กดปุ่มเมื่อมันหยุด ไม่ใช่ตอนมันหนี", label:"มันรู้ตัวแล้ว" },
  { id:5, type:"reverse", title:"อ่านข้อความ", message:"กดปุ่มที่ข้อความบอกว่า «ห้ามกด»", label:"ตรงกันข้าม" },
  { id:6, type:"two-safe-one-trap", title:"หนึ่งในสาม", message:"มีแค่ปุ่มสีแดงที่ห้ามกด", label:"ง่ายไปไหม" },
  { id:7, type:"trust", title:"เชื่อใครดี", message:"ข้อความด้านบนกำลังโกหกคุณ", label:"อย่าเชื่อเกม" },
  { id:8, type:"delayed-choice", title:"อย่ารีบ", message:"รอจนข้อความเปลี่ยน แล้วทำตามข้อความใหม่", label:"เกมขอเวลา" },
  { id:9, type:"fake-win", title:"คุณชนะแล้ว!", message:"ถ้าคิดว่าชนะ กดปุ่มนี้สิ", label:"แน่นะ?" },
  { id:10, type:"memory", title:"จำให้ดี", message:"ปุ่มปลอดภัยจะเป็นปุ่มขวาเสมอ... รอบนี้", label:"เกมเริ่มจำคุณ" },
  { id:11, type:"moving-safe", title:"อย่าตามสี", message:"กดปุ่มสีขาวเท่านั้น", label:"มองให้ดี" },
  { id:12, type:"text-switch", title:"อ่านข้อความล่าสุด", message:"ข้อความจะเปลี่ยน อย่ากดจนกว่าจะเห็น «กดได้»", label:"อย่าใจร้อน" },
  { id:13, type:"temptation", title:"รางวัลฟรี", message:"ปุ่มนี้ให้คะแนนเยอะมาก... แต่แน่นอนว่ามีข้อแม้", label:"โลภได้ แต่อย่าโง่" },
  { id:14, type:"same-buttons", title:"เหมือนกันหมด", message:"ปุ่มทุกปุ่มหน้าตาเหมือนกัน แต่มีแค่ปุ่มหนึ่งที่ปลอดภัย", label:"อ่านตำแหน่ง" },
  { id:15, type:"bait", title:"ใกล้จบแล้ว", message:"เกมจะบอกให้กดอะไรบางอย่าง คุณเชื่อมันจริงเหรอ?", label:"เริ่มปั่น" },
  { id:16, type:"reverse-count", title:"รอบที่ 16", message:"กดเมื่อเลขเป็น 3 เท่านั้น", label:"ดูตัวเลข" },
  { id:17, type:"fake-best", title:"ทำลายสถิติ", message:"กดปุ่มเพื่อรับคะแนนพิเศษ", label:"ของฟรีไม่มีจริง" },
  { id:18, type:"moving-text", title:"อ่านข้อความบนปุ่ม", message:"ปุ่มจะเปลี่ยนข้อความทุกครั้งที่คุณเข้าใกล้", label:"อย่ารีบ" },
  { id:19, type:"trust-break", title:"คุณไว้ใจเกมมากเกินไป", message:"รอบนี้เกมพูดความจริง... หรือเปล่า?", label:"อีกนิดเดียว" },
  { id:20, type:"final-choice", title:"รอบสุดท้าย", message:"มีปุ่มเดียวที่ทำให้คุณชนะ อย่าเลือกเพราะมันดูน่ากด", label:"จบจริง ๆ" }
];