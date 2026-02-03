import { useEffect, useState } from "react";

export const useShakeDevRedirect = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastX = 0,
      lastY = 0,
      lastZ = 0;
    const threshold = 0;
    let cooldown = false;

    const onShake = () => {
      if (cooldown) return;
      cooldown = true;

      setOpen(true);
      setTimeout(() => {
        cooldown = false;
      }, 2000);
    };

    const handleMotion = (event: DeviceMotionEvent) => {
      alert("wow");
      const accel = event.accelerationIncludingGravity;

      const x = accel?.x ?? 0;
      const y = accel?.y ?? 0;
      const z = accel?.z ?? 0;

      const delta =
        Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);

      if (delta > threshold) onShake();

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener("devicemotion", (e) => alert(JSON.stringify(e)));

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  return {
    setOpen,
    open,
  };
};
