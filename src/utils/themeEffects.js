// Theme-specific visual effects triggered by terminal commands

export function triggerRain() {
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const d = document.createElement('div');
      d.style.cssText = `position:fixed;pointer-events:none;z-index:99998;width:1px;height:${15 + Math.random() * 15}px;background:linear-gradient(180deg,transparent,rgba(90,138,170,0.4));left:${Math.random() * 100}%;top:-20px;animation:rainFallT ${0.5 + Math.random() * 0.5}s linear forwards;`;
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 1000);
    }, i * 30);
  }
}

export function triggerMatrix() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F2\u30F3';
  for (let col = 0; col < 30; col++) {
    setTimeout(() => {
      const x = Math.random() * 100;
      for (let row = 0; row < 20; row++) {
        setTimeout(() => {
          const d = document.createElement('div');
          d.textContent = chars[Math.floor(Math.random() * chars.length)];
          d.style.cssText = `position:fixed;pointer-events:none;z-index:99998;left:${x}%;top:${-20 + row * 5}%;font-family:var(--mono);font-size:14px;color:#33ff99;text-shadow:0 0 8px #33ff99;opacity:${1 - row * 0.04};`;
          document.body.appendChild(d);
          setTimeout(() => {
            d.style.transition = 'opacity 0.5s';
            d.style.opacity = '0';
            setTimeout(() => d.remove(), 500);
          }, 800 + Math.random() * 400);
        }, row * 60);
      }
    }, col * 100);
  }
}

export function triggerGrow() {
  const stages = [
    { delay: 0, h: '<div style="position:absolute;bottom:20%;left:50%;width:4px;height:8px;background:#5a3a1a;border-radius:1px;transform:translateX(-50%);transition:height 0.5s;"></div>' },
    { delay: 400, h: '<div style="position:absolute;bottom:20%;left:50%;transform:translateX(-50%);"><div style="width:4px;height:20px;background:#5a3a1a;border-radius:1px;margin:0 auto;"></div><div style="width:12px;height:8px;background:#4ec97a;border-radius:50% 50% 0 0;margin:-2px auto 0;"></div></div>' },
    { delay: 900, h: '<div style="position:absolute;bottom:20%;left:50%;transform:translateX(-50%);"><div style="width:4px;height:30px;background:#5a3a1a;border-radius:1px;margin:0 auto;"></div><div style="width:16px;height:10px;background:#4ec97a;border-radius:50%;margin:-4px auto 0;"></div><div style="width:8px;height:6px;background:#3aaa8a;border-radius:50%;position:absolute;top:0;left:-6px;transform:rotate(-30deg);"></div><div style="width:8px;height:6px;background:#3aaa8a;border-radius:50%;position:absolute;top:4px;right:-6px;transform:rotate(20deg);"></div></div>' },
  ];

  const growEl = document.createElement('div');
  growEl.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99998;';
  document.body.appendChild(growEl);
  stages.forEach((s) => {
    setTimeout(() => { growEl.innerHTML = s.h; }, s.delay);
  });
  setTimeout(() => {
    growEl.style.transition = 'opacity 1s';
    growEl.style.opacity = '0';
    setTimeout(() => growEl.remove(), 1000);
  }, 3000);
}
