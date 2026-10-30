export const paidRepairPaths = ['/outlet-gfci-repair/', '/circuit-breaker-repair/', '/partial-power-loss/'];
export const isPaidRepairPath = (path: string) => paidRepairPaths.includes(`${path.replace(/\/$/, '')}/`);
