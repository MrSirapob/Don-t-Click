// ทุก round มี Win Condition ที่ผู้เล่นต้องทำเอง
const btn = (text, cls, x, y, action) => {
  const el = document.createElement("button");
  el.className = `game-btn ${cls}`;
  el.textContent = text;
  el.style.left = x + "%"; el.style.top = y + "%";
  el.onclick = action;
  return el;
};

export function playRound(engine, ctx) {
  const { round, token } = engine.current;
  const a = ctx.arena;
  const win = (bonus=0) => engine.win(token, bonus);
  const lose = (why) => engine.lose(token, why);
  const status = (text) => ctx.status.textContent = text;

  switch(round.type) {
    case "wait-then-click": {
      const b = btn("ยังห้ามกด", "danger", 50, 50, () => lose("รีบเกินไป"));
      a.append(b);
      status("รอประมาณ 1.5 วินาที แล้วข้อความจะเปลี่ยน");
      const t = setTimeout(() => {
        if (!engine.isCurrent(token)) return;
        b.textContent = "กดได้แล้ว";
        b.className = "game-btn safe";
        status("ตอนนี้กดได้");
      }, 1500);
      engine.setCleanup(() => clearTimeout(t));
      b.onclick = () => {
        if (!engine.isCurrent(token)) return;
        if (b.classList.contains("safe")) win();
        else lose("รีบเกินไป");
      };
      break;
    }

    case "correct-button":
      a.append(
        btn("กดฉัน", "danger", 32, 50, () => lose("เลือกปุ่มผิด")),
        btn("ปลอดภัย", "safe", 68, 50, () => win())
      );
      break;

    case "fake-order":
      a.append(
        btn("กดฉัน", "danger", 35, 50, () => lose("เชื่อคำยั่ว")),
        btn("ไม่กด", "safe", 65, 50, () => win())
      );
      break;

    case "moving": {
      const b = btn("จับฉัน", "danger", 50, 50, () => lose("จับเร็วไป"));
      a.append(b);
      let moved = 0;
      const move = () => {
        if (!engine.isCurrent(token)) return;
        moved++;
        b.style.left = (20 + Math.random()*60) + "%";
        b.style.top = (20 + Math.random()*60) + "%";
        if (moved >= 3) {
          b.textContent = "ตอนนี้กดได้";
          b.className = "game-btn safe";
          b.onclick = () => win(50);
          status("มันหยุดแล้ว! ตอนนี้กดได้");
        }
      };
      const t = setInterval(move, 650);
      engine.setCleanup(() => clearInterval(t));
      break;
    }

    case "reverse":
      a.append(btn("ห้ามกด", "safe", 50, 50, () => win()));
      break;

    case "two-safe-one-trap":
      a.append(
        btn("ปลอดภัย", "safe", 25, 50, () => win()),
        btn("ปลอดภัย", "safe", 50, 50, () => win()),
        btn("ห้ามกด", "danger", 75, 50, () => lose("กดปุ่มแดง"))
      );
      break;

    case "trust":
      a.innerHTML = '<div style="padding-top:100px;color:#777">ข้อความด้านบนบอกว่าเกมโกหกคุณ</div>';
      a.append(btn("เชื่อข้อความนี้", "safe", 50, 65, () => win(25)));
      break;

    case "delayed-choice": {
      const b = btn("ยังไม่ต้องกด", "neutral", 50, 50, () => lose("ใจร้อน"));
      a.append(b);
      let ready = false;
      const t = setTimeout(() => {
        ready = true; b.textContent = "กดได้"; b.className = "game-btn safe";
        status("ข้อความเปลี่ยนแล้ว กดได้");
      }, 1200);
      b.onclick = () => ready ? win() : lose("ใจร้อน");
      engine.setCleanup(() => clearTimeout(t));
      break;
    }

    case "fake-win":
      a.append(btn("รับชัยชนะ", "danger", 50, 50, () => lose("หลงคำว่า 'ชนะ'")));
      a.append(btn("เล่นต่อ", "safe", 50, 75, () => win()));
      break;

    case "memory":
      a.append(
        btn("ซ้าย", "danger", 30, 50, () => lose("เกมบอกขวา")),
        btn("ขวา", "safe", 70, 50, () => win())
      );
      break;

    case "moving-safe": {
      const safe = btn("ปลอดภัย", "safe", 30, 50, () => win());
      const trap = btn("ปลอดภัย", "danger", 70, 50, () => lose("ดูแต่คำ ไม่ดูสี"));
      a.append(safe, trap);
      status("สีขาวเท่านั้น");
      break;
    }

    case "text-switch": {
      const b = btn("รอ...", "neutral", 50, 50, () => lose("กดก่อนข้อความอนุญาต"));
      a.append(b);
      let ready = false;
      const t = setTimeout(() => {
        ready = true; b.textContent = "กดได้"; b.className = "game-btn safe";
      }, 1300);
      b.onclick = () => ready ? win() : lose("กดก่อนเวลา");
      engine.setCleanup(() => clearTimeout(t));
      break;
    }

    case "temptation":
      a.append(
        btn("+1000 คะแนน", "danger", 50, 35, () => lose("โลภเกินไป")),
        btn("ผ่านรอบ", "safe", 50, 65, () => win())
      );
      break;

    case "same-buttons":
      a.append(
        btn("ปุ่ม 1", "safe", 25, 50, () => lose("ผิดตำแหน่ง")),
        btn("ปุ่ม 2", "safe", 50, 50, () => lose("ผิดตำแหน่ง")),
        btn("ปุ่ม 3", "safe", 75, 50, () => win(50))
      );
      status("คำใบ้: ปุ่มขวา");
      break;

    case "bait":
      a.append(
        btn("เกมบอกให้กด", "danger", 35, 50, () => lose("เชื่อเกมอีกแล้ว")),
        btn("ไม่ทำตาม", "safe", 65, 50, () => win())
      );
      break;

    case "reverse-count": {
      const label = document.createElement("div");
      label.style.cssText = "font-size:54px;font-weight:900;padding-top:70px";
      a.append(label);
      let n = 5;
      label.textContent = n;
      const t = setInterval(() => {
        n--;
        label.textContent = n;
        if (n === 0) {
          clearInterval(t);
          label.textContent = "หมดแล้ว";
        }
      }, 600);
      a.append(btn("กดเมื่อ 3", "safe", 50, 82, () => n === 3 ? win(75) : lose("กดไม่ตรงจังหวะ")));
      engine.setCleanup(() => clearInterval(t));
      break;
    }

    case "fake-best":
      a.append(
        btn("ทำลายสถิติ +999", "danger", 35, 50, () => lose("ของฟรีไม่มีจริง")),
        btn("ไม่เอา", "safe", 65, 50, () => win())
      );
      break;

    case "moving-text": {
      const b = btn("อย่ารีบ", "neutral", 50, 50, () => lose("รีบกด"));
      a.append(b);
      let ready = false;
      let count = 0;
      const t = setInterval(() => {
        count++;
        if (count < 3) {
          b.textContent = count % 2 ? "ยังไม่" : "รอก่อน";
          b.style.left = (30 + Math.random()*40) + "%";
        } else {
          ready = true;
          b.textContent = "กดได้";
          b.className = "game-btn safe";
          status("ข้อความว่า 'กดได้' แล้ว");
        }
      }, 650);
      b.onclick = () => ready ? win(100) : lose("รีบกด");
      engine.setCleanup(() => clearInterval(t));
      break;
    }

    case "trust-break":
      a.append(
        btn("เชื่อเกม", "danger", 35, 50, () => lose("เชื่อเกม")),
        btn("ไม่เชื่อ", "safe", 65, 50, () => win())
      );
      break;

    case "final-choice":
      a.append(
        btn("ชนะทันที", "danger", 25, 50, () => lose("ของง่ายเกินไป")),
        btn("ไม่กดอันนี้", "neutral", 50, 50, () => lose("ชื่อปุ่มก็หลอก")),
        btn("ผ่านเกม", "safe", 75, 50, () => win(250))
      );
      break;

    default:
      throw new Error("Unknown round type: " + round.type);
  }
}